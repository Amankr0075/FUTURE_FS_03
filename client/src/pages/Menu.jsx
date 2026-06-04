import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiSearch, FiFilter, FiPlus } from 'react-icons/fi';
import { menuItems as staticMenu, CATEGORIES } from '../data/menu';
import { getMenuItems } from '../services/api';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [items, setItems] = useState(staticMenu);

  // Try to load live items from API; fall back to static data
  useEffect(() => {
    getMenuItems()
      .then(res => {
        if (res.data?.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
          setItems(res.data.data);
        }
      })
      .catch((err) => {
        console.error('Menu API Error:', err);
      });
  }, []);

  const filtered = useMemo(() => {
    return items.filter(item => {
      const matchCat = activeCategory === 'All' || item.category === activeCategory;
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [items, activeCategory, search]);

  return (
    <div className="page-wrapper" style={{ paddingTop: 72 }}>
      <Helmet>
        <title>Menu | Royal Spice Restaurant</title>
        <meta name="description" content="Explore our curated menu of authentic Indian dishes — from smoky tandoori starters to rich curries, aromatic biryanis, and indulgent desserts." />
      </Helmet>

      {/* Page header */}
      <section style={{ background: 'linear-gradient(135deg, #0a0f1a, #111827)', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span style={{ color: '#F59E0B', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Culinary Journey</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(2rem, 5vw, 3.25rem)', color: '#fff', margin: '0.75rem 0' }}>
            Our <span className="gold-gradient">Menu</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Every dish is a story — of spice, tradition, and craft. Explore our full culinary repertoire.
          </p>
        </motion.div>
      </section>

      {/* Search + Filter */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2.5rem 1.5rem 0' }}>
        {/* Search */}
        <div style={{ position: 'relative', maxWidth: 480, margin: '0 auto 2rem' }}>
          <FiSearch size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#F59E0B' }} />
          <input
            className="form-input"
            style={{ paddingLeft: '2.75rem' }}
            type="text"
            placeholder="Search dishes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            id="menu-search"
          />
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`category-badge ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              id={`cat-${cat.toLowerCase().replace(' ', '-')}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu grid */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem 5rem' }}>
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem', padding: '4rem 0' }}>
              No dishes found for "{search}"
            </motion.p>
          ) : (
            <motion.div
              key="grid"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}
            >
              {filtered.map((item, i) => (
                <MenuCard key={item._id || item.id} item={item} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function MenuCard({ item, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ y: -5 }}
      className="glass-card"
      style={{ borderRadius: '1rem', overflow: 'hidden' }}
    >
      <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop'; }}
        />
        {item.isPopular && (
          <span style={{ position: 'absolute', top: 10, right: 10, background: '#F59E0B', color: '#111827', fontSize: '0.68rem', fontWeight: 700, padding: '0.2rem 0.65rem', borderRadius: 9999 }}>
            🔥 Popular
          </span>
        )}
        <span style={{ position: 'absolute', top: 10, left: 10, width: 18, height: 18, border: `2px solid ${item.isVeg ? '#22c55e' : '#ef4444'}`, borderRadius: 2, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: item.isVeg ? '#22c55e' : '#ef4444' }} />
        </span>
      </div>

      <div style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', color: '#fff', fontWeight: 600, lineHeight: 1.3 }}>{item.name}</h3>
          <span style={{ color: '#F59E0B', fontWeight: 700, fontSize: '1.05rem', whiteSpace: 'nowrap' }}>₹{item.price}</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', lineHeight: 1.65, marginBottom: '1rem' }}>
          {item.description?.substring(0, 100)}...
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="category-badge" style={{ fontSize: '0.72rem', padding: '0.2rem 0.65rem', cursor: 'default' }}>{item.category}</span>
          {!item.isAvailable && (
            <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>Unavailable</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
