import { PageTransition } from "@/components/page-transition"

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
        <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">About Foodie</h1>
        <p className="mt-4 text-muted-foreground">
          Foodie is a modern food blog dedicated to delicious, approachable recipes for home cooks. We focus on clear
          instructions, reliable techniques, and mouthwatering results.
        </p>
      </main>
    </PageTransition>
  )
}
