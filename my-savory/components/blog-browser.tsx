"use client";

import useSWR from "swr";
import React, { use, useMemo, useState, useRef, useEffect } from "react";
import { type Post, PostCard } from "./post-card";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { fetcher, POSTS_API_URL } from "@/data/posts";
import { set } from "date-fns";

export function BlogBrowser() {
  const { data, isLoading } = useSWR<{ posts: Post[] }>(POSTS_API_URL, fetcher);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const reduce = useReducedMotion();
  const queryRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (data?.posts) {
      setFilteredPosts(data.posts); // "All" should show everything by default
    }
  }, [data?.posts]);

  const categories = useMemo(() => {
    console.log("Data in categories", data?.posts);
    const set = new Set((data?.posts ?? []).map((p) => p.category));
    return [...Array.from(set)];
  }, [data?.posts]);

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    setCategory("");

    // clear the previous timeout before setting a new one
    if (queryRef.current) {
      clearTimeout(queryRef.current);
    }

    queryRef.current = setTimeout(() => {
      const filtered =
        value.trim() === ""
          ? data?.posts ?? []
          : (data?.posts ?? []).filter((post) =>
              post.title.toLowerCase().includes(value.trim().toLowerCase())
            );
      setFilteredPosts(filtered);
    }, 1000);
  }

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setCategory(e.target.value);
    setQuery("");
    const filtered =
      e.target.value.toLowerCase() === ""
        ? data?.posts ?? []
        : (data?.posts ?? []).filter(
            (post) => post.category === e.target.value.toLowerCase()
          );
    setFilteredPosts(filtered);
  }

  return (
    <section
      aria-labelledby="browse-heading"
      className="mx-auto max-w-6xl px-4 py-8"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 id="browse-heading" className="font-serif text-3xl text-pretty">
          All Articles
        </h1>
        <div className="flex items-center gap-3">
          <input
            value={query}
            onChange={handleQueryChange}
            placeholder="Search recipes by title..."
            className="w-64 rounded-md border bg-background px-3 py-2 text-sm"
            aria-label="Search posts"
          />
          <select
            value={category}
            onChange={handleCategoryChange}
            className={`rounded-md border bg-background px-3 py-2 text-sm `}
            aria-label="Filter by category"
          >
            <option value="">Filter by category...</option>
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
            {(filteredPosts ?? []).map((post, i) => (
              <motion.div
                key={post.id}
                layout="position"
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{
                  duration: reduce ? 0 : 0.28,
                  ease: "easeOut",
                  delay: reduce ? 0 : i * 0.03,
                }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
