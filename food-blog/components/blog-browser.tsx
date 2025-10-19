"use client"

import useSWR from "swr"
import { useMemo, useState } from "react"
import { type Post, PostCard } from "./post-card"
import { AnimatePresence, motion } from "framer-motion"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function BlogBrowser() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")

  const { data, isLoading } = useSWR<{ posts: Post[] }>(
    `/api/posts?search=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`,
    fetcher,
  )

  const categories = useMemo(() => {
    const set = new Set((data?.posts ?? []).map((p) => p.category))
    return ["all", ...Array.from(set)]
  }, [data?.posts])

  return (
    <section aria-labelledby="browse-heading" className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 id="browse-heading" className="font-serif text-3xl text-pretty">
          All Articles
        </h1>
        <div className="flex items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes or stories..."
            className="w-64 rounded-md border bg-background px-3 py-2 text-sm"
            aria-label="Search posts"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-md border bg-background px-3 py-2 text-sm"
            aria-label="Filter by category"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c[0]?.toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <p className="mt-6 text-muted-foreground">Loading posts…</p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {(data?.posts ?? []).map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  )
}
