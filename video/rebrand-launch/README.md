# Prisma rebrand launch film

Remotion project for the rebrand launch film (Brand New submission). Lives outside the pnpm workspace on purpose, so it has its own `npm` install and never touches the site builds.

```bash
npm install
npm run dev          # Remotion Studio
npm run render       # out/prisma-rebrand-launch-1920x1080.mp4
npm run render:4x5   # out/prisma-rebrand-launch-1080x1350.mp4
```

## Music

Cut to **120 BPM, 4/4**. At 60fps one beat is 30 frames and one bar is 2s, so every cut sits on a frame boundary. Total: 22 bars, 44s. The track needs a riser through 0:02–0:04 and a hit at **0:04**. A track between 118 and 124 BPM can be matched by changing `BPM` in `src/theme.ts`, since all timing derives from it.

| Bars | Time | Scene | Hits |
|---|---|---|---|
| 1 | 0:00–0:02 | Old indigo lockup, wordmark slides back behind the mark | quiet |
| 2 | 0:02–0:04 | Beam through the old prism, light splits into the five-stop spectrum, prismatic burst erupts | riser |
| 3 | 0:04–0:06 | New mark assembles inside the burst as the light pulls in | **hit at 0:04** |
| 4 | 0:06–0:08 | Light irises open from the mark onto the paper hero; wordmark slides out of the mark | open on bar 4 |
| 5–6 | 0:08–0:12 | Lockup lifts into its slot above the H1, headline slides up, prompt types and sends | send on bar 6 beat 3 |
| 6→7 | 0:11.6–0:12.4 | Ray wipe: the three bands sweep the frame, the cut hides under them | downbeat of bar 7 |
| 7–9 | 0:12–0:18 | "Prisma" holds, product word rolls each downbeat; media panel scrolls, 3D object drops in | each downbeat |
| 10 | 0:18–0:20 | Panel opens to the frame; the three objects line up on the ray (M-07), H2 slides in | |
| 11–13 | 0:20–0:26 | Hard cut to Ink. LED counter lands on 1,000,000 on bar 12, light flares at the edges only | hit on bar 12 |
| 14 | 0:26–0:28 | PRISMA print paints on | every beat |
| 15 | 0:28–0:30 | Merch, two tilted marquee rows | |
| 16 | 0:30–0:32 | Tote, then scrolls up into the Builder's Day card over the clouds | beat 3 |
| 17 | 0:32–0:34 | Tee and hoodie side by side, push into the hoodie's X | |
| 18–19 | 0:34–0:38 | Match cut onto the X, pull back, Prismo pops in and looks around | beat 2 of bar 18 |
| 20–22 | 0:38–0:44 | "From prompt to product." end card (bookends the hero), scroll to the footer wordmark taking its stripes | ring out |

Visual language is ported from `apps/site-redesign`: `src/site/` holds the PrismaticBurst shader, spectral bottom, glass glide, spectrum ring, prism ray, ray wipe and footer wordmark, all driven by the frame clock. Copy always sits on white or Ink, never over rays or photography.

## Sources

All copy is verbatim from the Figma "Prisma Collateral" file (M-07 brand film spec), the live site, or the stat-loop videos. Old mark: the pre-rebrand indigo prism (`public/old/`). Merch and Builder’s Day come from Figma exports in `public/figma/`; photo panels, 3D objects and the clouds loop come from `apps/site-redesign/public/brand`.
