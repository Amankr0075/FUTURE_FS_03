import axios from 'axios';

const api = axios.create({
  baseURL:
    import.meta.env.MODE === 'production'
      ? 'https://royalspice.duckdns.org/api'
      : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Reservations ─────────────────────────────────────────────
export const createReservation = (data) => api.post('/reservations', data);
export const getReservations = () => api.get('/reservations');
export const getReservation = (id) => api.get(`/reservations/${id}`);
export const deleteReservation = (id) => api.delete(`/reservations/${id}`);
export const updateReservationStatus = (id, status) => api.patch(`/reservations/${id}/status`, { status });

// ── Contact ───────────────────────────────────────────────────
export const submitContact = (data) => api.post('/contact', data);
export const getContacts = () => api.get('/contact');
export const deleteContact = (id) => api.delete(`/contact/${id}`);

// ── Menu ─────────────────────────────────────────────────────
export const getMenuItems = () => api.get('/menu');
export const createMenuItem = (data) => api.post('/menu', data);
export const updateMenuItem = (id, data) => api.put(`/menu/${id}`, data);
export const deleteMenuItem = (id) => api.delete(`/menu/${id}`);

// ── Payment (Razorpay) ────────────────────────────────────────
export const createPaymentOrder = (data) => api.post('/payment/create-order', data);
export const verifyPayment = (data) => api.post('/payment/verify', data);

// ── Health ────────────────────────────────────────────────────
export const checkHealth = () => api.get('/health');

export default api;
