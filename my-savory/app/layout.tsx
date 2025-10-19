import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Suspense } from "react";
import { PageTransition } from "@/components/page-transition";
import { AuthProvider } from "@/components/auth";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Savory Stories | Food Blog",
  description: "Approachable recipes, stories, and kitchen tips.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable} antialiased`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>
            <SiteHeader />
            <PageTransition>
              <main className="min-h-dvh" role="main">
                {children}
              </main>
            </PageTransition>
            <SiteFooter />
          </AuthProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
