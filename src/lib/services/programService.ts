import connectToDatabase from "@/lib/mongoose";
import Program from "@/lib/models/Program";
import User from "@/lib/models/User";

export async function getPublishedPrograms() {
  try {
    await connectToDatabase();
    const programs = await Program.find({ status: "active" })
      .lean()
      .sort({ createdAt: -1 });

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
    console.error("Get published programs error:", error);
    return [];
  }
}
