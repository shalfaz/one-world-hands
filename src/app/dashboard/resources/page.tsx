import DashboardSidebar from "../../../components/DashboardSidebar";
import { supabaseServer } from "../../../lib/supabase-server";
import {
  addResource,
  removeResource,
  removeSingleResourceFile,
  updateResource,
} from "../actions";

export default async function ResourcesPage() {
  const { data: resources, error } = await supabaseServer
    .from("resources")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#f1f5f9" }}>
      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-8">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-sm font-semibold text-sky-600">Resources</p>
              <h1 className="mt-1 text-3xl font-bold text-slate-950">
                Resources Management
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Total resources in database: {resources?.length || 0}
              </p>
            </div>

            <form
              action={addResource}
              className="grid gap-3 md:grid-cols-2 xl:grid-cols-5"
            >
              <input
                name="title"
                placeholder="Resource title"
                className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none"
                required
              />

              <select
                name="type"
                defaultValue="Photo"
                className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none"
                required
              >
                <option value="Photo">Photo</option>
                <option value="Video">Video</option>
                <option value="Document">Document</option>
                <option value="Blog">Blog</option>
                <option value="Annual Report">Annual Report</option>
                <option value="Webinar">Webinar</option>
              </select>

              <select
                name="status"
                defaultValue="draft"
                className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none"
              >
                <option value="draft">draft</option>
                <option value="published">published</option>
              </select>

              <input
                name="externalUrl"
                placeholder="External URL (optional)"
                className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none"
              />

              <input
                name="files"
                type="file"
                multiple
                accept="image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                className="h-11 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none"
              />

              <div className="md:col-span-2 xl:col-span-5">
                <button className="rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700">
                  + Add New Resource
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          {error ? (
            <p className="text-sm text-red-600">Failed to load resources.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-slate-500">
                    <th className="px-3 py-3">Title</th>
                    <th className="px-3 py-3">Type</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3">Files</th>
                    <th className="px-3 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {resources?.map((resource) => {
                    const fileUrls = Array.isArray(resource.file_urls)
                      ? resource.file_urls
                      : resource.file_url
                      ? [resource.file_url]
                      : [];

                    const storagePaths = Array.isArray(resource.storage_paths)
                      ? resource.storage_paths
                      : resource.storage_path
                      ? [resource.storage_path]
                      : [];

                    return (
                      <tr key={resource.id} className="border-b border-slate-100 align-top">
                        <td className="px-3 py-4 font-semibold text-slate-900">
                          {resource.title}
                        </td>
                        <td className="px-3 py-4 text-slate-700">{resource.type}</td>
                        <td className="px-3 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              resource.status === "published"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {resource.status}
                          </span>
                        </td>
                        <td className="px-3 py-4 text-slate-700">
                          {fileUrls.length > 0 ? (
                            <div className="space-y-2">
                              {fileUrls.map((url: string, index: number) => (
                                <div key={`${resource.id}-${index}`} className="flex flex-wrap items-center gap-2">
                                  <a
                                    href={url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="font-medium text-sky-700 underline"
                                  >
                                    File {index + 1}
                                  </a>

                                  <form action={removeSingleResourceFile}>
                                    <input type="hidden" name="id" value={resource.id} />
                                    <input type="hidden" name="fileUrl" value={url} />
                                    <input
                                      type="hidden"
                                      name="storagePath"
                                      value={storagePaths[index] || ""}
                                    />
                                    <button className="rounded-full border border-red-200 px-2 py-1 text-[11px] font-semibold text-red-600 hover:bg-red-50">
                                      Remove File
                                    </button>
                                  </form>
                                </div>
                              ))}
                            </div>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-3 py-4">
                          <div className="flex flex-wrap gap-2">
                            <details className="group">
                              <summary className="cursor-pointer list-none rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                                Edit
                              </summary>

                              <div className="mt-3 w-[380px] rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <form action={updateResource} className="space-y-3">
                                  <input type="hidden" name="id" value={resource.id} />
                                  <input
                                    type="hidden"
                                    name="existingStoragePaths"
                                    value={JSON.stringify(storagePaths)}
                                  />
                                  <input
                                    type="hidden"
                                    name="existingFileUrls"
                                    value={JSON.stringify(fileUrls)}
                                  />

                                  <input
                                    name="title"
                                    defaultValue={resource.title}
                                    className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
                                    required
                                  />

                                  <select
                                    name="type"
                                    defaultValue={resource.type}
                                    className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
                                  >
                                    <option value="Photo">Photo</option>
                                    <option value="Video">Video</option>
                                    <option value="Document">Document</option>
                                    <option value="Blog">Blog</option>
                                    <option value="Annual Report">Annual Report</option>
                                    <option value="Webinar">Webinar</option>
                                  </select>

                                  <select
                                    name="status"
                                    defaultValue={resource.status}
                                    className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
                                  >
                                    <option value="draft">draft</option>
                                    <option value="published">published</option>
                                  </select>

                                  <input
                                    name="externalUrl"
                                    placeholder="Add another external URL (optional)"
                                    className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
                                  />

                                  <input
                                    name="files"
                                    type="file"
                                    multiple
                                    accept="image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                                    className="h-10 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none"
                                  />

                                  <button className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800">
                                    Save Changes
                                  </button>
                                </form>
                              </div>
                            </details>

                            <form action={removeResource}>
                              <input type="hidden" name="id" value={resource.id} />
                              <button className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">
                                Remove Resource
                              </button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {!resources?.length && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-3 py-6 text-center text-slate-500"
                      >
                        No resources found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}