import connectToDatabase from "@/lib/mongoose";
import Resource from "@/lib/models/Resource";
import User from "@/lib/models/User";

export async function getPublishedResources() {
  try {
    await connectToDatabase();
    const resources = await Resource.find({ status: "published" })
      .lean()
      .sort({ createdAt: -1 });

    // Manually fetch user data and convert to plain objects
    const resourcesWithUsers = await Promise.all(
      resources.map(async (resource: Record<string, unknown>) => {
        const user = await User.findById(resource.createdBy)
          .select("name email")
          .lean();
        return {
          _id: String(resource._id),
          title: resource.title,
          description: resource.description || "",
          type: resource.type,
          status: resource.status,
          youtubeLink: resource.youtubeLink || "",
          content: resource.content || "",
          fileUrl: resource.fileUrl || "",
          fileType: resource.fileType || "",
          createdBy: {
            _id: user ? String(user._id) : "",
            name: user?.name || "Unknown",
            email: user?.email || "unknown@example.com",
          },
          createdAt: String(resource.createdAt),
          updatedAt: String(resource.updatedAt),
        };
      })
    );

    return resourcesWithUsers;
  } catch (error) {
    console.error("Get published resources error:", error);
    return [];
  }
}
