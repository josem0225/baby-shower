'use client';

import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

export function GiftSection() {
  return (
    <section className="py-10 px-4 relative z-10 text-center">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <GlassCard className="p-8 bg-white/60 border border-cloud-100 shadow-sm rounded-3xl" delay={0.1}>
            <div className="flex justify-center mb-4 text-gold-400">
              <Gift size={40} strokeWidth={1.5} />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-cloud-800 mb-4">Un detalle especial</h2>
            <p className="font-sans text-cloud-600 leading-relaxed">
              Tu compañía es el regalo más grande que podemos recibir. 🤍
              <br/><br/>
              Si deseas tener un detalle adicional, las cositas de uso diario como <strong>ropita, pañitos o accesorios</strong> nos vendrían súper bien para esta nueva etapa.
              <br/><br/>
              <span className="text-silver-500 text-sm italic">
                Lo único que te pedimos de todo corazón es evitar los juguetes y caminadores... ¡ya tenemos un batallón entero de esos esperándolo en casa! Mil gracias por entender. 😊
              </span>
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
