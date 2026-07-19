'use client';
import React from 'react';
import { motion } from 'framer-motion';

const BALLOONS = [
  // Lado izquierdo subiendo
  { size: 'w-24 h-24', pos: '-left-4 top-[200px]', color: 'bg-[radial-gradient(circle_at_35%_35%,_#E0EAF5_0%,_#7599C2_80%)]' },
  { size: 'w-16 h-16', pos: 'left-10 top-[220px]', color: 'bg-[radial-gradient(circle_at_35%_35%,_#FDFBF7_0%,_#EBE3D5_80%)]' },
  { size: 'w-20 h-20', pos: 'left-6 top-[140px]', color: 'bg-[radial-gradient(circle_at_35%_35%,_#F0F1F2_0%,_#B0B5B9_80%)]' },
  { size: 'w-32 h-32', pos: '-left-8 top-[40px]', color: 'bg-[radial-gradient(circle_at_35%_35%,_#E0EAF5_0%,_#7599C2_80%)]' },
  { size: 'w-12 h-12', pos: 'left-20 top-[90px]', color: 'bg-[radial-gradient(circle_at_35%_35%,_#FDFBF7_0%,_#EBE3D5_80%)]' },
  
  // Curva superior izquierda
  { size: 'w-28 h-28', pos: 'left-10 -top-[30px]', color: 'bg-[radial-gradient(circle_at_35%_35%,_#F0F1F2_0%,_#B0B5B9_80%)]' },
  { size: 'w-24 h-24', pos: 'left-32 -top-[60px]', color: 'bg-[radial-gradient(circle_at_35%_35%,_#E0EAF5_0%,_#7599C2_80%)]' },
  { size: 'w-16 h-16', pos: 'left-20 -top-[10px]', color: 'bg-[radial-gradient(circle_at_35%_35%,_#FDFBF7_0%,_#EBE3D5_80%)]' },
  
  // Centro
  { size: 'w-36 h-36', pos: 'left-1/3 -translate-x-1/2 -top-[80px]', color: 'bg-[radial-gradient(circle_at_35%_35%,_#E0EAF5_0%,_#7599C2_80%)]' },
  { size: 'w-20 h-20', pos: 'left-[40%] -top-[40px]', color: 'bg-[radial-gradient(circle_at_35%_35%,_#F0F1F2_0%,_#B0B5B9_80%)]' },
  { size: 'w-14 h-14', pos: 'left-[45%] -top-[80px]', color: 'bg-[radial-gradient(circle_at_35%_35%,_#FDFBF7_0%,_#EBE3D5_80%)]' },
  
  // Curva superior derecha
  { size: 'w-28 h-28', pos: 'right-[35%] -top-[70px]', color: 'bg-[radial-gradient(circle_at_35%_35%,_#FDFBF7_0%,_#EBE3D5_80%)]' },
  { size: 'w-32 h-32', pos: 'right-20 -top-[50px]', color: 'bg-[radial-gradient(circle_at_35%_35%,_#E0EAF5_0%,_#7599C2_80%)]' },
  { size: 'w-16 h-16', pos: 'right-32 -top-[20px]', color: 'bg-[radial-gradient(circle_at_35%_35%,_#F0F1F2_0%,_#B0B5B9_80%)]' },
  
  // Lado derecho bajando
  { size: 'w-24 h-24', pos: 'right-6 top-[30px]', color: 'bg-[radial-gradient(circle_at_35%_35%,_#F0F1F2_0%,_#B0B5B9_80%)]' },
  { size: 'w-20 h-20', pos: '-right-4 top-[100px]', color: 'bg-[radial-gradient(circle_at_35%_35%,_#FDFBF7_0%,_#EBE3D5_80%)]' },
  { size: 'w-32 h-32', pos: '-right-10 top-[160px]', color: 'bg-[radial-gradient(circle_at_35%_35%,_#E0EAF5_0%,_#7599C2_80%)]' },
  { size: 'w-16 h-16', pos: 'right-12 top-[200px]', color: 'bg-[radial-gradient(circle_at_35%_35%,_#F0F1F2_0%,_#B0B5B9_80%)]' },
  { size: 'w-24 h-24', pos: 'right-2 top-[250px]', color: 'bg-[radial-gradient(circle_at_35%_35%,_#FDFBF7_0%,_#EBE3D5_80%)]' },
  { size: 'w-36 h-36', pos: '-right-16 top-[320px]', color: 'bg-[radial-gradient(circle_at_35%_35%,_#E0EAF5_0%,_#7599C2_80%)]' },
  { size: 'w-20 h-20', pos: 'right-10 top-[370px]', color: 'bg-[radial-gradient(circle_at_35%_35%,_#F0F1F2_0%,_#B0B5B9_80%)]' },
];

export function BalloonArch() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {BALLOONS.map((b, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: i * 0.05
          }}
          className={`absolute rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.1),_0_10px_15px_rgba(0,0,0,0.1)] ${b.size} ${b.pos} ${b.color}`}
        >
          {/* Highlight (reflejo de luz) para dar más volumen */}
          <div className="absolute top-[15%] left-[15%] w-1/4 h-1/4 bg-white/40 rounded-full blur-[2px]" />
        </motion.div>
      ))}
    </div>
  );
}
