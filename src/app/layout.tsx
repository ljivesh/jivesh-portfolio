import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppProvider } from "@/providers/app-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const geistSans = localFont({ src: "./fonts/geist-latin.woff2", variable: "--font-geist-sans", display: "swap" });
const geistMono = localFont({ src: "./fonts/geist-mono-latin.woff2", variable: "--font-geist-mono", display: "swap" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Menma | Jivesh Lakhani — AI Product Engineer", template: "%s | Menma" },
  description: "Jivesh Lakhani is a software engineer in Jaipur who builds AI agents, Shopify apps and backend systems.",
  keywords: ["Jivesh Lakhani", "Menma", "AI Product Engineer", "Founding Engineer", "AI Agents", "Backend Engineer", "Shopify"],
  authors: [{ name: "Jivesh Lakhani" }], creator: "Jivesh Lakhani",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_US", url: siteUrl, siteName: "Menma", title: "Menma | Jivesh Lakhani", description: "Jivesh Lakhani is a software engineer in Jaipur who builds AI agents, Shopify apps and backend systems." },
  twitter: { card: "summary_large_image", title: "Menma | Jivesh Lakhani", description: "Jivesh Lakhani is a software engineer in Jaipur who builds AI agents, Shopify apps and backend systems." },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <AppProvider>
          <a className="skip-link" href="#main-content">Skip to content</a>
          <SiteHeader />{children}<SiteFooter />
        </AppProvider>
      </body>
    </html>
  );
}
