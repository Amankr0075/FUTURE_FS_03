const Razorpay = require('razorpay');
const crypto   = require('crypto');

// Helper — creates a fresh Razorpay instance using env vars at request time
function getRazorpay() {
  return new Razorpay({
    key_id:     process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

/* ── Create Order ───────────────────────────────────────────── */
// POST /api/payment/create-order
exports.createOrder = async (req, res, next) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;

    if (!amount || amount < 1) {
      return res.status(400).json({ success: false, message: 'Invalid amount' });
    }

    const options = {
      amount: Math.round(amount * 100),   // paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await getRazorpay().orders.create(options);
    res.status(201).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

/* ── Verify Payment ─────────────────────────────────────────── */
// POST /api/payment/verify
exports.verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Missing payment fields' });
    }

    const hmac = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (hmac !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }

    res.json({
      success: true,
      message: 'Payment verified successfully',
      data: { razorpay_order_id, razorpay_payment_id },
    });
  } catch (err) {
    next(err);
  }
};
