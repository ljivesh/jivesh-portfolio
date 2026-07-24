import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jivesh Lakhani | AI Product Engineer",
    template: "%s | Jivesh Lakhani",
  },
  description:
    "Founding engineer building production AI agents, commerce systems, backend platforms, browser automation, and cloud infrastructure.",
  keywords: [
    "Jivesh Lakhani",
    "Founding Engineer",
    "Applied AI Engineer",
    "AI Product Engineer",
    "AI Agents",
    "Backend Engineer",
    "Full Stack Engineer",
    "Shopify",
  ],
  authors: [{ name: "Jivesh Lakhani" }],
  creator: "Jivesh Lakhani",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Jivesh Lakhani",
    title: "Jivesh Lakhani | AI Product Engineer",
    description:
      "Production AI products built end to end, from product architecture and agent workflows to deployment and operations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jivesh Lakhani | AI Product Engineer",
    description:
      "Production AI products built end to end, from product architecture and agent workflows to deployment and operations.",
  },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <a className="fixed top-3 left-3 z-100 -translate-y-[160%] bg-ink px-3.5 py-2.5 font-bold text-paper focus:translate-y-0" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
