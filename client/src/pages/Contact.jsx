import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiPhone, FiMail, FiMapPin, FiClock, FiUser, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { submitContact } from '../services/api';

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('loading');
    try {
      await submitContact(form);
      setStatus('success');
      setForm(initialForm);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="page-wrapper" style={{ paddingTop: 72 }}>
      <Helmet>
        <title>Contact Us | Royal Spice Restaurant</title>
        <meta name="description" content="Get in touch with Royal Spice Restaurant. Call us, email, or visit us in Connaught Place, New Delhi. We'd love to hear from you!" />
      </Helmet>

      {/* Page header */}
      <section style={{ background: 'linear-gradient(135deg, #0a0f1a, #111827)', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <span style={{ color: '#F59E0B', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Get In Touch</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(2rem, 5vw, 3.25rem)', color: '#fff', margin: '0.75rem 0' }}>
            Contact <span className="gold-gradient">Us</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Have a question, feedback, or want to plan a special event? We're here to help.
          </p>
        </motion.div>
      </section>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 1.5rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>

        {/* Contact info */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <h2 style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: '1.4rem', marginBottom: '2rem' }}>Reach Us</h2>

          {[
            { icon: FiMapPin, title: 'Address', lines: ['12, Spice Lane, Connaught Place,', 'New Delhi – 110001, India'] },
            { icon: FiPhone, title: 'Phone', lines: ['+91 0000000000', '+91 11 4567 8901'] },
            { icon: FiMail, title: 'Email', lines: ['info@royalspice.in', 'reservations@royalspice.in'] },
            { icon: FiClock, title: 'Hours', lines: ['Mon–Thu: 12 PM – 10:30 PM', 'Fri–Sat: 12 PM – 11:30 PM', 'Sunday: 11 AM – 10 PM'] },
          ].map(({ icon: Icon, title, lines }) => (
            <div key={title} className="glass-card" style={{ padding: '1.25rem 1.5rem', borderRadius: '0.75rem', marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: '0.5rem', background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={20} color="#F59E0B" />
              </div>
              <div>
                <div style={{ color: '#F59E0B', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>{title}</div>
                {lines.map(l => <div key={l} style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', lineHeight: 1.7 }}>{l}</div>)}
              </div>
            </div>
          ))}

          {/* Call + WhatsApp CTAs */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <a href="tel:+910000000000" style={{ flex: 1 }}>
              <button className="btn-gold" style={{ width: '100%', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <FiPhone size={16} /> Call Now
              </button>
            </a>
            <a href="https://wa.me/0000000000" target="_blank" rel="noopener noreferrer" style={{ flex: 1 }}>
              <button className="btn-outline" style={{ width: '100%', padding: '0.75rem', borderColor: '#25D366', color: '#25D366' }}>
                WhatsApp
              </button>
            </a>
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '1.25rem' }}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <FiCheckCircle size={52} color="#22c55e" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontFamily: 'Cinzel, serif', color: '#fff', marginBottom: '0.75rem' }}>Message Sent!</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem' }}>We'll get back to you within 24 hours.</p>
                <button className="btn-gold" onClick={() => setStatus('idle')}>Send Another</button>
              </div>
            ) : (
              <>
                <h2 style={{ fontFamily: 'Cinzel, serif', color: '#F59E0B', fontSize: '1.2rem', marginBottom: '2rem' }}>Send a Message</h2>
                <form onSubmit={handleSubmit} id="contact-form" noValidate>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <CField label="Your Name" name="name" type="text" form={form} errors={errors} onChange={handleChange} placeholder="Raj Sharma" />
                    <CField label="Email" name="email" type="email" form={form} errors={errors} onChange={handleChange} placeholder="raj@email.com" />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <CField label="Subject" name="subject" type="text" form={form} errors={errors} onChange={handleChange} placeholder="Event booking, feedback..." />
                  </div>
                  <div style={{ marginBottom: '1.75rem' }}>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
                    <textarea id="contact-message" name="message" rows={5} className="form-input" value={form.message} onChange={handleChange}
                      placeholder="Tell us what you're looking for..." style={{ resize: 'vertical', borderColor: errors.message ? '#ef4444' : undefined }} />
                    {errors.message && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.3rem' }}>{errors.message}</p>}
                  </div>

                  {status === 'error' && (
                    <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>Failed to send. Please try again.</p>
                  )}

                  <button id="submit-contact" type="submit" className="btn-gold" style={{ width: '100%', padding: '1rem' }} disabled={status === 'loading'}>
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Google Maps embed */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem 5rem' }}>
        <div style={{ borderRadius: '1rem', overflow: 'hidden', border: '1px solid rgba(245,158,11,0.2)', height: 350 }}>
          <iframe
            title="Royal Spice Restaurant Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9139671083513!2d77.21955611508271!3d28.631519982415703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1622000000000!5m2!1sen!2sin"
            width="100%" height="100%" style={{ border: 0 }}
            allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}

function CField({ label, name, type, form, errors, onChange, placeholder }) {
  return (
    <div>
      <label htmlFor={`contact-${name}`} style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', marginBottom: '0.5rem', fontWeight: 500 }}>{label}</label>
      <input id={`contact-${name}`} className="form-input" type={type} name={name} value={form[name]} onChange={onChange} placeholder={placeholder}
        style={{ borderColor: errors[name] ? '#ef4444' : undefined }} />
      {errors[name] && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.3rem' }}>{errors[name]}</p>}
    </div>
  );
}
