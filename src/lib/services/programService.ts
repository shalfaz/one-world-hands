import connectToDatabase from "@/lib/mongoose";
import Program from "@/lib/models/Program";
import User from "@/lib/models/User";
import type { Program as ProgramType } from "@/types/ngo";

const programOrder: Record<string, number> = {
  "food assistance program": 0,
  "medical assistance program": 1,
  "medical assistance initiative": 1,
  "education support program": 2,
  "education support scholarship": 2,
  "merit scholarship program": 3,
  "self-reliance & livelihood program": 4,
  "skill development training": 4,
  "women empowerment initiative": 4,
  "clean water program": 5,
  "clean water project": 5,
  "tree plantation program": 6,
  "tree plantation drive": 6,
  "winter support program": 7,
  "ramadan food & iftar program": 8,
  "ramadan iftar program": 8,
  "qurbani for everyone (eid project)": 9,
  "qurbani & eid support": 9,
};

const displayTitleBySourceTitle: Record<string, string> = {
  "medical assistance initiative": "Medical Assistance Program",
  "education support scholarship": "Education Support Program",
  "skill development training": "Self-Reliance & Livelihood Program",
  "clean water project": "Clean Water Program",
  "tree plantation drive": "Tree Plantation Program",
  "ramadan iftar program": "Ramadan Food & Iftar Program",
  "qurbani & eid support": "Qurbani for Everyone (Eid Project)",
};

function normalizeProgramTitle(title: unknown): string {
  return String(title ?? "")
    .normalize("NFC")
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("en");
}

export function sortProgramsByOrder<T extends { title: unknown }>(
  programs: T[]
): T[] {
  const orderedPrograms = [...programs].sort((a, b) => {
    const titleA = normalizeProgramTitle(a.title);
    const titleB = normalizeProgramTitle(b.title);
    const priorityA = programOrder[titleA] ?? Number.MAX_SAFE_INTEGER;
    const priorityB = programOrder[titleB] ?? Number.MAX_SAFE_INTEGER;
    return priorityA - priorityB || titleA.localeCompare(titleB, "en");
  });

  return orderedPrograms;
}

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
    imageUrl: String(program.imageUrl || ""),
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

export async function getPublishedPrograms() {
  try {
    await connectToDatabase();

    const programs = await Program.find({
      $or: [
        {
          status: "active",
          $or: [{ published: true }, { published: { $exists: false } }],
        },
        {
          title: "Merit Scholarship Program",
          status: "draft",
          category: "education",
        },
      ],
    })
      .lean()
      .sort({ createdAt: -1 });

    if (!programs.length) return [];

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
          imageUrl: program.imageUrl || "",
          published: Boolean(program.published ?? program.status === "active"),
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

    return sortProgramsByOrder(programsWithUsers).map((program) => ({
      ...program,
      title:
        displayTitleBySourceTitle[normalizeProgramTitle(program.title)] ??
        program.title,
    }));
  } catch (error) {
    console.error("Unexpected error in getPublishedPrograms:", error);
    throw error;
  }
}

export async function getPublishedProgramsForCarousel(): Promise<ProgramType[]> {
  const programs = await getPublishedPrograms();
  return programs.map(transformToCarouselProgram);
}
