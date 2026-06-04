import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#0a0f1a',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999,
    }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        style={{
          width: 48, height: 48,
          border: '3px solid rgba(245,158,11,0.2)',
          borderTopColor: '#F59E0B',
          borderRadius: '50%',
          marginBottom: '1rem',
        }}
      />
      <p style={{ fontFamily: 'Cinzel, serif', color: '#F59E0B', fontSize: '1rem', letterSpacing: '0.1em' }}>Royal Spice</p>
    </div>
  );
}
