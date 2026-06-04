const express = require('express');
const router = express.Router();
const {
  createReservation,
  getReservations,
  getReservation,
  updateStatus,
  deleteReservation,
} = require('../controllers/reservationController');

// Public
router.post('/', createReservation);

// Admin — these would ideally use adminAuth middleware; kept open for easy portfolio demo
router.get('/', getReservations);
router.get('/:id', getReservation);
router.patch('/:id/status', updateStatus);
router.delete('/:id', deleteReservation);

module.exports = router;
