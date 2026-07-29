require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in environment. Set it in .env.local');
  process.exit(1);
}

async function seed() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection;
  const now = new Date();

  const programs = [
    { title: 'Food Assistance Program', description: 'Providing food aid to vulnerable families.', category: 'relief', location: 'Global', status: 'active', createdBy: new mongoose.Types.ObjectId(), createdAt: now, updatedAt: now },
    { title: 'Medical Assistance Program', description: 'Healthcare and medical support for communities.', category: 'health', location: 'Global', status: 'active', createdBy: new mongoose.Types.ObjectId(), createdAt: now, updatedAt: now },
    { title: 'Education Support Program', description: 'Access to education and learning materials.', category: 'education', location: 'Global', status: 'active', createdBy: new mongoose.Types.ObjectId(), createdAt: now, updatedAt: now },
    { title: 'Merit Scholarship Program', description: 'Scholarships for high-achieving students.', category: 'education', location: 'Global', status: 'active', createdBy: new mongoose.Types.ObjectId(), createdAt: now, updatedAt: now },
    { title: 'Self-Reliance & Livelihood Program', description: 'Skills training and livelihood support.', category: 'livelihood', location: 'Global', status: 'active', createdBy: new mongoose.Types.ObjectId(), createdAt: now, updatedAt: now },
    { title: 'Clean Water Program', description: 'Safe water and sanitation projects.', category: 'community', location: 'Global', status: 'active', createdBy: new mongoose.Types.ObjectId(), createdAt: now, updatedAt: now },
    { title: 'Tree Plantation Program', description: 'Planting trees and environmental restoration.', category: 'community', location: 'Global', status: 'active', createdBy: new mongoose.Types.ObjectId(), createdAt: now, updatedAt: now },
    { title: 'Winter Support Program', description: 'Winter clothing and heating assistance.', category: 'relief', location: 'Global', status: 'active', createdBy: new mongoose.Types.ObjectId(), createdAt: now, updatedAt: now },
    { title: 'Ramadan Food & Iftar Program', description: 'Iftar distributions and Ramadan food support.', category: 'relief', location: 'Global', status: 'active', createdBy: new mongoose.Types.ObjectId(), createdAt: now, updatedAt: now },
    { title: 'Qurbani for Everyone (Eid Project)', description: 'Qurbani meat distribution for families during Eid.', category: 'relief', location: 'Global', status: 'active', createdBy: new mongoose.Types.ObjectId(), createdAt: now, updatedAt: now },
  ];

  try {
    const result = await db.collection('programs').insertMany(programs, { ordered: false });
    console.log('Inserted programs:', result.insertedCount);
  } catch (err) {
    console.error('Insert error (continuing):', err && err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
