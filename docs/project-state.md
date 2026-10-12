# Current project state

Last updated: 2026-10-12

## Production

- Live URL: https://angelolacsao-portfolio.vercel.app
- GitHub: https://github.com/Angelo55/angelo-portfolio
- Vercel project: angelo55s-projects/angelo-portfolio
- Branch: main
- Application: Next.js 16 App Router, React 19, TypeScript, Motion
- Data model: static source-controlled content; Supabase is not required
- Required environment variables: none
- Deployment protection: disabled so the portfolio is public

## Completed

- Correct PNG profile asset verified by SHA-256 and served from public/images/lacsao-formal-photo.png.
- Responsive desktop, tablet, and mobile profile composition.
- Wide sticky navigation with reliable scroll-direction expansion and compression.
- Bidirectional viewport reveals with reduced-motion support.
- Horizontal, extensible PESO Kabankalan showcase and accessible case-study overlay.
- Accessible resume and credential overlays.
- Social links, GitHub profile link, explicit live-demo/source actions, resume document, and email-draft contact flow.
- Project showcase links distinguish the PESO live deployment from the portfolio source repository; a dedicated PESO repository URL can replace the portfolio source when confirmed.
- Canonical metadata, robots, sitemap, favicon, and public indexing configuration.
- ESLint, TypeScript, local production build, Vercel build, and critical asset HTTP checks pass.
- GitHub repository and Vercel Git integration configured.
- Compact responsive navigation treatment and centered portrait crop refined.
- Hero statement uses a Motion-powered bouncing orb and fine lavender trace; the continuous cycle randomizes landing points/direction while maintaining a steady cadence and honors reduced motion.
- Full PESO Kabankalan preview asset is used in the wide showcase and overlay without cropping.
- Profile presentation now uses an isolated source-ratio container with a centered responsive crop.
- Navigation is centered and width-bounded in both expanded and compressed states.
- Tablet and mobile navigation use a right-aligned trigger with reversible dropdown motion and preserved keyboard/outside-click behavior.
- Both supplied certificates have responsive preview cards and accessible PDF overlays with verified metadata.
- Professional positioning now covers AI automation and automation internships, n8n workflow exposure, full-stack development, IT support, and hardware support.

## Pending

- Add future projects to the reusable project collection.
- Add a custom domain if desired.
- Add Supabase only if stored submissions, owner-managed content, or authentication is approved later.
- Add a dedicated PESO repository link when the canonical project repository is confirmed.
- Apply `supabase/analytics.sql` and configure server-only `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `ANALYTICS_HASH_SALT` before enabling persistent analytics in production.
- Private `/analytics` dashboard is implemented with Supabase email/password authentication; create the owner account in Supabase Auth before first use.
- Light/dark mode toggle now persists a user choice, follows the system theme by default, and applies a dark contrast palette without changing the light-theme baseline.
- Mobile navigation now traps keyboard focus while open and restores focus on Escape; Supabase proxy lint warning was removed.
- SEO metadata now includes Twitter cards, an explicit icon, Person JSON-LD, and robots exclusions for the private analytics/API paths.
- Contact draft validation now trims input, enforces useful length bounds, and reports incomplete messages before opening the visitor's email app.
- Analytics page-view events are deferred to idle time, use `sendBeacon` where supported, and suppress rapid duplicate click events.
- Deployment responses now include baseline security headers, and the analytics endpoint rejects unexpected origins and oversized payloads.
- GitHub Actions now runs locked dependency installation, lint, production build, and whitespace checks on pull requests and `main` pushes.

## Known limitations

- Contact submission opens the visitor's configured email application.
- Analytics events are accepted safely when storage is not configured, but are not persisted until the Supabase table and server-only environment variables are provisioned.
- Facebook returned HTTP 405 to a HEAD-only automated check; this is normal for services that reject HEAD and the URL remains configured.
- The local Vercel prebuilt packager could not create Windows symlinks, so the successful release used the remote Linux builder.

## Continue here

Use GitHub main as the production source of truth. Future pushes deploy through the connected Vercel project. Verify the live URL after each release and update this file plus the change history.

## Standard finalization workflow

When the owner says `update my local docs and etc. and commit and push`, complete this sequence:

1. Update the project documentation and continuation state.
2. Review all modified and untracked files.
3. Run the relevant verification checks.
4. Create a descriptive Git commit.
5. Push the commit to the configured GitHub repository.
