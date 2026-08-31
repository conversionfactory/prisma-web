import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next 16 rejects /_next/* requests from any dev origin other than localhost,
  // which breaks the whole app when it's opened over the LAN (e.g. to show
  // someone on the same network). Whitelist the machine's LAN host.
  allowedDevOrigins: ["192.168.0.5"],
  async redirects() {
    return [
      // /case-studies was the scaffold's name for what the approved sitemap
      // calls /customers — same thing, one canonical URL. Nothing was carried
      // over: that route held three Relume placeholder studies (Acme Corp,
      // Globex, Initech) with invented metrics, not Prisma content.
      { source: "/case-studies", destination: "/customers", permanent: true },
      { source: "/case-studies/:slug", destination: "/customers", permanent: true },
    ];
  },
};

export default nextConfig;
