"use client";

import { Suspense, useEffect, useState } from "react";
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

function ProgramsContent() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshPrograms = async () => {
    const data = (await getPrograms()) as Program[];
    setPrograms(data || []);
  };

  useEffect(() => {
    refreshPrograms().finally(() => setLoading(false));
  }, []);

  const activeCount = programs.filter((p) => p.status === "active").length;

  return (
    <div className="flex min-h-screen w-full flex-col gap-6 bg-slate-100">
      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-semibold text-sky-600">Programs</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-950">Programs Management</h1>
            <p className="mt-2 text-sm text-slate-500">
              Total programs: {programs.length} | Active: {activeCount}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-blue-50 p-4">
              <p className="text-xs font-semibold text-blue-700">Total Programs</p>
              <p className="mt-1 text-2xl font-bold text-blue-900">{programs.length}</p>
            </div>
            <div className="rounded-lg bg-green-50 p-4">
              <p className="text-xs font-semibold text-green-700">Active</p>
              <p className="mt-1 text-2xl font-bold text-green-900">{activeCount}</p>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <p className="mb-3 text-sm font-semibold text-slate-700">
              {editingProgram ? "Edit Program" : "Create New Program"}
            </p>
            <ProgramForm
              key={editingProgram?._id || "new-program"}
              program={editingProgram || undefined}
              onSuccess={async () => {
                await refreshPrograms();
                setEditingProgram(null);
              }}
            />
            {editingProgram && (
              <button
                type="button"
                onClick={() => setEditingProgram(null)}
                className="mt-4 rounded-full bg-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-300"
              >
                Cancel Editing
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">All Programs</h2>
        {loading ? (
          <div className="flex h-40 items-center justify-center text-slate-500">Loading programs...</div>
        ) : (
          <ProgramList
            programs={programs}
            onEdit={(program) =>
              setEditingProgram(
                programs.find((item) => item._id === program._id) || null
              )
            }
            onDelete={refreshPrograms}
          />
        )}
      </div>
    </div>
  );
}

export default function ProgramsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <ProgramsContent />
    </Suspense>
  );
}