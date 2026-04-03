import type { Update } from "@/types/ngo";

export type UpdateSectionConfig = {
  id: string;
  heading: string;
  type: Update["type"];
  badgeLabel: string;
  badgeClasses: string;
};

export const updateSections: UpdateSectionConfig[] = [
  {
    id: "notices",
    heading: "Notices",
    type: "Notice",
    badgeLabel: "Notice",
    badgeClasses:
      "inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800 ring-1 ring-sky-200",
  },
  {
    id: "campaign-updates",
    heading: "Campaign updates",
    type: "Campaign",
    badgeLabel: "Campaign",
    badgeClasses:
      "inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-800 ring-1 ring-green-200",
  },
  {
    id: "announcements",
    heading: "Announcements",
    type: "Update",
    badgeLabel: "Announcement",
    badgeClasses:
      "inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900 ring-1 ring-amber-200",
  },
];

