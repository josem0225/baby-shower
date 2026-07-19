'use client';

import React, { useState, useEffect } from 'react';
import { GlassCard } from './ui/GlassCard';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Loader2 } from 'lucide-react';
import { getNames, voteName, NameEntry } from '@/app/actions/names';

export function NameVotingSection() {
  const [names, setNames] = useState<NameEntry[]>([]);
  const [newName, setNewName] = useState('');
  const [votedFor, setVotedFor] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Cargar nombres al inicio
    const fetchNames = async () => {
      const result = await getNames();
      if (result.success && result.data) {
        setNames(result.data);
      }
      setIsLoading(false);
    };
    fetchNames();
  }, []);

  const handleVote = async (nameObj: NameEntry) => {
    const cleanName = nameObj.name.toUpperCase();
    const isVoted = votedFor.includes(cleanName);
    
    // Optimistic Update
    if (isVoted) {
      setVotedFor(prev => prev.filter(n => n !== cleanName));
      setNames(prev => 
        prev.map(n => n.id === nameObj.id ? { ...n, votes: Math.max(0, n.votes - 1) } : n)
            .sort((a, b) => b.votes - a.votes)
      );
    } else {
      setVotedFor(prev => [...prev, cleanName]);
      setNames(prev => 
        prev.map(n => n.id === nameObj.id ? { ...n, votes: n.votes + 1 } : n)
            .sort((a, b) => b.votes - a.votes)
      );
    }

    // Call API en background
    const result = await voteName(cleanName, isVoted);
    if (result.success && result.data) {
      setNames(result.data);
    }
  };

  const handleSuggest = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = newName.trim().toUpperCase();
    if (!cleanName || isSubmitting) return;

    if (votedFor.includes(cleanName)) {
      setNewName('');
      return; // Ya votó por este nombre
    }

    setIsSubmitting(true);

    // Optimistic Update
    const existing = names.find(n => n.name.toUpperCase() === cleanName);
    setVotedFor(prev => [...prev, cleanName]);
    
    if (existing) {
      setNames(prev => 
        prev.map(n => n.id === existing.id ? { ...n, votes: n.votes + 1 } : n)
            .sort((a, b) => b.votes - a.votes)
      );
    } else {
      const tempId = `temp-${Date.now()}`;
      setNames(prev => 
        [...prev, { id: tempId, name: cleanName, votes: 1 }]
            .sort((a, b) => b.votes - a.votes)
      );
    }
    
    setNewName('');

    // Call API
    const result = await voteName(cleanName);
    if (result.success && result.data) {
      setNames(result.data);
    }
    
    setIsSubmitting(false);
  };

  return (
    <section className="py-10 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-10"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-cloud-800 mb-4">Ayúdanos a elegir</h2>
          <p className="font-sans text-silver-500">¡Vota por tu favorito o sugiere uno nuevo!</p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          
          {/* Top Ranking con Scroll para muchos items */}
          <div className="md:col-span-3">
            <GlassCard delay={0} className="bg-white/60 p-4 border border-cloud-100 shadow-sm rounded-3xl">
              <div className="max-h-[450px] overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-cloud-200 scrollbar-track-transparent">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="animate-spin text-cloud-300 mb-4" size={32} />
                    <p className="text-silver-400 font-sans">Cargando sugerencias...</p>
                  </div>
                ) : names.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-silver-500">Aún no hay nombres sugeridos. ¡Sé el primero!</p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {names.map((item, index) => {
                      const isVoted = votedFor.includes(item.name.toUpperCase());
                      return (
                        <motion.div 
                          key={item.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                            isVoted ? 'bg-gold-50 border-gold-200' : 'bg-white border-cloud-50 hover:border-gold-100'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <span className={`font-serif text-xl font-bold w-8 ${
                              index === 0 ? 'text-gold-500' : 
                              index === 1 ? 'text-silver-400' : 
                              index === 2 ? 'text-orange-300' : 'text-cloud-300'
                            }`}>
                              #{index + 1}
                            </span>
                            <span className="font-serif text-lg md:text-xl text-cloud-800">{item.name}</span>
                          </div>
                          
                          <button 
                            onClick={() => handleVote(item)}
                            className="flex items-center gap-2 group focus:outline-none"
                          >
                            <span className={`font-sans font-medium ${isVoted ? 'text-gold-500' : 'text-silver-400'}`}>
                              {item.votes}
                            </span>
                            <motion.div
                              whileTap={{ scale: 0.8 }}
                              className={isVoted ? "text-gold-400" : "text-cloud-300"}
                            >
                              <Heart 
                                size={24} 
                                fill={isVoted ? "currentColor" : "none"} 
                                className={isVoted ? "" : "group-hover:text-gold-300 group-hover:scale-110 transition-all"}
                              />
                            </motion.div>
                          </button>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                )}
              </div>
            </GlassCard>
          </div>

          {/* Suggest Form */}
          <div className="md:col-span-2 flex flex-col justify-start">
            <GlassCard delay={0.2} className="bg-transparent border-none shadow-none md:sticky md:top-24">
              <h3 className="font-serif text-xl text-cloud-800 mb-4 text-center md:text-left">¿Tienes otra idea?</h3>
              <form onSubmit={handleSuggest} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Ej. MATEO"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full p-4 text-cloud-800 uppercase placeholder-silver-400 bg-white border border-cloud-100 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-300 transition-all shadow-sm disabled:opacity-50"
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !newName.trim()}
                  className="w-full bg-cloud-100 hover:bg-cloud-200 text-cloud-800 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="animate-spin mx-auto" size={24}/> : 'Sugerir / Votar'}
                </Button>
              </form>
              <p className="text-silver-400 text-xs text-center mt-4">
                Puedes buscar si el nombre ya existe escribiéndolo arriba. Automáticamente le sumará un voto.
              </p>
            </GlassCard>
          </div>
          
        </div>
      </div>
    </section>
  );
}
