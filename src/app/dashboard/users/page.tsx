import DashboardSidebar from "@/components/DashboardSidebar";
import { supabaseServer } from "@/lib/supabase-server";
import {
  createUser,
  deleteUser,
  updateUserPassword,
  updateUserRole,
} from "./actions";

export default async function DashboardUsersPage() {
  const { data: users, error } = await supabaseServer
    .from("users")
    .select("id, name, email, role, created_at")
    .order("created_at", { ascending: false });

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

          <form action={createUser} className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <input
              name="name"
              placeholder="Full name"
              className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email address"
              className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Temporary password"
              className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              required
            />

            <select
              name="role"
              defaultValue="volunteer"
              className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            >
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
              <option value="volunteer">Volunteer</option>
            </select>

            <div className="md:col-span-2 xl:col-span-4">
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full bg-sky-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700"
              >
                Create User
              </button>
            </div>
          </form>
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

          {error ? (
            <p className="mt-4 text-sm text-red-600">Failed to load users.</p>
          ) : (
            <div className="mt-6 space-y-4">
              {users?.map((user) => (
                <div
                  key={user.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-950">
                        {user.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">{user.email}</p>
                      <p className="mt-2 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700">
                        {user.role}
                      </p>
                    </div>

                    <div className="grid gap-4 xl:min-w-[540px] xl:grid-cols-3">
                      <form action={updateUserRole} className="space-y-2">
                        <input type="hidden" name="id" value={user.id} />
                        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Update Role
                        </label>
                        <select
                          name="role"
                          defaultValue={user.role}
                          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                        >
                          <option value="admin">Admin</option>
                          <option value="employee">Employee</option>
                          <option value="volunteer">Volunteer</option>
                        </select>
                        <button
                          type="submit"
                          className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                          Save Role
                        </button>
                      </form>

                      <form action={updateUserPassword} className="space-y-2">
                        <input type="hidden" name="id" value={user.id} />
                        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Reset Password
                        </label>
                        <input
                          name="password"
                          type="password"
                          placeholder="New password"
                          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                          required
                        />
                        <button
                          type="submit"
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                          Update Password
                        </button>
                      </form>

                      <form action={deleteUser} className="space-y-2">
                        <input type="hidden" name="id" value={user.id} />
                        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Remove User
                        </label>
                        <div className="flex h-11 items-center rounded-xl border border-red-200 bg-red-50 px-4 text-sm text-red-600">
                          Delete this account
                        </div>
                        <button
                          type="submit"
                          className="w-full rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                        >
                          Delete User
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}

              {!users?.length && (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
                  No users found.
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}