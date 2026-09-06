import type { DonationFund } from "@/types/ngo";

export type FundCategory =
  | "education"
  | "health"
  | "emergency"
  | "community"
  | "livelihood"
  | "other";

export type DonationFundRecord = DonationFund & {
  slug: string;
  category: FundCategory;
  image?: string;
};

const accent = {
  community: {
    bg: "bg-emerald-50",
    ring: "ring-emerald-200",
    text: "text-emerald-700",
    gradientFrom: "from-emerald-400",
    gradientTo: "to-emerald-600",
  },
  emergency: {
    bg: "bg-orange-50",
    ring: "ring-orange-200",
    text: "text-orange-700",
    gradientFrom: "from-orange-400",
    gradientTo: "to-orange-600",
  },
  health: {
    bg: "bg-red-50",
    ring: "ring-red-200",
    text: "text-red-700",
    gradientFrom: "from-red-400",
    gradientTo: "to-red-600",
  },
  education: {
    bg: "bg-blue-50",
    ring: "ring-blue-200",
    text: "text-blue-700",
    gradientFrom: "from-blue-400",
    gradientTo: "to-blue-600",
  },
  livelihood: {
    bg: "bg-purple-50",
    ring: "ring-purple-200",
    text: "text-purple-700",
    gradientFrom: "from-purple-400",
    gradientTo: "to-purple-600",
  },
  other: {
    bg: "bg-neutral-50",
    ring: "ring-neutral-200",
    text: "text-neutral-700",
    gradientFrom: "from-neutral-400",
    gradientTo: "to-neutral-600",
  },
} as const;

export const DONATION_FUNDS: DonationFundRecord[] = [
  {
    id: "general-donation",
    slug: "general-donation",
    category: "other",
    name: "General Donation Fund",
    description:
      "Support our overall humanitarian mission and help us respond wherever the need is greatest.",
    impactSummary:
      "Flexible support for urgent and emerging community priorities.",
    suggestedAmounts: [500, 1000, 2500, 5000],
    categoryLabel: "General",
    href: "/#quick-donation?fund=general-donation",
    image: "/funds/general-donation.svg",
    accent: accent.community,
  },
  {
    id: "hunger-relief",
    slug: "hunger-relief",
    category: "emergency",
    name: "Hunger Relief Fund",
    description:
      "Provide nutritious meals and food assistance to families facing hunger and food insecurity.",
    impactSummary: "Meals and food packages for families in crisis.",
    suggestedAmounts: [500, 1000, 2500],
    categoryLabel: "Food",
    href: "/#quick-donation?fund=hunger-relief",
    image: "/funds/hunger-relief.svg",
    accent: accent.emergency,
  },
  {
    id: "medical-aid",
    slug: "medical-aid",
    category: "health",
    name: "Medical Aid Fund",
    description:
      "Deliver essential healthcare, medicine, and treatment to people who cannot afford medical care.",
    impactSummary: "Medicine, check-ups, and emergency treatment support.",
    suggestedAmounts: [1000, 2500, 5000],
    categoryLabel: "Health",
    href: "/#quick-donation?fund=medical-aid",
    image: "/funds/medical-aid.svg",
    accent: accent.health,
  },
  {
    id: "education-support",
    slug: "education-support",
    category: "education",
    name: "Education Support Fund",
    description:
      "Help children and youth access quality education, school supplies, and safe learning spaces.",
    impactSummary: "Books, tuition support, and learning materials for students.",
    suggestedAmounts: [500, 1500, 3000],
    categoryLabel: "Education",
    href: "/#quick-donation?fund=education-support",
    image: "/funds/education-support.svg",
    accent: accent.education,
  },
  {
    id: "merit-scholarship",
    slug: "merit-scholarship",
    category: "education",
    name: "Merit Scholarship Fund",
    description:
      "Award scholarships to deserving students pursuing higher education and vocational training.",
    impactSummary: "Scholarships for talented students with limited means.",
    suggestedAmounts: [2500, 5000, 10000],
    categoryLabel: "Education",
    href: "/#quick-donation?fund=merit-scholarship",
    image: "/funds/merit-scholarship.svg",
    accent: accent.education,
  },
  {
    id: "self-reliance-livelihood",
    slug: "self-reliance-livelihood",
    category: "livelihood",
    name: "Self-Reliance & Livelihood Fund",
    description:
      "Empower families with skills training, tools, and income-generating opportunities.",
    impactSummary: "Vocational training and small business startup support.",
    suggestedAmounts: [1500, 3500, 7500],
    categoryLabel: "Livelihood",
    href: "/#quick-donation?fund=self-reliance-livelihood",
    image: "/funds/self-reliance-livelihood.svg",
    accent: accent.livelihood,
  },
  {
    id: "clean-water",
    slug: "clean-water",
    category: "community",
    name: "Clean Water Fund",
    description:
      "Install wells and water systems to bring safe drinking water to underserved communities.",
    impactSummary: "Clean water access for families and schools.",
    suggestedAmounts: [1000, 5000, 10000],
    categoryLabel: "Community",
    href: "/#quick-donation?fund=clean-water",
    image: "/funds/clean-water.svg",
    accent: accent.community,
  },
  {
    id: "tree-plantation",
    slug: "tree-plantation",
    category: "community",
    name: "Tree Plantation Fund",
    description:
      "Plant trees to protect the environment, prevent erosion, and support sustainable communities.",
    impactSummary: "Tree planting drives and green community initiatives.",
    suggestedAmounts: [500, 1500, 3000],
    categoryLabel: "Environment",
    href: "/#quick-donation?fund=tree-plantation",
    image: "/funds/tree-plantation.svg",
    accent: accent.community,
  },
  {
    id: "emergency-relief",
    slug: "emergency-relief",
    category: "emergency",
    name: "Emergency Relief Fund",
    description:
      "Respond quickly to disasters and crises with urgent shelter, food, and humanitarian aid.",
    impactSummary: "Rapid response for floods, fires, and sudden emergencies.",
    suggestedAmounts: [1000, 2500, 5000],
    categoryLabel: "Emergency",
    href: "/#quick-donation?fund=emergency-relief",
    image: "/funds/emergency-relief.svg",
    accent: accent.emergency,
  },
  {
    id: "winter-support",
    slug: "winter-support",
    category: "emergency",
    name: "Winter Support Fund",
    description:
      "Provide warm clothing, blankets, and heating support to families during cold months.",
    impactSummary: "Winter kits and warmth for vulnerable households.",
    suggestedAmounts: [750, 1500, 3000],
    categoryLabel: "Seasonal",
    href: "/#quick-donation?fund=winter-support",
    image: "/funds/winter-support.svg",
    accent: accent.emergency,
  },
  {
    id: "ramadan-food-iftar",
    slug: "ramadan-food-iftar",
    category: "community",
    name: "Ramadan Food & Iftar Fund",
    description:
      "Distribute food packages and iftar meals to families during the holy month of Ramadan.",
    impactSummary: "Iftar meals and Ramadan food baskets for families in need.",
    suggestedAmounts: [500, 1500, 2500],
    categoryLabel: "Seasonal",
    href: "/#quick-donation?fund=ramadan-food-iftar",
    image: "/funds/ramadan-food-iftar.svg",
    accent: accent.community,
  },
  {
    id: "zakat",
    slug: "zakat",
    category: "other",
    name: "Zakat Fund",
    description:
      "Fulfill your Zakat obligation through transparent, dignified distribution to eligible recipients.",
    impactSummary: "Sharia-compliant Zakat collection and distribution.",
    suggestedAmounts: [2500, 5000, 10000],
    categoryLabel: "Zakat",
    href: "/#quick-donation?fund=zakat",
    image: "/funds/zakat.svg",
    accent: accent.other,
  },
  {
    id: "sadaqah-jariyah",
    slug: "sadaqah-jariyah",
    category: "community",
    name: "Sadaqah Jariyah Fund",
    description:
      "Support ongoing charitable projects that continue benefiting communities for years to come.",
    impactSummary: "Long-lasting charity through water, education, and community assets.",
    suggestedAmounts: [1000, 5000, 15000],
    categoryLabel: "Sadaqah",
    href: "/#quick-donation?fund=sadaqah-jariyah",
    image: "/funds/sadaqah-jariyah.svg",
    accent: accent.community,
  },
];

export function getQuickDonationFunds() {
  return DONATION_FUNDS.map(({ id, name }) => ({ id, name }));
}

export function getPublicDonationFunds() {
  return DONATION_FUNDS;
}

export function getDonationFundBySlug(slug: string) {
  return DONATION_FUNDS.find((fund) => fund.slug === slug || fund.id === slug);
}
