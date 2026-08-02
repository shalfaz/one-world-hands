require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function testDB() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    // Check collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📊 Collections in database:');
    collections.forEach(c => console.log('  - ' + c.name));
    
    // Check users
    const users = await User.find({});
    console.log('\n👥 Users in database:', users.length);
    users.forEach(u => {
      console.log(`  - ${u.email} (role: ${u.role})`);
    });
    
    if (users.length === 0) {
      console.log('\n❌ No users found! Need to create admin user.');
    }
    
    await mongoose.disconnect();
    console.log('\n✅ Test completed');
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

testDB();
