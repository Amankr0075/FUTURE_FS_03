import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  FiCalendar, FiClock, FiUsers, FiUser, FiPhone, FiMail,
  FiMessageSquare, FiCheckCircle, FiCreditCard, FiArrowRight,
  FiShield, FiLock, FiX, FiSmartphone, FiDollarSign,
} from 'react-icons/fi';
import { SiVisa, SiMastercard } from 'react-icons/si';
import { createReservation } from '../services/api';

/* ─── constants ───────────────────────────────────────────────── */
const BOOKING_FEE = 199;

const initialForm = {
  name: '', phone: '', email: '', guests: '2',
  date: '', time: '', specialRequest: '',
};

const TIME_SLOTS = [
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
  '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM',
];

/* ═══════════════════════════════════════════════════════════════ */
/*  DEMO PAYMENT MODAL                                             */
/* ═══════════════════════════════════════════════════════════════ */
function DemoPaymentModal({ form, amount, onSuccess, onClose }) {
  const [tab,       setTab]       = useState('upi');   // upi | card | netbanking
  const [upiId,     setUpiId]     = useState('');
  const [cardNum,   setCardNum]   = useState('');
  const [cardExp,   setCardExp]   = useState('');
  const [cardCvv,   setCardCvv]   = useState('');
  const [cardName,  setCardName]  = useState('');
  const [processing,setProcessing]= useState(false);
  const [progress,  setProgress]  = useState(0);
  const [error,     setError]     = useState('');
  const intervalRef = useRef(null);

  /* ── Simulate payment processing ── */
  const handlePay = () => {
    setError('');
    if (tab === 'upi' && !upiId.includes('@')) {
      setError('Enter a valid UPI ID (e.g. name@upi)'); return;
    }
    if (tab === 'card') {
      if (cardNum.replace(/\s/g,'').length < 16) { setError('Enter a valid 16-digit card number'); return; }
      if (!cardExp.match(/^\d{2}\/\d{2}$/))       { setError('Enter expiry as MM/YY'); return; }
      if (cardCvv.length < 3)                      { setError('Enter a valid CVV'); return; }
    }

    setProcessing(true);
    setProgress(0);
    let p = 0;
    intervalRef.current = setInterval(() => {
      p += Math.random() * 18 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(intervalRef.current);
        setTimeout(() => onSuccess(), 600);
      }
      setProgress(Math.min(p, 100));
    }, 180);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  /* format card number with spaces */
  const fmtCard = v => v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
  const fmtExp  = v => {
    const d = v.replace(/\D/g,'').slice(0,4);
    return d.length > 2 ? d.slice(0,2)+'/'+d.slice(2) : d;
  };

  const TABS = [
    { id: 'upi',        label: 'UPI',         icon: FiSmartphone },
    { id: 'card',       label: 'Card',         icon: FiCreditCard },
    { id: 'netbanking', label: 'Net Banking',  icon: FiDollarSign },
  ];

  const NET_BANKS = ['State Bank of India','HDFC Bank','ICICI Bank','Axis Bank','Kotak Bank','Punjab National Bank'];

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={e => { if (e.target === e.currentTarget && !processing) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 40 }}
        animate={{ scale: 1,    opacity: 1, y: 0  }}
        exit   ={{ scale: 0.88, opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        style={{
          background: '#fff', borderRadius: '1rem', width: '100%', maxWidth: 420,
          overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* ── Modal Header ── */}
        <div style={{
          background: 'linear-gradient(135deg, #072654 0%, #0a3d8f 100%)',
          padding: '1.1rem 1.25rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {/* Razorpay-style logo */}
            <div style={{
              width: 32, height: 32, borderRadius: '0.4rem',
              background: '#3395FF', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem', fontWeight: 900, color: '#fff', letterSpacing: '-1px',
            }}>R</div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.1 }}>Royal Spice Restaurant</div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.7rem' }}>Secure Checkout · Powered by Razorpay</div>
            </div>
          </div>
          {!processing && (
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: '0.25rem' }}>
              <FiX size={20} />
            </button>
          )}
        </div>

        {/* ── Amount Banner ── */}
        <div style={{
          background: 'linear-gradient(90deg, #f8faff, #eef4ff)',
          padding: '0.85rem 1.25rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '1px solid #e8edf5',
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: '0.2rem' }}>Booking Deposit (Refundable)</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>₹{amount}</div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '0.72rem', color: '#64748b', lineHeight: 1.6 }}>
            <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.82rem' }}>{form.name}</div>
            <div>{form.date} · {form.time}</div>
            <div>{form.guests} guest{form.guests > 1 ? 's' : ''}</div>
          </div>
        </div>

        {/* ── Processing overlay ── */}
        {processing ? (
          <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
            {/* Animated spinner */}
            <div style={{ position: 'relative', width: 72, height: 72, margin: '0 auto 1.5rem' }}>
              <svg viewBox="0 0 72 72" style={{ position: 'absolute', inset: 0, animation: 'spin 1.2s linear infinite' }}>
                <circle cx="36" cy="36" r="30" fill="none" stroke="#e2e8f0" strokeWidth="6" />
                <circle cx="36" cy="36" r="30" fill="none" stroke="#3395FF" strokeWidth="6"
                  strokeDasharray={`${progress * 1.885} 188.5`} strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 0.2s' }}
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#3395FF' }}>
                {Math.round(progress)}%
              </div>
            </div>
            <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem', marginBottom: '0.4rem' }}>
              {progress < 40 ? 'Initiating payment...'
               : progress < 75 ? 'Contacting bank...'
               : progress < 100 ? 'Verifying transaction...'
               : '✅ Payment Successful!'}
            </div>
            <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Please do not close or refresh this page</div>
            {/* Progress bar */}
            <div style={{ height: 4, background: '#e2e8f0', borderRadius: 2, marginTop: '1.5rem', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg,#3395FF,#00c2e0)', borderRadius: 2, transition: 'width 0.2s' }} />
            </div>
          </div>
        ) : (
          <div style={{ padding: '1.25rem' }}>
            {/* ── Tabs ── */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {TABS.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => { setTab(id); setError(''); }}
                  style={{
                    flex: 1, padding: '0.55rem 0.5rem', borderRadius: '0.5rem', cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem',
                    border: tab === id ? '2px solid #3395FF' : '1.5px solid #e2e8f0',
                    background: tab === id ? '#f0f7ff' : '#fff',
                    color: tab === id ? '#3395FF' : '#64748b',
                    fontSize: '0.7rem', fontWeight: 600, transition: 'all 0.18s',
                  }}>
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>

            {/* ── UPI Tab ── */}
            {tab === 'upi' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>
                  Enter UPI ID
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    value={upiId} onChange={e => { setUpiId(e.target.value); setError(''); }}
                    placeholder="yourname@upi"
                    style={{
                      width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', fontSize: '0.9rem',
                      border: '1.5px solid #e2e8f0', outline: 'none', boxSizing: 'border-box',
                      background: '#f8faff',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                  {['@oksbi','@okhdfc','@okhdfcbank','@ybl','@paytm'].map(s => (
                    <span key={s} onClick={() => setUpiId(prev => prev.split('@')[0] + s)}
                      style={{ padding: '0.25rem 0.65rem', borderRadius: 999, border: '1px solid #e2e8f0', fontSize: '0.7rem', cursor: 'pointer', color: '#374151', background: '#f8faff' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ── Card Tab ── */}
            {tab === 'card' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div>
                  <label style={lbl}>Card Number</label>
                  <div style={{ position: 'relative' }}>
                    <input value={cardNum} onChange={e => { setCardNum(fmtCard(e.target.value)); setError(''); }}
                      placeholder="1234  5678  9012  3456" maxLength={19}
                      style={{ ...inputStyle, paddingRight: '4rem' }}
                    />
                    <div style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: '0.3rem', opacity: 0.6 }}>
                      <SiVisa size={22} color="#1A1F71" />
                      <SiMastercard size={22} color="#EB001B" />
                    </div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  <div>
                    <label style={lbl}>Expiry (MM/YY)</label>
                    <input value={cardExp} onChange={e => { setCardExp(fmtExp(e.target.value)); setError(''); }}
                      placeholder="08/27" maxLength={5} style={inputStyle} />
                  </div>
                  <div>
                    <label style={lbl}>CVV</label>
                    <input value={cardCvv} onChange={e => { setCardCvv(e.target.value.replace(/\D/g,'').slice(0,4)); setError(''); }}
                      placeholder="•••" maxLength={4} type="password" style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={lbl}>Name on Card</label>
                  <input value={cardName} onChange={e => { setCardName(e.target.value); setError(''); }}
                    placeholder="RAJ SHARMA" style={{ ...inputStyle, textTransform: 'uppercase' }} />
                </div>
              </div>
            )}

            {/* ── Net Banking Tab ── */}
            {tab === 'netbanking' && (
              <div>
                <label style={{ ...lbl, marginBottom: '0.6rem', display: 'block' }}>Select Your Bank</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                  {NET_BANKS.map(bank => (
                    <div key={bank}
                      style={{
                        padding: '0.55rem 0.6rem', borderRadius: '0.45rem', cursor: 'pointer',
                        border: '1.5px solid #e2e8f0', background: '#f8faff',
                        fontSize: '0.72rem', color: '#374151', textAlign: 'center',
                        transition: 'all 0.15s',
                      }}
                      onClick={() => handlePay()}
                      onMouseEnter={e => { e.currentTarget.style.borderColor='#3395FF'; e.currentTarget.style.background='#f0f7ff'; e.currentTarget.style.color='#3395FF'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.background='#f8faff'; e.currentTarget.style.color='#374151'; }}
                    >
                      {bank}
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.75rem', textAlign: 'center' }}>
                  Clicking a bank will redirect to its secure portal
                </p>
              </div>
            )}

            {/* ── Error ── */}
            {error && (
              <div style={{ marginTop: '0.75rem', color: '#ef4444', fontSize: '0.78rem', padding: '0.5rem 0.75rem', background: '#fff5f5', border: '1px solid #fecaca', borderRadius: '0.4rem' }}>
                {error}
              </div>
            )}

            {/* ── Pay Button ── */}
            {tab !== 'netbanking' && (
              <button onClick={handlePay}
                style={{
                  marginTop: '1rem', width: '100%', padding: '0.85rem',
                  borderRadius: '0.55rem', border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(135deg, #3395FF, #1a7ef0)',
                  color: '#fff', fontWeight: 700, fontSize: '0.95rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  boxShadow: '0 4px 18px rgba(51,149,255,0.35)',
                  transition: 'transform 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-1px)'}
                onMouseLeave={e => e.currentTarget.style.transform='none'}
              >
                <FiLock size={15} />
                Pay ₹{amount} Securely
              </button>
            )}

            {/* ── Trust footer ── */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '0.85rem', color: '#94a3b8', fontSize: '0.68rem' }}>
              <FiShield size={12} color="#22c55e" />
              256-bit SSL · Secured by Razorpay · PCI DSS Compliant
            </div>
          </div>
        )}
      </motion.div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </motion.div>
  );
}

const lbl        = { display: 'block', fontSize: '0.76rem', fontWeight: 600, color: '#374151', marginBottom: '0.3rem' };
const inputStyle = { width: '100%', padding: '0.7rem 1rem', borderRadius: '0.5rem', fontSize: '0.88rem', border: '1.5px solid #e2e8f0', outline: 'none', boxSizing: 'border-box', background: '#f8faff', fontFamily: 'inherit' };

/* ═══════════════════════════════════════════════════════════════ */
/*  MAIN RESERVATION PAGE                                          */
/* ═══════════════════════════════════════════════════════════════ */
export default function Reservation() {
  const [form,       setForm]       = useState(initialForm);
  const [errors,     setErrors]     = useState({});
  const [step,       setStep]       = useState('form');   // form | modal | success
  const [savedEmail, setSavedEmail] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = 'Full name is required';
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) e.phone = 'Enter a valid 10-digit phone';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))  e.email = 'Enter a valid email address';
    if (!form.date) e.date = 'Please select a date';
    if (!form.time) e.time = 'Please select a time slot';
    return e;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSavedEmail(form.email);
    setStep('modal');
  };

  const handlePaymentSuccess = async () => {
    // Save to DB with explicit paid status
    const paymentId = `pay_demo_${Date.now().toString(36).toUpperCase()}`;
    try {
      await createReservation({
        ...form,
        paymentId,
        orderId:       `order_demo_${Date.now().toString(36)}`,
        amountPaid:    BOOKING_FEE,
        paymentStatus: 'paid',
      });
    } catch {}
    setForm(initialForm);
    setStep('success');
  };

  /* ─── Success ───────────────────────────────────────────────── */
  if (step === 'success') {
    return (
      <div className="page-wrapper" style={{ paddingTop: 72, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
          className="glass-card" style={{ padding: '3rem 2.5rem', borderRadius: '1.5rem', textAlign: 'center', maxWidth: 500 }}>
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, delay: 0.15 }}
            style={{ width: 88, height: 88, borderRadius: '50%', background: 'rgba(34,197,94,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <FiCheckCircle size={48} color="#22c55e" />
          </motion.div>
          <h2 style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: '1.75rem', marginBottom: '0.75rem' }}>Booking Confirmed!</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '0.5rem' }}>
            Your table has been reserved and payment of{' '}
            <strong style={{ color: '#F59E0B' }}>₹{BOOKING_FEE}</strong> was received successfully.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.83rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            A confirmation will be sent to <strong style={{ color: 'rgba(255,255,255,0.65)' }}>{savedEmail}</strong>.
            Our team will contact you within 30 minutes.
          </p>
          {/* Transaction receipt look */}
          <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '2rem', textAlign: 'left' }}>
            {[
              ['Transaction ID', `pay_demo${Date.now().toString(36).toUpperCase()}`],
              ['Amount Paid',    `₹${BOOKING_FEE} (Refundable Deposit)`],
              ['Status',         '✅ Paid'],
              ['Gateway',        'Razorpay'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', padding: '0.3rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.55)' }}>
                <span>{k}</span><span style={{ color: '#fff', fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
          <button className="btn-gold" id="make-another-reservation" onClick={() => setStep('form')}>
            Make Another Reservation
          </button>
        </motion.div>
      </div>
    );
  }

  /* ─── Main Form ─────────────────────────────────────────────── */
  return (
    <div className="page-wrapper" style={{ paddingTop: 72 }}>
      <Helmet>
        <title>Reserve a Table | Royal Spice Restaurant</title>
        <meta name="description" content="Book your table at Royal Spice Restaurant. Reservations available for lunch and dinner, every day of the week." />
      </Helmet>

      {/* Demo payment modal */}
      <AnimatePresence>
        {step === 'modal' && (
          <DemoPaymentModal
            form={form}
            amount={BOOKING_FEE}
            onSuccess={handlePaymentSuccess}
            onClose={() => setStep('form')}
          />
        )}
      </AnimatePresence>

      {/* Page header */}
      <section style={{ background: 'linear-gradient(135deg, #0a0f1a, #111827)', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span style={{ color: '#F59E0B', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Online Booking</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(2rem, 5vw, 3.25rem)', color: '#fff', margin: '0.75rem 0' }}>
            Reserve Your <span className="gold-gradient">Table</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Secure your spot for an unforgettable dining experience. A refundable booking deposit of{' '}
            <strong style={{ color: '#F59E0B' }}>₹{BOOKING_FEE}</strong> is collected online.
          </p>
        </motion.div>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '4rem 1.5rem 5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'start' }}>

        {/* ── Info cards ── */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h2 style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Dining Info</h2>

          {[
            { icon: FiClock,   title: 'Lunch Hours',    info: 'Mon–Sun: 12:00 PM – 3:30 PM' },
            { icon: FiClock,   title: 'Dinner Hours',   info: 'Mon–Thu: 7:00 PM – 10:30 PM\nFri–Sat: 7:00 PM – 11:30 PM' },
            { icon: FiUsers,   title: 'Group Bookings', info: 'For groups of 10+, please call us directly for private dining arrangements.' },
            { icon: FiShield,  title: 'Secure Payment', info: `₹${BOOKING_FEE} refundable deposit via Razorpay. UPI, cards, net banking accepted.` },
          ].map(({ icon: Icon, title, info }) => (
            <div key={title} className="glass-card" style={{ padding: '1.25rem 1.5rem', borderRadius: '0.75rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: 42, height: 42, borderRadius: '0.5rem', background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={20} color="#F59E0B" />
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 600, marginBottom: '0.25rem', fontSize: '0.9rem' }}>{title}</div>
                <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{info}</div>
              </div>
            </div>
          ))}

          {/* Payment methods */}
          <div className="glass-card" style={{ padding: '1.25rem 1.5rem', borderRadius: '0.75rem' }}>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>We Accept</div>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {['UPI', 'Visa', 'Mastercard', 'Net Banking', 'Wallets'].map(p => (
                <span key={p} style={{ padding: '0.3rem 0.75rem', borderRadius: 9999, fontSize: '0.71rem', fontWeight: 600, border: '1px solid rgba(245,158,11,0.3)', color: '#F59E0B', background: 'rgba(245,158,11,0.05)' }}>
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Restaurant image */}
          <div style={{ borderRadius: '1rem', overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&auto=format&fit=crop" alt="Royal Spice dining" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />
          </div>
        </motion.div>

        {/* ── Booking Form ── */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '1.25rem' }}>
            <h2 style={{ fontFamily: 'Cinzel, serif', color: '#F59E0B', fontSize: '1.3rem', marginBottom: '0.4rem' }}>Book a Table</h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginBottom: '2rem' }}>
              Fill in your details — you'll complete payment on the next screen.
            </p>

            <form onSubmit={handleFormSubmit} id="reservation-form" noValidate>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <Field icon={FiUser}  label="Full Name" name="name"  type="text" form={form} errors={errors} onChange={handleChange} placeholder="Raj Sharma" />
                <Field icon={FiPhone} label="Phone"     name="phone" type="tel"  form={form} errors={errors} onChange={handleChange} placeholder="1234567890" />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <Field icon={FiMail} label="Email Address" name="email" type="email" form={form} errors={errors} onChange={handleChange} placeholder="raj@email.com" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', marginBottom: '0.5rem', fontWeight: 500 }}>Guests</label>
                  <select name="guests" id="guests" value={form.guests} onChange={handleChange} className="form-input">
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} {n===1?'Guest':'Guests'}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', marginBottom: '0.5rem', fontWeight: 500 }}>Date</label>
                  <input id="reservation-date" className="form-input" type="date" name="date" min={today} value={form.date} onChange={handleChange} style={{ colorScheme: 'dark' }} />
                  {errors.date && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.3rem' }}>{errors.date}</p>}
                </div>
              </div>

              {/* Time slot */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', marginBottom: '0.5rem', fontWeight: 500 }}>Time Slot</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {TIME_SLOTS.map(t => (
                    <button key={t} type="button"
                      onClick={() => { setForm(p => ({ ...p, time: t })); if (errors.time) setErrors(p => ({ ...p, time: undefined })); }}
                      style={{
                        padding: '0.35rem 0.85rem', borderRadius: 9999, fontSize: '0.78rem', cursor: 'pointer',
                        border: `1px solid ${form.time===t ? '#F59E0B' : 'rgba(245,158,11,0.25)'}`,
                        background: form.time===t ? '#F59E0B' : 'rgba(245,158,11,0.06)',
                        color: form.time===t ? '#111827' : '#F59E0B',
                        fontWeight: form.time===t ? 700 : 400,
                        transition: 'all 0.2s',
                      }}
                    >{t}</button>
                  ))}
                </div>
                {errors.time && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.3rem' }}>{errors.time}</p>}
              </div>

              {/* Special request */}
              <div style={{ marginBottom: '1.75rem' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                  <FiMessageSquare size={13} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                  Special Requests (optional)
                </label>
                <textarea id="special-request" name="specialRequest" value={form.specialRequest} onChange={handleChange}
                  rows={3} className="form-input" style={{ resize: 'vertical' }}
                  placeholder="Anniversary setup, dietary restrictions, high chair needed..." />
              </div>

              {/* Summary */}
              <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '0.75rem', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>Refundable Booking Deposit</div>
                  <div style={{ color: '#F59E0B', fontWeight: 800, fontSize: '1.35rem' }}>₹{BOOKING_FEE}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem' }}>
                  <FiShield size={13} color="#22c55e" /> Secured by Razorpay
                </div>
              </div>

              <button type="submit" id="submit-reservation" className="btn-gold"
                style={{ width: '100%', padding: '1rem 1.5rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}>
                <FiCreditCard size={18} />
                Proceed to Pay ₹{BOOKING_FEE}
                <FiArrowRight size={16} />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Field component ── */
function Field({ icon: Icon, label, name, type, form, errors, onChange, placeholder }) {
  return (
    <div>
      <label htmlFor={name} style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', marginBottom: '0.5rem', fontWeight: 500 }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <Icon size={14} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#F59E0B' }} />
        <input id={name} className="form-input" type={type} name={name} value={form[name]} onChange={onChange} placeholder={placeholder}
          style={{ paddingLeft: '2.5rem', borderColor: errors[name] ? '#ef4444' : undefined }} />
      </div>
      {errors[name] && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.3rem' }}>{errors[name]}</p>}
    </div>
  );
}
