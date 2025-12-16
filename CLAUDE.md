# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BELITEI - A React/TypeScript single-page application for a French renovation and electrical contractor (Épinay-sur-Seine, Île-de-France). The site showcases renovation projects and services with a portfolio gallery.

## Development Commands

```bash
npm run dev      # Start Vite dev server (localhost:5173)
npm run build    # Production build to dist/
npm run preview  # Preview production build locally
```

No linting or testing frameworks are configured.

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (utility-first)
- **Icons:** Lucide React
- **Forms:** Formspree (endpoint: xpwzgvkr)
- **Database:** Supabase (prepared but not yet wired)

## Architecture

Single-page application with vertical sections as independent React components:

```
src/
├── App.tsx              # Root component, orchestrates all sections
├── main.tsx             # React DOM entry point
├── index.css            # Tailwind directives
├── components/          # All page sections
│   ├── Navigation.tsx   # Sticky navbar with mobile menu
│   ├── Hero.tsx         # Hero banner with CTAs
│   ├── Services.tsx     # 6 service cards grid
│   ├── Process.tsx      # 4-step workflow
│   ├── Projects.tsx     # Gallery with lightbox modal
│   ├── Testimonials.tsx # Customer reviews
│   ├── About.tsx        # Professional background
│   ├── Contact.tsx      # Form + contact info (Formspree)
│   └── Footer.tsx       # Footer section
└── data/
    └── projects.ts      # Static project data (15 projects)
```

## Key Patterns

- **State Management:** Local React hooks only (useState, useEffect, useCallback)
- **Navigation:** Hash-based routing (#accueil, #services, etc.) with smooth scroll
- **Responsive Design:** Mobile-first with Tailwind breakpoints (md:, lg:)
- **Color Scheme:** Amber-500 (primary/CTAs), Slate-900 (text), White/Slate-50 (backgrounds)

## Project Data

Projects are defined in `src/data/projects.ts` with categories: electricite, salle-de-bain, ventilation, plomberie, carrelage, renovation-complete, cuisine, exterieur. Images stored in `/public/images/`.

## Supabase Schema

Migration in `supabase/migrations/` defines two tables with RLS:
- **projects:** Portfolio display (public read)
- **contact_submissions:** Form submissions (public insert)

Currently using static data; Supabase integration is prepared but not connected.

## SEO

Comprehensive SEO setup in `index.html`: Schema.org LocalBusiness JSON-LD, Open Graph, Twitter Cards, sitemap.xml, robots.txt.
