'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function FloatingParticles() {
  const [particles, setParticles] = useState<{ id: number; left: string; delay: number; duration: number; size: number; color: string }[]>([]);

  useEffect(() => {
    const colors = ['bg-cloud-300', 'bg-cloud-400', 'bg-silver-300', 'bg-gold-300'];
    
    // Más partículas (60)
    const newParticles = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: Math.random() * 8 + 6, // Caen un poco más rápido: 6 a 14 segundos
      size: Math.random() * 8 + 5, // Más grandes: 5px a 13px
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -50, opacity: 0 }}
          animate={{ 
            y: '100vh', 
            opacity: [0, 0.9, 0.9, 0], // Más opacos
            x: ['0px', '30px', '-30px', '0px'] // Más movimiento lateral
          }}
          transition={{
            y: { duration: p.duration, repeat: Infinity, ease: 'linear', delay: p.delay },
            opacity: { duration: p.duration, repeat: Infinity, ease: 'linear', delay: p.delay },
            x: { duration: p.duration / 1.5, repeat: Infinity, ease: 'easeInOut', delay: p.delay }
          }}
          className={`absolute rounded-full shadow-sm ${p.color}`} // Agregado shadow
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            filter: 'blur(0.5px)' // Menos blur para que se note
          }}
        />
      ))}
    </div>
  );
}
