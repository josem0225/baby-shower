'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from './Button';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
}

export function GlassCard({ className, children, delay = 0, ...props }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={cn("glass-card p-6 md:p-8", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
