import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiAward, FiHeart, FiStar, FiUsers } from 'react-icons/fi';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const chefs = [
  {
    name: 'Chef Arjun Kapoor',
    title: 'Executive Head Chef',
    experience: '18 Years Experience',
    specialty: 'North Indian Curries & Tandoor',
    desc: 'A culinary maestro trained at the Oberoi Centre of Learning and Development. Chef Arjun brings the soul of Delhi\'s royal kitchens to every plate.',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop',
  },
  {
    name: 'Chef Meera Nair',
    title: 'Pastry & Dessert Chef',
    experience: '12 Years Experience',
    specialty: 'Indian Sweets & Fusion Desserts',
    desc: 'Chef Meera transforms traditional mithai into works of art. Her Gulab Jamun and Rasmalai have earned a cult following among dessert lovers.',
    image: '/images/chef-meera-nair.png',
  },
  {
    name: 'Chef Rahul Verma',
    title: 'Biryani & Rice Specialist',
    experience: '14 Years Experience',
    specialty: 'Hyderabadi & Lucknowi Biryani',
    desc: 'Chef Rahul learned the art of dum biryani from the royal kitchens of Lucknow. His biryanis are fragrant, layered perfections of spice and grain.',
    image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&auto=format&fit=crop',
  },
];

const milestones = [
  { year: '2009', event: 'Royal Spice Founded', desc: 'Opened our first 40-seat restaurant in Connaught Place, New Delhi.' },
  { year: '2012', event: 'First Award',         desc: 'Won "Best Indian Restaurant in Delhi" by the Times Food Guide.' },
  { year: '2016', event: 'Expansion',           desc: 'Extended to a 150-seat premium dining hall with private dining suites.' },
  { year: '2019', event: 'National Recognition', desc: 'Featured in Condé Nast Traveller\'s "Top 50 Restaurants in India".' },
  { year: '2023', event: '15 Years of Flavour', desc: 'Serving over 2,400 happy guests each month with the same passion.' },
];

export default function About() {
  return (
    <div className="page-wrapper" style={{ paddingTop: 72 }}>
      <Helmet>
        <title>About Us | Royal Spice Restaurant</title>
        <meta name="description" content="Learn the story behind Royal Spice Restaurant — 15 years of authentic Indian fine dining, award-winning chefs, and a passion for flavour." />
      </Helmet>

      {/* ── Page Hero ─────────────────────────────────────────── */}
      <section style={{ position: 'relative', padding: '6rem 1.5rem', background: 'linear-gradient(135deg, #0a0f1a 0%, #111827 100%)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span style={{ color: '#F59E0B', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Our Story</span>
            <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', margin: '1rem 0', fontWeight: 700 }}>
              The <span className="gold-gradient">Royal Legacy</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.8 }}>
              A journey of flavour, passion, and tradition that began with one dream: to bring the grandeur of India's royal kitchens to every table.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Story + Image ─────────────────────────────────────── */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <motion.div {...fadeUp}>
            <span style={{ color: '#F59E0B', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Since 2009</span>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)', color: '#fff', margin: '0.75rem 0 1.5rem' }}>Our Restaurant Story</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.9, marginBottom: '1.25rem' }}>
              Royal Spice was born in 2009 from the vision of Chef Arjun Kapoor and entrepreneur Vikram Singh — two individuals bound by an unwavering love for authentic Indian cuisine. Starting with a modest 40-seat restaurant in the heart of Connaught Place, New Delhi, we set out to recreate the grandeur of Mughal royal kitchens.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.9, marginBottom: '2rem' }}>
              What began as a neighbourhood favourite rapidly earned recognition for its uncompromising quality, meticulous recipes, and warm hospitality. Today, 15 years on, Royal Spice seats 150 guests across elegant dining rooms and private suites, earning national acclaim and thousands of loyal patrons.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              {[['2,400+', 'Monthly Guests'], ['15+', 'Years of Taste'], ['30+', 'Menu Items'], ['4.9★', 'Rating']].map(([val, lbl]) => (
                <div key={lbl} className="glass-card" style={{ padding: '1.25rem', borderRadius: '0.75rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Cinzel, serif', fontSize: '1.6rem', color: '#F59E0B', fontWeight: 700 }}>{val}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginTop: 4 }}>{lbl}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp} style={{ position: 'relative' }}>
            <div style={{ borderRadius: '1rem', overflow: 'hidden', aspectRatio: '4/3' }}>
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop"
                alt="Royal Spice Restaurant dining area"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="glass-card" style={{ position: 'absolute', bottom: -20, left: -20, padding: '1.25rem 1.5rem', borderRadius: '0.75rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <FiAward size={28} color="#F59E0B" />
              <div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>Award Winning</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>Times Food Guide 2012–2024</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Mission & Vision ──────────────────────────────────── */}
      <section style={{ background: '#0a0f1a', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { icon: FiHeart,  title: 'Our Mission',  color: '#F59E0B', text: 'To deliver an extraordinary dining experience by combining time-honoured Indian recipes with exceptional service, creating moments that guests cherish long after they leave our table.' },
              { icon: FiStar,   title: 'Our Vision',   color: '#F59E0B', text: 'To become the most-loved and most-trusted Indian restaurant in the city — a place where families celebrate milestones, couples create memories, and every guest leaves feeling like royalty.' },
              { icon: FiUsers,  title: 'Our Values',   color: '#F59E0B', text: 'Authenticity, quality, and warmth guide every decision we make — from sourcing ingredients to training our team, ensuring every plate we serve honours the richness of Indian culinary heritage.' },
            ].map(({ icon: Icon, title, text, color }, i) => (
              <motion.div key={title} {...fadeUp} transition={{ delay: i * 0.15, duration: 0.6 }}
                className="glass-card" style={{ padding: '2.5rem', borderRadius: '1rem' }}>
                <div style={{ width: 56, height: 56, borderRadius: '0.75rem', background: 'rgba(245,158,11,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Icon size={26} color={color} />
                </div>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.2rem', color: '#fff', marginBottom: '1rem' }}>{title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '0.9rem' }}>{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────── */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '5rem 1.5rem' }}>
        <motion.div {...fadeUp} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', color: '#fff' }}>Our Journey</h2>
          <div className="section-underline" style={{ margin: '1rem auto 0' }} />
        </motion.div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'rgba(245,158,11,0.2)', transform: 'translateX(-50%)' }} />
          {milestones.map(({ year, event, desc }, i) => (
            <motion.div key={year} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start', marginBottom: '2.5rem', position: 'relative' }}>
              {/* Dot */}
              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 12, height: 12, borderRadius: '50%', background: '#F59E0B', border: '3px solid #111827', zIndex: 2 }} />
              <div className="glass-card" style={{ padding: '1.25rem 1.5rem', borderRadius: '0.75rem', maxWidth: '42%', [i % 2 === 0 ? 'marginRight' : 'marginLeft']: '3%' }}>
                <div style={{ color: '#F59E0B', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>{year}</div>
                <div style={{ color: '#fff', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem' }}>{event}</div>
                <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', lineHeight: 1.6 }}>{desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Chefs ─────────────────────────────────────────────── */}
      <section style={{ background: '#0a0f1a', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div {...fadeUp} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ color: '#F59E0B', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>The Team</span>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', margin: '0.75rem 0', color: '#fff' }}>Meet Our Master Chefs</h2>
            <div className="section-underline" style={{ margin: '0 auto' }} />
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {chefs.map((chef, i) => (
              <motion.div key={chef.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6 }} className="glass-card" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
                <div style={{ height: 280, overflow: 'hidden' }}>
                  <img src={chef.image} alt={chef.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ color: '#F59E0B', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{chef.experience}</div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', color: '#fff', marginBottom: '0.25rem' }}>{chef.name}</h3>
                  <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{chef.title}</div>
                  <div style={{ display: 'inline-block', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#F59E0B', padding: '0.2rem 0.75rem', borderRadius: 9999, fontSize: '0.75rem', marginBottom: '1rem' }}>
                    {chef.specialty}
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', lineHeight: 1.7 }}>{chef.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
