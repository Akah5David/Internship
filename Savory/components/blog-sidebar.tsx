"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function BlogSidebar({
  allPosts,
  onCategoryChange,
}: {
  allPosts: { category: string }[]
  onCategoryChange?: (category: string | null) => void
}) {
  const categories = useMemo(() => {
    const set = new Set(allPosts.map((p) => p.category))
    return ["All", ...Array.from(set)]
  }, [allPosts])

  const [email, setEmail] = useState("")
  const [selected, setSelected] = useState("All")

  function select(cat: string) {
    setSelected(cat)
    onCategoryChange?.(cat === "All" ? null : cat)
  }

  return (
    <aside className="space-y-8">
      <section aria-labelledby="categories-title" className="rounded-lg border p-4">
        <h2 id="categories-title" className="mb-3 font-semibold">
          Categories
        </h2>
        <ul className="space-y-2 text-sm">
          {categories.map((c) => (
            <li key={c}>
              <button
                className={`w-full rounded-md px-2 py-1 text-left transition ${selected === c ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => select(c)}
                aria-pressed={selected === c}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="subscribe-title" className="rounded-lg border p-4">
        <h2 id="subscribe-title" className="mb-3 font-semibold">
          Subscribe to Newsletter
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            // You can handle subscription here or connect to an API later
          }}
          className="space-y-2"
        >
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email address"
          />
          <Button type="submit" className="w-full">
            Subscribe
          </Button>
        </form>
      </section>
    </aside>
  )
}
