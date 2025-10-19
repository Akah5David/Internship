"use client";

import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { POSTS_API_URL } from "@/data/posts";
// --- Interfaces ---
interface ImageFormats {
  url: string;
  width: number;
  height: number;
}

interface Image {
  id: number;
  name: string;
  url: string;
  formats: {
    thumbnail?: ImageFormats;
    small?: ImageFormats;
    medium?: ImageFormats;
    large?: ImageFormats;
  };
  alternativeText?: string | null;
}

interface DelicacyAttributes {
  title: string;
  slug: string;
  excerpt: string;
  readingTime: number | null;
  date: string; // formatted for client
  category: string;
  image?: string;
}

interface Delicacy {
  id: string;
  attributes: DelicacyAttributes;
}

// --- Helper Functions ---
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const locale = navigator.language || "en-US";
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function extractTextFromRichText(richText: string): string {
  if (!Array.isArray(richText)) return "";
  return richText
    .map(
      (block) => block.children?.map((child: any) => child.text).join(" ") || ""
    )
    .join(" ");
}

const BASE_URL = "http://localhost:1337";

async function fetchDelicacies(): Promise<Delicacy[]> {
  const res = await fetch(POSTS_API_URL);

  if (!res.ok) throw new Error("Failed to fetch delicacies");

  const data = await res.json();

  console.log("Raw fetched data:", data);

  const formattedData = data.data.map((item: any) => {
    const attrs = item || {};

    // Ensure createdAt exists, fallback to current date if missing
    const createdAt: string = attrs.createdAt ?? new Date().toISOString();

    console.log("Created At:", createdAt);

    const formattedData = {
      id: item.id, // documentId is documented
      attributes: {
        title: attrs.title,
        slug: attrs.slug,
        excerpt: attrs.excerpt,
        readingTime: attrs.readingTime,
        category: attrs.category,
        image: BASE_URL + attrs.image?.url, //
        date: formatDate(createdAt), // format date for client
      },
    };
    return formattedData;
  });

  return formattedData;
}

// --- Component ---
export default function HomePage() {
  const [featured, setFeatured] = useState<Delicacy[]>([]);
  const [emailValue, setEmailValue] = useState<string>("");

  useEffect(() => {
    fetchDelicacies().then((data) => {
      setFeatured(data.slice(0, 3)); // first 3 featured posts
    });
    console.log("useEffect featured", featured);
  }, []);

  async function handleSubscription(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const jwtToken = localStorage.getItem("authToken");
    const Authorization = jwtToken ? `Authorization: Bearer ${jwtToken}` : "";

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    if (!email.toString().trim().includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    try {
      const res = await fetch("http://localhost:1337/api/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization,
        },
        body: JSON.stringify({ data: { email } }),
      });

      if (!res.ok) {
        alert("Error subscribing to newsletter.");
        return;
      }

      const resData = await res.json();

      console.log("Form submitted with email:", resData.email);
      setEmailValue("");
    } catch (error) {
      console.error("Subscription failed:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <p className="text-sm text-accent-foreground/80">
                A food journal
              </p>
              <h1 className="mt-2 font-serif text-4xl md:text-5xl text-balance">
                Savory Stories
              </h1>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Seasonal cooking, approachable recipes, and stories from the
                kitchen. Subscribe and cook along.
              </p>
              <motion.div
                className="mt-6 flex items-center gap-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                <Link
                  href="/blog"
                  className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm"
                >
                  Read the blog
                </Link>
                <Link
                  href="/about"
                  className="rounded-md border px-4 py-2 text-sm"
                >
                  Learn more
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              className="rounded-xl overflow-hidden border"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <img
                src={"/upload/rusty-table.png"}
                alt="A rustic table with seasonal ingredients"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section
        aria-labelledby="featured"
        className="mx-auto max-w-6xl px-4 py-10"
      >
        <div className="flex items-center justify-between">
          <h2 id="featured" className="font-serif text-2xl">
            Latest recipes & reads
          </h2>
          <Link
            href="/blog"
            className="text-sm text-foreground/80 hover:underline"
          >
            View all
          </Link>
        </div>
        <motion.div
          className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 1 },
            show: { transition: { staggerChildren: 0.08 } },
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
              <PostCard
                post={{
                  id: p.id, // use documentId as id
                  title: p.attributes.title,
                  slug: p.attributes.slug,
                  excerpt: extractTextFromRichText(p.attributes.excerpt),
                  category: p.attributes.category,
                  readingTime: p.attributes.readingTime
                    ? `${p.attributes.readingTime} min read`
                    : "—",
                  date: p.attributes.date,
                  image: p.attributes.image || "",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* About / Newsletter Section */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="font-serif text-2xl">Cook simply. Eat well.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We love ingredients you can find anywhere and techniques that make
              weeknights easier. Here you’ll find tested recipes, pantry guides,
              and seasonal menus that celebrate flavor without fuss.
            </p>
          </div>
          <div className="rounded-lg border bg-secondary p-4">
            <h3 className="font-serif">Newsletter</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Get new recipes every week.
            </p>
            <form
              className="mt-3 flex gap-2"
              onSubmit={(e) => {
                handleSubscription(e);
              }}
            >
              <input
                type="email"
                name="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                required
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-md border bg-background px-3 py-2 text-sm"
              />
              <button
                type="submit"
                className="rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
