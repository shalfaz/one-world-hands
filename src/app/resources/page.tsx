import { Suspense } from "react";
import PageShell from "../../components/PageShell";
import { supabaseServer } from "../../lib/supabase-server";
import ResourcesClientPage from "../../components/ResourcesClientPage";

export default async function ResourcesPage() {
  const { data: resources, error } = await supabaseServer
    .from("resources")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <PageShell>
      <Suspense fallback={<div className="container mx-auto py-12 text-center">Loading resources...</div>}>
        <ResourcesClientPage resources={resources ?? []} error={!!error} />
      </Suspense>
    </PageShell>
  );
}