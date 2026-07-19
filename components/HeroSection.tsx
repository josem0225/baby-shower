'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { PawPrint } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-4 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="z-10 max-w-2xl flex flex-col items-center"
      >
        <div className="text-gold-300/60 mb-6">
          <PawPrint size={32} strokeWidth={1} />
        </div>
        
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
            <CountdownItem value="25" label="Días" />
            <span className="text-gold-300/50 text-3xl font-light mb-4">/</span>
            <CountdownItem value="14" label="Horas" />
            <span className="text-gold-300/50 text-3xl font-light mb-4">/</span>
            <CountdownItem value="30" label="Minutos" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function CountdownItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-serif text-3xl md:text-5xl text-cloud-800">{value}</span>
      <span className="font-sans text-xs md:text-sm text-silver-500 uppercase tracking-widest mt-1">{label}</span>
    </div>
  );
}
