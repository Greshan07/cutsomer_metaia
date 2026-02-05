const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log('💡 Make sure MongoDB is running on your system');
    console.log('   You can install MongoDB locally or use MongoDB Atlas (cloud)');
    process.exit(1);
  }
};

module.exports = connectDB;
