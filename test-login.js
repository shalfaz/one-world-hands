require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const { randomBytes, scryptSync } = require('crypto');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

function verifyPassword(password, hash) {
  if (!hash.startsWith('scrypt$')) return false;
  const [, salt, hashPart] = hash.split('$');
  const testHash = scryptSync(password, salt, 64).toString('hex');
  return testHash === hashPart;
}

async function testLogin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');
    
    const email = 'admin@example.com';
    const password = 'change_me_now';
    
    console.log(`Testing login for: ${email}`);
    console.log(`Password: ${password}\n`);
    
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('❌ User not found!');
      process.exit(1);
    }
    
    console.log('✅ User found');
    console.log(`  - Email: ${user.email}`);
    console.log(`  - Role: ${user.role}`);
    console.log(`  - Password hash exists: ${!!user.password}`);
    console.log(`  - Password hash: ${user.password?.substring(0, 30)}...`);
    
    const isValid = verifyPassword(password, user.password);
    console.log(`\n🔐 Password verification: ${isValid ? '✅ VALID' : '❌ INVALID'}`);
    
    if (!isValid) {
      console.log('\n⚠️  Password mismatch! You may need to reset the password.');
    }
    
    await mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

testLogin();
