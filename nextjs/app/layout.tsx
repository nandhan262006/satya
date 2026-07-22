import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://sathyaphotography.in";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Sathya Photography | Best Wedding & Videography Studio in Ongole",
    template: "%s | Sathya Photography",
  },
  description:
    "Sathya Photography — Ongole's finest photography and videography studio. Specialising in wedding, pre-wedding, engagement, maternity, kids and couple shoots across Ongole, Guntur, Vijayawada and Hyderabad. EST. 2000. Call +91 90103 34999.",
  keywords: [
    "photography studio ongole",
    "best photographer in ongole",
    "wedding photography ongole",
    "videography ongole",
    "pre-wedding shoot ongole",
    "engagement photography andhra pradesh",
    "maternity photography ongole",
    "kids photography ongole",
    "couple shoot ongole",
    "sathya photography",
    "sathya visuals",
    "photographer guntur",
    "photographer vijayawada",
    "photographer hyderabad",
    "wedding videographer andhra pradesh",
    "candid wedding photography",
  ],
  authors: [{ name: "Sathya Photography", url: BASE_URL }],
  creator: "Sathya Photography",
  publisher: "Sathya Photography",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Sathya Photography",
    title: "Sathya Photography | Best Wedding & Videography Studio in Ongole",
    description:
      "Ongole's finest photography and videography studio provides the finest wedding, pre-wedding, engagement, maternity and couple photography across all of Ongole, Guntur, Vijayawada and Hyderabad. EST. 2000.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sathya Photography — Wedding & Videography Studio in Ongole",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sathya Photography | Wedding & Videography Studio in Ongole",
    description:
      "Ongole's finest photography and videography studio — wedding, pre-wedding, maternity, kids & couple shoots. Call +91 90103 34999.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: "photography",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": BASE_URL,
  name: "Sathya Photography",
  image: [`${BASE_URL}/logo.png`, `${BASE_URL}/og-image.png`],
  description:
    "Ongole's finest photography and videography studio providing wedding, pre-wedding, engagement, maternity, kids and couple photography services since 2000.",
  url: BASE_URL,
  telephone: "+919010334999",
  priceRange: "₹₹",
  foundingDate: "2000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Vamsi Complex, Shop No. 5, Opp. Sai Saroj Mayuri Theatre",
    addressLocality: "Ongole",
    addressRegion: "Andhra Pradesh",
    postalCode: "523001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 15.5057,
    longitude: 80.0499,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "20:00",
    },
  ],
  sameAs: ["https://www.instagram.com/sathyaphotography"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Photography & Videography Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wedding Photography" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pre-Wedding Shoots" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Engagement Sessions" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Maternity Photography" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kids & Baby Shoots" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Couple Shoots" } },
    ],
  },
  areaServed: [
    { "@type": "City", name: "Ongole" },
    { "@type": "City", name: "Guntur" },
    { "@type": "City", name: "Vijayawada" },
    { "@type": "City", name: "Hyderabad" },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127",
    bestRating: "5",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
