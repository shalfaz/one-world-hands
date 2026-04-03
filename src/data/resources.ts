import type { Resource } from "@/types/ngo";

export const resources: Resource[] = [
  {
    id: "annual-report",
    title: "Impact Highlights Report 2025",
    category: "Reports",
    type: "report",
    topic: "Flood",
    year: 2025,
    description:
      "A plain-language summary of outcomes, learnings, and how support reached communities.",
    href: "/resources",
    accent: { bg: "bg-sky-50", ring: "ring-sky-200", text: "text-sky-800" },
  },
  {
    id: "program-publication",
    title: "Program Notes: What We Learned Together",
    category: "Publications",
    type: "publication",
    topic: "Food Distribution",
    year: 2025,
    description:
      "Community-centered reflections on education, wellbeing, and sustainable support.",
    href: "/resources",
    accent: { bg: "bg-green-50", ring: "ring-green-200", text: "text-green-800" },
  },
  {
    id: "blog-maker",
    title: "Where Magic Hands Unite: A Volunteer Story",
    category: "Blog",
    type: "blog",
    topic: "Self Reliance",
    year: 2024,
    description:
      "Meet a volunteer who supports mentoring circles and shares why dignity matters.",
    href: "/resources",
    accent: { bg: "bg-indigo-50", ring: "ring-indigo-200", text: "text-indigo-800" },
  },
  {
    id: "photo-album",
    title: "Photo Album: Community Moments of Care",
    category: "Photos",
    type: "photo",
    topic: "Qurbani",
    year: 2023,
    description:
      "A curated set of humanitarian moments that highlight partnership and progress.",
    href: "/resources",
    accent: { bg: "bg-amber-50", ring: "ring-amber-200", text: "text-amber-900" },
  },
  {
    id: "video-wellbeing",
    title: "Wellbeing Sessions: How Our Camps Work",
    category: "Videos",
    type: "video",
    topic: "Winter Relief",
    year: 2024,
    description:
      "A short overview of health outreach, screening days, and referral pathways.",
    href: "/resources",
    accent: { bg: "bg-cyan-50", ring: "ring-cyan-200", text: "text-cyan-800" },
  },
  {
    id: "webinar-maintenance",
    title: "Webinar: Sustainable Water Stewardship",
    category: "Webinars",
    type: "webinar",
    topic: "Flood",
    year: 2022,
    description:
      "A community-first discussion on maintenance practices, training, and quality checks.",
    href: "/resources",
    accent: { bg: "bg-teal-50", ring: "ring-teal-200", text: "text-teal-800" },
  },
];