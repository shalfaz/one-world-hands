import { Suspense } from "react";
import PageShell from "../../components/PageShell";
import ResourcesClientPage from "../../components/ResourcesClientPage";
import { getPublishedResources } from "@/lib/services/resourceService";

export default async function ResourcesPage() {
  const publishedResources = await getPublishedResources();

  // Transform to match ResourcesClientPage expected format
  const resources = publishedResources.map((resource) => ({
    id: String(resource._id),
    title: String(resource.title),
    type: String(resource.type).toUpperCase(),
    status: String(resource.status),
    file_url: resource.fileUrl ? String(resource.fileUrl) : null,
    file_urls: resource.fileUrl ? [String(resource.fileUrl)] : null,
    created_at: String(resource.createdAt),
  }));

  return (
    <PageShell>
      <Suspense fallback={<div className="container mx-auto py-12 text-center">Loading resources...</div>}>
        <ResourcesClientPage resources={resources ?? []} error={false} />
      </Suspense>
    </PageShell>
  );
}