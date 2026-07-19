'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function PomeranianSleepingArt({ className = "" }: { className?: string }) {
  return (
    <motion.div 
      className={`relative w-full h-full ${className}`}
      animate={{ y: [0, -5, 0] }} 
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
    >
      <Image
        src="/images/pom_sleeping.png"
        alt="Sleeping Pomeranian"
        fill
        className="object-contain"
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 75%)'
        }}
        sizes="(max-width: 768px) 224px, 320px"
      />
    </motion.div>
  );
}
