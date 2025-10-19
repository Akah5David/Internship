import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = (searchParams.get("search") ?? "").toLowerCase();
  const category = (searchParams.get("category") ?? "all").toLowerCase();

  const res = await fetch("http://localhost:1337/api/delicacies?populate=*", {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch delicacies");

  const data = await res.json();

  console.log("I am the data u seek", data.data);

  const filtered = data.data.filter((p: any) => {
    console.log("I am one of the data u seek for filtering", p);
    const dataAttrs = p.attributes;
    const matchesCategory =
      category === "all" || dataAttrs.category.toLowerCase() === category;
    const matchesQuery =
      !search ||
      dataAttrs.title.toLowerCase().includes(search) ||
      dataAttrs.excerpt.toLowerCase().includes(search) ||
      dataAttrs.category.toLowerCase().includes(search);
    return matchesCategory && matchesQuery;
  });

  return NextResponse.json({ posts: filtered });
}
