# Current project state

Last updated: 2026-10-12

## Production

- Live URL: https://angelolacsao-portfolio.vercel.app
- GitHub: https://github.com/Angelo55/angelo-portfolio
- Vercel project: angelo55s-projects/angelo-portfolio
- Branch: main
- Application: Next.js 16 App Router, React 19, TypeScript, Motion
- Data model: static source-controlled portfolio content with optional Supabase-backed analytics
- Runtime integrations: server-only DeepSeek and Supabase analytics credentials are configured in Vercel; no secrets are exposed to the browser
- Deployment protection: disabled so the portfolio is public

## Completed

- Completed a full-stack technical, UI/UX, accessibility, performance, security, and production-configuration audit on 2026-10-12; detailed evidence is recorded in `docs/audit-2026-10-12.md`.
- Repaired dark-theme contrast across shared dialogs, profile controls, and certificate cards; restored explicit input focus rings.
- Corrected same-origin document framing, analytics/browser-storage resilience, private-dashboard error handling, and chatbot/analytics API hardening.
- Completed Codex Security scan `80239b26-8940-4b43-81eb-d16d39c6059e`: two low-severity findings on the prior snapshot were remediated in the working tree.
- Production dependency advisory audit reports no known vulnerabilities.

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
- Supabase analytics schema and server-only production variables are configured; the private dashboard remains owner-authenticated.
- Private `/analytics` dashboard is implemented with Supabase email/password authentication; create the owner account in Supabase Auth before first use.
- Light/dark mode toggle now persists a user choice, follows the system theme by default, and applies a dark contrast palette without changing the light-theme baseline.
- Mobile navigation now traps keyboard focus while open and restores focus on Escape; Supabase proxy lint warning was removed.
- SEO metadata now includes Twitter cards, an explicit icon, Person JSON-LD, and robots exclusions for the private analytics/API paths.
- Contact draft validation now trims input, enforces useful length bounds, and reports incomplete messages before opening the visitor's email app.
- Analytics page-view events are deferred to idle time, use `sendBeacon` where supported, and suppress rapid duplicate click events.
- Deployment responses now include baseline security headers, and the analytics endpoint rejects unexpected origins and oversized payloads.
- GitHub Actions now runs locked dependency installation, lint, production build, and whitespace checks on pull requests and `main` pushes.
- Added a public `/privacy` page describing analytics, hashed identifiers, local storage, theme preferences, contact behavior, and current retention.
- Final production QA verified root/privacy/robots/sitemap HTTP 200 responses, protected analytics redirect, JSON-LD, security headers, analytics origin rejection, and local interactive assistant/header behavior.
- Recruiter-focused DeepSeek portfolio assistant added with verified knowledge grounding, quick actions for summary/skills/project/resume/contact, server-only key usage, input limits, rate limiting, timeout fallback, and responsive accessible UI.
- Chatbot motion now follows the portfolio's Motion-based interaction language with restrained panel/message transitions, spring-like hover/tap feedback, and a reduced-motion override.
- Portfolio copy now uses a consistent first-person voice for the candidate narrative and assistant knowledge base.
- Header theme and mobile-menu controls now occupy stable responsive columns, preserving alignment at tablet and narrow mobile widths.
- Chatbot redesigned as a compact recruiter assistant with concise quick prompts, assistant/visitor avatars, a functional New chat reset, focus containment, Escape/outside-click dismissal, backdrop blur, and resource actions.
- Resume access reuses the existing embedded document dialog; the PESO resource opens an in-chat project preview with live-demo, source, and section-navigation actions; credentials link back to the existing certificate overlay section.
- Fresh local browser QA confirmed the mobile header at 390px, assistant open/close, outside-click dismissal, New chat reset, PESO preview overlay, and clean console output on a fresh page.

## Known limitations

- Contact submission opens the visitor's configured email application.
- Analytics events are accepted safely when storage is not configured, but are not persisted until the Supabase table and server-only environment variables are provisioned.
- Facebook returned HTTP 405 to a HEAD-only automated check; this is normal for services that reject HEAD and the URL remains configured.
- The local Vercel prebuilt packager could not create Windows symlinks, so the successful release used the remote Linux builder.
- The in-app audit browser cannot render localhost PDFs inline; resume and certificate open/download fallbacks remain available, and production document responses allow same-origin framing.
- Rate limiting remains best-effort per Vercel function instance; a distributed limiter is only warranted if observed traffic or abuse requires it.
- A strict nonce-based Content Security Policy and immutable GitHub Action SHA pins remain documented defense-in-depth follow-ups.

## Continue here

Use GitHub main as the production source of truth. Future pushes deploy through the connected Vercel project. Verify the live URL after each release and update this file plus the change history.

## Standard finalization workflow

When the owner says `update my local docs and etc. and commit and push`, complete this sequence:

1. Update the project documentation and continuation state.
2. Review all modified and untracked files.
3. Run the relevant verification checks.
4. Create a descriptive Git commit.
5. Push the commit to the configured GitHub repository.
