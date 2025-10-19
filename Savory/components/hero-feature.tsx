"use client"

import Link from "next/link"
import { motion } from "framer-motion"

type Featured = {
  title: string
  description: string
  image: string
  slug: string
}

export default function HeroFeature({ featured }: { featured: Featured }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-8 md:px-6 md:pt-12">
      <div className="grid gap-6 md:grid-cols-12">
        <div className="relative overflow-hidden rounded-lg border md:col-span-7">
          <motion.img
            src={featured.image}
            alt={featured.title}
            className="h-80 w-full object-cover md:h-[420px]"
            initial={{ scale: 1.03, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <motion.div
          className="flex flex-col justify-center gap-4 md:col-span-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <h1 className="font-serif text-pretty text-3xl font-semibold tracking-tight md:text-4xl">{featured.title}</h1>
          <p className="text-muted-foreground">{featured.description}</p>
          <div>
            <Link
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              href={`/blog/${featured.slug}`}
            >
              Read More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
