'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PawPrint } from 'lucide-react';
import { useGuest } from './Gatekeeper';

export function HeroSection() {
  const { guestName } = useGuest();
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00' });

  useEffect(() => {
    // Fecha objetivo: 26 de Septiembre 2026 a la 1 PM (hora Colombia)
    const targetDate = new Date('2026-09-26T13:00:00-05:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00' });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0')
      });
    };

    updateCountdown(); // Ejecutar inmediatamente
    const interval = setInterval(updateCountdown, 1000); // Actualizar cada segundo para más precisión

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center text-center px-4 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="z-10 max-w-2xl flex flex-col items-center"
      >
        <div className="text-gold-300/60 mb-4 md:mb-6">
          <PawPrint size={32} strokeWidth={1} />
        </div>
        
        {/* Saludo Personalizado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 md:mb-8"
        >
          <h2 className="font-serif italic text-3xl md:text-4xl text-cloud-600 mb-3">
            {guestName ? `¡Hola ${guestName}!` : '¡Hola!'}
          </h2>
          <p className="font-sans text-silver-500 text-sm md:text-base px-6 max-w-md mx-auto leading-relaxed">
            Eres una persona muy especial para nosotros y nos haría muchísima ilusión que nos acompañes a celebrar nuestro
          </p>
        </motion.div>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-gold-500 mb-2 leading-tight uppercase tracking-[0.2em] font-medium drop-shadow-sm">
          Baby<br/>Shower
        </h1>
        <h2 className="text-cloud-800 font-serif italic text-xl md:text-2xl mt-4 mb-2">
          En honor a nuestro bebé
        </h2>
        
        <h3 className="font-sans text-sm md:text-base text-silver-500 mb-12 uppercase tracking-widest mt-6">
          ¡Estamos tan emocionados de conocerte!
        </h3>

        {/* Countdown ultra limpio */}
        <div className="inline-flex py-4">
          <div className="flex gap-8 md:gap-12 justify-center items-center">
            <CountdownItem value={timeLeft.days} label="Días" />
            <span className="text-gold-300/50 text-3xl font-light mb-4">/</span>
            <CountdownItem value={timeLeft.hours} label="Horas" />
            <span className="text-gold-300/50 text-3xl font-light mb-4">/</span>
            <CountdownItem value={timeLeft.minutes} label="Minutos" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function CountdownItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-serif text-3xl md:text-5xl text-cloud-800 w-12 md:w-16">{value}</span>
      <span className="font-sans text-xs md:text-sm text-silver-500 uppercase tracking-widest mt-1">{label}</span>
    </div>
  );
}
