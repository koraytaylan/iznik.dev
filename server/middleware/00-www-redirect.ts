/**
 * www.iznik.dev is attached only so a request can leave. The site is the apex.
 * Runs before the other server middleware (alphabetical).
 */
const APEX = "https://iznik.dev";
const WWW = "www.iznik.dev";

function bareHost(value: string): string {
  return value.trim().replace(/:\d+$/, "").toLowerCase();
}

function headerHosts(header: string | null): string[] {
  return (header ?? "").split(",").map(bareHost).filter(Boolean);
}

export default function wwwRedirect(event: {
  url: URL;
  req: { headers: Headers };
}): Response | undefined {
  const hosts = [
    event.url.hostname.toLowerCase(),
    ...headerHosts(event.req.headers.get("host")),
    ...headerHosts(event.req.headers.get("x-forwarded-host")),
  ];
  if (!hosts.includes(WWW)) return;
  return new Response(null, {
    status: 301,
    headers: {
      location: new URL(event.url.pathname + event.url.search, APEX).href,
      "cache-control": "public, max-age=3600",
    },
  });
}
