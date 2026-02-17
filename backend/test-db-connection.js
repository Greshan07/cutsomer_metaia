// Test MongoDB Connection
const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

const testConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully!');
    console.log('📍 Database:', mongoose.connection.name);
    console.log('📍 Host:', mongoose.connection.host);
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📂 Collections:');
    collections.forEach(col => console.log(`   - ${col.name}`));
    
    await mongoose.connection.close();
    console.log('\n✅ Connection closed');
  } catch (error) {
    console.error('❌ Connection Error:', error.message);
  }
};

testConnection();
