"use client";

import { useState, useEffect, Suspense } from "react";
import DashboardSidebar from "../../../components/DashboardSidebar";
import FundForm from "./FundForm";
import FundList from "./FundList";
import { getFunds, seedDefaultFunds } from "./actions";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

function FundsContent() {
  const [funds, setFunds] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFund, setEditingFund] = useState<Record<string, unknown> | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const loadFunds = async () => {
      try {
        const data = await getFunds();
        setFunds(data || []);

        // Show success/error messages from query params
        const success = searchParams.get("success");
        const error = searchParams.get("error");

        if (success === "created") {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Fund created successfully",
            timer: 2000,
          });
        } else if (success === "updated") {
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Fund updated successfully",
            timer: 2000,
          });
          setEditingFund(null);
        } else if (error === "failed") {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to process fund",
          });
        }
      } catch (err) {
        console.error("Error loading funds:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load funds",
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
      title: "Import Default Funds?",
      text: "This will add or update all 13 standard donation funds in the database.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0284c7",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, import funds",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    setSeeding(true);
    try {
      const seedResult = await seedDefaultFunds();
      await handleRefresh();
      Swal.fire({
        icon: "success",
        title: "Funds imported!",
        text: `Created ${seedResult.created}, updated ${seedResult.updated} (${seedResult.total} total).`,
        timer: 2500,
      });
    } catch (err) {
      console.error("Seed error:", err);
      Swal.fire({
        icon: "error",
        title: "Import failed",
        text: "Could not import default funds. Check your database connection and login.",
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
    } finally {
      setLoading(false);
    }
  };

  const activeFunds = funds.filter((f) => f.status === "active").length;
  const totalRaised = funds.reduce((sum, f) => sum + Number(f.raisedAmount || 0), 0);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-8">
        {/* Header Section */}
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-semibold text-sky-600">Funds Management</p>
              <h1 className="mt-1 text-3xl font-bold text-slate-950">
                Funds Management
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Total funds: {funds.length} | Active: {activeFunds} | Total Raised: ৳
                {totalRaised.toLocaleString()}
              </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid gap-3 md:grid-cols-4">
              <div className="rounded-lg bg-linear-to-br from-blue-50 to-blue-100 p-4">
                <p className="text-xs font-semibold text-blue-700">Total Funds</p>
                <p className="mt-1 text-2xl font-bold text-blue-900">
                  {funds.length}
                </p>
              </div>
              <div className="rounded-lg bg-linear-to-br from-green-50 to-green-100 p-4">
                <p className="text-xs font-semibold text-green-700">Active</p>
                <p className="mt-1 text-2xl font-bold text-green-900">
                  {activeFunds}
                </p>
              </div>
              <div className="rounded-lg bg-linear-to-br from-purple-50 to-purple-100 p-4">
                <p className="text-xs font-semibold text-purple-700">Total Raised</p>
                <p className="mt-1 text-xl font-bold text-purple-900">
                  ৳{(totalRaised / 1000).toFixed(0)}K
                </p>
              </div>
              <div className="rounded-lg bg-linear-to-br from-orange-50 to-orange-100 p-4">
                <p className="text-xs font-semibold text-orange-700">Draft</p>
                <p className="mt-1 text-2xl font-bold text-orange-900">
                  {funds.filter((f) => f.status === "draft").length}
                </p>
              </div>
            </div>

            {/* Form Section */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-700">
                  {editingFund ? "Edit Fund" : "Create New Fund"}
                </p>
                <button
                  type="button"
                  onClick={handleSeedDefaults}
                  disabled={seeding}
                  className="inline-flex h-10 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 px-5 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {seeding ? "Importing..." : "Import 13 Default Funds"}
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
                    ✕ Cancel Editing
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* List Section */}
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              All Funds
            </h2>
            {loading ? (
              <div className="flex h-40 items-center justify-center text-slate-500">
                Loading funds...
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
      </main>
    </div>
  );
}

export default function FundsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <FundsContent />
    </Suspense>
  );
}