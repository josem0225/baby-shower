'use client';

import React, { useState } from 'react';
import { GlassCard } from './ui/GlassCard';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Heart, Loader2 } from 'lucide-react';
import { useGuest } from './Gatekeeper';
import { confirmRsvp } from '@/app/actions/rsvp';

export function RsvpSection() {
  const { phone } = useGuest();
  const [status, setStatus] = useState<'idle' | 'loading' | 'confirmed'>('idle');
  const [error, setError] = useState('');

  const handleConfirm = async (attending: boolean) => {
    setStatus('loading');
    setError('');

    try {
      const result = await confirmRsvp(phone, attending);
      if (result.success) {
        setStatus('confirmed');
      } else {
        setError(result.error || 'Ocurrió un error.');
        setStatus('idle');
      }
    } catch (err) {
      setError('Error de red. Intenta de nuevo.');
      setStatus('idle');
    }
  };

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-10"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-cloud-800 mb-4">Confirma tu Asistencia</h2>
          <p className="font-sans text-silver-500">Haznos saber si nos acompañarás en este día especial.</p>
        </motion.div>

        <GlassCard className="relative overflow-hidden min-h-[200px] flex flex-col justify-center bg-transparent border-none shadow-none">
          <AnimatePresence mode="wait">

            {status === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => handleConfirm(true)} className="flex-1 gap-2 bg-cloud-300 hover:bg-cloud-400 text-cloud-800 py-6 text-lg">
                    <CheckCircle2 size={24} />
                    ¡Sí, ahí estaré!
                  </Button>
                  <Button onClick={() => handleConfirm(false)} variant="secondary" className="flex-1 gap-2 bg-silver-100 text-silver-500 hover:bg-silver-300 py-6 text-lg border-none shadow-sm">
                    <XCircle size={24} />
                    No ire
                  </Button>
                </div>
                {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
              </motion.div>
            )}

            {status === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center gap-4 py-8"
              >
                <Loader2 className="animate-spin text-cloud-400" size={48} />
                <p className="text-silver-500 font-sans animate-pulse">Guardando tu respuesta...</p>
              </motion.div>
            )}

            {status === 'confirmed' && (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="w-20 h-20 bg-cloud-100 text-cloud-400 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Heart size={40} fill="currentColor" />
                </motion.div>
                <h3 className="font-serif text-2xl text-cloud-800 mb-2">¡Gracias por confirmar!</h3>
                <p className="text-silver-500">Hemos guardado tu respuesta exitosamente.</p>
              </motion.div>
            )}

          </AnimatePresence>
        </GlassCard>
      </div>
    </section>
  );
}
