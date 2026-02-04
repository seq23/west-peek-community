// scripts/build.mjs
// Cloudflare Pages build: copies /sites/<target>/ -> /dist/<target>/
// Usage: node scripts/build.mjs ventures|productions|community

import fs from "node:fs";
import path from "node:path";

const target = process.argv[2];
if (!target) {
  console.error("Usage: node scripts/build.mjs <ventures|productions|community>");
  process.exit(1);
}

const repoRoot = process.cwd();
const srcDir = path.join(repoRoot, "sites", target);
const outDir = path.join(repoRoot, "dist", target);

if (!fs.existsSync(srcDir)) {
  console.error(`Missing source directory: ${srcDir}`);
  process.exit(1);
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

copyRecursive(srcDir, outDir);

console.log(`Built ${target}: ${srcDir} -> ${outDir}`);

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
