'use client';

import React, { useState } from 'react';
import { GlassCard } from './ui/GlassCard';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const INITIAL_NAMES = [
  { id: 1, name: 'Mateo', votes: 12 },
  { id: 2, name: 'Martín', votes: 8 },
  { id: 3, name: 'Luca', votes: 5 }, // Added Luca from the user's reference
];

export function NameVotingSection() {
  const [names, setNames] = useState(INITIAL_NAMES);
  const [newName, setNewName] = useState('');
  const [votedFor, setVotedFor] = useState<number[]>([]);

  const handleVote = (id: number) => {
    if (votedFor.includes(id)) return; 
    setVotedFor([...votedFor, id]);
    setNames(names.map(n => n.id === id ? { ...n, votes: n.votes + 1 } : n).sort((a, b) => b.votes - a.votes));
  };

  const handleSuggest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const newEntry = { id: Date.now(), name: newName.trim(), votes: 1 };
    setNames([...names, newEntry].sort((a, b) => b.votes - a.votes));
    setVotedFor([...votedFor, newEntry.id]);
    setNewName('');
  };

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-cloud-800 mb-4">Ayúdanos a elegir</h2>
          <p className="font-sans text-silver-500">Aún no nos decidimos por el nombre. ¡Vota por tu favorito o sugiere uno nuevo!</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Top Ranking */}
          <div className="space-y-4">
            {names.map((item, index) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="flex items-center justify-between p-4 bg-white border border-cloud-50 shadow-sm rounded-2xl" delay={0}>
                  <div className="flex items-center gap-4">
                    <span className="text-gold-400 font-serif text-xl font-bold">#{index + 1}</span>
                    <span className="font-serif text-xl text-cloud-800">{item.name}</span>
                  </div>
                  <button 
                    onClick={() => handleVote(item.id)}
                    className="flex items-center gap-2 group focus:outline-none"
                  >
                    <span className="font-sans text-silver-500">{item.votes}</span>
                    <motion.div
                      whileTap={{ scale: 0.8 }}
                      animate={votedFor.includes(item.id) ? { scale: [1, 1.3, 1] } : {}}
                      className="text-cloud-400"
                    >
                      <Heart 
                        size={24} 
                        fill={votedFor.includes(item.id) ? "currentColor" : "none"} 
                        className={votedFor.includes(item.id) ? "" : "group-hover:text-cloud-300 transition-colors"}
                      />
                    </motion.div>
                  </button>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Suggest Form */}
          <div className="flex flex-col justify-center">
            <GlassCard delay={0.2} className="bg-transparent border-none shadow-none">
              <h3 className="font-serif text-xl text-cloud-800 mb-4 text-center md:text-left">¿Tienes otra idea?</h3>
              <form onSubmit={handleSuggest} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Escribe un nombre..."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-4 text-cloud-800 placeholder-silver-400 bg-white border border-cloud-100 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-300 transition-all shadow-sm"
                />
                <Button type="submit" variant="secondary" className="w-full bg-cloud-100 hover:bg-cloud-200 text-cloud-800">
                  Sugerir nombre
                </Button>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
