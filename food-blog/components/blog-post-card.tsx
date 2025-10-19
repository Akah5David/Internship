"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  image: string
  author: string
  date: string
  category: string
}

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <motion.article
      className="group overflow-hidden rounded-lg border bg-card shadow-sm transition"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.35 }}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative">
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            className="h-44 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <div className="space-y-2 p-4">
          <div className="text-xs text-muted-foreground">
            {post.author} • {new Date(post.date).toLocaleDateString()}
          </div>
          <h3 className="line-clamp-2 font-serif text-balance text-lg font-semibold tracking-tight">{post.title}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
        </div>
      </Link>
    </motion.article>
  )
}
