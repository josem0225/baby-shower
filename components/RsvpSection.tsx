'use client';

import React, { useState } from 'react';
import { GlassCard } from './ui/GlassCard';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle2, XCircle, Heart } from 'lucide-react';

export function RsvpSection() {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'found' | 'not_found' | 'confirmed'>('idle');
  const [guestName, setGuestName] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    
    setStatus('loading');
    
    setTimeout(() => {
      if (phone === '123') { 
        setStatus('not_found');
      } else {
        setGuestName('Familia Ejemplo');
        setStatus('found');
      }
    }, 1500);
  };

  const handleConfirm = (attending: boolean) => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('confirmed');
    }, 1000);
  };

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-10"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-cloud-800 mb-4">Confirma tu Asistencia</h2>
          <p className="font-sans text-silver-500">Por favor, ingresa tu número de teléfono para buscar tu invitación.</p>
        </motion.div>

        <GlassCard className="relative overflow-hidden min-h-[250px] flex flex-col justify-center bg-transparent border-none shadow-none">
          <AnimatePresence mode="wait">
            
            {(status === 'idle' || status === 'not_found') && (
              <motion.form 
                key="search-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSearch}
                className="flex flex-col gap-4"
              >
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Ej. 300 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-4 pl-12 text-lg text-cloud-800 placeholder-silver-400 bg-white border border-cloud-100 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-300 transition-all shadow-sm"
                  />
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gold-400" size={20} />
                </div>
                {status === 'not_found' && (
                  <p className="text-red-500 text-sm text-center">No encontramos este número. Intenta de nuevo.</p>
                )}
                <Button type="submit" className="w-full bg-cloud-100 hover:bg-cloud-200 text-cloud-800 border border-cloud-200">
                  Buscar Invitación
                </Button>
              </motion.form>
            )}

            {status === 'loading' && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center gap-4 py-8"
              >
                <div className="w-12 h-12 border-4 border-cloud-200 border-t-cloud-400 rounded-full animate-spin"></div>
                <p className="text-silver-500 font-sans animate-pulse">Buscando con amor...</p>
              </motion.div>
            )}

            {status === 'found' && (
              <motion.div 
                key="found"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <h3 className="font-serif text-2xl text-cloud-800 mb-2">¡Hola, {guestName}!</h3>
                <p className="text-silver-500 mb-8">Nos hace muy felices invitarte. ¿Nos acompañarás?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => handleConfirm(true)} className="flex-1 gap-2 bg-cloud-300 hover:bg-cloud-400 text-cloud-800">
                    <CheckCircle2 size={20} />
                    ¡Sí, ahí estaré!
                  </Button>
                  <Button onClick={() => handleConfirm(false)} variant="secondary" className="flex-1 gap-2 bg-silver-100 text-silver-500 hover:bg-silver-300">
                    <XCircle size={20} />
                    No podré asistir
                  </Button>
                </div>
              </motion.div>
            )}

            {status === 'confirmed' && (
              <motion.div 
                key="confirmed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="w-20 h-20 bg-cloud-100 text-cloud-400 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Heart size={40} fill="currentColor" />
                </motion.div>
                <h3 className="font-serif text-2xl text-cloud-800 mb-2">¡Gracias por confirmar!</h3>
                <p className="text-silver-500">Hemos guardado tu respuesta. ¡Qué emoción!</p>
              </motion.div>
            )}

          </AnimatePresence>
        </GlassCard>
      </div>
    </section>
  );
}
