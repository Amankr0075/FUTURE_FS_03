const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    message: 'Royal Spice Restaurant API is running 🍛',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

module.exports = router;
