import { notFound } from "next/navigation"
import { posts } from "@/data/posts"
import Link from "next/link"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug)
  return {
    title: post ? `${post.title} | Savory Stories` : "Post | Savory Stories",
    description: post?.excerpt ?? "Recipe and food stories",
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) return notFound()

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <header>
        <p className="text-sm text-muted-foreground">
          {post.category} • {new Date(post.date).toLocaleDateString()} • {post.readingTime}
        </p>
        <h1 className="mt-2 font-serif text-4xl">{post.title}</h1>
        <p className="mt-3 text-muted-foreground">{post.excerpt}</p>
      </header>

      <figure className="mt-6 rounded-lg overflow-hidden border">
        <img
          src={`/placeholder.svg?height=560&width=900&query=home-cooked%20meal%20on%20table`}
          alt={post.title}
          className="w-full h-auto object-cover"
        />
      </figure>

      <div className="prose mt-8 max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:leading-relaxed">
        <p>
          {
            "This is placeholder content for your recipe or story. Replace it with your own narrative, ingredient notes, and step-by-step instructions."
          }
        </p>
        <p>{"Use subheadings to organize the method, and keep ingredient lists short and approachable."}</p>
      </div>

      <hr className="my-10 border-border" />
      <p className="text-sm">
        <Link href="/blog" className="hover:underline">
          ← Back to all posts
        </Link>
      </p>
    </article>
  )
}
