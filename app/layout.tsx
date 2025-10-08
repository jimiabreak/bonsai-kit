import type { Metadata } from "next";
import { Inria_Sans, Inria_Serif } from "next/font/google";
import "./globals.css";

const inriaSans = Inria_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-inria-sans",
  display: "swap",
});

const inriaSerif = Inria_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-inria-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Commonwealth Coffee | Specialty Coffee & Cafe",
  description: "Experience the finest artisan coffee, expertly roasted to perfection. Discover our selection of single-origin beans and signature blends.",
  keywords: "coffee, roaster, artisan coffee, single-origin, coffee beans, specialty coffee, cafe",
  authors: [{ name: "Commonwealth Coffee" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://commonwealthcoffee.com",
    siteName: "Commonwealth Coffee",
    title: "Commonwealth Coffee | Specialty Coffee & Cafe",
    description: "Experience the finest artisan coffee, expertly roasted to perfection.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Coffee Roaster",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Commonwealth Coffee | Specialty Coffee & Cafe",
    description: "Experience the finest artisan coffee, expertly roasted to perfection.",
    images: ["/og-image.jpg"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inriaSans.variable} ${inriaSerif.variable}`}>
      <body className="font-sans antialiased bg-cream text-charcoal-900">
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
