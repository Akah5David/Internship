"use client";

import useSWR, { mutate } from "swr";
import Link from "next/link";
import { fetcher, POSTS_API_URL } from "@/data/posts";
import { type Post } from "@/components/post-card";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/components/auth";
import { is } from "date-fns/locale";

export default function PostClient({
  slug,
  initialData,
}: {
  slug: string;
  initialData?: Post[];
}) {
  const { data } = useSWR<{ posts: Post[] }>(POSTS_API_URL, fetcher, {
    fallbackData: initialData ? { posts: initialData } : undefined,
  });

  const [message, setMessage] = useState("");
  const [delicacyId, setDelicacyId] = useState<number | null>(null);
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);

  // 🔹 Fetch numeric ID from slug
  useEffect(() => {
    const fetchDelicacyId = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/delicacies?populate=*"
        );
        const result = await response.json();

        console.log("Result", result);

        if (!response.ok || !result.data.length) {
          throw new Error("Delicacy not found");
        }

        const item = result.data.find((p: any) => p.slug === slug);
        console.log("Item for delete", item);

        setDelicacyId(item.id); // store numeric ID
      } catch (err) {
        console.error("Error fetching delicacy ID:", err);
        setMessage("Failed to load delicacy data.");
      }
    };

    fetchDelicacyId();
  }, []);

  const post = data?.posts.find((p) => p.slug === slug);
  if (!post) return <p>Post not found.</p>;

  const JwtToken = localStorage.getItem("authToken");

  console.log("JwtToken", JwtToken);

  async function deleteDelicacy() {
    const JwtToken = localStorage.getItem("authToken");

    console.log("JwtToken", JwtToken);

    if (!JwtToken) {
      setMessage("You must be logged in to delete a post.");
      return;
    }

    if (!delicacyId) {
      setMessage("Delicacy ID not found. Cannot delete.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:1337/api/delete/${delicacyId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${JwtToken}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setMessage(
          result?.error?.message || "Something went wrong during deletion."
        );
        return;
      }

      setMessage("Delicacy deleted successfully!");
      console.log("Deleted Data:", result);

      router.push("/recipes");
    } catch (err) {
      console.error("Error deleting delicacy:", err);
      setMessage("Network error while deleting delicacy.");
    }
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <header>
        <p className="text-sm text-muted-foreground">
          {post.category} • {new Date(post.date).toLocaleDateString()} •{" "}
          {post.readingTime}
        </p>
        <h1 className="mt-2 font-serif text-4xl">{post.title}</h1>
        <p className="mt-3 text-muted-foreground">{post.excerpt}</p>
      </header>

      <figure className="mt-6 rounded-lg overflow-hidden border">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-auto object-cover"
        />
      </figure>

      <div className="prose mt-8 max-w-none">
        <p>
          {
            "This is placeholder content for your recipe or story. Replace it with your own narrative, ingredient notes, and step-by-step instructions."
          }
        </p>
        <p>
          {
            "Use subheadings to organize the method, and keep ingredient lists short and approachable."
          }
        </p>
      </div>

      <hr className="my-10 border-border" />
      {message && <p className="text-sm text-red-600">{message}</p>}

      {isLoggedIn && (
        <div className="flex gap-4 justify-between items-center">
          <button onClick={deleteDelicacy}>Delete</button>
          <Link
            href={`/admin/update-post/${post.slug}`}
            className="hover:underline"
          >
            Update
          </Link>
        </div>
      )}

      <Link href="/blog" className="text-sm hover:underline mt-4 block">
        ← Back to all posts
      </Link>
    </article>
  );
}
