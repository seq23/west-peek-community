# West Peek — 3 Sites, 1 Repo (Cloudflare Pages)

This repo deploys three static sites from one GitHub repo using **three separate Cloudflare Pages projects**.

## Sites
- **West Peek Ventures** → `westpeek.ventures`
- **West Peek Productions** → `westpeek.productions`
- **West Peek Community** → `joinwestpeek.com`

## Cloudflare Pages settings (per project)

### Ventures
- Build command: `node scripts/build.mjs ventures`
- Output directory: `dist/ventures`

### Productions
- Build command: `node scripts/build.mjs productions`
- Output directory: `dist/productions`

### Community
- Build command: `node scripts/build.mjs community`
- Output directory: `dist/community`

## Shared assets
All sites consume shared assets in `shared/assets/`. During build, assets are copied into `dist/<site>/assets/`.

## Forms
Each site includes a real contact form that POSTs to `/api/lead` (expected to be powered by a Cloudflare Worker).


## Community hero image
- `shared/assets/img/community-hero.jpg` is used on the community homepage hero.
