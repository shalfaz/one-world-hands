"use client";

import { useState } from "react";
import { createResource, updateResource } from "./actions";
import Swal from "sweetalert2";

const typeOptions = [
  { value: "photo", label: "Photo", icon: "📷" },
  { value: "document", label: "Document (PDF/Word/Excel)", icon: "📄" },
  { value: "blog", label: "Blog Post", icon: "📝" },
  { value: "report", label: "Annual Report", icon: "📊" },
  { value: "webinar", label: "Webinar (YouTube)", icon: "🎥" },
];

export default function ResourceForm({
  resource,
  onSuccess,
}: {
  resource?: Record<string, unknown> | null;
  onSuccess?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState(
    String(resource?.type || "photo")
  );
  const [fileName, setFileName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      if (resource) {
        formData.append("resourceId", String(resource._id || ""));
        await updateResource(formData);
      } else {
        await createResource(formData);
      }

      Swal.fire({
        icon: "success",
        title: resource ? "Resource Updated!" : "Resource Created!",
        text: resource
          ? "Resource updated successfully"
          : "New resource created successfully",
        timer: 2000,
      });

      onSuccess?.();
    } catch (error) {
      console.error("Form error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          Resource Title *
        </label>
        <input
          name="title"
          type="text"
          placeholder="Enter resource title"
          defaultValue={String(resource?.title || "")}
          maxLength={150}
          className="w-full h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-sky-600"
          required
        />
      </div>

      {/* Type Selection */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          Resource Type *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {typeOptions.map((option) => (
            <label
              key={option.value}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                selectedType === option.value
                  ? "border-sky-600 bg-sky-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                name="type"
                value={option.value}
                checked={selectedType === option.value}
                onChange={(e) => setSelectedType(e.target.value)}
                className="sr-only"
                required
              />
              <div className="text-center">
                <div className="text-xl">{option.icon}</div>
                <div className="text-xs font-semibold text-slate-700 mt-1">
                  {option.label}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          placeholder="Brief description of the resource"
          defaultValue={String(resource?.description || "")}
          rows={2}
          className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-600"
        />
      </div>

      {/* Conditional Fields Based on Type */}
      {selectedType === "document" && (
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Upload Document (PDF, Word, Excel, PowerPoint)
          </label>
          <input
            name="file"
            type="file"
            title="Upload document file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
            onChange={(e) =>
              setFileName(e.target.files?.[0]?.name || "")
            }
            className="w-full h-11 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-600"
          />
          {fileName && (
            <p className="text-xs text-green-600 mt-1">✓ {fileName}</p>
          )}
        </div>
      )}

      {selectedType === "blog" && (
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Blog Content
          </label>
          <textarea
            name="content"
            placeholder="Write your blog content here..."
            defaultValue={String(resource?.content || "")}
            rows={4}
            className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-600"
          />
        </div>
      )}

      {selectedType === "webinar" && (
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            YouTube Link *
          </label>
          <input
            name="youtubeLink"
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            defaultValue={String(resource?.youtubeLink || "")}
            className="w-full h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-sky-600"
            required={selectedType === "webinar"}
          />
          <p className="text-xs text-slate-500 mt-1">
            Paste the full YouTube video URL
          </p>
        </div>
      )}

      {selectedType === "photo" && (
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Upload Photo
          </label>
          <input
            name="file"
            type="file"
            title="Upload photo file"
            accept="image/*"
            onChange={(e) =>
              setFileName(e.target.files?.[0]?.name || "")
            }
            className="w-full h-11 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-600"
          />
          {fileName && (
            <p className="text-xs text-green-600 mt-1">✓ {fileName} selected</p>
          )}
        </div>
      )}

      {selectedType === "report" && (
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Upload Report
          </label>
          <input
            name="file"
            type="file"
            title="Upload report file"
            accept=".pdf,.doc,.docx"
            onChange={(e) =>
              setFileName(e.target.files?.[0]?.name || "")
            }
            className="w-full h-11 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-600"
          />
          {fileName && (
            <p className="text-xs text-green-600 mt-1">✓ {fileName} selected</p>
          )}
        </div>
      )}

      {/* Status */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          Status
        </label>
        <select
          name="status"
          defaultValue={String(resource?.status || "draft")}
          className="w-full h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-sky-600"
          aria-label="Resource status"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-50 transition-all"
      >
        {loading
          ? "Processing..."
          : resource
            ? "Update Resource"
            : "+ Add New Resource"}
      </button>
    </form>
  );
}
