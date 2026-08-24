"use client"

import { useState } from "react"
import { Copy, Linkedin, XSocial, Check } from "@/components/icons/forma"
import { cn } from "@/lib/utils"

// "Share this post" row for the post hero — copy-link plus the two networks the
// icon set covers (X, LinkedIn). Copy is a client action; the network links are
// plain share-intent anchors so they work without JS.

export function PostShare({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can reject (permissions, http) — no-op, the network links still work.
    }
  }

  const encoded = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const iconClass =
    "flex size-9 items-center justify-center rounded-lg border border-black/[0.09] bg-white text-foreground transition-colors hover:bg-black/[0.04]"

  return (
    <div>
      <p className="text-sm font-semibold text-foreground">Share this post</p>
      <div className="mt-3 flex items-center gap-2">
        <button type="button" onClick={copy} aria-label="Copy link" className={cn(iconClass, "spectrum-border")}>
          {copied ? <Check className="size-4 text-prism-cyan-500" /> : <Copy className="size-4" />}
        </button>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className={cn(iconClass, "spectrum-border")}
        >
          <Linkedin className="size-4" />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
          className={cn(iconClass, "spectrum-border")}
        >
          <XSocial className="size-4" />
        </a>
      </div>
    </div>
  )
}
