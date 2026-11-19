import connectToDatabase from "@/lib/mongoose";
import Fund from "@/lib/models/Fund";
import User from "@/lib/models/User";

export async function getActiveFunds() {
  await connectToDatabase();

  const funds = await Fund.find({
    status: "active",
    $or: [{ published: true }, { published: { $exists: false } }],
  })
    .lean()
    .sort({ createdAt: -1 });

  return Promise.all(
    funds.map(async (fund) => {
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
        slug: fund.slug || "",
        name: fund.name,
        description: fund.description,
        category: fund.category,
        impactSummary: fund.impactSummary,
        targetAmount: fund.targetAmount,
        raisedAmount: fund.raisedAmount,
        status: fund.status,
        imageUrl: fund.imageUrl || "",
        createdBy: createdByUser,
        createdAt: fund.createdAt,
        updatedAt: fund.updatedAt,
      };
    })
  );
}
