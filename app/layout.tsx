import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { draftMode } from "next/headers";
import { SanityLive } from "@/sanity/lib/live";
import VisualEditing from "@/components/sanity/VisualEditing";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Business Name",
    template: "%s | Business Name",
  },
  description: "A modern website powered by Bonsai Kit.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:uppercase focus:tracking-wider"
        >
          Skip to content
        </a>
        <MotionProvider>
          {children}
        </MotionProvider>
        <SanityLive />
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
