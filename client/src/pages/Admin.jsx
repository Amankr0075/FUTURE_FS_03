import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useOutletContext } from 'react-router-dom';
import {
  FiCalendar, FiMail, FiTrash2, FiPlus, FiEdit2, FiX,
  FiCheckCircle, FiAlertCircle, FiUsers, FiPhone, FiBriefcase,
  FiStar, FiClock, FiRefreshCw,
} from 'react-icons/fi';
import { MdRestaurantMenu } from 'react-icons/md';
import {
  getReservations, deleteReservation,
  getContacts, deleteContact,
  getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem,
} from '../services/api';
import { menuItems as staticMenu, CATEGORIES } from '../data/menu';

/* ═══════════════════════════════════════════════════════════════ */
/*  Static staff data (editable by admin in-session)              */
/* ═══════════════════════════════════════════════════════════════ */
const DEFAULT_STAFF = [
  {
    id: 1,
    name: 'Chef Arjun Kapoor',
    role: 'Executive Head Chef',
    department: 'Kitchen',
    phone: '1234567890',
    email: 'arjun.kapoor@royalspice.com',
    experience: '18 Years',
    shift: 'Morning',
    status: 'Active',
    specialty: 'North Indian Curries & Tandoor',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=120&auto=format&fit=crop',
    joinDate: '2009-01-15',
  },
  {
    id: 2,
    name: 'Chef Meera Nair',
    role: 'Pastry & Dessert Chef',
    department: 'Kitchen',
    phone: '1234567891',
    email: 'meera.nair@royalspice.com',
    experience: '12 Years',
    shift: 'Morning',
    status: 'Active',
    specialty: 'Indian Sweets & Fusion Desserts',
    image: `${import.meta.env.BASE_URL}images/chef-meera-nair.png`,
    joinDate: '2012-03-20',
  },
  {
    id: 3,
    name: 'Chef Rahul Verma',
    role: 'Biryani & Rice Specialist',
    department: 'Kitchen',
    phone: '1234567892',
    email: 'rahul.verma@royalspice.com',
    experience: '14 Years',
    shift: 'Evening',
    status: 'Active',
    specialty: 'Hyderabadi & Lucknowi Biryani',
    image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=120&auto=format&fit=crop',
    joinDate: '2010-07-08',
  },
  {
    id: 4,
    name: 'Priya Sharma',
    role: 'Restaurant Manager',
    department: 'Management',
    phone: '1234567893',
    email: 'priya.sharma@royalspice.com',
    experience: '9 Years',
    shift: 'Full Day',
    status: 'Active',
    specialty: 'Operations & Guest Relations',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&auto=format&fit=crop',
    joinDate: '2015-05-01',
  },
  {
    id: 5,
    name: 'Amit Singh',
    role: 'Head Waiter',
    department: 'Service',
    phone: '1234567894',
    email: 'amit.singh@royalspice.com',
    experience: '7 Years',
    shift: 'Evening',
    status: 'Active',
    specialty: 'Fine Dining & Wine Service',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop',
    joinDate: '2017-02-14',
  },
  {
    id: 6,
    name: 'Sunita Patel',
    role: 'Hostess',
    department: 'Service',
    phone: '1234567895',
    email: 'sunita.patel@royalspice.com',
    experience: '4 Years',
    shift: 'Evening',
    status: 'Active',
    specialty: 'Guest Welcome & Reservation Coordination',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop',
    joinDate: '2020-11-01',
  },
  {
    id: 7,
    name: 'Ravi Kumar',
    role: 'Bartender',
    department: 'Bar',
    phone: '1234567896',
    email: 'ravi.kumar@royalspice.com',
    experience: '6 Years',
    shift: 'Evening',
    status: 'On Leave',
    specialty: 'Mocktails & Signature Drinks',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop',
    joinDate: '2018-09-15',
  },
  {
    id: 8,
    name: 'Kavya Reddy',
    role: 'Sous Chef',
    department: 'Kitchen',
    phone: '1234567897',
    email: 'kavya.reddy@royalspice.com',
    experience: '8 Years',
    shift: 'Morning',
    status: 'Active',
    specialty: 'South Indian & Continental',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop',
    joinDate: '2016-04-22',
  },
];

const DEPT_COLORS = {
  Kitchen: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.35)', color: '#F59E0B' },
  Management: { bg: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.35)', color: '#a855f7' },
  Service: { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.35)', color: '#3b82f6' },
  Bar: { bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.35)', color: '#22c55e' },
};

const SHIFTS = ['Morning', 'Evening', 'Full Day', 'Night'];
const DEPTS = ['Kitchen', 'Management', 'Service', 'Bar'];
const STATUSES = ['Active', 'On Leave', 'Inactive'];
const blankStaff = { name: '', role: '', department: 'Kitchen', phone: '', email: '', experience: '', shift: 'Morning', status: 'Active', specialty: '', image: '', joinDate: '' };

/* ═══════════════════════════════════════════════════════════════ */
export default function Admin() {
  const { activeSection } = useOutletContext() || { activeSection: 'dashboard' };

  return (
    <>
      <Helmet><title>Admin | Royal Spice Restaurant</title></Helmet>
      {activeSection === 'dashboard' && <Dashboard />}
      {activeSection === 'reservations' && <Reservations />}
      {activeSection === 'contacts' && <Contacts />}
      {activeSection === 'menu' && <MenuManager />}
      {activeSection === 'staff' && <StaffManager />}
    </>
  );
}

/* ── Dashboard ──────────────────────────────────────────────── */
function Dashboard() {
  const [stats, setStats] = useState({ total: 0, today: 0, paid: 0, contacts: 0, menu: 0, staff: DEFAULT_STAFF.length });
  const [loading, setLoading] = useState(true);

  const loadStats = () => {
    const today = new Date().toISOString().split('T')[0];
    Promise.all([getReservations(), getContacts(), getMenuItems()])
      .then(([r, c, m]) => {
        const reservations = r.data?.data || [];
        const contacts = c.data?.data || [];
        const menu = m.data?.data || staticMenu;
        setStats({
          total: reservations.length,
          today: reservations.filter(x => x.date?.startsWith(today)).length,
          paid: reservations.filter(x => x.paymentStatus === 'paid').length,
          contacts: contacts.length,
          menu: menu.length,
          staff: DEFAULT_STAFF.length,
        });
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadStats(); }, []);

  const cards = [
    { icon: FiCalendar, label: 'Total Reservations', value: stats.total, color: '#F59E0B' },
    { icon: FiCalendar, label: "Today's Bookings", value: stats.today, color: '#22c55e' },
    { icon: FiCheckCircle, label: 'Paid Reservations', value: stats.paid, color: '#3b82f6' },
    { icon: FiMail, label: 'New Inquiries', value: stats.contacts, color: '#ec4899' },
    { icon: MdRestaurantMenu, label: 'Menu Items', value: stats.menu, color: '#a855f7' },
    { icon: FiUsers, label: 'Staff Members', value: stats.staff, color: '#f97316' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: '1.5rem', margin: 0 }}>Dashboard Overview</h2>
        <button onClick={loadStats} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#F59E0B', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.82rem' }}>
          <FiRefreshCw size={14} /> Refresh
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {cards.map(({ icon: Icon, label, value, color }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass-card" style={{ padding: '1.5rem', borderRadius: '0.75rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ width: 50, height: 50, borderRadius: '0.6rem', background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={22} color={color} />
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color, lineHeight: 1 }}>{loading ? '—' : value}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginTop: 4 }}>{label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass-card" style={{ padding: '2rem', borderRadius: '0.75rem' }}>
        <h3 style={{ color: '#F59E0B', fontFamily: 'Cinzel, serif', marginBottom: '0.75rem' }}>Quick Navigation</h3>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.7 }}>
          Use the sidebar to navigate: <strong style={{ color: '#fff' }}>Reservations</strong> (with payment status) · <strong style={{ color: '#fff' }}>Contact Inquiries</strong> · <strong style={{ color: '#fff' }}>Menu Management</strong> · <strong style={{ color: '#fff' }}>Staff Directory</strong>.
        </p>
      </div>
    </div>
  );
}

/* ── Reservations ────────────────────────────────────────────── */
function Reservations() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all | paid | unpaid

  const load = () => {
    setLoading(true);
    getReservations()
      .then(r => setItems(r.data?.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const remove = async id => {
    if (!confirm('Delete this reservation?')) return;
    await deleteReservation(id).catch(() => { });
    setItems(p => p.filter(x => (x._id || x.id) !== id));
  };

  const filtered = filter === 'all' ? items
    : items.filter(r => r.paymentStatus === filter);

  const paid = items.filter(r => r.paymentStatus === 'paid').length;
  const unpaid = items.filter(r => r.paymentStatus !== 'paid').length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: '1.4rem', margin: 0 }}>
          Reservations ({items.length})
        </h2>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {/* Summary pills */}
          <span style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e', padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 600 }}>
            ✅ Paid: {paid}
          </span>
          <span style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', color: '#F59E0B', padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 600 }}>
            ⏳ Unpaid: {unpaid}
          </span>
          <button onClick={load} title="Refresh" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', color: '#F59E0B', padding: '0.4rem 0.75rem', borderRadius: '0.4rem', cursor: 'pointer', fontSize: '0.8rem' }}>
            <FiRefreshCw size={13} /> Refresh
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {[['all', 'All'], ['paid', '✅ Paid'], ['unpaid', '⏳ Unpaid']].map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)}
            style={{
              padding: '0.35rem 1rem', borderRadius: 9999, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
              border: `1px solid ${filter === val ? '#F59E0B' : 'rgba(245,158,11,0.2)'}`,
              background: filter === val ? '#F59E0B' : 'transparent',
              color: filter === val ? '#111827' : 'rgba(255,255,255,0.5)',
              transition: 'all 0.2s',
            }}>
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: 'rgba(255,255,255,0.4)' }}>Loading...</p>
      ) : filtered.length === 0 ? (
        <EmptyState msg={filter === 'all' ? 'No reservations yet' : `No ${filter} reservations`} />
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 820 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(245,158,11,0.2)' }}>
                {['Name', 'Phone', 'Email', 'Guests', 'Date', 'Time', 'Payment', 'Amount', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 0.85rem', textAlign: 'left', color: '#F59E0B', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <motion.tr key={r._id || r.id || i}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,158,11,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={td}><div style={{ fontWeight: 600, color: '#fff' }}>{r.name}</div></td>
                  <td style={td}>{r.phone}</td>
                  <td style={{ ...td, color: '#60a5fa', fontSize: '0.8rem' }}>{r.email}</td>
                  <td style={{ ...td, textAlign: 'center' }}>{r.guests}</td>
                  <td style={td}>{r.date}</td>
                  <td style={td}>{r.time}</td>
                  <td style={td}>
                    {r.paymentStatus === 'paid'
                      ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e', padding: '0.2rem 0.6rem', borderRadius: 9999, fontSize: '0.72rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                        <FiCheckCircle size={11} /> Paid
                      </span>
                      : <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', color: '#F59E0B', padding: '0.2rem 0.6rem', borderRadius: 9999, fontSize: '0.72rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                        <FiAlertCircle size={11} /> Unpaid
                      </span>
                    }
                  </td>
                  <td style={td}>{r.amountPaid > 0 ? <span style={{ color: '#22c55e', fontWeight: 600 }}>₹{r.amountPaid}</span> : <span style={{ color: 'rgba(255,255,255,0.3)' }}>—</span>}</td>
                  <td style={td}>
                    <button onClick={() => remove(r._id || r.id)} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '0.3rem 0.65rem', borderRadius: '0.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem' }}>
                      <FiTrash2 size={12} /> Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ── Contacts ─────────────────────────────────────────────────── */
function Contacts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getContacts().then(r => setItems(r.data?.data || [])).catch(() => setItems([])).finally(() => setLoading(false));
  }, []);

  const remove = async id => {
    if (!confirm('Delete this inquiry?')) return;
    await deleteContact(id).catch(() => { });
    setItems(p => p.filter(x => (x._id || x.id) !== id));
    if (selected?._id === id) setSelected(null);
  };

  return (
    <div>
      <h2 style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: '1.4rem', marginBottom: '1.5rem' }}>Contact Inquiries ({items.length})</h2>
      {loading ? <p style={{ color: 'rgba(255,255,255,0.4)' }}>Loading...</p>
        : items.length === 0 ? <EmptyState msg="No inquiries yet" />
          : (
            <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {items.map((c, i) => (
                  <div key={c._id || i} className="glass-card" onClick={() => setSelected(c)}
                    style={{ padding: '1.25rem', borderRadius: '0.75rem', cursor: 'pointer', border: selected?._id === c._id ? '1px solid #F59E0B' : '1px solid rgba(245,158,11,0.15)', transition: 'all 0.2s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>{c.name}</div>
                        <div style={{ color: '#60a5fa', fontSize: '0.8rem' }}>{c.email}</div>
                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', marginTop: '0.25rem' }}>{c.subject}</div>
                      </div>
                      <button onClick={e => { e.stopPropagation(); remove(c._id || c.id); }}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.25rem' }}>
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {selected && (
                <div className="glass-card" style={{ padding: '1.75rem', borderRadius: '0.75rem', alignSelf: 'start', position: 'sticky', top: 80 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <h3 style={{ color: '#F59E0B', fontFamily: 'Cinzel, serif', fontSize: '1rem' }}>Message Detail</h3>
                    <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}><FiX size={18} /></button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[['From', selected.name], ['Email', selected.email], ['Phone', selected.phone], ['Subject', selected.subject]].map(([k, v]) => v && (
                      <div key={k}><span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>{k}</span><div style={{ color: '#fff', fontSize: '0.9rem' }}>{v}</div></div>
                    ))}
                    <div><span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>Message</span><div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', lineHeight: 1.7, marginTop: '0.25rem' }}>{selected.message}</div></div>
                  </div>
                </div>
              )}
            </div>
          )}
    </div>
  );
}

/* ── Staff Manager ────────────────────────────────────────────── */
function StaffManager() {
  const [staff, setStaff] = useState(DEFAULT_STAFF);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(blankStaff);
  const [filterDept, setFilterDept] = useState('All');
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);

  const depts = ['All', ...DEPTS];

  const showToast = (msg, ok = true) => { setToast({ msg, ok }); setTimeout(() => setToast(null), 3000); };

  const openAdd = () => { setEditItem(null); setForm(blankStaff); setShowForm(true); setSelected(null); };
  const openEdit = (s) => { setEditItem(s); setForm({ ...s }); setShowForm(true); setSelected(null); };

  const handleSave = e => {
    e.preventDefault();
    if (!form.name || !form.role) return;
    if (editItem) {
      setStaff(p => p.map(s => s.id === editItem.id ? { ...form, id: editItem.id } : s));
      showToast('Staff member updated!');
    } else {
      setStaff(p => [...p, { ...form, id: Date.now() }]);
      showToast('Staff member added!');
    }
    setShowForm(false);
  };

  const remove = id => {
    if (!confirm('Remove this staff member?')) return;
    setStaff(p => p.filter(s => s.id !== id));
    if (selected?.id === id) setSelected(null);
    showToast('Staff member removed.');
  };

  const filtered = filterDept === 'All' ? staff : staff.filter(s => s.department === filterDept);

  // Stats
  const active = staff.filter(s => s.status === 'Active').length;
  const onLeave = staff.filter(s => s.status === 'On Leave').length;

  return (
    <div>
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 90, right: 24, zIndex: 999, display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: toast.ok ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
              border: `1px solid ${toast.ok ? '#22c55e' : '#ef4444'}`,
              color: toast.ok ? '#22c55e' : '#ef4444', padding: '0.75rem 1.25rem', borderRadius: '0.5rem', backdropFilter: 'blur(8px)'
            }}>
            {toast.ok ? <FiCheckCircle /> : <FiAlertCircle />} {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: '1.4rem', margin: 0 }}>Staff Directory ({staff.length})</h2>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <span style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e', padding: '0.2rem 0.65rem', borderRadius: 9999, fontSize: '0.72rem', fontWeight: 600 }}>
              ● Active: {active}
            </span>
            <span style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', color: '#F59E0B', padding: '0.2rem 0.65rem', borderRadius: 9999, fontSize: '0.72rem', fontWeight: 600 }}>
              ● On Leave: {onLeave}
            </span>
          </div>
        </div>
        <button onClick={openAdd} className="btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}>
          <FiPlus size={16} /> Add Staff
        </button>
      </div>

      {/* Department filter */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {depts.map(d => (
          <button key={d} onClick={() => setFilterDept(d)}
            style={{
              padding: '0.3rem 0.9rem', borderRadius: 9999, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
              border: `1px solid ${filterDept === d ? '#F59E0B' : 'rgba(245,158,11,0.2)'}`,
              background: filterDept === d ? '#F59E0B' : 'transparent',
              color: filterDept === d ? '#111827' : 'rgba(255,255,255,0.5)',
              transition: 'all 0.2s',
            }}>
            {d}
          </button>
        ))}
      </div>

      {/* Add/Edit form */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            className="glass-card" style={{ padding: '2rem', borderRadius: '1rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#F59E0B', fontFamily: 'Cinzel, serif', margin: 0 }}>{editItem ? 'Edit Staff Member' : 'Add Staff Member'}</h3>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}><FiX size={20} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div><label style={lbl}>Full Name *</label><input className="form-input" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required placeholder="e.g. Raj Sharma" /></div>
                <div><label style={lbl}>Role / Designation *</label><input className="form-input" value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} required placeholder="e.g. Head Chef" /></div>
                <div><label style={lbl}>Department</label>
                  <select className="form-input" value={form.department} onChange={e => setForm(p => ({ ...p, department: e.target.value }))}>
                    {DEPTS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>Shift</label>
                  <select className="form-input" value={form.shift} onChange={e => setForm(p => ({ ...p, shift: e.target.value }))}>
                    {SHIFTS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>Status</label>
                  <select className="form-input" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>Experience</label><input className="form-input" value={form.experience} onChange={e => setForm(p => ({ ...p, experience: e.target.value }))} placeholder="e.g. 5 Years" /></div>
                <div><label style={lbl}>Phone</label><input className="form-input" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="10-digit number" /></div>
                <div><label style={lbl}>Email</label><input className="form-input" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="staff@royalspice.com" /></div>
                <div><label style={lbl}>Join Date</label><input className="form-input" type="date" value={form.joinDate} onChange={e => setForm(p => ({ ...p, joinDate: e.target.value }))} style={{ colorScheme: 'dark' }} /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div><label style={lbl}>Specialty</label><input className="form-input" value={form.specialty} onChange={e => setForm(p => ({ ...p, specialty: e.target.value }))} placeholder="e.g. North Indian Cuisine" /></div>
                <div><label style={lbl}>Photo URL</label><input className="form-input" value={form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} placeholder="https://..." /></div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn-gold">{editItem ? 'Update Staff' : 'Add Staff'}</button>
                <button type="button" className="btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Staff grid + detail panel */}
      <div style={{ display: 'grid', gridTemplateColumns: selected ? 'minmax(0,2fr) minmax(280px,1fr)' : '1fr', gap: '1.5rem', alignItems: 'start' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.1rem' }}>
          {filtered.map((s, i) => {
            const dColor = DEPT_COLORS[s.department] || DEPT_COLORS.Kitchen;
            const isActive = s.status === 'Active';
            return (
              <motion.div key={s.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="glass-card"
                onClick={() => setSelected(sel => sel?.id === s.id ? null : s)}
                style={{
                  borderRadius: '0.85rem', overflow: 'hidden', cursor: 'pointer',
                  border: selected?.id === s.id ? '1px solid #F59E0B' : '1px solid rgba(245,158,11,0.1)',
                  transition: 'all 0.2s',
                }}>
                {/* Card header */}
                <div style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center', background: selected?.id === s.id ? 'rgba(245,158,11,0.05)' : 'transparent' }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <img src={s.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}&background=F59E0B&color=fff&size=64`}
                      alt={s.name}
                      onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}&background=F59E0B&color=fff&size=64`; }}
                      style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(245,158,11,0.3)' }} />
                    <div style={{
                      position: 'absolute', bottom: 2, right: 2, width: 12, height: 12, borderRadius: '50%',
                      background: isActive ? '#22c55e' : '#F59E0B', border: '2px solid #111827',
                    }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', marginTop: '0.1rem' }}>{s.role}</div>
                    <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
                      <span style={{ ...dColor, padding: '0.15rem 0.55rem', borderRadius: 9999, fontSize: '0.65rem', fontWeight: 700 }}>{s.department}</span>
                      <span style={{
                        background: isActive ? 'rgba(34,197,94,0.12)' : 'rgba(245,158,11,0.1)',
                        border: `1px solid ${isActive ? 'rgba(34,197,94,0.3)' : 'rgba(245,158,11,0.25)'}`,
                        color: isActive ? '#22c55e' : '#F59E0B',
                        padding: '0.15rem 0.55rem', borderRadius: 9999, fontSize: '0.65rem', fontWeight: 700,
                      }}>{s.status}</span>
                    </div>
                  </div>
                </div>
                {/* Card footer */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '0.75rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'rgba(255,255,255,0.45)', fontSize: '0.73rem' }}>
                      <FiClock size={11} /> {s.shift}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'rgba(255,255,255,0.45)', fontSize: '0.73rem' }}>
                      <FiStar size={11} /> {s.experience}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button onClick={e => { e.stopPropagation(); openEdit(s); }}
                      style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', color: '#F59E0B', padding: '0.25rem 0.55rem', borderRadius: '0.35rem', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <FiEdit2 size={11} />
                    </button>
                    <button onClick={e => { e.stopPropagation(); remove(s.id); }}
                      style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444', padding: '0.25rem 0.55rem', borderRadius: '0.35rem', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <FiTrash2 size={11} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {selected && (
            <motion.div key={selected.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
              className="glass-card" style={{ borderRadius: '1rem', overflow: 'hidden', position: 'sticky', top: 80 }}>
              {/* Profile header */}
              <div style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(245,158,11,0.03))', padding: '1.5rem', textAlign: 'center', borderBottom: '1px solid rgba(245,158,11,0.15)', position: 'relative' }}>
                <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}><FiX size={16} /></button>
                <img src={selected.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(selected.name)}&background=F59E0B&color=fff&size=100`}
                  alt={selected.name}
                  onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selected.name)}&background=F59E0B&color=fff&size=100`; }}
                  style={{ width: 88, height: 88, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(245,158,11,0.5)', marginBottom: '0.75rem' }} />
                <div style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: '1.05rem', fontWeight: 700 }}>{selected.name}</div>
                <div style={{ color: '#F59E0B', fontSize: '0.82rem', marginTop: '0.2rem' }}>{selected.role}</div>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '0.6rem' }}>
                  <span style={{ ...(DEPT_COLORS[selected.department] || DEPT_COLORS.Kitchen), padding: '0.2rem 0.7rem', borderRadius: 9999, fontSize: '0.7rem', fontWeight: 700 }}>{selected.department}</span>
                  <span style={{
                    background: selected.status === 'Active' ? 'rgba(34,197,94,0.12)' : 'rgba(245,158,11,0.1)',
                    border: `1px solid ${selected.status === 'Active' ? 'rgba(34,197,94,0.3)' : 'rgba(245,158,11,0.25)'}`,
                    color: selected.status === 'Active' ? '#22c55e' : '#F59E0B',
                    padding: '0.2rem 0.7rem', borderRadius: 9999, fontSize: '0.7rem', fontWeight: 700,
                  }}>{selected.status}</span>
                </div>
              </div>
              {/* Detail rows */}
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {[
                  { icon: FiPhone, label: 'Phone', val: selected.phone },
                  { icon: FiMail, label: 'Email', val: selected.email },
                  { icon: FiClock, label: 'Shift', val: selected.shift },
                  { icon: FiStar, label: 'Experience', val: selected.experience },
                  { icon: FiBriefcase, label: 'Specialty', val: selected.specialty },
                  { icon: FiCalendar, label: 'Joined', val: selected.joinDate },
                ].map(({ icon: Icon, label, val }) => val && (
                  <div key={label} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{ width: 30, height: 30, borderRadius: '0.4rem', background: 'rgba(245,158,11,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={14} color="#F59E0B" />
                    </div>
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>{label}</div>
                      <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 500 }}>{val}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => openEdit(selected)} className="btn-gold" style={{ flex: 1, padding: '0.6rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                  <FiEdit2 size={14} /> Edit Profile
                </button>
                <button onClick={() => remove(selected.id)} style={{ flex: 1, padding: '0.6rem', fontSize: '0.82rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                  <FiTrash2 size={14} /> Remove
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Menu Manager ─────────────────────────────────────────────── */
function MenuManager() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const blankForm = { name: '', description: '', price: '', category: 'Starters', image: '', isVeg: true, isAvailable: true, isPopular: false };
  const [form, setForm] = useState(blankForm);

  useEffect(() => {
    getMenuItems()
      .then(r => setItems(r.data?.data && r.data.data.length > 0 ? r.data.data : staticMenu))
      .catch(() => setItems(staticMenu))
      .finally(() => setLoading(false));
  }, []);

  const openAdd = () => { setEditItem(null); setForm(blankForm); setShowForm(true); };
  const openEdit = (item) => { setEditItem(item); setForm({ ...item, price: String(item.price) }); setShowForm(true); };

  const showToast = (msg, ok = true) => { setToast({ msg, ok }); setTimeout(() => setToast(null), 3000); };

  const handleSave = async e => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    setSaving(true);
    const payload = { ...form, price: Number(form.price) };
    try {
      if (editItem) {
        const id = editItem._id || editItem.id;
        const res = await updateMenuItem(id, payload);
        setItems(p => p.map(x => (x._id || x.id) === id ? res.data?.data || res.data : x));
        showToast('Item updated!');
      } else {
        const res = await createMenuItem(payload);
        setItems(p => [...p, res.data?.data || res.data]);
        showToast('Item added!');
      }
      setShowForm(false);
    } catch {
      showToast('Save failed — check server connection.', false);
    }
    setSaving(false);
  };

  const remove = async id => {
    if (!confirm('Delete this menu item?')) return;
    await deleteMenuItem(id).catch(() => { });
    setItems(p => p.filter(x => (x._id || x.id) !== id));
    showToast('Item deleted.');
  };

  return (
    <div>
      {toast && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'fixed', top: 90, right: 24, zIndex: 999, display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: toast.ok ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
            border: `1px solid ${toast.ok ? '#22c55e' : '#ef4444'}`,
            color: toast.ok ? '#22c55e' : '#ef4444', padding: '0.75rem 1.25rem', borderRadius: '0.5rem'
          }}>
          {toast.ok ? <FiCheckCircle /> : <FiAlertCircle />} {toast.msg}
        </motion.div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontFamily: 'Cinzel, serif', color: '#fff', fontSize: '1.4rem', margin: 0 }}>Menu Items ({items.length})</h2>
        <button id="add-menu-item" onClick={openAdd} className="btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}>
          <FiPlus size={16} /> Add New Item
        </button>
      </div>
      {showForm && (
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          className="glass-card" style={{ padding: '2rem', borderRadius: '1rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F59E0B', fontFamily: 'Cinzel, serif', margin: 0 }}>{editItem ? 'Edit Item' : 'Add New Item'}</h3>
            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}><FiX size={20} /></button>
          </div>
          <form onSubmit={handleSave} id="menu-item-form">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div><label style={lbl}>Dish Name *</label><input id="item-name" className="form-input" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required placeholder="e.g. Dal Makhani" /></div>
              <div><label style={lbl}>Price (₹) *</label><input id="item-price" className="form-input" type="number" min="1" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} required placeholder="299" /></div>
              <div><label style={lbl}>Category</label>
                <select id="item-category" className="form-input" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                  {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}><label style={lbl}>Image URL</label><input id="item-image" className="form-input" value={form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} placeholder="https://..." /></div>
            <div style={{ marginBottom: '1.25rem' }}><label style={lbl}>Description</label><textarea id="item-description" className="form-input" rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} style={{ resize: 'vertical' }} placeholder="Describe the dish..." /></div>
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {[['isVeg', 'Vegetarian'], ['isPopular', 'Mark Popular'], ['isAvailable', 'Available']].map(([key, label]) => (
                <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                  <input type="checkbox" checked={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.checked }))} style={{ width: 16, height: 16, accentColor: '#F59E0B' }} /> {label}
                </label>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button id="save-menu-item" type="submit" className="btn-gold" disabled={saving}>{saving ? 'Saving...' : (editItem ? 'Update Item' : 'Add Item')}</button>
              <button type="button" className="btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </motion.div>
      )}
      {loading ? <p style={{ color: 'rgba(255,255,255,0.4)' }}>Loading menu...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {items.map((item, i) => (
            <motion.div key={item._id || item.id || i} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}
              className="glass-card" style={{ borderRadius: '0.75rem', overflow: 'hidden' }}>
              <div style={{ height: 160, overflow: 'hidden', position: 'relative' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop'; }} />
                <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: '0.35rem' }}>
                  {item.isPopular && <span style={{ background: '#F59E0B', color: '#111827', fontSize: '0.65rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: 9999 }}>Popular</span>}
                  {!item.isAvailable && <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: 9999 }}>Unavailable</span>}
                </div>
              </div>
              <div style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>{item.name}</span>
                  <span style={{ color: '#F59E0B', fontWeight: 700 }}>₹{item.price}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span style={{ color: item.isVeg ? '#22c55e' : '#ef4444', fontSize: '0.72rem', fontWeight: 600 }}>{item.isVeg ? '● VEG' : '● NON-VEG'}</span>
                  <span className="category-badge" style={{ fontSize: '0.68rem', padding: '0.15rem 0.55rem', cursor: 'default' }}>{item.category}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => openEdit(item)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#F59E0B', padding: '0.45rem', borderRadius: '0.4rem', cursor: 'pointer', fontSize: '0.8rem' }}>
                    <FiEdit2 size={13} /> Edit
                  </button>
                  <button onClick={() => remove(item._id || item.id)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444', padding: '0.45rem', borderRadius: '0.4rem', cursor: 'pointer', fontSize: '0.8rem' }}>
                    <FiTrash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState({ msg }) {
  return <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.35)', fontSize: '1rem' }}>{msg}</div>;
}

const td = { padding: '0.8rem 0.85rem', color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem' };
const lbl = { display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginBottom: '0.5rem', fontWeight: 500 };
