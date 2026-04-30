import connectToDatabase from "@/lib/mongoose";
import Fund from "@/lib/models/Fund";
import User from "@/lib/models/User";

export async function getActiveFunds() {
  try {
    await connectToDatabase();

    // Get only active funds with user information
    const funds = await Fund.find({ status: "active" })
      .lean()
      .sort({ createdAt: -1 });

    // Manually join with user data to avoid circular references
    const fundsWithUsers = await Promise.all(
      funds.map(async (fund: any) => {
        let createdByUser = null;
        if (fund.createdBy) {
          const user = await User.findById(fund.createdBy).lean();
          if (user) {
            createdByUser = {
              _id: String(user._id),
              name: user.name,
              email: user.email,
            };
          }
        }

        return {
          _id: String(fund._id),
          name: fund.name,
          description: fund.description,
          category: fund.category,
          impactSummary: fund.impactSummary,
          targetAmount: fund.targetAmount,
          raisedAmount: fund.raisedAmount,
          status: fund.status,
          createdBy: createdByUser,
          createdAt: fund.createdAt,
          updatedAt: fund.updatedAt,
        };
      })
    );

    return fundsWithUsers;
  } catch (error) {
    console.error("Error fetching funds:", error);
    return [];
  }
}
