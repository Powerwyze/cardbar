import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const brandedSource = readFileSync(
  resolve("src/components/landing-templates/branded-pages.tsx"),
  "utf8"
);
const routeSource = readFileSync(resolve("src/app/p/[slug]/page.tsx"), "utf8");
const demoSource = readFileSync(resolve("src/lib/templates/types.ts"), "utf8");

const slugs = ["getsocial-miami", "giv-hydration", "glamquest-beauty"];
const officialUrls = [
  "https://www.instagram.com/getsocialmiami/",
  "https://www.givhydration.com/",
  "https://givhydration.janeapp.com/",
  "https://glamquest.com/",
];

test("branded page registry includes each slug and official URL", () => {
  for (const slug of slugs) {
    assert.match(brandedSource, new RegExp(slug));
  }

  for (const url of officialUrls) {
    assert.match(brandedSource, new RegExp(url.replaceAll(".", "\\.")));
  }
});

test("public slug route wires in the branded registry fallback", () => {
  assert.match(routeSource, /generateStaticParams/);
  assert.match(routeSource, /BRANDED_PAGE_SLUGS/);
  assert.match(routeSource, /getBrandedLandingPage\(slug\)/);
  assert.match(routeSource, /if \(slug === "demo"\)/);
});

test("branded and demo sources avoid placeholder hrefs and fake demo contacts", () => {
  assert.doesNotMatch(brandedSource, /href=["']#["']/);
  assert.doesNotMatch(demoSource, /url:\s*["']#["']/);
  assert.doesNotMatch(demoSource, /5{3}/);
  assert.doesNotMatch(
    demoSource,
    new RegExp(["alex", "@", "rivera", "\\.", "com"].join(""))
  );
});
