import { Marker } from "@/components/brand/marker";
import { ArrowRightBold } from "@/components/icons/forma";
import { Reveal } from "@/components/motion/reveal";
import { PostArt } from "@/components/sections/post-art";
import { BLOG_POSTS, TOPIC_LABELS, type BlogPost } from "@/data/blog-posts";
import { cn } from "@/lib/utils";

// /blog post grid — the customers-grid.tsx structure carried onto the blog
// index: one full-width lead card, then three columns.
//
// Named blog-index-grid rather than blog-grid because sections/blog-grid.tsx is
// already taken by the Relume scaffold component, which is still referenced by
// the /components gallery. Renaming that is a separate cleanup, not this
// branch's business.
//
// Sixteen posts: the newest runs full-width as a lead card and the remaining
// fifteen fill exactly five rows of three, so the grid never ends on a widowed
// card. The lead renders the same fields as every other card, just larger and
// horizontal — no extra copy is needed to promote a post.
//
// Three columns rather than two: at max-w-site (1400px) a two-column card is
// ~690px, far wider than an art plate wants. Three lands at ~455px.
//
// Cards link out to prisma.io/blog for now. The redesign has no post pages of
// its own beyond three scaffold MDX files, and pointing real titles at
// placeholder bodies would be worse than leaving the site. Switching the href
// is a one-line change in data/blog-posts.ts when those pages exist.

// The three brand colours in the site's standard order, cycled across a post's
// chips so the row carries the spectrum without any one chip claiming meaning.
const DOT_COLORS = ["bg-prism-cyan-400", "bg-prism-yellow-400", "bg-prism-red-400"];

// Dates are formatted with an explicit UTC timezone so the server render and
// the client hydration agree regardless of where either one is running — a
// locale-default format flips "Jul 21" to "Jul 20" for anyone west of GMT and
// React reports it as a hydration mismatch.
const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

// Which of PostArt's three hue pairs a grid card gets, from its 0-based
// position. Passing the position straight through paints column 0 with hue 0 on
// every row, column 1 with hue 1, and so on — three vertical stripes rather
// than a rotation, because the column count and the hue count are both 3.
// Adding the row index shifts each row one step along, so the hues run on the
// diagonal and no column repeats itself down the page.
//
// The +1 is so the first grid card doesn't open on the same pair as the lead
// card sitting directly above it, which takes hue 0.
const hueFor = (position: number) => position + Math.floor(position / 3) + 1;

export function BlogIndexGrid() {
  const [lead, ...rest] = BLOG_POSTS;

  return (
    <section className="bg-white px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-site">
        <Reveal>
          <PostCard post={lead} index={0} lead />
        </Reveal>

        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.1} className="h-full">
              <PostCard post={post} index={hueFor(i)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PostCard({
  post,
  index,
  lead = false,
}: {
  post: BlogPost;
  index: number;
  lead?: boolean;
}) {
  // The plate already sets the lead topic in type, so the chip row carries only
  // what the plate does not. Posts tagged with a single topic get no chips —
  // the same guard customers-grid uses for stackless stories — and the card
  // still bottom-aligns because the link takes mt-auto, not the paragraph.
  const secondaryTopics = post.topics.slice(1, 3);

  return (
    <a
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        // `group` drives nothing but the spectrum underline on "Read the post"
        // — the card itself deliberately has no hover state (André).
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-card",
        // Lead card runs taller than its copy needs, matching the /customers
        // ruling: at content height the plate comes out shorter than the three
        // cards below it and the row reads as a wide card rather than the lead.
        lead && "md:min-h-[27rem] md:flex-row md:items-stretch",
      )}
    >
      {/* 16:9 on the grid plates. The lead card keeps h-auto so its plate
          stretches to whatever the copy column needs; it sits beside the text,
          not above it, so it isn't bound to the same ratio. */}
      <PostArt
        post={post}
        index={index}
        size={lead ? "lead" : "card"}
        className={cn(
          "shrink-0",
          lead ? "aspect-video md:aspect-auto md:h-auto md:w-2/5" : "aspect-video w-full",
        )}
      />

      <div className={cn("flex grow flex-col p-7", lead && "md:justify-center md:p-10")}>
        <p className="text-sm text-muted-foreground">
          <time dateTime={post.date}>{DATE_FORMAT.format(new Date(post.date))}</time>
          <span aria-hidden> · </span>
          {/* Two authors is the maximum in the data; a third would need an
              "and N others" rather than a longer list. */}
          {post.authors.join(" & ")}
        </p>

        <h3
          className={cn(
            "mt-3 text-pretty text-xl leading-snug",
            lead && "md:max-w-[24ch] md:text-[clamp(1.5rem,2.2vw,2rem)] md:leading-[1.15]",
          )}
        >
          {post.title}
        </h3>

        {secondaryTopics.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {secondaryTopics.map((topic, i) => (
              <li key={topic}>
                <Marker color={DOT_COLORS[i % DOT_COLORS.length]}>
                  {TOPIC_LABELS[topic] ?? topic}
                </Marker>
              </li>
            ))}
          </ul>
        )}

        {/* No `grow` on the clamped paragraph: line-clamp needs
            display:-webkit-box, and letting flex stretch that box makes it tall
            enough to paint a fourth line which then gets sliced through the
            middle by the clamp. The link takes mt-auto instead. */}
        <p
          className={cn(
            "mt-4 line-clamp-3 text-pretty leading-relaxed text-muted-foreground",
            lead && "md:max-w-[62ch] md:text-lg",
          )}
        >
          {post.excerpt}
        </p>

        {/* Grid cards push the link to the bottom edge so it lines up across a
            row whatever the excerpt length. The lead card must not: its column
            is vertically centred, so mt-auto strands the link at the bottom
            with a gap above it. */}
        {/* The underline needs its own box to sit under, so it goes on an inner
            span — putting it on the outer one would draw the rule 3px below the
            card's bottom padding instead of under the words. */}
        <span className={cn("inline-flex pt-6", !lead && "mt-auto")}>
          <span className="spectrum-underline inline-flex items-center gap-2 text-sm font-semibold text-foreground">
            Read the post
            <ArrowRightBold className="size-3.5" aria-hidden />
          </span>
        </span>
      </div>
    </a>
  );
}
