require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
if (!MONGO_URI) {
  console.error("MONGO_URI is not defined in environment. Set it in .env.local");
  process.exit(1);
}

const funds = [
  {
    slug: "general-donation",
    name: "General Donation Fund",
    category: "other",
    description:
      "Support our overall humanitarian mission and help us respond wherever the need is greatest.",
    impactSummary:
      "Flexible support for urgent and emerging community priorities.",
    status: "active",
  },
  {
    slug: "hunger-relief",
    name: "Hunger Relief Fund",
    category: "emergency",
    description:
      "Provide nutritious meals and food assistance to families facing hunger and food insecurity.",
    impactSummary: "Meals and food packages for families in crisis.",
    status: "active",
  },
  {
    slug: "medical-aid",
    name: "Medical Aid Fund",
    category: "health",
    description:
      "Deliver essential healthcare, medicine, and treatment to people who cannot afford medical care.",
    impactSummary: "Medicine, check-ups, and emergency treatment support.",
    status: "active",
  },
  {
    slug: "education-support",
    name: "Education Support Fund",
    category: "education",
    description:
      "Help children and youth access quality education, school supplies, and safe learning spaces.",
    impactSummary: "Books, tuition support, and learning materials for students.",
    status: "active",
  },
  {
    slug: "merit-scholarship",
    name: "Merit Scholarship Fund",
    category: "education",
    description:
      "Award scholarships to deserving students pursuing higher education and vocational training.",
    impactSummary: "Scholarships for talented students with limited means.",
    status: "active",
  },
  {
    slug: "self-reliance-livelihood",
    name: "Self-Reliance & Livelihood Fund",
    category: "livelihood",
    description:
      "Empower families with skills training, tools, and income-generating opportunities.",
    impactSummary: "Vocational training and small business startup support.",
    status: "active",
  },
  {
    slug: "clean-water",
    name: "Clean Water Fund",
    category: "community",
    description:
      "Install wells and water systems to bring safe drinking water to underserved communities.",
    impactSummary: "Clean water access for families and schools.",
    status: "active",
  },
  {
    slug: "tree-plantation",
    name: "Tree Plantation Fund",
    category: "community",
    description:
      "Plant trees to protect the environment, prevent erosion, and support sustainable communities.",
    impactSummary: "Tree planting drives and green community initiatives.",
    status: "active",
  },
  {
    slug: "emergency-relief",
    name: "Emergency Relief Fund",
    category: "emergency",
    description:
      "Respond quickly to disasters and crises with urgent shelter, food, and humanitarian aid.",
    impactSummary: "Rapid response for floods, fires, and sudden emergencies.",
    status: "active",
  },
  {
    slug: "winter-support",
    name: "Winter Support Fund",
    category: "emergency",
    description:
      "Provide warm clothing, blankets, and heating support to families during cold months.",
    impactSummary: "Winter kits and warmth for vulnerable households.",
    status: "active",
  },
  {
    slug: "ramadan-food-iftar",
    name: "Ramadan Food & Iftar Fund",
    category: "community",
    description:
      "Distribute food packages and iftar meals to families during the holy month of Ramadan.",
    impactSummary: "Iftar meals and Ramadan food baskets for families in need.",
    status: "active",
  },
  {
    slug: "zakat",
    name: "Zakat Fund",
    category: "other",
    description:
      "Fulfill your Zakat obligation through transparent, dignified distribution to eligible recipients.",
    impactSummary: "Sharia-compliant Zakat collection and distribution.",
    status: "active",
  },
  {
    slug: "sadaqah-jariyah",
    name: "Sadaqah Jariyah Fund",
    category: "community",
    description:
      "Support ongoing charitable projects that continue benefiting communities for years to come.",
    impactSummary:
      "Long-lasting charity through water, education, and community assets.",
    status: "active",
  },
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  const users = db.collection("users");
  const fundsCollection = db.collection("funds");

  const admin =
    (await users.findOne({ email: "admin@example.com" })) ||
    (await users.findOne({}));

  if (!admin) {
    console.error("No user found. Create a dashboard user first.");
    process.exit(1);
  }

  let created = 0;
  let updated = 0;
  const now = new Date();

  for (const fund of funds) {
    const result = await fundsCollection.updateOne(
      { slug: fund.slug },
      {
        $set: {
          ...fund,
          targetAmount: 0,
          raisedAmount: 0,
          updatedAt: now,
        },
        $setOnInsert: {
          createdBy: admin._id,
          createdAt: now,
        },
      },
      { upsert: true }
    );

    if (result.upsertedCount > 0) created += 1;
    else if (result.modifiedCount > 0) updated += 1;
  }

  console.log(`Funds seeded: ${created} created, ${updated} updated (${funds.length} total).`);
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
