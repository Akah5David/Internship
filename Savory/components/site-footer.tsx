import Link from "next/link"
import { InstagramIcon, YouTubeIcon, SubstackIcon } from "@/components/icons"

export function SiteFooter() {
  return (
    <footer className="border-t mt-16">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="font-serif text-xl">Savory Stories</h3>
          <p className="mt-2 text-sm text-muted-foreground">Simple, seasonal recipes and the stories behind them.</p>
        </div>
        <div>
          <h4 className="font-serif text-base">Explore</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <Link className="hover:underline" href="/blog">
                Blog
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/recipes">
                Recipes
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/about">
                About
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-base">Follow</h4>
          <ul className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
            <li>
              <a
                className="inline-flex items-center gap-2 hover:underline"
                href="https://instagram.com/savorystories"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on Instagram"
              >
                <InstagramIcon className="h-4 w-4 text-instagram" />
                Instagram
              </a>
            </li>
            <li aria-hidden>•</li>
            <li>
              <a
                className="inline-flex items-center gap-2 hover:underline"
                href="https://youtube.com/@savorystories"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe on YouTube"
              >
                <YouTubeIcon className="h-4 w-4 text-youtube" />
                YouTube
              </a>
            </li>
            <li aria-hidden>•</li>
            <li>
              <a
                className="inline-flex items-center gap-2 hover:underline"
                href="https://savorystories.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read on Substack"
              >
                <SubstackIcon className="h-4 w-4 text-substack" />
                Substack
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-secondary text-muted-foreground text-xs py-3">
        <div className="mx-auto max-w-6xl px-4 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Savory Stories</span>
          <span>
            Crafted with{" "}
            <a className="underline" href="https://v0.dev" rel="noreferrer">
              v0
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
