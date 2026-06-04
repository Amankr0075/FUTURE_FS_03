import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiLock, FiUser, FiArrowRight, FiEye, FiEyeOff, FiShield } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [form,     setForm]     = useState({ username: '', password: '' });
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 700));
    if (form.username === 'admin' && form.password === 'royalspice@123') {
      sessionStorage.setItem('adminAuth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid username or password. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #070c14 0%, #0d1526 50%, #0a0f1a 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
      position: 'relative', overflow: 'hidden',
    }}>
      <Helmet>
        <title>Admin Login | Royal Spice Restaurant</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Background orbs */}
      <div style={{ position: 'absolute', top: '10%', left: '15%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}
      >
        {/* Card */}
        <div style={{
          background: 'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
          border: '1px solid rgba(245,158,11,0.15)',
          borderRadius: '1.5rem',
          padding: '2.75rem',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)',
        }}>
          {/* Brand */}
          <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 260 }}
              style={{
                width: 72, height: 72, borderRadius: '1.1rem',
                background: 'linear-gradient(135deg, #F59E0B, #d97706)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.25rem',
                boxShadow: '0 8px 32px rgba(245,158,11,0.4)',
                fontSize: '2rem',
              }}>
              👑
            </motion.div>
            <h1 style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: '1.5rem', margin: '0 0 0.3rem', fontWeight: 700 }}>Admin Portal</h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', margin: 0 }}>Royal Spice Restaurant · Management</p>
          </div>

          {/* Security badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center',
            background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.18)',
            borderRadius: '9999px', padding: '0.35rem 1rem', marginBottom: '1.75rem',
          }}>
            <FiShield size={13} color="#22c55e" />
            <span style={{ color: '#22c55e', fontSize: '0.72rem', fontWeight: 600 }}>Secure Access Only</span>
          </div>

          <form onSubmit={handleSubmit} id="admin-login-form">
            {/* Username */}
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="admin-username" style={{ display: 'block', color: 'rgba(255,255,255,0.65)', fontSize: '0.8rem', marginBottom: '0.45rem', fontWeight: 500 }}>Username</label>
              <div style={{ position: 'relative' }}>
                <FiUser size={15} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#F59E0B', zIndex: 1 }} />
                <input
                  id="admin-username"
                  type="text"
                  value={form.username}
                  onChange={e => { setForm(p => ({ ...p, username: e.target.value })); setError(''); }}
                  placeholder="admin"
                  autoComplete="username"
                  required
                  style={{
                    width: '100%', padding: '0.8rem 1rem 0.8rem 2.75rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.65rem', color: '#fff', fontSize: '0.9rem',
                    outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(245,158,11,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="admin-password" style={{ display: 'block', color: 'rgba(255,255,255,0.65)', fontSize: '0.8rem', marginBottom: '0.45rem', fontWeight: 500 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <FiLock size={15} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#F59E0B', zIndex: 1 }} />
                <input
                  id="admin-password"
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => { setForm(p => ({ ...p, password: e.target.value })); setError(''); }}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                  style={{
                    width: '100%', padding: '0.8rem 3rem 0.8rem 2.75rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.65rem', color: '#fff', fontSize: '0.9rem',
                    outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(245,158,11,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <button type="button" onClick={() => setShowPass(p => !p)}
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', padding: 0 }}>
                  {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '0.5rem', padding: '0.65rem 0.9rem', marginBottom: '1rem', color: '#f87171', fontSize: '0.82rem', textAlign: 'center' }}>
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <button
              id="admin-login-btn" type="submit" disabled={loading}
              style={{
                width: '100%', padding: '0.9rem 1.5rem',
                background: loading ? 'rgba(245,158,11,0.5)' : 'linear-gradient(135deg, #F59E0B, #d97706)',
                border: 'none', borderRadius: '0.65rem', color: '#111827',
                fontWeight: 700, fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(245,158,11,0.35)',
                transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
              }}
            >
              {loading ? (
                <>
                  <div style={{ width: 16, height: 16, border: '2px solid rgba(17,24,39,0.4)', borderTopColor: '#111827', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  Signing in...
                </>
              ) : (
                <>Sign In <FiArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.5rem' }}>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', marginBottom: '0.25rem' }}>Demo Credentials</div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', fontFamily: 'monospace' }}>admin / royalspice@123</div>
          </div>
        </div>
      </motion.div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
