import BlogPostCard, { type BlogPost } from "./blog-post-card"

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <BlogPostCard key={p.slug} post={p} />
      ))}
    </div>
  )
}
