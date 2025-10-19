import { notFound } from "next/navigation";
import { POSTS_API_URL } from "@/data/posts";
import PostClient from "./postClient";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(POSTS_API_URL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
    next: { revalidate: 10 },
  });
  const resData = await res.json();

  const posts = resData.data;
  const post = posts.find((p: any) => p.attributes.slug === params.slug);

  if (!post) notFound();

  return {
    title: post
      ? `${post.attributes.title} | Savory Stories`
      : "Post | Savory Stories",
    description: post?.attributes?.excerpt ?? "Recipe and food stories",
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await fetch(POSTS_API_URL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
    next: { revalidate: 10 },
  });
  const resData = await data.json();
  const posts = resData.data;

  const postExists = posts.find((p: any) => p.attributes.slug === params.slug);
  if (!postExists) notFound();

  return <PostClient slug={params.slug} initialData={posts} />;
}
