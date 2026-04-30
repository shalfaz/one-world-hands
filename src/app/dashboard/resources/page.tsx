"use client";

import { useState, useEffect, Suspense } from "react";
import DashboardSidebar from "../../../components/DashboardSidebar";
import ResourceForm from "./ResourceForm";
import ResourceList from "./ResourceList";
import { getResources } from "./actions";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

function ResourcesContent() {
  const [resources, setResources] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingResource, setEditingResource] =
    useState<Record<string, unknown> | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const loadResources = async () => {
      try {
        const data = await getResources();
        setResources(data || []);

        // Show success/error messages from query params
        const success = searchParams.get("success");
        const error = searchParams.get("error");

        if (success === "created") {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Resource created successfully",
            timer: 2000,
          });
        } else if (success === "updated") {
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Resource updated successfully",
            timer: 2000,
          });
          setEditingResource(null);
        } else if (error === "failed") {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to process resource",
          });
        }
      } catch (err) {
        console.error("Error loading resources:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load resources",
        });
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, [searchParams]);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const data = await getResources();
      setResources(data || []);
    } catch (err) {
      console.error("Error refreshing resources:", err);
    } finally {
      setLoading(false);
    }
  };

  const publishedCount = resources.filter(
    (r) => r.status === "published"
  ).length;
  const typeBreakdown = {
    photo: resources.filter((r) => r.type === "photo").length,
    document: resources.filter((r) => r.type === "document").length,
    blog: resources.filter((r) => r.type === "blog").length,
    report: resources.filter((r) => r.type === "report").length,
    webinar: resources.filter((r) => r.type === "webinar").length,
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-8">
        {/* Header Section */}
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-semibold text-sky-600">Resources</p>
              <h1 className="mt-1 text-3xl font-bold text-slate-950">
                Resources Management
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Total: {resources.length} | Published: {publishedCount}
              </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid gap-3 md:grid-cols-5">
              <div className="rounded-lg bg-linear-to-br from-blue-50 to-blue-100 p-4">
                <p className="text-xs font-semibold text-blue-700">Total</p>
                <p className="mt-1 text-2xl font-bold text-blue-900">
                  {resources.length}
                </p>
              </div>
              <div className="rounded-lg bg-linear-to-br from-purple-50 to-purple-100 p-4">
                <p className="text-xs font-semibold text-purple-700">📷 Photos</p>
                <p className="mt-1 text-2xl font-bold text-purple-900">
                  {typeBreakdown.photo}
                </p>
              </div>
              <div className="rounded-lg bg-linear-to-br from-green-50 to-green-100 p-4">
                <p className="text-xs font-semibold text-green-700">📄 Docs</p>
                <p className="mt-1 text-2xl font-bold text-green-900">
                  {typeBreakdown.document}
                </p>
              </div>
              <div className="rounded-lg bg-linear-to-br from-orange-50 to-orange-100 p-4">
                <p className="text-xs font-semibold text-orange-700">🎥 Webinars</p>
                <p className="mt-1 text-2xl font-bold text-orange-900">
                  {typeBreakdown.webinar}
                </p>
              </div>
              <div className="rounded-lg bg-linear-to-br from-pink-50 to-pink-100 p-4">
                <p className="text-xs font-semibold text-pink-700">✓ Published</p>
                <p className="mt-1 text-2xl font-bold text-pink-900">
                  {publishedCount}
                </p>
              </div>
            </div>

            {/* Form Section */}
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-3">
                {editingResource ? "Edit Resource" : "Create New Resource"}
              </p>
              <ResourceForm
                resource={editingResource}
                onSuccess={() => {
                  handleRefresh();
                  setEditingResource(null);
                }}
              />
            </div>

            {editingResource && (
              <button
                onClick={() => setEditingResource(null)}
                className="w-full rounded-full bg-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-300"
              >
                ✕ Cancel Editing
              </button>
            )}
          </div>
        </div>

        {/* List Section */}
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              All Resources
            </h2>
            {loading ? (
              <div className="flex h-40 items-center justify-center text-slate-500">
                Loading resources...
              </div>
            ) : (
              <ResourceList
                resources={resources}
                onEdit={setEditingResource}
                onDelete={handleRefresh}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <ResourcesContent />
    </Suspense>
  );
}