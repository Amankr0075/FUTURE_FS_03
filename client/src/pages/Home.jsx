import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiStar, FiUsers, FiAward, FiClock } from 'react-icons/fi';
import { MdLocalFireDepartment, MdOutlineEco, MdDeliveryDining } from 'react-icons/md';
import { GiChefToque } from 'react-icons/gi';
import { featuredDishes } from '../data/menu';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const testimonials = [
  { name: 'Priya Sharma', role: 'Food Blogger', text: 'Absolutely phenomenal! The Butter Chicken here is hands-down the best I\'ve ever had. The ambience is royal — perfectly lives up to its name.', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b372?w=100&auto=format&fit=crop' },
  { name: 'Rahul Mehta', role: 'Regular Customer', text: 'We celebrate every anniversary here. The staff treats you like royalty and the food is consistently outstanding. The Special Thali is a must-try!', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop' },
  { name: 'Ananya Singh', role: 'Corporate Client', text: 'Hosted a business dinner for 20 people and they handled everything perfectly. The private dining setup was magnificent and the food was impeccable.', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop' },
  { name: 'Vikram Patel', role: 'Zomato Top Reviewer', text: 'Five stars without hesitation. The Seekh Kebab is smoky perfection, the biryanis are aromatic, and the desserts are divine. A true gem!', rating: 5, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop' },
];

const whyUs = [
  { icon: MdOutlineEco,       title: 'Farm-Fresh Ingredients', desc: 'We source only the finest seasonal produce directly from local farms. No compromise on freshness.' },
  { icon: GiChefToque,        title: 'Master Chefs',           desc: 'Our culinary team has over 30+ years of combined experience crafting authentic Indian recipes.' },
  { icon: FiClock,            title: 'Swift Service',          desc: 'We respect your time. Expect prompt, courteous service without sacrificing quality.' },
  { icon: MdLocalFireDepartment, title: 'Live Tandoor',        desc: 'Experience the magic of live tandoor cooking — the authentic smokiness in every bite.' },
];

export default function Home() {
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Royal Spice Restaurant | Authentic Indian Fine Dining</title>
        <meta name="description" content="Experience authentic Indian flavors at Royal Spice Restaurant. Reserve your table for an unforgettable fine dining experience." />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 600, display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: '72px' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="/images/hero_banner.png" alt="Royal Spice Restaurant" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div className="hero-overlay" style={{ position: 'absolute', inset: 0 }} />
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, width: '100%', margin: '0 auto', padding: '0 1.5rem' }}>
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }} style={{ maxWidth: 680 }}>
            <motion.span
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              style={{ display: 'inline-block', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.4)', color: '#F59E0B', padding: '0.4rem 1.25rem', borderRadius: 9999, fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}
            >
              ✦ Award-Winning Fine Dining
            </motion.span>

            <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.5rem', color: '#fff' }}>
              Experience Authentic<br />
              <span className="gold-gradient">Flavors Like Never</span><br />
              Before
            </h1>

            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: 520 }}>
              Journey through the rich tapestry of Indian cuisine — from the smoky tandoor to silky curries — in an atmosphere of understated elegance.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/reservation">
                <button className="btn-gold" style={{ fontSize: '0.95rem', padding: '0.9rem 2.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Reserve a Table <FiArrowRight />
                </button>
              </Link>
              <Link to="/menu">
                <button className="btn-outline" style={{ fontSize: '0.95rem', padding: '0.9rem 2.25rem' }}>
                  Explore Menu
                </button>
              </Link>
            </div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              style={{ display: 'flex', gap: '2.5rem', marginTop: '3rem', flexWrap: 'wrap' }}>
              {[['2,400+', 'Happy Guests'], ['15+', 'Years of Taste'], ['4.9★', 'Google Rating']].map(([val, lbl]) => (
                <div key={lbl}>
                  <div style={{ fontFamily: 'Cinzel, serif', fontSize: '1.5rem', color: '#F59E0B', fontWeight: 700 }}>{val}</div>
                  <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem' }}>{lbl}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
        >
          <div style={{ width: 24, height: 40, border: '2px solid rgba(245,158,11,0.5)', borderRadius: 12, display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ width: 4, height: 8, background: '#F59E0B', borderRadius: 2 }} />
          </div>
        </motion.div>
      </section>

      {/* ── Featured Dishes ──────────────────────────────────── */}
      <section style={{ padding: '6rem 1.5rem', maxWidth: 1280, margin: '0 auto' }}>
        <motion.div {...fadeUp} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ color: '#F59E0B', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Our Signature</span>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', margin: '0.75rem 0', color: '#fff' }}>Featured Dishes</h2>
          <div className="section-underline" style={{ margin: '0 auto 1rem' }} />
          <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Handpicked favourites by our guests — masterpieces from our kitchen to your table.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {featuredDishes.map((dish, i) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="glass-card"
              style={{ borderRadius: '1rem', overflow: 'hidden', cursor: 'pointer' }}
            >
              <div style={{ position: 'relative', overflow: 'hidden', height: 220 }}>
                <img src={dish.image} alt={dish.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
                {dish.isPopular && (
                  <div style={{ position: 'absolute', top: 12, right: 12, background: '#F59E0B', color: '#111827', padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em' }}>
                    🔥 Popular
                  </div>
                )}
                {dish.isVeg && (
                  <div style={{ position: 'absolute', top: 12, left: 12, width: 20, height: 20, border: '2px solid #22c55e', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
                  </div>
                )}
              </div>
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: '#fff', fontWeight: 600 }}>{dish.name}</h3>
                  <span style={{ color: '#F59E0B', fontWeight: 700, fontSize: '1.1rem', whiteSpace: 'nowrap', marginLeft: '0.5rem' }}>₹{dish.price}</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem' }}>{dish.description.substring(0, 90)}...</p>
                <span className="category-badge">{dish.category}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/menu">
            <button className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              View Full Menu <FiArrowRight />
            </button>
          </Link>
        </motion.div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────── */}
      <section style={{ background: '#0a0f1a', padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div {...fadeUp} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ color: '#F59E0B', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Our Promise</span>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', margin: '0.75rem 0', color: '#fff' }}>Why Choose Us</h2>
            <div className="section-underline" style={{ margin: '0 auto' }} />
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {whyUs.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                whileHover={{ y: -4 }}
                className="glass-card"
                style={{ padding: '2rem', borderRadius: '1rem', textAlign: 'center' }}
              >
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                  <Icon size={28} color="#F59E0B" />
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: '#fff', marginBottom: '0.75rem', fontWeight: 600 }}>{title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', lineHeight: 1.7 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <section style={{ padding: '6rem 1.5rem', maxWidth: 1280, margin: '0 auto' }}>
        <motion.div {...fadeUp} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ color: '#F59E0B', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Reviews</span>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', margin: '0.75rem 0', color: '#fff' }}>What Our Guests Say</h2>
          <div className="section-underline" style={{ margin: '0 auto' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card"
              style={{ padding: '1.75rem', borderRadius: '1rem' }}
            >
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                {[...Array(t.rating)].map((_, j) => <FiStar key={j} size={14} fill="#F59E0B" color="#F59E0B" />)}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.25rem', fontStyle: 'italic' }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img src={t.avatar} alt={t.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(245,158,11,0.4)' }} />
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
                  <div style={{ color: '#F59E0B', fontSize: '0.75rem' }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem', background: 'linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(217,119,6,0.06) 100%)', borderTop: '1px solid rgba(245,158,11,0.15)', borderBottom: '1px solid rgba(245,158,11,0.15)' }}>
        <motion.div {...fadeUp} style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#fff', marginBottom: '1rem' }}>
            Book Your Table <span className="gold-gradient">Today</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Whether it's an intimate dinner for two or a grand celebration, we'll make it unforgettable. Reservations recommended.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/reservation">
              <button className="btn-gold" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>Reserve Now</button>
            </Link>
            <a href="tel:+911234567890">
              <button className="btn-outline" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>Call Us</button>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
