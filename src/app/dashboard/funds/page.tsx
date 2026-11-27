"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import FundForm from "./FundForm";
import FundList from "./FundList";
import { getFunds, seedDefaultFunds } from "./actions";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { getDashboardActionError } from "@/lib/dashboard/errors";
import { useLanguage } from "@/context/LanguageContext";
import T from "@/components/T";

function FundsContent() {
  const { t, tr } = useLanguage();
  const tRef = useRef(t);
  useEffect(() => {
    tRef.current = t;
  }, [t]);

  const [funds, setFunds] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFund, setEditingFund] = useState<Record<string, unknown> | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const loadFunds = async () => {
      const dict = tRef.current;
      try {
        const data = await getFunds();
        setFunds(data || []);

        // Show success/error messages from query params
        const success = searchParams.get("success");
        const error = searchParams.get("error");

        if (success === "created") {
          Swal.fire({
            icon: "success",
            title: dict.manage.common.successTitle,
            text: dict.manage.funds.alerts.createdText,
            timer: 2000,
          });
        } else if (success === "updated") {
          Swal.fire({
            icon: "success",
            title: dict.manage.common.updatedTitle,
            text: dict.manage.funds.alerts.updatedText,
            timer: 2000,
          });
          setEditingFund(null);
        } else if (error === "failed") {
          Swal.fire({
            icon: "error",
            title: dict.manage.common.errorTitle,
            text: dict.manage.funds.alerts.failedText,
          });
        }
      } catch (err) {
        console.error("Error loading funds:", err);
        Swal.fire({
          icon: "error",
          title: dict.manage.funds.alerts.loadErrorTitle,
          text: getDashboardActionError(err, dict.manage.common.refreshAndTryAgain),
        });
      } finally {
        setLoading(false);
      }
    };

    loadFunds();
  }, [searchParams]);

  const [seeding, setSeeding] = useState(false);

  const handleSeedDefaults = async () => {
    const result = await Swal.fire({
      title: t.manage.funds.alerts.seedConfirmTitle,
      text: t.manage.funds.alerts.seedConfirmText,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#009EDB",
      cancelButtonColor: "#6b7280",
      confirmButtonText: t.manage.funds.alerts.seedConfirmBtn,
      cancelButtonText: t.manage.common.cancel,
    });

    if (!result.isConfirmed) return;

    setSeeding(true);
    try {
      const seedResult = await seedDefaultFunds();
      await handleRefresh();
      Swal.fire({
        icon: "success",
        title: t.manage.funds.alerts.seedSuccessTitle,
        text: tr("manage.funds.alerts.seedSuccessText", {
          created: seedResult.created,
          updated: seedResult.updated,
          total: seedResult.total,
        }),
        timer: 2500,
      });
    } catch (err) {
      console.error("Seed error:", err);
      Swal.fire({
        icon: "error",
        title: t.manage.funds.alerts.seedErrorTitle,
        text: t.manage.funds.alerts.seedErrorText,
      });
    } finally {
      setSeeding(false);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const data = await getFunds();
      setFunds(data || []);
    } catch (err) {
      console.error("Error refreshing funds:", err);
      Swal.fire({
        icon: "error",
        title: t.manage.funds.alerts.refreshErrorTitle,
        text: getDashboardActionError(err, t.manage.common.refreshAndTryAgain),
      });
    } finally {
      setLoading(false);
    }
  };

  const activeFunds = funds.filter((f) => f.status === "active").length;
  const totalRaised = funds.reduce((sum, f) => sum + Number(f.raisedAmount || 0), 0);

  return (
    <div className="flex min-h-screen w-full flex-col gap-6 bg-[#F7FAFC]">
        {/* Header Section */}
        <div className="rounded-2xl border border-[#D9E2EC] bg-white p-6">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#174A70]">{t.manage.funds.eyebrow}</p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#174A70]">
                {t.manage.funds.title}
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                {tr("manage.funds.summaryLine", {
                  total: funds.length,
                  active: activeFunds,
                  raised: totalRaised.toLocaleString(),
                })}
              </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] p-4">
                <p className="text-xs font-medium text-neutral-500">{t.manage.funds.stats.totalFunds}</p>
                <p className="mt-1 text-2xl font-semibold text-[#174A70]">
                  {funds.length}
                </p>
              </div>
              <div className="rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] p-4">
                <p className="text-xs font-medium text-neutral-500">{t.manage.funds.stats.active}</p>
                <p className="mt-1 text-2xl font-semibold text-[#174A70]">
                  {activeFunds}
                </p>
              </div>
              <div className="rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] p-4">
                <p className="text-xs font-medium text-neutral-500">{t.manage.funds.stats.totalRaised}</p>
                <p className="mt-1 text-xl font-semibold text-[#174A70]">
                  ৳{(totalRaised / 1000).toFixed(0)}K
                </p>
              </div>
              <div className="rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] p-4">
                <p className="text-xs font-medium text-neutral-500">{t.manage.funds.stats.draft}</p>
                <p className="mt-1 text-2xl font-semibold text-[#174A70]">
                  {funds.filter((f) => f.status === "draft").length}
                </p>
              </div>
            </div>

            {/* Form Section */}
            <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-700">
                  {editingFund ? t.manage.funds.editFund : t.manage.funds.createNewFund}
                </p>
                <button
                  type="button"
                  onClick={handleSeedDefaults}
                  disabled={seeding}
                  className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full border border-[#D9E2EC] bg-[#EAF6FB] px-5 text-sm font-semibold text-[#174A70] transition-colors hover:bg-[#009EDB] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {seeding ? t.manage.funds.importing : t.manage.funds.importDefaultFunds}
                </button>
              </div>

              <div className="mt-4">
                <FundForm
                  fund={editingFund}
                  onSuccess={() => {
                    handleRefresh();
                    setEditingFund(null);
                  }}
                />
              </div>

              {editingFund && (
                <div className="mt-3">
                  <button
                    onClick={() => setEditingFund(null)}
                    className="w-full rounded-full bg-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-300"
                  >
                    {t.manage.common.cancelEditing}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* List Section */}
        <div className="rounded-2xl border border-[#D9E2EC] bg-white p-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              {t.manage.funds.allFunds}
            </h2>
            {loading ? (
              <div className="flex h-40 items-center justify-center text-slate-500">
                {t.manage.funds.loadingFunds}
              </div>
            ) : (
              <FundList
                funds={funds}
                onEdit={setEditingFund}
                onDelete={handleRefresh}
              />
            )}
          </div>
        </div>
      </div>
  );
}

export default function FundsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center"><T k="manage.common.loading" /></div>}>
      <FundsContent />
    </Suspense>
  );
}