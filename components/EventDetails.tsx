'use client';

import React from 'react';
import { GlassCard } from './ui/GlassCard';
import { CalendarHeart, MapPin, Clock } from 'lucide-react';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';

export function EventDetails() {
  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-cloud-800 mb-4">Dónde y Cuándo</h2>
          <div className="w-16 h-1 bg-gold-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          <GlassCard delay={0.1} className="flex flex-col items-center text-center bg-transparent border-none shadow-none">
            <div className="w-12 h-12 bg-cloud-50 rounded-full flex items-center justify-center mb-4 text-cloud-400">
              <CalendarHeart size={24} strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-xl text-cloud-800 mb-2">Fecha</h3>
            <p className="font-sans text-silver-500">Sábado, 26 de Septiembre</p>
            <p className="font-sans text-silver-500 text-sm mt-1">2026</p>
          </GlassCard>

          <GlassCard delay={0.2} className="flex flex-col items-center text-center bg-transparent border-none shadow-none">
            <div className="w-12 h-12 bg-cloud-50 rounded-full flex items-center justify-center mb-4 text-cloud-400">
              <Clock size={24} strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-xl text-cloud-800 mb-2">Hora</h3>
            <p className="font-sans text-silver-500">1:00 PM</p>
            <p className="font-sans text-silver-500 text-sm mt-1">Llegar puntual</p>
          </GlassCard>

          <GlassCard delay={0.3} className="flex flex-col items-center text-center bg-transparent border-none shadow-none">
            <div className="w-12 h-12 bg-cloud-50 rounded-full flex items-center justify-center mb-4 text-cloud-400">
              <MapPin size={24} strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-xl text-cloud-800 mb-2">Lugar</h3>
            <p className="font-sans text-silver-500">Conjunto Residencial Torres de Hayuelos</p>
            <p className="font-sans text-silver-500 text-sm mt-1 mb-4">Cra. 92 #17B-35, Bogotá</p>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Conjunto+Residencial+Torres+de+Hayuelos+Bogota" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button size="sm" variant="outline" className="w-full text-gold-500 border-gold-300 hover:bg-gold-50">
                Cómo llegar
              </Button>
            </a>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
