import { NextResponse } from "next/server"
import { posts } from "@/data/posts"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = (searchParams.get("search") ?? "").toLowerCase()
  const category = (searchParams.get("category") ?? "all").toLowerCase()

  const filtered = posts.filter((p) => {
    const matchesCategory = category === "all" || p.category.toLowerCase() === category
    const matchesQuery =
      !search ||
      p.title.toLowerCase().includes(search) ||
      p.excerpt.toLowerCase().includes(search) ||
      p.category.toLowerCase().includes(search)
    return matchesCategory && matchesQuery
  })

  return NextResponse.json({ posts: filtered })
}
