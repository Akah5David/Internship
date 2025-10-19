"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const nav = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "#recipes", label: "Recipes" },
  { href: "#about", label: "About" },
]

export function SiteHeader() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2">
          <span aria-hidden className="h-3 w-3 rounded-full bg-primary" />
          <span className="font-serif text-lg tracking-tight">Savory Stories</span>
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-4">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm transition-colors",
                    pathname === item.href
                      ? "bg-secondary text-foreground"
                      : "text-foreground/80 hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
