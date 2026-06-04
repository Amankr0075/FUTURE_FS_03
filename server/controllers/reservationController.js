const Reservation = require('../models/Reservation');

// POST /api/reservations — Create
exports.createReservation = async (req, res) => {
  try {
    const { name, email, phone, guests, date, time, specialRequest, paymentId, orderId, amountPaid, paymentStatus } = req.body;
    if (!name || !email || !phone || !guests || !date || !time) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields.' });
    }
    const reservation = await Reservation.create({
      name, email, phone, guests, date, time, specialRequest,
      paymentId:     paymentId     || null,
      orderId:       orderId       || null,
      amountPaid:    amountPaid    || 0,
      // Accept explicit paymentStatus, or derive from paymentId presence
      paymentStatus: paymentStatus || (paymentId ? 'paid' : 'unpaid'),
    });
    res.status(201).json({ success: true, data: reservation });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// GET /api/reservations — List all
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.json({ success: true, data: reservations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/reservations/:id — Single
exports.getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ success: false, message: 'Reservation not found.' });
    res.json({ success: true, data: reservation });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PATCH /api/reservations/:id/status — Update status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id, { status }, { new: true, runValidators: true }
    );
    if (!reservation) return res.status(404).json({ success: false, message: 'Reservation not found.' });
    res.json({ success: true, data: reservation });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/reservations/:id
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) return res.status(404).json({ success: false, message: 'Reservation not found.' });
    res.json({ success: true, message: 'Reservation deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
