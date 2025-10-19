"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  image: string;
};

export function PostCard({ post }: { post: Post }) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setFormattedDate(new Date(post.date).toLocaleDateString());
  }, [post.date]);

  console.log("post for Formatted Date:", post);
  return (
    <motion.article
      className="group rounded-lg border bg-card hover:shadow-sm transition-shadow overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -2 }}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Using placeholder image utility per guidelines */}
        <img
          src={post.image}
          alt={post.title}
          className="h-48 w-full object-cover"
          loading="lazy"
        />
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full bg-accent/40 text-accent-foreground px-2 py-0.5">
              {post.category}
            </span>
            <span aria-hidden>•</span>
            <time dateTime={post.date}>{formattedDate} </time>
            <span aria-hidden>•</span>
            <span>{post.readingTime}</span>
          </div>
          <h3 className="font-serif text-lg leading-tight group-hover:underline">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {post.excerpt}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
