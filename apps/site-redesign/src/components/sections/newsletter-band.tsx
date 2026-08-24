"use client";

import { useState } from "react";
import { PrismButton } from "@/components/brand/prism-button";
import { cn } from "@/lib/utils";

// "Stay in the loop" — the newsletter band that sits between a post's CTA and
// the "More from the blog" grid. On-brand rather than the Relume scaffold in
// sections/newsletter.tsx: the field carries the same spectrum hairline as the
// /blog search (spectrum-border + spectrum-border-focus, see globals.css), and
// the submit is the prism CTA.
//
// No backend here yet — the redesign has no newsletter endpoint, so submit is
// handled client-side with an inline confirmation rather than pretending to
// POST. Wiring it to a real list is a one-function change in the handler.

export function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-white px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-[clamp(1.75rem,2.4vw,2.25rem)] leading-tight">Stay in the loop</h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          New releases, guides, and what we&rsquo;re building, straight to your inbox.
        </p>

        {submitted ? (
          <p className="mt-8 text-base font-medium text-foreground" role="status" aria-live="polite">
            Thanks — check your inbox to confirm your subscription.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) setSubmitted(true);
            }}
            className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <div
              className={cn(
                "spectrum-border spectrum-border-focus w-full rounded-2xl bg-white",
                "border border-black/[0.09] shadow-[0_1px_2px_rgba(21,21,21,0.04),0_16px_40px_-24px_rgba(21,21,21,0.28)]",
              )}
            >
              <label htmlFor="blog-newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="blog-newsletter"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                autoCapitalize="off"
                autoCorrect="off"
                className="h-14 w-full rounded-2xl bg-transparent px-5 text-base outline-none placeholder:text-muted-foreground"
              />
            </div>
            <PrismButton type="submit" size="lg" className="max-sm:w-full">
              Subscribe
            </PrismButton>
          </form>
        )}
      </div>
    </section>
  );
}
