import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', background: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
      <Helmet><title>404 Not Found | Royal Spice Restaurant</title></Helmet>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(5rem, 20vw, 10rem)', color: 'rgba(245,158,11,0.15)', lineHeight: 1, fontWeight: 700, marginBottom: '-1rem' }}>404</div>
        <h1 style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>Page Not Found</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '2.5rem', maxWidth: 380, margin: '0 auto 2.5rem' }}>
          The page you're looking for doesn't exist. Perhaps head back to our homepage for a delicious experience.
        </p>
        <Link to="/">
          <button className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiArrowLeft /> Back to Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
