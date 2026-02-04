# West Peek Community Monorepo (3 sites, 1 repo)

This repo is designed to deploy multiple static sites from one GitHub repo via Cloudflare Pages.

## Build command
Cloudflare Pages should run:

`node scripts/build.mjs ventures`

(Later: `productions` or `community`)

## Output directory
Set Cloudflare Pages output directory to:

`dist/ventures`

## Source
The source files live in:

`sites/ventures/`
