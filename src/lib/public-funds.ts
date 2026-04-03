import { supabaseServer } from "@/lib/supabase-server";

type FundRow = {
  id: string;
  name: string;
  description: string;
  category: string;
  impact_summary: string | null;
  status: string | null;
  created_at?: string | null;
};

type PublicFund = {
  id: string;
  name: string;
  description: string;
  categoryLabel: string;
  impactSummary: string;
  suggestedAmounts: number[];
  href: string;
  accent: {
    bg: string;
    ring: string;
    text: string;
    gradientFrom: string;
    gradientTo: string;
  };
};

const accentMap: Record<
  string,
  {
    bg: string;
    ring: string;
    text: string;
    gradientFrom: string;
    gradientTo: string;
  }
> = {
  "hunger-relief": {
    bg: "bg-sky-50",
    ring: "ring-sky-200",
    text: "text-sky-800",
    gradientFrom: "from-sky-500",
    gradientTo: "to-green-500",
  },
  "emergency-relief": {
    bg: "bg-amber-50",
    ring: "ring-amber-200",
    text: "text-amber-900",
    gradientFrom: "from-amber-500",
    gradientTo: "to-sky-500",
  },
  "medical-aid": {
    bg: "bg-cyan-50",
    ring: "ring-cyan-200",
    text: "text-cyan-800",
    gradientFrom: "from-cyan-500",
    gradientTo: "to-sky-500",
  },
  "winter-support": {
    bg: "bg-cyan-50",
    ring: "ring-cyan-200",
    text: "text-cyan-800",
    gradientFrom: "from-cyan-500",
    gradientTo: "to-green-500",
  },
  "education-support": {
    bg: "bg-indigo-50",
    ring: "ring-indigo-200",
    text: "text-indigo-800",
    gradientFrom: "from-indigo-500",
    gradientTo: "to-green-500",
  },
  "merit-scholarship": {
    bg: "bg-teal-50",
    ring: "ring-teal-200",
    text: "text-teal-800",
    gradientFrom: "from-teal-500",
    gradientTo: "to-sky-500",
  },
  "self-reliance-livelihood": {
    bg: "bg-emerald-50",
    ring: "ring-emerald-200",
    text: "text-emerald-800",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-indigo-500",
  },
  "clean-water": {
    bg: "bg-green-50",
    ring: "ring-green-200",
    text: "text-green-800",
    gradientFrom: "from-green-500",
    gradientTo: "to-sky-500",
  },
  "tree-plantation": {
    bg: "bg-emerald-50",
    ring: "ring-emerald-200",
    text: "text-emerald-800",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-green-500",
  },
  "general-donation": {
    bg: "bg-neutral-50",
    ring: "ring-neutral-200",
    text: "text-neutral-800",
    gradientFrom: "from-sky-500",
    gradientTo: "to-green-500",
  },
  zakat: {
    bg: "bg-sky-50",
    ring: "ring-sky-200",
    text: "text-sky-800",
    gradientFrom: "from-sky-500",
    gradientTo: "to-green-500",
  },
  "sadaqah-jariyah": {
    bg: "bg-green-50",
    ring: "ring-green-200",
    text: "text-green-800",
    gradientFrom: "from-green-500",
    gradientTo: "to-sky-500",
  },
  "ramadan-food-iftar": {
    bg: "bg-amber-50",
    ring: "ring-amber-200",
    text: "text-amber-900",
    gradientFrom: "from-amber-500",
    gradientTo: "to-sky-500",
  },
};

const suggestedAmountsMap: Record<string, number[]> = {
  "hunger-relief": [15, 30, 60, 150],
  "emergency-relief": [25, 50, 100, 250],
  "medical-aid": [20, 40, 80, 200],
  "winter-support": [15, 35, 70, 160],
  "education-support": [15, 30, 60, 150],
  "merit-scholarship": [25, 50, 100, 250],
  "self-reliance-livelihood": [30, 60, 120, 300],
  "clean-water": [20, 40, 80, 200],
  "tree-plantation": [10, 25, 50, 150],
  "general-donation": [25, 50, 100, 250],
  zakat: [15, 30, 60, 150],
  "sadaqah-jariyah": [20, 40, 80, 200],
  "ramadan-food-iftar": [10, 25, 50, 150],
};

function mapFund(row: FundRow): PublicFund {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    categoryLabel: row.category,
    impactSummary:
      row.impact_summary?.trim() ||
      "Your donation supports dignity-first, community-led humanitarian action.",
    suggestedAmounts: suggestedAmountsMap[row.id] || [500, 1000, 2000, 5000],
    href: `/donation-funds/${row.id}`,
    accent: accentMap[row.id] || {
      bg: "bg-sky-50",
      ring: "ring-sky-200",
      text: "text-sky-800",
      gradientFrom: "from-sky-500",
      gradientTo: "to-green-500",
    },
  };
}

export async function getPublicFunds() {
  const { data, error } = await supabaseServer
    .from("funds")
    .select("id, name, description, category, impact_summary, status, created_at")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map(mapFund);
}

export async function getPublicFundBySlug(slug: string) {
  const { data, error } = await supabaseServer
    .from("funds")
    .select("id, name, description, category, impact_summary, status, created_at")
    .eq("id", slug)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  if (data.status !== "active") {
    return null;
  }

  return mapFund(data);
}