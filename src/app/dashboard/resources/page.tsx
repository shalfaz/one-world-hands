"use client";

import { useState, useEffect, Suspense } from "react";
import ResourceForm from "./ResourceForm";
import ResourceList from "./ResourceList";
import { getResources } from "./actions";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { getDashboardActionError } from "@/lib/dashboard/errors";

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
          title: "Could not load resources",
          text: getDashboardActionError(err, "Please refresh the page and try again."),
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
      Swal.fire({
        icon: "error",
        title: "Could not refresh resources",
        text: getDashboardActionError(err, "Please refresh the page and try again."),
      });
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
    <div className="flex min-h-screen w-full flex-col gap-6 bg-[#F7FAFC]">
        {/* Header Section */}
        <div className="rounded-2xl border border-[#D9E2EC] bg-white p-6">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#174A70]">Resources</p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#174A70]">
                Resources Management
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Total: {resources.length} | Published: {publishedCount}
              </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <div className="rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] p-4">
                <p className="text-xs font-medium text-neutral-500">Total</p>
                <p className="mt-1 text-2xl font-semibold text-[#174A70]">
                  {resources.length}
                </p>
              </div>
              <div className="rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] p-4">
                <p className="text-xs font-medium text-neutral-500">Photos</p>
                <p className="mt-1 text-2xl font-semibold text-[#174A70]">
                  {typeBreakdown.photo}
                </p>
              </div>
              <div className="rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] p-4">
                <p className="text-xs font-medium text-neutral-500">Docs</p>
                <p className="mt-1 text-2xl font-semibold text-[#174A70]">
                  {typeBreakdown.document}
                </p>
              </div>
              <div className="rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] p-4">
                <p className="text-xs font-medium text-neutral-500">Webinars</p>
                <p className="mt-1 text-2xl font-semibold text-[#174A70]">
                  {typeBreakdown.webinar}
                </p>
              </div>
              <div className="rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] p-4">
                <p className="text-xs font-medium text-neutral-500">Published</p>
                <p className="mt-1 text-2xl font-semibold text-[#174A70]">
                  {publishedCount}
                </p>
              </div>
            </div>

            {/* Form Section */}
            <div className="mt-6 border-t border-slate-200 pt-6">
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
                Cancel Editing
              </button>
            )}
          </div>
        </div>

        {/* List Section */}
        <div className="rounded-2xl border border-[#D9E2EC] bg-white p-6">
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