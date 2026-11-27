"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { getPrograms } from "./actions";
import ProgramForm from "./ProgramForm";
import ProgramList from "./ProgramList";
import { getDashboardActionError } from "@/lib/dashboard/errors";
import { useLanguage } from "@/context/LanguageContext";
import T from "@/components/T";

interface Program {
  _id: string;
  title: string;
  description?: string;
  category: string;
  location: string;
  status: string;
  createdBy: { _id: string; name: string; email: string };
  createdAt: string;
  updatedAt: string;
}

function ProgramsContent() {
  const { t, tr } = useLanguage();
  const tRef = useRef(t);
  useEffect(() => {
    tRef.current = t;
  }, [t]);

  const [programs, setPrograms] = useState<Program[]>([]);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const refreshPrograms = useCallback(async () => {
    try {
      const data = await getPrograms();
      setPrograms(data);
      setLoadError("");
    } catch (error) {
      console.error("Error loading programs:", error);
      setLoadError(
        getDashboardActionError(error, tRef.current.manage.programs.loadErrorFallback)
      );
    }
  }, []);

  useEffect(() => {
    let active = true;
    Promise.resolve()
      .then(async () => {
        if (active) await refreshPrograms();
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [refreshPrograms]);

  const activeCount = programs.filter((p) => p.status === "active").length;

  return (
    <div className="flex min-h-screen w-full flex-col gap-6 bg-[#F7FAFC]">
      <div className="rounded-2xl border border-[#D9E2EC] bg-white p-6">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#174A70]">{t.manage.programs.eyebrow}</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#174A70]">{t.manage.programs.title}</h1>
            <p className="mt-2 text-sm text-slate-500">
              {tr("manage.programs.summaryLine", { total: programs.length, active: activeCount })}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] p-4">
              <p className="text-xs font-medium text-neutral-500">{t.manage.programs.stats.totalPrograms}</p>
              <p className="mt-1 text-2xl font-semibold text-[#174A70]">{programs.length}</p>
            </div>
            <div className="rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] p-4">
              <p className="text-xs font-medium text-neutral-500">{t.manage.programs.stats.active}</p>
              <p className="mt-1 text-2xl font-semibold text-[#174A70]">{activeCount}</p>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <p className="mb-3 text-sm font-semibold text-slate-700">
              {editingProgram ? t.manage.programs.editProgram : t.manage.programs.createNewProgram}
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
                {t.manage.common.cancelEditing}
              </button>
            )}
          </div>
          {loadError && (
            <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {loadError}
            </p>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-[#D9E2EC] bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">{t.manage.programs.allPrograms}</h2>
        {loading ? (
          <div className="flex h-40 items-center justify-center text-slate-500">{t.manage.programs.loadingPrograms}</div>
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
    <Suspense fallback={<div className="p-8 text-center"><T k="manage.common.loading" /></div>}>
      <ProgramsContent />
    </Suspense>
  );
}