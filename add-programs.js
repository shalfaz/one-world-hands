#!/usr/bin/env node

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI not set in .env.local');
  process.exit(1);
}

// Define schemas
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  resetPasswordToken: { type: String, default: null },
  resetPasswordExpiry: { type: Date, default: null },
}, { timestamps: true });

const ProgramSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, trim: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['health', 'education', 'community', 'livelihood', 'relief', 'other']
  },
  location: { type: String, required: true, trim: true },
  status: { 
    type: String, 
    enum: ['active', 'draft', 'inactive'],
    default: 'draft'
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
const Program = mongoose.model('Program', ProgramSchema);

const programs = [
  {
    title: 'Food Assistance Program',
    description: 'Providing nutritious meals to families in need. Our food assistance program ensures no one goes hungry. We distribute food packages to vulnerable populations including children, elderly, and displaced families.',
    category: 'health',
    location: 'Dhaka, Bangladesh',
    status: 'active',
  },
  {
    title: 'Medical Assistance Initiative',
    description: 'Free medical checkups and treatment for underprivileged communities. We provide healthcare services including diagnostics, medicines, and emergency medical support.',
    category: 'health',
    location: 'Chittagong, Bangladesh',
    status: 'active',
  },
  {
    title: 'Education Support Scholarship',
    description: 'Scholarships and educational materials for deserving students. We help bright students from low-income families access quality education.',
    category: 'education',
    location: 'Multiple locations',
    status: 'active',
  },
  {
    title: 'Skill Development Training',
    description: 'Vocational training programs to build marketable skills. We offer courses in IT, tailoring, plumbing, and other trades to help people become self-sufficient.',
    category: 'livelihood',
    location: 'Dhaka, Chittagong',
    status: 'active',
  },
  {
    title: 'Clean Water Project',
    description: 'Installing wells and water purification systems in rural areas. Access to clean water is essential for health and dignity.',
    category: 'community',
    location: 'Rural Bangladesh',
    status: 'active',
  },
  {
    title: 'Tree Plantation Drive',
    description: 'Environmental conservation through large-scale tree planting. We aim to make Bangladesh greener while creating environmental awareness.',
    category: 'community',
    location: 'Throughout Bangladesh',
    status: 'active',
  },
  {
    title: 'Winter Support Program',
    description: 'Warm clothes, blankets, and shelter support during winter months. We ensure vulnerable populations have adequate protection from cold.',
    category: 'relief',
    location: 'Northern regions',
    status: 'active',
  },
  {
    title: 'Ramadan Iftar Program',
    description: 'Daily iftar meals and food packages during Ramadan month. We provide nutritious meals to help fasting individuals and families.',
    category: 'relief',
    location: 'Multiple locations',
    status: 'active',
  },
  {
    title: 'Qurbani & Eid Support',
    description: 'Qurbani meat distribution and Eid gift packages for low-income families. We ensure everyone celebrates Eid with dignity and joy.',
    category: 'relief',
    location: 'Nationwide',
    status: 'active',
  },
  {
    title: 'Women Empowerment Initiative',
    description: 'Microfinance and business training for women entrepreneurs. We support women to become economically independent and leaders in their communities.',
    category: 'livelihood',
    location: 'Various districts',
    status: 'active',
  },
];

async function addPrograms() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Find admin user
    const adminUser = await User.findOne({ email: 'admin@example.com' });
    if (!adminUser) {
      console.log('⚠️  Admin user not found. Creating one...');
      const hashedPassword = require('./src/lib/password').hashPassword('change_me_now');
      const newAdmin = await User.create({
        name: 'Admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
      });
      console.log('✅ Admin user created');
    }

    const admin = await User.findOne({ email: 'admin@example.com' });
    console.log(`👤 Using admin user: ${admin.email}`);

    // Clear existing programs
    const deletedCount = await Program.deleteMany({});
    console.log(`🗑️  Removed ${deletedCount.deletedCount} existing programs`);

    // Add programs with admin as creator
    const programsWithCreator = programs.map(p => ({
      ...p,
      createdBy: admin._id,
    }));

    const result = await Program.insertMany(programsWithCreator);
    console.log(`✅ Added ${result.length} programs to database:`);
    result.forEach((p, i) => {
      console.log(`   ${i + 1}. ${p.title} (${p.category})`);
    });

    console.log('\n✅ All programs added successfully!');
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addPrograms();
