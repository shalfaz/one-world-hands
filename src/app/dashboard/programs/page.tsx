import DashboardSidebar from "../../../components/DashboardSidebar";
import { getPrograms } from "./actions";
import ProgramForm from "./ProgramForm";
import ProgramList from "./ProgramList";

interface Program {
  _id: string;
  title: string;
  description?: string;
  category: string;
  location: string;
  status: "active" | "draft" | "inactive";
  createdBy: { _id: string; name: string; email: string };
  createdAt: string;
  updatedAt: string;
}

export default async function ProgramsPage() {
  const programs = (await getPrograms()) as Program[];
  const activeCount = programs.filter((p) => p.status === "active").length;

  return (
    <div className="flex min-h-screen bg-slate-100">
      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-8">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-sm font-semibold text-sky-600">Programs</p>
              <h1 className="mt-1 text-3xl font-bold text-slate-950">
                Programs Management
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Total programs: {programs?.length || 0} | Active: {activeCount}
              </p>
            </div>

            <ProgramForm />
          </div>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">All Programs</h2>
          <ProgramList programs={programs} />
        </div>
      </main>
    </div>
  );
}