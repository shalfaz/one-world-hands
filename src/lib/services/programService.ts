import connectToDatabase from "@/lib/mongoose";
import Program from "@/lib/models/Program";
import User from "@/lib/models/User";

export async function getPublishedPrograms() {
  try {
    await connectToDatabase();
    const programs = await Program.find({ status: "active" })
      .lean()
      .sort({ createdAt: -1 });

    // If no programs found in DB, return a curated default list so the
    // public Programs page shows the organization's core offerings.
    if (!programs || programs.length === 0) {
      const now = new Date().toISOString();
      const defaultPrograms = [
        { _id: "food-assistance", title: "Food Assistance Program", description: "Providing food aid to vulnerable families.", category: "relief", location: "Global", status: "active", createdBy: { _id: "", name: "One World Hands", email: "" }, createdAt: now, updatedAt: now },
        { _id: "medical-assistance", title: "Medical Assistance Program", description: "Healthcare and medical support for communities.", category: "health", location: "Global", status: "active", createdBy: { _id: "", name: "One World Hands", email: "" }, createdAt: now, updatedAt: now },
        { _id: "education-support", title: "Education Support Program", description: "Access to education and learning materials.", category: "education", location: "Global", status: "active", createdBy: { _id: "", name: "One World Hands", email: "" }, createdAt: now, updatedAt: now },
        { _id: "merit-scholarship", title: "Merit Scholarship Program", description: "Scholarships for high-achieving students.", category: "education", location: "Global", status: "active", createdBy: { _id: "", name: "One World Hands", email: "" }, createdAt: now, updatedAt: now },
        { _id: "self-reliance", title: "Self-Reliance & Livelihood Program", description: "Skills training and livelihood support.", category: "livelihood", location: "Global", status: "active", createdBy: { _id: "", name: "One World Hands", email: "" }, createdAt: now, updatedAt: now },
        { _id: "clean-water", title: "Clean Water Program", description: "Safe water and sanitation projects.", category: "community", location: "Global", status: "active", createdBy: { _id: "", name: "One World Hands", email: "" }, createdAt: now, updatedAt: now },
        { _id: "tree-plantation", title: "Tree Plantation Program", description: "Planting trees and environmental restoration.", category: "community", location: "Global", status: "active", createdBy: { _id: "", name: "One World Hands", email: "" }, createdAt: now, updatedAt: now },
        { _id: "winter-support", title: "Winter Support Program", description: "Winter clothing and heating assistance.", category: "relief", location: "Global", status: "active", createdBy: { _id: "", name: "One World Hands", email: "" }, createdAt: now, updatedAt: now },
        { _id: "ramadan-iftar", title: "Ramadan Food & Iftar Program", description: "Iftar distributions and Ramadan food support.", category: "relief", location: "Global", status: "active", createdBy: { _id: "", name: "One World Hands", email: "" }, createdAt: now, updatedAt: now },
        { _id: "qurbani-eid", title: "Qurbani for Everyone (Eid Project)", description: "Qurbani meat distribution for families during Eid.", category: "relief", location: "Global", status: "active", createdBy: { _id: "", name: "One World Hands", email: "" }, createdAt: now, updatedAt: now },
      ];

      return defaultPrograms;
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
    console.error("Get published programs error:", error);
    return [];
  }
}
