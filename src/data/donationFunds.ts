import type { DonationFund } from "@/types/ngo";

export const donationFunds: DonationFund[] = [
  {
    id: "hunger-relief",
    name: "Hunger Relief Fund",
    description:
      "Food support for families facing hunger, delivered with dignity and community-led guidance.",
    categoryLabel: "Basic Needs",
    impactSummary:
      "Your gift helps provide essential food support and supports practical nutrition learning within communities.",
    suggestedAmounts: [15, 30, 60, 150],
    href: "/donation-funds/hunger-relief",
    accent: {
      bg: "bg-sky-50",
      ring: "ring-sky-200",
      text: "text-sky-800",
      gradientFrom: "from-sky-500",
      gradientTo: "to-green-500",
    },
  },
  {
    id: "emergency-relief",
    name: "Emergency Relief Fund",
    description:
      "Rapid emergency support for households, prioritized by safety, essentials, and dignity-first recovery steps.",
    categoryLabel: "Emergency Response",
    impactSummary:
      "When emergencies strike, your support helps meet urgent needs and guides households toward next steps.",
    suggestedAmounts: [25, 50, 100, 250],
    href: "/donation-funds/emergency-relief",
    accent: {
      bg: "bg-amber-50",
      ring: "ring-amber-200",
      text: "text-amber-900",
      gradientFrom: "from-amber-500",
      gradientTo: "to-sky-500",
    },
  },
  {
    id: "medical-aid",
    name: "Medical Aid Fund",
    description:
      "Health support through prevention, screenings, referrals, and wellbeing assistance where appropriate.",
    categoryLabel: "Health & Care",
    impactSummary:
      "Your gift helps connect people to timely care and strengthens everyday wellbeing through education and support.",
    suggestedAmounts: [20, 40, 80, 200],
    href: "/donation-funds/medical-aid",
    accent: {
      bg: "bg-cyan-50",
      ring: "ring-cyan-200",
      text: "text-cyan-800",
      gradientFrom: "from-cyan-500",
      gradientTo: "to-sky-500",
    },
  },
  {
    id: "winter-support",
    name: "Winter Support Fund",
    description:
      "Seasonal warm essentials and protective support for vulnerable households during cold weather.",
    categoryLabel: "Seasonal Essentials",
    impactSummary:
      "Your support helps families stay safer during winter by providing warm essentials and care guidance.",
    suggestedAmounts: [15, 35, 70, 160],
    href: "/donation-funds/winter-support",
    accent: {
      bg: "bg-cyan-50",
      ring: "ring-cyan-200",
      text: "text-cyan-800",
      gradientFrom: "from-cyan-500",
      gradientTo: "to-green-500",
    },
  },
  {
    id: "education-support",
    name: "Education Support Fund",
    description:
      "Learning support for children and youth through tutoring, materials, and mentorship sessions.",
    categoryLabel: "Learning & Skills",
    impactSummary:
      "Your donation supports consistent learning and helps families build confidence and practical skills for the future.",
    suggestedAmounts: [15, 30, 60, 150],
    href: "/donation-funds/education-support",
    accent: {
      bg: "bg-indigo-50",
      ring: "ring-indigo-200",
      text: "text-indigo-800",
      gradientFrom: "from-indigo-500",
      gradientTo: "to-green-500",
    },
  },
  {
    id: "merit-scholarship",
    name: "Merit Scholarship Fund",
    description:
      "Scholarship assistance for students showing strong effort and readiness—helping education continue with dignity.",
    categoryLabel: "Education Access",
    impactSummary:
      "Your gift helps remove barriers for deserving students and supports wellbeing-focused check-ins throughout scholarship cycles.",
    suggestedAmounts: [25, 50, 100, 250],
    href: "/donation-funds/merit-scholarship",
    accent: {
      bg: "bg-teal-50",
      ring: "ring-teal-200",
      text: "text-teal-800",
      gradientFrom: "from-teal-500",
      gradientTo: "to-sky-500",
    },
  },
  {
    id: "self-reliance-livelihood",
    name: "Self-Reliance & Livelihood Fund",
    description:
      "Practical livelihood support and learning pathways designed to strengthen stability and resilience over time.",
    categoryLabel: "Resilience",
    impactSummary:
      "Your support helps people build confidence and steady progress through achievable, community-supported pathways.",
    suggestedAmounts: [30, 60, 120, 300],
    href: "/donation-funds/self-reliance-livelihood",
    accent: {
      bg: "bg-emerald-50",
      ring: "ring-emerald-200",
      text: "text-emerald-800",
      gradientFrom: "from-emerald-500",
      gradientTo: "to-indigo-500",
    },
  },
  {
    id: "clean-water",
    name: "Clean Water Fund",
    description:
      "Safe water support and stewardship training for communities and partner schools.",
    categoryLabel: "Water & Dignity",
    impactSummary:
      "Your donation supports water access improvements and training designed for long-term community stewardship.",
    suggestedAmounts: [20, 40, 80, 200],
    href: "/donation-funds/clean-water",
    accent: {
      bg: "bg-green-50",
      ring: "ring-green-200",
      text: "text-green-800",
      gradientFrom: "from-green-500",
      gradientTo: "to-sky-500",
    },
  },
  {
    id: "tree-plantation",
    name: "Tree Plantation Fund",
    description:
      "Community planting and stewardship support to strengthen environmental resilience.",
    categoryLabel: "Environment",
    impactSummary:
      "Your support helps communities plant and care for trees, strengthening healthier local environments over time.",
    suggestedAmounts: [10, 25, 50, 150],
    href: "/donation-funds/tree-plantation",
    accent: {
      bg: "bg-emerald-50",
      ring: "ring-emerald-200",
      text: "text-emerald-800",
      gradientFrom: "from-emerald-500",
      gradientTo: "to-green-500",
    },
  },
  {
    id: "general-donation",
    name: "General Donation Fund",
    description:
      "Where needed most—supporting program delivery across humanitarian needs and community-led priorities.",
    categoryLabel: "Where Needed Most",
    impactSummary:
      "Your flexible gift helps our team respond to changing needs while maintaining dignity-first, community-led support.",
    suggestedAmounts: [25, 50, 100, 250],
    href: "/donation-funds/general-donation",
    accent: {
      bg: "bg-neutral-50",
      ring: "ring-neutral-200",
      text: "text-neutral-800",
      gradientFrom: "from-sky-500",
      gradientTo: "to-green-500",
    },
  },
  {
    id: "zakat",
    name: "Zakat Fund",
    description:
      "Community support aligned with needs—helping us deliver dignified assistance to those facing hardship.",
    categoryLabel: "Community Support",
    impactSummary:
      "Your Zakat gift supports community-led relief and practical assistance through vetted local pathways.",
    suggestedAmounts: [15, 30, 60, 150],
    href: "/donation-funds/zakat",
    accent: {
      bg: "bg-sky-50",
      ring: "ring-sky-200",
      text: "text-sky-800",
      gradientFrom: "from-sky-500",
      gradientTo: "to-green-500",
    },
  },
  {
    id: "sadaqah-jariyah",
    name: "Sadaqah Jariyah Fund",
    description:
      "Longer-term, stewardship-focused giving designed to support lasting community wellbeing.",
    categoryLabel: "Sustainable Giving",
    impactSummary:
      "Your donation helps strengthen enduring practices through education, training, and community stewardship support.",
    suggestedAmounts: [20, 40, 80, 200],
    href: "/donation-funds/sadaqah-jariyah",
    accent: {
      bg: "bg-green-50",
      ring: "ring-green-200",
      text: "text-green-800",
      gradientFrom: "from-green-500",
      gradientTo: "to-sky-500",
    },
  },
  {
    id: "ramadan-food-iftar",
    name: "Ramadan Food & Iftar Fund",
    description:
      "Seasonal food support and community iftar assistance delivered with dignity during Ramadan.",
    categoryLabel: "Seasonal Care",
    impactSummary:
      "Your gift supports community iftar and food assistance, strengthening connection and compassion during Ramadan.",
    suggestedAmounts: [10, 25, 50, 150],
    href: "/donation-funds/ramadan-food-iftar",
    accent: {
      bg: "bg-amber-50",
      ring: "ring-amber-200",
      text: "text-amber-900",
      gradientFrom: "from-amber-500",
      gradientTo: "to-sky-500",
    },
  },
];