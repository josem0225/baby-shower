'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { verifyGuest } from '@/app/actions/auth';
import { Phone, Loader2, Heart } from 'lucide-react';
import { FloatingParticles } from './decorations/FloatingParticles';
import { PomeranianArt } from './decorations/PomeranianArt';
import { PomeranianSleepingArt } from './decorations/PomeranianSleepingArt';

export function Gatekeeper({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('guest_auth');
    if (saved === 'true') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 7) {
      setError('Ingresa un número de celular válido porfa.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await verifyGuest(phone);
      if (result.success) {
        localStorage.setItem('guest_auth', 'true');
        if (result.guestName) {
          localStorage.setItem('guest_name', result.guestName);
        }
        setIsAuthenticated(true);
      } else {
        setError('Oops, no encontramos este número. Valida con Jenifer y Jose tu invitación.');
      }
    } catch (err) {
      setError('Tuvimos un problemita de conexión. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated === null) {
    return <div className="min-h-screen bg-cloud-50" />;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:py-20 relative overflow-hidden bg-cloud-50">
      
      {/* Lluvia azul y dorada de fondo */}
      <FloatingParticles />

      {/* Tarjeta con forma de arco (mismo look and feel) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white shadow-[0_20px_60px_rgba(42,67,101,0.06)] rounded-t-[180px] md:rounded-t-[250px] rounded-b-3xl border border-white relative z-30 text-center px-6 pt-32 pb-12 mt-10"
      >
        {/* Borde interior dorado súper sutil para mantener el diseño boutique */}
        <div className="absolute inset-3 md:inset-4 border border-gold-300/30 rounded-t-[170px] md:rounded-t-[235px] rounded-b-2xl pointer-events-none z-10" />

        <div className="relative z-20">
          <div className="flex justify-center mb-6 text-gold-400">
            <Heart size={32} className="animate-pulse" fill="currentColor" strokeWidth={1} />
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl text-cloud-800 mb-4 leading-tight">
            ¡Qué emoción que <br /> estés aquí!
          </h2>
          <p className="font-sans text-silver-500 mb-8 px-4">
            Para destapar tu invitación y ver todos los detalles del Baby Shower, confírmanos tu número de celular.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-4 md:px-8">
            <div className="relative">
              <input
                type="tel"
                placeholder="Tu celular (Ej. 300 123 4567)"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="w-full p-4 pl-12 text-lg text-cloud-800 placeholder-silver-400 bg-cloud-50 border border-cloud-100 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-300 transition-all shadow-inner text-center"
                disabled={isLoading}
                maxLength={10}
              />
              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gold-400" size={20} />
            </div>

            <AnimatePresence>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-400 text-sm font-medium bg-red-50/50 p-2 rounded-lg"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-cloud-400 hover:bg-cloud-500 text-white font-serif text-xl py-4 rounded-full transition-colors flex items-center justify-center gap-2 disabled:opacity-70 mt-2 shadow-md"
            >
              {isLoading ? <Loader2 className="animate-spin" size={24} /> : 'Abrir Invitación 💌'}
            </button>
          </form>
        </div>
      </motion.div>

      {/* Perrito de pie (SVG Inline - Izquierda) */}
      <div className="fixed bottom-0 left-[-30px] md:left-4 w-40 md:w-56 h-40 md:h-56 z-40 pointer-events-none opacity-80">
        <PomeranianArt />
      </div>

      {/* Perrito durmiendo (SVG Inline - Derecha) */}
      <div className="fixed bottom-[10px] right-[-20px] md:right-4 w-48 md:w-64 h-48 md:h-64 z-40 pointer-events-none opacity-80">
        <PomeranianSleepingArt />
      </div>
      
      {/* Nubes en el suelo hechas con CSS Puro */}
      <div className="fixed bottom-[-50px] left-0 right-0 h-40 z-20 pointer-events-none overflow-hidden blur-md opacity-50">
        <div className="absolute bottom-0 w-full flex justify-around">
          <div className="w-64 h-64 bg-white rounded-full translate-y-1/2"></div>
          <div className="w-96 h-96 bg-white rounded-full translate-y-1/3"></div>
          <div className="w-72 h-72 bg-white rounded-full translate-y-1/2"></div>
        </div>
      </div>
    </main>
  );
}
