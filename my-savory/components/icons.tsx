import type * as React from "react"

type IconProps = React.SVGProps<SVGSVGElement>

export function InstagramIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm11 1.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 .001 6.001A3 3 0 0 0 12 9Z" />
    </svg>
  )
}

export function YouTubeIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M23.5 7.2a4.4 4.4 0 0 0-.9-2.1c-.7-.8-1.6-1-2-1.1C17.9 3.5 12 3.5 12 3.5s-5.9 0-8.6.5c-.4.1-1.3.3-2 1.1a4.4 4.4 0 0 0-.9 2.1A46.6 46.6 0 0 0 0 12a46.6 46.6 0 0 0 .5 4.8 4.4 4.4 0 0 0 .9 2.1c.7.8 1.7 1 2.1 1.1 2.7.5 8.5.5 8.5.5s5.9 0 8.6-.5c.4-.1 1.3-.3 2-1.1.5-.6.8-1.3.9-2.1.4-2.5.5-4.8.5-4.8s0-2.3-.5-4.8ZM9.6 15.5V8.5l6.4 3.5-6.4 3.5Z" />
    </svg>
  )
}

export function SubstackIcon({ className = "h-5 w-5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      {/* Simple stacked bars motif referencing Substack's brand mark */}
      <path d="M3 4.5h18v3H3v-3Z" />
      <path d="M3 9h18v3H3V9Z" />
      <path d="M6 13.5h12V21l-6-3-6 3v-7.5Z" />
    </svg>
  )
}
