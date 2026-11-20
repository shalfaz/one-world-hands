import User from "@/lib/models/User";
import connectToDatabase from "@/lib/mongoose";
import { UserActions } from "./UserActions";
import UserCreateForm from "./UserCreateForm";
import { requireAdminUser } from "@/lib/auth/admin";
import { getDashboardActionError } from "@/lib/dashboard/errors";

type UserRecord = {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

const USERS_PER_PAGE = 10;

export default async function DashboardUsersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1", 10);
  
  let users: UserRecord[] = [];
  let totalUsers = 0;
  let loadError = "";
  
  try {
    await requireAdminUser();
    await connectToDatabase();
    totalUsers = await User.countDocuments();
    const skip = (currentPage - 1) * USERS_PER_PAGE;
    const userDocuments = await User.find()
      .select("name email role createdAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(USERS_PER_PAGE)
      .lean();
    users = userDocuments.map((user) => ({
      _id: String(user._id),
      name: String(user.name),
      email: String(user.email),
      role: String(user.role),
      createdAt: new Date(user.createdAt).toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    loadError = getDashboardActionError(error, "Could not load users. Please try again.");
  }

  const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#f1f5f0" }}>
      <div className="w-full">
        <div className="rounded-2xl border border-[#dce5de] bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52715e]">Users</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#183b2c]">
            User Management
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Create employee, volunteer, or admin accounts and manage roles and
            passwords from one place.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-[#dce5de] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#183b2c]">
            Create New User
          </h2>

          <UserCreateForm />
          {loadError && (
            <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {loadError}
            </p>
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-[#dce5de] bg-white p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">
                Existing Users
              </h2>
              <p className="text-sm text-slate-500">
                Total users: {totalUsers}
              </p>
            </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {users.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Name</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Email</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Role</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id} className="border-b border-slate-200 hover:bg-slate-50">
                          <td className="px-4 py-3 text-slate-900">{user.name}</td>
                          <td className="px-4 py-3 text-slate-600">{user.email}</td>
                          <td className="px-4 py-3">
                            <UserActions userId={user._id} currentRole={user.role} />
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="mt-6 flex items-center justify-center gap-2">
                    {currentPage > 1 && (
                      <a
                        href={`?page=${currentPage - 1}`}
                        className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        Previous
                      </a>
                    )}

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <a
                        key={page}
                        href={`?page=${page}`}
                        className={`rounded-md px-3 py-2 text-sm font-semibold ${
                          page === currentPage
                            ? "bg-[#176345] text-white"
                            : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {page}
                      </a>
                    ))}

                    {currentPage < totalPages && (
                      <a
                        href={`?page=${currentPage + 1}`}
                        className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        Next
                      </a>
                    )}
                  </div>
                )}
              </>
            ) : (
              <p className="text-center text-slate-500 py-8">No users found. Create your first user above.</p>
            )}
          </div>
        </div>
    </div>
  );
}