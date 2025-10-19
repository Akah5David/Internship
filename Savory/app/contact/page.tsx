import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { PageTransition } from "@/components/page-transition"

export default function ContactPage() {
  return (
    <PageTransition>
      <main className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
        <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">Contact</h1>
        <p className="mt-4 text-muted-foreground">Have a question or recipe request? Send us a message.</p>
        <form className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm">
              Name
            </label>
            <Input id="name" placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm">
              Email
            </label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block text-sm">
              Message
            </label>
            <Textarea id="message" placeholder="How can we help?" />
          </div>
          <Button type="submit">Send</Button>
        </form>
      </main>
    </PageTransition>
  )
}
