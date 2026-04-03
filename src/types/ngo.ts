export type Program = {
  id: string;
  title: string;
  description: string;
  fundingSources?: string[]; // Used on the Programs page
  category: string;
  location: string;
  duration: string;
  impactPoints: string[];
  href: string;
  accent: {
    bg: string; // Tailwind bg utility (e.g. "bg-sky-50")
    ring: string; // Tailwind ring utility (e.g. "ring-sky-200")
    text: string; // Tailwind text utility (e.g. "text-sky-700")
    gradientFrom: string; // e.g. "from-sky-500"
    gradientTo: string; // e.g. "to-green-500")
  };
};

export type DonationFund = {
  id: string;
  name: string;
  description: string;
  impactSummary: string;
  suggestedAmounts: number[];
  categoryLabel?: string; // Optional label shown on Donation Funds page
  href: string;
  accent: {
    bg: string; // e.g. "bg-green-50"
    ring: string; // e.g. "ring-green-200")
    text: string; // e.g. "text-green-700")
    gradientFrom: string; // e.g. "from-green-500")
    gradientTo: string; // e.g. "to-sky-500")
  };
};

export type Update = {
  id: string;
  title: string;
  dateISO: string; // YYYY-MM-DD
  type: "Notice" | "Campaign" | "Update";
  excerpt: string;
  href: string;
};

export type ResourceCategory =
  | "Reports"
  | "Publications"
  | "Blog"
  | "Photos"
  | "Videos"
  | "Webinars";

export type ResourceType =
  | "report"
  | "publication"
  | "blog"
  | "photo"
  | "video"
  | "webinar";

export type ResourceTopic =
  | "Flood"
  | "Food Distribution"
  | "Self Reliance"
  | "Qurbani"
  | "Winter Relief";

export type Resource = {
  id: string;
  title: string;
  category: ResourceCategory;
  type: ResourceType;
  topic: ResourceTopic;
  year: number;
  description: string;
  href: string;
  accent: {
    bg: string; // e.g. "bg-sky-50"
    ring: string; // e.g. "ring-sky-200"
    text: string; // e.g. "text-sky-700"
  };
};