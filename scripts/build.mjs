
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
const shared = path.join(root, "shared", "assets");

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

copy(src, out);
fs.mkdirSync(path.join(out, "assets"), { recursive: true });
copy(shared, path.join(out, "assets"));

function copy(from, to) {
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    const f = path.join(from, e.name);
    const t = path.join(to, e.name);
    if (e.isDirectory()) {
      fs.mkdirSync(t, { recursive: true });
      copy(f, t);
    } else fs.copyFileSync(f, t);
  }
}

console.log(`Built ${target}`);
