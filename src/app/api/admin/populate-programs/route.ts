import { connectToDatabase } from '@/lib/mongoose';
import { User } from '@/lib/models/User';
import Program from '@/lib/models/Program';

const PROGRAMS_DATA = [
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

export async function POST() {
  try {
    // Only allow in development
    if (process.env.NODE_ENV === 'production') {
      return Response.json(
        { error: 'Not allowed in production' },
        { status: 403 }
      );
    }

    await connectToDatabase();

    // Get admin user
    const admin = await User.findOne({ email: 'admin@example.com' });
    if (!admin) {
      return Response.json(
        { error: 'Admin user not found. Create admin@example.com first.' },
        { status: 400 }
      );
    }

    // Clear existing programs
    const deleteResult = await Program.deleteMany({});

    // Add new programs
    const programsWithCreator = PROGRAMS_DATA.map(p => ({
      ...p,
      createdBy: admin._id,
    }));

    const insertedPrograms = await Program.insertMany(programsWithCreator);

    return Response.json({
      success: true,
      message: `✅ Added ${insertedPrograms.length} programs to database`,
      deleted: deleteResult.deletedCount,
      added: insertedPrograms.length,
      programs: insertedPrograms.map(p => ({
        id: p._id,
        title: p.title,
        category: p.category,
        status: p.status,
      })),
    });
  } catch (error) {
    console.error('Error populating programs:', error);
    return Response.json(
      {
        error: 'Failed to populate programs',
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
