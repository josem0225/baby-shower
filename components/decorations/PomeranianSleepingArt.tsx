'use client';
import React from 'react';
import { motion } from 'framer-motion';

export function PomeranianSleepingArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 250 200" className={`w-full h-full drop-shadow-2xl ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      
      {/* La Nube (Cloud) */}
      <g className="fill-cloud-50" opacity="0.9">
        <circle cx="125" cy="150" r="45" />
        <circle cx="75" cy="160" r="35" />
        <circle cx="175" cy="160" r="35" />
        <circle cx="45" cy="170" r="25" />
        <circle cx="205" cy="170" r="25" />
        <rect x="45" y="150" width="160" height="45" rx="22.5" />
      </g>

      {/* Sombra del perrito sobre la nube */}
      <ellipse cx="125" cy="135" rx="45" ry="15" fill="rgba(0,0,0,0.03)" />

      {/* El Pomerania Durmiendo (enrolladito) */}
      <motion.g 
        animate={{ y: [0, -3, 0] }} 
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="fill-white"
      >
        {/* Cuerpo enrollado (bola de pelo) */}
        <circle cx="135" cy="100" r="40" />
        <circle cx="105" cy="115" r="35" />
        <circle cx="155" cy="120" r="30" />
        <circle cx="125" cy="125" r="35" />
        <circle cx="95" cy="95" r="25" />
        <circle cx="165" cy="95" r="20" />
        
        {/* Cola esponjosa cubriendo su cuerpo */}
        <circle cx="165" cy="110" r="25" fill="#FDFBF7" />
        <circle cx="150" cy="130" r="20" fill="#FDFBF7" />
        <circle cx="130" cy="135" r="15" fill="#FDFBF7" />

        {/* Orejitas caídas o relajadas */}
        <path d="M85,75 Q95,65 105,80 Z" className="fill-white" />
        <path d="M125,70 Q135,60 140,80 Z" className="fill-white" />
        
        {/* Cara durmiendo (girada ligeramente) */}
        {/* Ojo izquierdo cerrado */}
        <path d="M95,95 Q100,100 105,95" stroke="#3D3831" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Ojo derecho cerrado */}
        <path d="M115,95 Q120,100 125,95" stroke="#3D3831" strokeWidth="2" strokeLinecap="round" fill="none" />
        
        {/* Nariz */}
        <circle cx="110" cy="105" r="4" fill="#3D3831" />
        
        {/* Zzz - Animación de dormir */}
        <motion.text 
          x="145" y="75" 
          fill="#94B4D6" 
          fontFamily="sans-serif" 
          fontWeight="bold"
          fontSize="14"
          animate={{ opacity: [0, 1, 0], y: [0, -10, -20], x: [0, 5, 10] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: 0 }}
        >Z</motion.text>
        <motion.text 
          x="155" y="60" 
          fill="#94B4D6" 
          fontFamily="sans-serif" 
          fontWeight="bold"
          fontSize="10"
          animate={{ opacity: [0, 1, 0], y: [0, -10, -20], x: [0, 5, 10] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: 0.8 }}
        >z</motion.text>
        <motion.text 
          x="165" y="50" 
          fill="#94B4D6" 
          fontFamily="sans-serif" 
          fontWeight="bold"
          fontSize="8"
          animate={{ opacity: [0, 1, 0], y: [0, -10, -20], x: [0, 5, 10] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: 1.6 }}
        >z</motion.text>
      </motion.g>

    </svg>
  );
}
