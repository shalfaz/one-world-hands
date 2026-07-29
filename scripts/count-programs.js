require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in environment. Set it in .env.local');
  process.exit(1);
}

async function count() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection;
  try {
    const count = await db.collection('programs').countDocuments();
    console.log('programs count:', count);
  } catch (err) {
    console.error('Error counting programs:', err && err.message);
  } finally {
    await mongoose.disconnect();
  }
}

count().catch((e) => {
  console.error(e);
  process.exit(1);
});
