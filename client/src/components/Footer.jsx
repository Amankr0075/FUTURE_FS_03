import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiFacebook, FiTwitter, FiYoutube } from 'react-icons/fi';
import { MdRestaurant } from 'react-icons/md';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: '#0a0f1a', borderTop: '1px solid rgba(245,158,11,0.15)', paddingTop: '4rem' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '2.5rem', marginBottom: '3rem' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#F59E0B,#D97706)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MdRestaurant size={20} color="#111827" />
              </div>
              <div>
                <div style={{ fontFamily: 'Cinzel, serif', color: '#F59E0B', fontSize: '1rem', fontWeight: 700 }}>Royal Spice</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Restaurant</div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Experience the finest Indian cuisine crafted with passion, tradition, and the freshest ingredients. A dining journey like no other.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { icon: FiInstagram, href: '#', label: 'Instagram' },
                { icon: FiFacebook,  href: '#', label: 'Facebook' },
                { icon: FiTwitter,   href: '#', label: 'Twitter' },
                { icon: FiYoutube,   href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#F59E0B', textDecoration: 'none', transition: 'all 0.2s',
                }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 style={{ fontFamily: 'Cinzel, serif', color: '#F59E0B', fontSize: '0.95rem', marginBottom: '1.25rem', fontWeight: 600 }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[['/', 'Home'], ['/about', 'About Us'], ['/menu', 'Our Menu'], ['/gallery', 'Gallery'], ['/reservation', 'Reserve Table'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#F59E0B'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 style={{ fontFamily: 'Cinzel, serif', color: '#F59E0B', fontSize: '0.95rem', marginBottom: '1.25rem', fontWeight: 600 }}>Working Hours</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                ['Mon – Thu', '12:00 PM – 10:30 PM'],
                ['Fri – Sat',  '12:00 PM – 11:30 PM'],
                ['Sunday',    '11:00 AM – 10:00 PM'],
              ].map(([day, hours]) => (
                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'rgba(255,255,255,0.55)' }}>{day}</span>
                  <span style={{ color: '#F59E0B', fontWeight: 500 }}>{hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontFamily: 'Cinzel, serif', color: '#F59E0B', fontSize: '0.95rem', marginBottom: '1.25rem', fontWeight: 600 }}>Contact Us</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { icon: FiMapPin, text: '12, Spice Lane, Connaught Place, New Delhi – 110001' },
                { icon: FiPhone,  text: '+91 1234567890' },
                { icon: FiMail,   text: 'info@royalspice.in' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <Icon size={15} color="#F59E0B" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', lineHeight: 1.5 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(245,158,11,0.1)', padding: '1.25rem 0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>
            © {year} Royal Spice Restaurant. All rights reserved.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>
            Crafted with ❤️ in India
          </p>
        </div>
      </div>
    </footer>
  );
}
