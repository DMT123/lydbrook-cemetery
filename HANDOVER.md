# Lydbrook Baptist Church Cemetery — Project Handover

## Overview

A digital archive of burial records for the cemetery behind **Lydbrook Baptist Church**, Lower Lydbrook, Forest of Dean, Gloucestershire. The site allows public visitors to search over 200 burial records spanning 1853–2011, view an interactive cemetery plan, and submit requests to add new records.

## Live URLs

| Resource | URL |
|---|---|
| **Production site** | https://lydbrook-cemetery.vercel.app |
| **Admin dashboard** | https://lydbrook-cemetery.vercel.app/admin |
| **GitHub repository** | https://github.com/DMT123/lydbrook-cemetery |
| **Convex dashboard** | https://dashboard.convex.dev (project: lydbrook-cemetery) |
| **Vercel dashboard** | https://vercel.com (project: lydbrook-cemetery) |

## Admin Credentials (temporary — change after handover)

| Field | Value |
|---|---|
| Username | `admin` |
| Password | `Lydbrook2024!` |

> **Action required**: Change these credentials via the Convex dashboard after handover.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS v4, shadcn/ui |
| Backend / Database | Convex (real-time, serverless) |
| Hosting | Vercel |
| Package manager | Bun |
| Version control | Git / GitHub |

## Project Structure

```
lydbrook-cemetery/
├── convex/                    # Backend (Convex)
│   ├── schema.ts              # Database schema (burials, plots, admins, sessions, submissions)
│   ├── burials.ts             # Burial record queries & mutations
│   ├── plots.ts               # Plot queries
│   ├── admin.ts               # Admin queries & mutations
│   ├── adminActions.ts        # Admin Node.js actions (login, seedAdmin)
│   ├── submissions.ts         # Public submission queries & mutations
│   └── _generated/            # Auto-generated types (do not edit)
├── src/
│   ├── app/                   # Next.js pages
│   │   ├── page.tsx           # Homepage
│   │   ├── records/page.tsx   # Burial records search & table
│   │   ├── cemetery-plan/     # Interactive cemetery plan
│   │   ├── add-record/        # Public submission form
│   │   ├── about/             # About & safety information
│   │   ├── admin/             # Admin login & dashboard
│   │   │   ├── page.tsx       # Admin dashboard
│   │   │   └── add-record/    # Admin record creation form
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Theme & custom colours
│   ├── components/
│   │   ├── site-header.tsx    # Responsive nav with hamburger menu
│   │   ├── site-footer.tsx    # Footer with church branding
│   │   ├── admin-provider.tsx # Admin auth context
│   │   ├── convex-provider.tsx# Convex client wrapper
│   │   └── ui/               # shadcn/ui primitives
│   └── lib/
│       └── utils.ts           # cn() helper
├── public/images/             # Site images (AI placeholders — see below)
├── HANDOVER.md                # This file
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── convex.json
```

---

## Database Schema (Convex)

### `burials`
Core burial records. Fields include surname, givenName, middleNames, section, plot, dateOfDeath, yearOfDeath, ageAtDeath, agePeriod, placeOfDeath, sourceOfEvidence, and more. Indexed by surname, section, and plot.

### `plots`
Plot metadata — plotId, section, occupants count, summaryText. Indexed by section and plotId.

### `admins`
Admin user accounts — username, passwordHash (SHA-256), createdAt. Indexed by username.

### `sessions`
Admin login sessions — adminId, token, expiresAt. Indexed by token.

### `submissions`
Public record requests — submitterName, submitterEmail, burialSurname, burialGivenName, burialYear, burialPlot, relationship, additionalInfo, status, adminNotes, createdAt. Indexed by status and date.

---

## Key Features

### Public-facing
- **Homepage** — Hero image, stats, safety warning, cemetery description, photo gallery, interactive map, feature cards
- **Records search** — Full-text search by surname, filter by section, sort by name/year, table and card views
- **Cemetery plan** — Interactive grid of 9 sections (A–I) with 27 plots each; click to view burial details
- **Submit a record** — Form for visitors to request record additions; sends to `info@lydbrookbaptist.co.uk`
- **About page** — Church history, visitor safety information, project details

### Admin
- **Login** — Session-based authentication (24-hour expiry)
- **Dashboard** — View submission requests, mark as reviewed/added, see statistics
- **Add record** — Directly create burial records in the database

### Mobile Responsive
- Hamburger navigation menu on mobile/tablet (< 1024px)
- Stat cards: 2×2 grid on mobile, 4 across on desktop
- Records table: hides less critical columns on smaller screens, abbreviates names
- Feature cards: single column on mobile, expanding to 4 on large screens
- Gallery: 1 column → 2 → 3 as viewport grows
- Footer: stacks to single column on mobile
- Cemetery plan sections: 2 columns on mobile, 3 on tablet+

---

## Branding

- **Colours** derived from https://www.lydbrookbaptist.co.uk
  - Primary blue: `#166093`
  - Light blue: `#3498db`
  - Green: `#4a9e3f`
  - Gold: `#D69746`
  - Warm stone backgrounds
- **Logo**: `public/images/lydbrook-baptist-church-logo.png` (downloaded from the church website)
- **Tagline**: "Loving God, Serving our community"

---

## Images — IMPORTANT

**All current site images are AI-generated placeholders.** They are not photographs of the actual cemetery or church. The following real photographs are needed:

1. **Hero image** — Lydbrook Baptist Church from the road
2. **The steep path** — The path leading up around the side of the church
3. **Inside the burial ground** — Headstones and the cemetery layout
4. **Valley views** — View from the cemetery back towards the valley
5. **Church close-up** — The chapel building itself

Replace files in `public/images/` and redeploy.

---

## Data Sources

The burial records were extracted and merged from two original sources:

1. **Cemetery Plan V2.xlsx** — Excel spreadsheet with burial details
2. **LLBC Cemetery - current.accdb** — Microsoft Access database with plot data

Both located in the project parent folder. Data was deduplicated during import (219 unique burial records, 60 plot records).

---

## Development Commands

```bash
# Install dependencies
bun install

# Start local dev server (frontend)
bun run dev

# Start Convex dev server (backend — run in separate terminal)
bun run dev:convex

# Build for production
bun run build

# Deploy to Vercel
npx vercel --prod

# Deploy Convex functions
bunx convex deploy
```

### Environment Variables

| Variable | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_CONVEX_URL` | `.env.local` + Vercel env vars | Convex deployment URL |

---

## Deployment

- **Vercel**: Auto-deploys from GitHub `main` branch. Manual deploy: `npx vercel --prod`
- **Convex**: Functions deploy automatically during `bunx convex dev`. Production deploy: `bunx convex deploy`

---

## Contact Details (on site)

- **Email**: info@lydbrookbaptist.co.uk
- **Phone**: 01594 833251
- **Address**: Lydbrook Baptist Church, Lower Lydbrook, Gloucestershire, GL17 9NA

---

## Commit History

| Commit | Description |
|---|---|
| `3d6f347` | Initial Next.js scaffold |
| `5249672` | Initial commit: full digital archive with Convex, records, cemetery plan |
| `58e06ef` | Fix Convex provider for SSR prerendering on Vercel |
| `1d3bcf7` | CWGC-style branding overhaul |
| `6df6db7` | Rebrand as Baptist Church Cemetery with safety info |
| `03a5b8f` | Add actual church logo and match brand colours |
| `be3f356` | Fix footer logo visibility |
| `41a486a` | Add admin system with protected record management and public submission form |
| `ae59f56` | Improve mobile responsiveness across all pages |
| `77dfd06` | Improve mobile responsiveness for records table and cemetery plan |

---

## TODO / Next Steps

- [ ] Replace placeholder images with real photographs
- [ ] Change admin credentials to permanent ones
- [ ] Consider adding pagination to records list for performance
- [ ] Add record detail page enhancements (linked family members, headstone photos)
- [ ] Set up a custom domain if desired
- [ ] Add email notification when new submissions arrive (currently uses mailto link)
