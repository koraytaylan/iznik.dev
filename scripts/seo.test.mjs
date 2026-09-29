import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const origin = "https://iznik.dev";

test("robots.txt names the sitemap and leaves the site open", () => {
  const text = readFileSync("public/robots.txt", "utf8");
  assert.match(text, /^User-agent: \*$/m);
  assert.match(text, /^Allow: \/$/m);
  assert.match(text, new RegExp(`^Sitemap: ${origin}/sitemap.xml$`, "m"));
  assert.doesNotMatch(text, /^Disallow: \/$/m);
});

test("sitemap.xml lists the original homepage", () => {
  const text = readFileSync("public/sitemap.xml", "utf8");
  assert.match(text, /xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9"/);
  assert.match(text, new RegExp(`<loc>${origin}</loc>`));
  assert.doesNotMatch(text, /<loc>https:\/\/iznik\.dev\/</);
  assert.equal((text.match(/<loc>/g) ?? []).length, 1);
});

test("llms.txt follows the spec and points at the markdown page", () => {
  const text = readFileSync("public/llms.txt", "utf8");
  assert.match(text, /^# İznik\n/);
  assert.match(text, /^> /m);
  assert.match(text, /^## Docs\n/m);
  assert.match(text, /\(https:\/\/iznik\.dev\/index\.md\)/);
  const page = readFileSync("public/index.md", "utf8");
  assert.match(page, /^# İznik\n/);
  assert.match(page, /^## On a host\n/m);
  assert.match(page, /^## Commands\n/m);
});
