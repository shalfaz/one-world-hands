import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono-custom",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oneworldhands.org"),
  title: {
    default: "One World Hands | Humanitarian NGO for Global Community Support",
    template: "%s | One World Hands - Dignity-First Humanitarian Aid",
  },
  description:
    "One World Hands is a humanitarian NGO empowering individuals and communities through education, direct action, and collaboration. Support dignity-first programs for food assistance, emergency relief, medical aid, and more.",
  keywords: [
    "humanitarian aid",
    "NGO",
    "community support",
    "food assistance",
    "emergency relief",
    "medical assistance",
    "education support",
    "winter support",
    "donation",
    "volunteer",
    "charitable giving",
  ],
  authors: [{ name: "One World Hands" }],
  creator: "One World Hands",
  publisher: "One World Hands",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://oneworldhands.org",
    siteName: "One World Hands",
    title: "One World Hands | Humanitarian NGO for Global Community Support",
    description:
      "Join us in building dignity-first humanitarian support. Donate, volunteer, or share our mission to empower communities worldwide.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "One World Hands - Humanitarian Aid Organization",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "One World Hands | Humanitarian NGO",
    description:
      "Empowering communities through dignity-first humanitarian support and education.",
    images: ["/twitter-image.png"],
    creator: "@oneworldhands",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
  alternates: {
    canonical: "https://oneworldhands.org",
    languages: {
      "en-US": "https://oneworldhands.org/en",
    },
  },
  category: "Non-Profit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <head>
        <StructuredData />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="canonical" href="https://oneworldhands.org" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
