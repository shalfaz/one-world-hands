import connectToDatabase from "@/lib/mongoose";
import Program from "@/lib/models/Program";
import User from "@/lib/models/User";
import type { Program as ProgramType } from "@/types/ngo";

const accentByCategory = {
  health: {
    bg: "bg-red-50",
    ring: "ring-red-200",
    text: "text-red-700",
    gradientFrom: "from-red-400",
    gradientTo: "to-red-600",
  },
  education: {
    bg: "bg-blue-50",
    ring: "ring-blue-200",
    text: "text-blue-700",
    gradientFrom: "from-blue-400",
    gradientTo: "to-blue-600",
  },
  community: {
    bg: "bg-emerald-50",
    ring: "ring-emerald-200",
    text: "text-emerald-700",
    gradientFrom: "from-emerald-400",
    gradientTo: "to-emerald-600",
  },
  livelihood: {
    bg: "bg-purple-50",
    ring: "ring-purple-200",
    text: "text-purple-700",
    gradientFrom: "from-purple-400",
    gradientTo: "to-purple-600",
  },
  relief: {
    bg: "bg-orange-50",
    ring: "ring-orange-200",
    text: "text-orange-700",
    gradientFrom: "from-orange-400",
    gradientTo: "to-orange-600",
  },
  other: {
    bg: "bg-neutral-50",
    ring: "ring-neutral-200",
    text: "text-neutral-700",
    gradientFrom: "from-neutral-400",
    gradientTo: "to-neutral-600",
  },
} as const;

function transformToCarouselProgram(program: Record<string, unknown>): ProgramType {
  const category = String(program.category || "other");
  const accent = accentByCategory[category as keyof typeof accentByCategory] || accentByCategory.other;

  return {
    id: String(program._id || program.id || ""),
    title: String(program.title || ""),
    description: String(program.description || ""),
    category,
    location: String(program.location || "Global"),
    duration: String(program.duration || "Ongoing"),
    impactPoints: [
      "Supporting communities in need",
      "Creating lasting positive change",
      "Building resilience and capacity",
    ],
    href: `/programs/${program._id}`,
    accent,
  };
}

function getDefaultPrograms() {
  const now = new Date().toISOString();

  return [
    {
      _id: "food-assistance",
      title: "Food Assistance Program",
      description: "Providing food aid to vulnerable families.",
      category: "relief",
      location: "Global",
      status: "active",
      createdBy: { _id: "", name: "One World Hands", email: "" },
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: "medical-assistance",
      title: "Medical Assistance Program",
      description: "Healthcare and medical support for communities.",
      category: "health",
      location: "Global",
      status: "active",
      createdBy: { _id: "", name: "One World Hands", email: "" },
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: "education-support",
      title: "Education Support Program",
      description: "Access to education and learning materials.",
      category: "education",
      location: "Global",
      status: "active",
      createdBy: { _id: "", name: "One World Hands", email: "" },
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: "merit-scholarship",
      title: "Merit Scholarship Program",
      description: "Scholarships for high-achieving students.",
      category: "education",
      location: "Global",
      status: "active",
      createdBy: { _id: "", name: "One World Hands", email: "" },
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: "self-reliance",
      title: "Self-Reliance & Livelihood Program",
      description: "Skills training and livelihood support.",
      category: "livelihood",
      location: "Global",
      status: "active",
      createdBy: { _id: "", name: "One World Hands", email: "" },
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: "clean-water",
      title: "Clean Water Program",
      description: "Safe water and sanitation projects.",
      category: "community",
      location: "Global",
      status: "active",
      createdBy: { _id: "", name: "One World Hands", email: "" },
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: "tree-plantation",
      title: "Tree Plantation Program",
      description: "Planting trees and environmental restoration.",
      category: "community",
      location: "Global",
      status: "active",
      createdBy: { _id: "", name: "One World Hands", email: "" },
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: "winter-support",
      title: "Winter Support Program",
      description: "Winter clothing and heating assistance.",
      category: "relief",
      location: "Global",
      status: "active",
      createdBy: { _id: "", name: "One World Hands", email: "" },
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: "ramadan-iftar",
      title: "Ramadan Food & Iftar Program",
      description: "Iftar distributions and Ramadan food support.",
      category: "relief",
      location: "Global",
      status: "active",
      createdBy: { _id: "", name: "One World Hands", email: "" },
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: "qurbani-eid",
      title: "Qurbani for Everyone (Eid Project)",
      description: "Qurbani meat distribution for families during Eid.",
      category: "relief",
      location: "Global",
      status: "active",
      createdBy: { _id: "", name: "One World Hands", email: "" },
      createdAt: now,
      updatedAt: now,
    },
  ];
}

export async function getPublishedPrograms() {
  try {
    if (!process.env.MONGO_URI && !process.env.MONGODB_URI) {
      console.log("No MongoDB URI configured, using default programs");
      return getDefaultPrograms();
    }

    try {
      await connectToDatabase();
    } catch (dbError) {
      console.warn(
        "Database connection failed, falling back to default programs:",
        dbError instanceof Error ? dbError.message : String(dbError)
      );
      return getDefaultPrograms();
    }

    const programs = await Program.find({ status: "active" })
      .lean()
      .sort({ createdAt: -1 });

    if (!programs || programs.length === 0) {
      console.log("No active programs in database, using defaults");
      return getDefaultPrograms();
    }

    // Manually fetch user data and convert to plain objects
    const programsWithUsers = await Promise.all(
      programs.map(async (program: Record<string, unknown>) => {
        const user = await User.findById(program.createdBy)
          .select("name email")
          .lean();
        return {
          _id: String(program._id),
          title: program.title,
          description: program.description || "",
          category: program.category,
          location: program.location,
          status: program.status,
          createdBy: {
            _id: user ? String(user._id) : "",
            name: user?.name || "Unknown",
            email: user?.email || "unknown@example.com",
          },
          createdAt: String(program.createdAt),
          updatedAt: String(program.updatedAt),
        };
      })
    );

    return programsWithUsers;
  } catch (error) {
    console.error("Unexpected error in getPublishedPrograms:", error);
    return getDefaultPrograms();
  }
}

export async function getPublishedProgramsForCarousel(): Promise<ProgramType[]> {
  const programs = await getPublishedPrograms();
  return programs.map(transformToCarouselProgram);
}
