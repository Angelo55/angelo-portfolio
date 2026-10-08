# Architecture decisions

## Approved baseline

- Frontend: Next.js App Router, React, and TypeScript.
- Rendering: server components and static/server rendering by default; client components only for navigation and animation.
- Styling: global CSS with explicit design tokens and reusable layout/component classes.
- Animation: Motion for React for viewport reveals; CSS transitions for hover and focus feedback.
- Backend: Supabase is planned for structured portfolio data, Storage, and optional private authoring authentication.
- Initial content: typed or code-local placeholder data until final profile content and assets are supplied.

## Boundaries

The public site must remain fast, indexable, accessible, and useful without authentication. Supabase Auth is reserved for a future private editor. Public visitors never need accounts.

## Planned Supabase entities

`projects`, `project_media`, `certificates`, `experience`, `skills`, and `profile`. Published content will be publicly readable through row-level security. Write access will be restricted to the portfolio owner.

## Configuration history

- 2026-10-08: Initial Next.js project configuration added.
- 2026-10-08: Added `allowBuilds.unrs-resolver: true` to `pnpm-workspace.yaml`, as required by the local pnpm/Next.js toolchain.
- 2026-10-08: Added optimized public profile imagery and the downloadable resume under `public/images` and `public/documents`.
