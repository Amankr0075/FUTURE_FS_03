import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome, FiCalendar, FiMail, FiMenu as FiMenuIcon,
  FiLogOut, FiX, FiUsers, FiChevronRight,
} from 'react-icons/fi';
import { MdRestaurantMenu } from 'react-icons/md';

/* ── constants ─────────────────────────────────────────────── */
const SIDEBAR_W = 260;
const BREAKPOINT = 1024;

const navItems = [
  { icon: FiHome,           label: 'Dashboard',    section: 'dashboard',    badge: null },
  { icon: FiCalendar,       label: 'Reservations', section: 'reservations', badge: null },
  { icon: FiMail,           label: 'Inquiries',    section: 'contacts',     badge: null },
  { icon: MdRestaurantMenu, label: 'Menu Items',   section: 'menu',         badge: null },
  { icon: FiUsers,          label: 'Staff',        section: 'staff',        badge: null },
];

/* ═══════════════════════════════════════════════════════════ */
export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen,    setSidebarOpen]    = useState(false);
  const [activeSection,  setActiveSection]  = useState('dashboard');
  const [isDesktop,      setIsDesktop]      = useState(window.innerWidth >= BREAKPOINT);
  const [hoveredNav,     setHoveredNav]     = useState(null);

  /* ── responsive ── */
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= BREAKPOINT);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ── auth guard ── */
  useEffect(() => {
    if (!sessionStorage.getItem('adminAuth')) navigate('/admin/login');
  }, [navigate]);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('adminAuth');
    navigate('/admin/login');
  }, [navigate]);

  const navTo = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  /* sidebar is always visible on desktop, toggle on mobile */
  const showSidebar = isDesktop || sidebarOpen;

  const sectionLabel = navItems.find(n => n.section === activeSection)?.label || 'Dashboard';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #070c14 0%, #0d1526 100%)', fontFamily: 'Inter, sans-serif' }}>

      {/* ── Mobile backdrop ── */}
      <AnimatePresence>
        {sidebarOpen && !isDesktop && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 48, backdropFilter: 'blur(4px)' }}
          />
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════ SIDEBAR ══ */}
      <AnimatePresence initial={false}>
        {showSidebar && (
          <motion.aside
            key="sidebar"
            initial={isDesktop ? false : { x: -SIDEBAR_W }}
            animate={{ x: 0 }}
            exit={{ x: -SIDEBAR_W }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              width: SIDEBAR_W,
              minHeight: '100vh',
              position: 'fixed',
              top: 0, left: 0,
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              background: 'linear-gradient(180deg, #111827 0%, #0f172a 100%)',
              borderRight: '1px solid rgba(245,158,11,0.12)',
              boxShadow: isDesktop ? '4px 0 24px rgba(0,0,0,0.4)' : '8px 0 40px rgba(0,0,0,0.6)',
            }}
          >
            {/* ── Brand logo ── */}
            <div style={{
              padding: '1.5rem 1.25rem',
              borderBottom: '1px solid rgba(245,158,11,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                {/* Crown icon */}
                <div style={{
                  width: 38, height: 38, borderRadius: '0.6rem',
                  background: 'linear-gradient(135deg, #F59E0B, #d97706)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(245,158,11,0.35)',
                  fontSize: '1.2rem',
                }}>👑</div>
                <div>
                  <div style={{ fontFamily: 'Cinzel, serif', color: '#F59E0B', fontSize: '1rem', fontWeight: 700, lineHeight: 1.1 }}>Royal Spice</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.68rem', letterSpacing: '0.05em', marginTop: 1 }}>ADMIN PANEL</div>
                </div>
              </div>
              {!isDesktop && (
                <button onClick={() => setSidebarOpen(false)}
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af', cursor: 'pointer', borderRadius: '0.4rem', padding: '0.35rem', display: 'flex' }}>
                  <FiX size={16} />
                </button>
              )}
            </div>

            {/* ── Admin info ── */}
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{
                background: 'rgba(245,158,11,0.06)',
                border: '1px solid rgba(245,158,11,0.12)',
                borderRadius: '0.65rem',
                padding: '0.75rem 1rem',
                display: 'flex', alignItems: 'center', gap: '0.65rem',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #F59E0B, #ef4444)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.85rem', fontWeight: 700, color: '#fff', flexShrink: 0,
                }}>A</div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.82rem' }}>Administrator</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.15rem' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                    <span style={{ color: '#22c55e', fontSize: '0.68rem', fontWeight: 500 }}>Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Nav items ── */}
            <nav style={{ flex: 1, padding: '0.75rem 0.75rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.5rem 0.75rem 0.35rem' }}>
                Navigation
              </div>
              {navItems.map(({ icon: Icon, label, section }) => {
                const isActive = activeSection === section;
                return (
                  <button
                    key={section}
                    onClick={() => navTo(section)}
                    onMouseEnter={() => setHoveredNav(section)}
                    onMouseLeave={() => setHoveredNav(null)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                      padding: '0.7rem 0.85rem', background: 'none', border: 'none', cursor: 'pointer',
                      borderRadius: '0.6rem', textAlign: 'left',
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(245,158,11,0.08))'
                        : hoveredNav === section
                          ? 'rgba(255,255,255,0.04)'
                          : 'transparent',
                      color: isActive ? '#F59E0B' : 'rgba(255,255,255,0.6)',
                      fontSize: '0.875rem', fontFamily: 'Inter, sans-serif',
                      transition: 'all 0.18s',
                      position: 'relative',
                      boxShadow: isActive ? 'inset 0 0 0 1px rgba(245,158,11,0.2)' : 'none',
                    }}
                  >
                    {/* Active indicator bar */}
                    {isActive && (
                      <div style={{
                        position: 'absolute', left: 0, top: '20%', bottom: '20%',
                        width: 3, borderRadius: '0 2px 2px 0',
                        background: 'linear-gradient(180deg, #F59E0B, #d97706)',
                      }} />
                    )}
                    <div style={{
                      width: 32, height: 32, borderRadius: '0.45rem', flexShrink: 0,
                      background: isActive ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.05)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.18s',
                    }}>
                      <Icon size={16} />
                    </div>
                    <span style={{ fontWeight: isActive ? 600 : 400, flex: 1 }}>{label}</span>
                    {isActive && <FiChevronRight size={14} style={{ opacity: 0.6 }} />}
                  </button>
                );
              })}
            </nav>

            {/* ── Bottom: version + logout ── */}
            <div style={{ padding: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <button
                onClick={handleLogout}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.7rem 0.85rem',
                  background: 'rgba(239,68,68,0.06)',
                  border: '1px solid rgba(239,68,68,0.18)',
                  borderRadius: '0.6rem', color: '#f87171', cursor: 'pointer',
                  fontSize: '0.875rem', fontFamily: 'Inter, sans-serif', transition: 'all 0.18s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.14)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.06)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.18)'; }}
              >
                <div style={{ width: 32, height: 32, borderRadius: '0.45rem', background: 'rgba(239,68,68,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FiLogOut size={15} />
                </div>
                <span style={{ fontWeight: 500 }}>Logout</span>
              </button>
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.18)', fontSize: '0.62rem', marginTop: '0.6rem' }}>
                Royal Spice Admin v2.0
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════ MAIN AREA ══ */}
      <div style={{
        flex: 1,
        /* KEY FIX: always push content to the right of sidebar on desktop */
        marginLeft: isDesktop ? SIDEBAR_W : 0,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        transition: 'margin-left 0.3s',
      }}>

        {/* ── Top Header Bar ── */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 30,
          background: 'rgba(13,21,38,0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(245,158,11,0.1)',
          padding: '0 1.5rem',
          height: 62,
          display: 'flex', alignItems: 'center', gap: '1rem',
          boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
        }}>
          {/* Mobile hamburger */}
          {!isDesktop && (
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)',
                color: '#F59E0B', cursor: 'pointer', borderRadius: '0.45rem',
                padding: '0.45rem', display: 'flex', flexShrink: 0,
              }}
            >
              <FiMenuIcon size={20} />
            </button>
          )}

          {/* Breadcrumb */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>Admin</span>
            <FiChevronRight size={13} style={{ color: 'rgba(255,255,255,0.25)' }} />
            <span style={{ color: '#F59E0B', fontSize: '0.85rem', fontWeight: 600 }}>{sectionLabel}</span>
          </div>

          {/* Right side status + time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'none', alignItems: 'center', gap: '0.5rem', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '9999px', padding: '0.3rem 0.75rem' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
              <span style={{ color: '#22c55e', fontSize: '0.75rem', fontWeight: 500 }}>Online</span>
            </div>
            <LiveClock />
          </div>
        </header>

        {/* ── Page content ── */}
        <main style={{ flex: 1, padding: '1.75rem', overflowX: 'hidden' }}>
          <Outlet context={{ activeSection, setActiveSection }} />
        </main>

        {/* ── Footer ── */}
        <footer style={{
          padding: '0.75rem 1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          color: 'rgba(255,255,255,0.2)', fontSize: '0.72rem',
        }}>
          <span>© 2025 Royal Spice Restaurant — Admin Panel</span>
          <span>All rights reserved</span>
        </footer>
      </div>
    </div>
  );
}

/* ── Live clock component ── */
function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{
      background: 'rgba(245,158,11,0.07)',
      border: '1px solid rgba(245,158,11,0.15)',
      borderRadius: '0.5rem', padding: '0.3rem 0.75rem',
      color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontVariantNumeric: 'tabular-nums',
    }}>
      {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
    </div>
  );
}
