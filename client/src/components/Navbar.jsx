import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';
import { MdRestaurant } from 'react-icons/md';

const links = [
  { to: '/',           label: 'Home' },
  { to: '/about',      label: 'About' },
  { to: '/menu',       label: 'Menu' },
  { to: '/gallery',    label: 'Gallery' },
  { to: '/reservation',label: 'Reserve' },
  { to: '/contact',    label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  const navBg = scrolled
    ? 'rgba(17, 24, 39, 0.97)'
    : 'transparent';

  return (
    <>
      <motion.nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          background: navBg,
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(245,158,11,0.15)' : 'none',
          transition: 'all 0.4s ease',
          padding: '0 1.5rem',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', height: 72 }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 'none' }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'linear-gradient(135deg,#F59E0B,#D97706)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <MdRestaurant size={20} color="#111827" />
            </div>
            <div>
              <div style={{ fontFamily: 'Cinzel, serif', color: '#F59E0B', fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.1 }}>Royal Spice</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Restaurant</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '2rem' }} className="hidden lg:flex">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                style={({ isActive }) => ({
                  color: isActive ? '#F59E0B' : 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  transition: 'color 0.2s',
                  position: 'relative',
                })}
              >
                {({ isActive }) => (
                  <span style={{ position: 'relative' }}>
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        style={{
                          position: 'absolute', bottom: -4, left: 0, right: 0,
                          height: 2, background: '#F59E0B', borderRadius: 2,
                        }}
                      />
                    )}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* CTA + mobile hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 'none' }}>
            <a href="tel:+911234567890" className="hidden lg:flex" style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              color: '#F59E0B', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600,
            }}>
              <FiPhone size={14} /> +91 1234567890
            </a>
            <Link to="/reservation" className="hidden lg:block">
              <button className="btn-gold" style={{ padding: '0.55rem 1.25rem', fontSize: '0.8rem' }}>
                Book Table
              </button>
            </Link>
            <button
              className="lg:hidden"
              onClick={() => setOpen(!open)}
              style={{ background: 'none', border: 'none', color: '#F59E0B', cursor: 'pointer', padding: '0.25rem' }}
            >
              {open ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, width: '75%', maxWidth: 320,
              background: '#111827', zIndex: 200, padding: '5rem 2rem 2rem',
              borderLeft: '1px solid rgba(245,158,11,0.2)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {links.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={() => setOpen(false)}
                  style={({ isActive }) => ({
                    color: isActive ? '#F59E0B' : 'rgba(255,255,255,0.8)',
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    paddingBottom: '1rem',
                  })}
                >
                  {label}
                </NavLink>
              ))}
              <Link to="/reservation" onClick={() => setOpen(false)}>
                <button className="btn-gold" style={{ width: '100%' }}>Book a Table</button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
