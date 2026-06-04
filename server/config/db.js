const mongoose = require('mongoose');
const dns = require('dns');

// Configure custom DNS servers to resolve MongoDB Atlas SRV records correctly
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (dnsErr) {
  console.warn('⚠️ Custom DNS servers could not be set:', dnsErr.message);
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB Connection Error: ${err.message}`);
    console.log('⚠️ Running in offline/fallback mode. The server will remain active.');
  }
};

module.exports = connectDB;
