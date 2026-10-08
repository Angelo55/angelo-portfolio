# Current project state

Last updated: 2026-10-09

## Production

- Live URL: https://angelo-portfolio-angelo55s-projects.vercel.app
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
- Social links, external project link, resume document, and email-draft contact flow.
- Canonical metadata, robots, sitemap, favicon, and public indexing configuration.
- ESLint, TypeScript, local production build, Vercel build, and critical asset HTTP checks pass.
- GitHub repository and Vercel Git integration configured.

## Pending

- Add certificate evidence files or public verification URLs when supplied.
- Add future projects to the reusable project collection.
- Add a custom domain if desired.
- Add Supabase only if stored submissions, owner-managed content, or authentication is approved later.

## Known limitations

- Contact submission opens the visitor's configured email application.
- Certificate dialogs contain record details until evidence files are supplied.
- Facebook returned HTTP 405 to a HEAD-only automated check; this is normal for services that reject HEAD and the URL remains configured.
- The local Vercel prebuilt packager could not create Windows symlinks, so the successful release used the remote Linux builder.

## Continue here

Use GitHub main as the production source of truth. Future pushes deploy through the connected Vercel project. Verify the live URL after each release and update this file plus the change history.
