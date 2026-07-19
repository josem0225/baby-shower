'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="py-12 px-4 text-center relative z-10 bg-transparent">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto flex flex-col items-center"
      >
        <div className="w-12 h-12 mb-6 text-gold-400">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 5a2 2 0 1 1 4 0v1h-4V5Z"/>
            <path d="M7 6h10a1 1 0 0 1 1 1v12a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V7a1 1 0 0 1 1-1Z"/>
            <path d="M12 11v6"/>
            <path d="M9 14h6"/>
          </svg>
        </div>
        <p className="font-serif text-xl text-cloud-800 mb-2">
          ¡Tu presencia es el mejor regalo!
        </p>
        <p className="font-sans text-silver-500 text-sm">
          No podemos esperar para compartir este momento contigo.
        </p>
      </motion.div>
    </footer>
  );
}
