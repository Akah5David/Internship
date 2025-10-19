import Link from "next/link"

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
              <a className="hover:underline" href="#recipes">
                Recipes
              </a>
            </li>
            <li>
              <a className="hover:underline" href="#about">
                About
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-base">Follow</h4>
          <p className="mt-2 text-sm text-muted-foreground">Instagram • YouTube • Substack</p>
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
