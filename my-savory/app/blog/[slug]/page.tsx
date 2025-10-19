import { notFound } from "next/navigation";
import { POSTS_API_URL } from "@/data/posts";
import PostClient from "./postClient";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(POSTS_API_URL, {
    next: { revalidate: 10 },
  });
  const resData = await res.json();
  console.log("resData from slug", resData);

  const posts = resData.data;
  const post = posts.find((p: any) => p.slug === params.slug);

  if (!post) notFound();

  return {
    title: post ? `${post?.title} | Savory Stories` : "Post | Savory Stories",
    description: post?.excerpt ?? "Recipe and food stories",
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await fetch(POSTS_API_URL, {
    next: { revalidate: 10 },
  });
  const resData = await data.json();
  const posts = resData.data;

  const postExists = posts.find((p: any) => p.slug === params.slug);
  if (!postExists) notFound();

  return <PostClient slug={params.slug} initialData={posts} />;
}
