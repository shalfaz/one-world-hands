import DashboardSidebar from "@/components/DashboardSidebar";
import { createUser } from "./actions";
import User from "@/lib/models/User";
import connectToDatabase from "@/lib/mongoose";
import { UserActions } from "./UserActions";
import UserCreateForm from "./UserCreateForm";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

const USERS_PER_PAGE = 10;

export default async function DashboardUsersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1", 10);
  
  let users: any[] = [];
  let totalUsers = 0;
  
  try {
    await connectToDatabase();
    totalUsers = await User.countDocuments();
    const skip = (currentPage - 1) * USERS_PER_PAGE;
    users = await User.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(USERS_PER_PAGE)
      .lean();
  } catch (error) {
    console.error("Error fetching users:", error);
  }

  const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#e2e8f0" }}>
      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-sky-600">Users</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
            User Management
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Create employee, volunteer, or admin accounts and manage roles and
            passwords from one place.
          </p>
        </div>

        <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">
            Create New User
          </h2>

          <UserCreateForm />
        </div>

        <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">
                Existing Users
              </h2>
              <p className="text-sm text-slate-500">
                Total users: {users?.length || 0}
              </p>
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
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user: any) => (
                        <tr key={user._id.toString()} className="border-b border-slate-200 hover:bg-slate-50">
                          <td className="px-4 py-3 text-slate-900">{user.name}</td>
                          <td className="px-4 py-3 text-slate-600">{user.email}</td>
                          <td className="px-4 py-3">
                            <UserActions userId={user._id.toString()} currentRole={user.role} />
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <button className="text-red-600 hover:text-red-700 font-semibold text-xs">
                              Delete
                            </button>
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
                            ? "bg-sky-600 text-white"
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
      </main>
    </div>
  );
}