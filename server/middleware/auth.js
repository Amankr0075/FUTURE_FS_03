// Simple admin auth middleware — checks x-admin-token header
const adminAuth = (req, res, next) => {
  const token = req.headers['x-admin-token'];
  // For portfolio purposes: compare against env var
  // In production replace with full JWT authentication
  if (token !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: 'Unauthorized.' });
  }
  next();
};

module.exports = adminAuth;
