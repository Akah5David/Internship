"use client";

import Link from "next/link";
import NavBar from "./navbar";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2">
          <span aria-hidden className="h-3 w-3 rounded-full bg-primary" />
          <span className="font-serif text-lg tracking-tight">
            Savory Stories
          </span>
        </Link>
        <NavBar />
      </div>
    </header>
  );
}
