"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type TocItem = { id: string; text: string; level: number }

// Left-rail table of contents for a post. Self-discovers the rendered article
// headings (so it always matches what rehype-slug produced) and highlights the
// section currently in view via IntersectionObserver — the active link goes
// bold with a spectrum tick on the rail.
export function PostToc({ contentId = "post-content" }: { contentId?: string }) {
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const root = document.getElementById(contentId)
    if (!root) return

    const headings = Array.from(root.querySelectorAll<HTMLElement>("h2[id], h3[id]"))
    setItems(
      headings.map((h) => ({
        id: h.id,
        text: h.textContent ?? "",
        level: h.tagName === "H3" ? 3 : 2,
      })),
    )
    if (headings.length === 0) return

    // Active = the last heading whose top has scrolled above the offset (just
    // below the fixed header). Always resolves to something once past the top,
    // so the rail never blanks between sections. Runs directly on scroll — a
    // handful of getBoundingClientRect reads is cheap, and it avoids rAF (which
    // is throttled in background/headless and would silently stall).
    const OFFSET = 140
    const update = () => {
      let current = headings[0].id
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= OFFSET) current = h.id
        else break
      }
      setActiveId(current)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [contentId])

  if (items.length < 2) return null

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-4 font-semibold text-foreground">On this page</p>
      <ul className="border-l border-black/[0.08]">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "-ml-px block border-l-2 py-1.5 leading-snug transition-colors",
                item.level === 3 ? "pl-7" : "pl-4",
                activeId === item.id
                  ? "border-prism-cyan-400 font-semibold text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
