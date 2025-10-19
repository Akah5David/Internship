"use client"

import Link from "next/link"
import { PostCard } from "@/components/post-card"
import { posts } from "@/data/posts"
import { motion } from "framer-motion"

export default function HomePage() {
  const featured = posts.slice(0, 3)
  return (
    <>
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <p className="text-sm text-accent-foreground/80">A food journal</p>
              <h1 className="mt-2 font-serif text-4xl md:text-5xl text-balance">Savory Stories</h1>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Seasonal cooking, approachable recipes, and stories from the kitchen. Subscribe and cook along.
              </p>
              <motion.div
                className="mt-6 flex items-center gap-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                <Link href="/blog" className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm">
                  Read the blog
                </Link>
                <a href="#about" className="rounded-md border px-4 py-2 text-sm">
                  Learn more
                </a>
              </motion.div>
            </motion.div>
            <motion.div
              className="rounded-xl overflow-hidden border"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <img
                src={`/placeholder.svg?height=560&width=800&query=beautiful%20food%20flatlay`}
                alt="A rustic table with seasonal ingredients"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section aria-labelledby="featured" className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-center justify-between">
          <h2 id="featured" className="font-serif text-2xl">
            Latest recipes & reads
          </h2>
          <Link href="/blog" className="text-sm text-foreground/80 hover:underline">
            View all
          </Link>
        </div>
        {/* subtle stagger-in for featured cards */}
        <motion.div
          className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 1 },
            show: {
              transition: { staggerChildren: 0.08 },
            },
          }}
        >
          {featured.map((p) => (
            <motion.div
              key={p.id}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <PostCard post={p} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="font-serif text-2xl">Cook simply. Eat well.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We love ingredients you can find anywhere and techniques that make weeknights easier. Here you’ll find
              tested recipes, pantry guides, and seasonal menus that celebrate flavor without fuss.
            </p>
          </div>
          <div className="rounded-lg border bg-secondary p-4">
            <h3 className="font-serif">Newsletter</h3>
            <p className="mt-2 text-sm text-muted-foreground">Get new recipes every week.</p>
            <form className="mt-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-md border bg-background px-3 py-2 text-sm"
              />
              <button className="rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
