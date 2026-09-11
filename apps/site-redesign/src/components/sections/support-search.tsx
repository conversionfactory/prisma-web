"use client";

import { useState } from "react";
import { PrismButton } from "@/components/brand/prism-button";
import { Search } from "@/components/icons/forma";

// The hero's docs search. A form, not a plain link: the copy asks for a search
// field, so typing and submitting takes you into the docs with the query
// carried over. Relative /docs matches siteConfig — in production the docs live
// on the same domain (prisma.io/docs).
//
// The container is rounded-2xl, not a pill: rounded-full is reserved for
// buttons on this site (the submit inside it is the pill). White so the hero's
// spectral wash never runs under the field, matching the contact form fields.
export function SupportSearch() {
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = query.trim();
    // Land on the docs either way; carry the query when there is one.
    window.location.href = q ? `/docs?query=${encodeURIComponent(q)}` : "/docs";
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="spectrum-border-focus spectrum-border flex w-full items-center gap-2 rounded-2xl border border-black/[0.09] bg-white p-2 pl-4 shadow-[0_1px_2px_rgba(21,21,21,0.04),0_16px_40px_-24px_rgba(21,21,21,0.22)] transition-colors"
    >
      <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden />
      <label htmlFor="support-search" className="sr-only">
        Search the docs
      </label>
      <input
        id="support-search"
        name="query"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search the docs…"
        className="min-w-0 flex-1 bg-transparent text-[15px] leading-6 text-foreground outline-none placeholder:text-muted-foreground"
      />
      <PrismButton type="submit" className="shrink-0">
        Search
      </PrismButton>
    </form>
  );
}
