require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const { randomBytes, scryptSync } = require('crypto');

const MONGO_URI = process.env.MONGO_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_NAME = process.env.ADMIN_NAME || 'Administrator';

if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in .env.local');
  process.exit(1);
}
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('Please set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local');
  process.exit(1);
}

function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `scrypt$${salt}$${hash}`;
}

async function run() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection;

  const hashed = hashPassword(ADMIN_PASSWORD);

  try {
    const result = await db.collection('users').updateOne(
      { email: ADMIN_EMAIL.toLowerCase() },
      { $set: { name: ADMIN_NAME, email: ADMIN_EMAIL.toLowerCase(), password: hashed, role: 'admin' } },
      { upsert: true }
    );

    if (result.upsertedCount > 0) {
      console.log('Admin user created:', ADMIN_EMAIL);
    } else if (result.modifiedCount > 0) {
      console.log('Admin user updated:', ADMIN_EMAIL);
    } else {
      console.log('Admin user already exists and is unchanged:', ADMIN_EMAIL);
    }
  } catch (err) {
    console.error('Error creating admin user:', err && err.message);
  } finally {
    await mongoose.disconnect();
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
