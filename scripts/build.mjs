import fs from "node:fs";
import path from "node:path";

const target = process.argv[2];
if (!target) {
  console.error("Usage: node scripts/build.mjs <ventures|productions|community>");
  process.exit(1);
}

const root = process.cwd();
const src = path.join(root, "sites", target);
const out = path.join(root, "dist", target);
const sharedAssets = path.join(root, "shared", "assets");

function exists(p){ try { fs.accessSync(p); return true; } catch { return false; } }
function fail(msg){ console.error(msg); process.exit(1); }

if (!exists(src)) fail(`Missing source directory: ${src}`);
if (!exists(sharedAssets)) fail(`Missing shared assets directory: ${sharedAssets}`);

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

copyRecursive(src, out);

const outAssets = path.join(out, "assets");
fs.mkdirSync(outAssets, { recursive: true });
copyRecursive(sharedAssets, outAssets);

const required = {
  ventures: [
    path.join(outAssets, "base.css"),
    path.join(outAssets, "img", "ventures-hero.jpg"),
    path.join(outAssets, "img", "ventures-logo.png"),
    path.join(outAssets, "js", "forms.js"),
  ],
  productions: [
    path.join(outAssets, "base.css"),
    path.join(outAssets, "img", "productions-hero.jpg"),
    path.join(outAssets, "img", "productions-logo.jpg"),
    path.join(outAssets, "js", "forms.js"),
  ],
  community: [
    path.join(outAssets, "base.css"),
    path.join(outAssets, "img", "community-logo.jpg"),
    path.join(outAssets, "js", "forms.js"),
  ],
};

if (!required[target]) fail(`Unknown target: ${target}`);
for (const f of required[target]) {
  if (!exists(f)) fail(`Build contract failed for ${target}. Missing: ${f}`);
}

console.log(`Built ${target}: ${src} -> ${out}`);

function copyRecursive(from, to) {
  const entries = fs.readdirSync(from, { withFileTypes: true });
  for (const e of entries) {
    const fromPath = path.join(from, e.name);
    const toPath = path.join(to, e.name);
    if (e.isDirectory()) {
      fs.mkdirSync(toPath, { recursive: true });
      copyRecursive(fromPath, toPath);
    } else {
      fs.copyFileSync(fromPath, toPath);
    }
  }
}
