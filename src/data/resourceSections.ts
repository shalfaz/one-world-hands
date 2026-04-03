import type { Resource, ResourceCategory } from "@/types/ngo";

export type ResourceSection = {
  id: string;
  heading: string;
  category: ResourceCategory;
  categoryLabelOverride: string;
};

export const resourceSections: ResourceSection[] = [
  {
    id: "annual-reports",
    heading: "Annual Reports",
    category: "Reports",
    categoryLabelOverride: "Annual Reports",
  },
  {
    id: "publications",
    heading: "Publications",
    category: "Publications",
    categoryLabelOverride: "Publications",
  },
  {
    id: "blog-articles",
    heading: "Blog Articles",
    category: "Blog",
    categoryLabelOverride: "Blog Articles",
  },
  {
    id: "photo-gallery",
    heading: "Photo Gallery",
    category: "Photos",
    categoryLabelOverride: "Photo Gallery",
  },
  {
    id: "video-gallery",
    heading: "Video Gallery",
    category: "Videos",
    categoryLabelOverride: "Video Gallery",
  },
  {
    id: "webinars",
    heading: "Webinars",
    category: "Webinars",
    categoryLabelOverride: "Webinars",
  },
];

// Helper export for future expansions (not currently required by pages).
export function getResourcesForSection(
  resources: Resource[],
  section: ResourceSection
) {
  return resources.filter((r) => r.category === section.category);
}

