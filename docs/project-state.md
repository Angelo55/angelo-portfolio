# Current project state

Last updated: 2026-10-18

## Production

- Live URL: https://angelolacsao-portfolio.vercel.app
- GitHub: https://github.com/Angelo55/angelo-portfolio
- Vercel project: angelo55s-projects/angelo-portfolio
- Branch: main
- GitHub `main` is the production source of truth; Vercel deploys pushes to the linked project. Verify deployment readiness and the `angelolacsao-portfolio.vercel.app` alias after each release.
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
- Persistent sticky navigation remains visible in both scroll directions; scroll-direction expansion/compression, responsive menu, theme control, and keyboard behavior are preserved. The outer shell uses `overflow: clip` so it does not intercept sticky positioning.
- Bidirectional viewport reveals with reduced-motion support.
- Horizontal, extensible PESO Kabankalan showcase and accessible case-study overlay.
- Reference-led GitHub Activity section follows Featured Projects and uses the shared scroll-reveal treatment with reduced-motion support. Public repository/star counts come from cached GitHub REST data; the server-only GraphQL token supplies the contribution calendar and a private-repository count without exposing private repository details. The production calendar matched GitHub's public 631-contribution total when checked on 2026-10-18; the no-token state remains explicit.
- The desktop profile card uses two caption rows: name and role together, then Sipalay City residence. Mobile retains its stacked caption. Fellowship Baptist College appears above the hero's “Explore my work” action; chatbot knowledge and the public resume retain the same verified facts.
- Accessible resume and credential overlays.
- Social links, GitHub profile link, explicit live-demo/source actions, resume document, and Formspree contact flow with a visible copyable email-address fallback.
- Project showcase links distinguish the PESO live deployment from the portfolio source repository. The PESO repository remains private by the owner's choice; do not add a public source link unless the owner later makes it available.
- PESO Kabankalan project descriptions and the public resume identify job seekers and PESO personnel as the platform's users. The owner confirmed that no employer user role was integrated; recruiter-assistant grounding explicitly preserves that distinction.
- Canonical metadata, robots, sitemap, favicon, and public indexing configuration.
- ESLint, TypeScript, local production build, Vercel build, and critical asset HTTP checks pass.
- GitHub repository and Vercel Git integration configured.
- Compact responsive navigation treatment and centered portrait crop refined.
- Hero statement uses a Motion-powered bouncing orb and fine lavender trace; the continuous cycle randomizes landing points/direction while maintaining a steady cadence and honors reduced motion.
- Full PESO Kabankalan preview asset is used in the wide showcase and overlay without cropping.
- Profile presentation now uses an isolated source-ratio container with a centered responsive crop.
- Navigation is centered and width-bounded in both expanded and compressed states.
- Tablet and mobile navigation use a right-aligned trigger with reversible dropdown motion and preserved keyboard/outside-click behavior.
- All five supplied certificates have responsive preview cards and accessible PDF overlays with document-verified metadata. Their gallery order is IT Customer Support Basics, IT Support Specialist Pathway Exam, Core Generative AI Skills, Introduction to AI Literacy and Responsible Use, then English for Career Development MOOC.
- Skills are grouped into IT Support, Customer Service, Artificial Intelligence, Responsible AI, and Development & Automation; all skill chips are non-interactive and no longer redirect to Credly.
- The current one-page letter resume uses a single-column, black-text, ATS-readable layout with selectable top-to-bottom text, conventional section headings, and the current BSIT profile, project, experience, skills, and five listed certificates. Personal birth details, phone number, and street-level address remain omitted from the public version.
- The chatbot panel retains its fixed launcher-relative placement; opening, resetting, using a document preview, and closing no longer move the page. Background scroll is locked while chat is open, internal message scroll is contained, and the topmost document dialog handles Escape before chat.
- The recruiter assistant uses a 420px desktop width and a bounded 610px height, six explicit grid rows, and a contained message scroller. Mobile sizes respect viewport height; short-height screens keep quick actions accessible in a horizontal strip.
- Professional positioning now covers AI automation and automation internships, hands-on n8n and Make.com exposure, full-stack development, IT support, and hardware support.

## Pending

- Configure a public-resource-only `GITHUB_ACTIVITY_TOKEN` in Vercel Production, redeploy, and verify the authentic contribution calendar and derived streak. Keep private repository access out of this integration.

- Add future projects to the reusable project collection.
- Add a custom domain if desired.
- Add Supabase only if stored submissions, owner-managed content, or authentication is approved later.
- If the owner later chooses to make the PESO repository public, confirm its canonical URL and then add a clearly labeled source link; keep it private for now.
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
- Production assistant responses are normalized to safe plain text and preserve line breaks, preventing raw Markdown emphasis markers from appearing in recruiter-facing answers.
- The English for Career Development MOOC Certificate of Award is integrated with a legible cropped preview, unchanged source PDF, verified OPEN metadata, and the existing accessible document overlay.
- Local certificate QA confirms three cards, correct PDF/open/download paths, HTTP 200 asset responses, clean console output, responsive 390x844 overlay bounds, and keyboard focus restoration after Escape.
- IT Customer Support Basics is integrated with a responsive preview, original Cisco Networking Academy certificate, verified course/title/recipient/date details, and the existing accessible document overlay.
- IT Support Specialist Pathway Exam is integrated immediately after IT Customer Support Basics with an unchanged PDF, optimized preview, verified Cisco Networking Academy title, recipient, 18 October 2026 completion date, and certificate ID. The chatbot knowledge base includes the new credential.
- The resume has a one-page, single-column ATS-readable layout with current site-consistent education, work/leadership history, project, skills, and all five certificates.
- The resume generator and public PDF now include IT Support Specialist Pathway Exam immediately after IT Customer Support Basics. The public URL remains unchanged for hero, experience, and chatbot previews/downloads. Text extraction, one-page letter dimensions, and visual rendering were rechecked after regeneration.
- Resume links in the hero, experience section, and chatbot continue to use the same public URL, now serving the refreshed PDF; chatbot knowledge includes the updated skill groups and certificate list.
- Local validation for this update: lint/build/diff-check pass; resume and certificate text, page count, links, and source/public hashes were checked; all public asset routes returned HTTP 200; desktop skill links, credential overlay metadata/actions, Escape dismissal, and focus restoration were verified. PDF visual review used a local renderer because the available in-app browser does not render embedded PDFs. Responsive CSS targets were inspected; a live mobile viewport was unavailable in this browser session.

## Known limitations

- Portfolio POST routes now have bounded parsing, timeouts/admission limits, and same-instance duplicate-request safeguards; see `docs/backend-reliability-audit.md` for the 2026-10-19 controlled concurrency results. Cross-instance event uniqueness and atomic distributed rate limiting are not claimed because the portfolio Supabase database is not connected in this workspace.
- Request-abuse controls, environment settings, and the **live, log-only** Vercel chat WAF rule are documented in `docs/request-abuse-protection.md`. The rule observes traffic but does not block it. The owner reported enabling Formspree domain restriction and CAPTCHA; the tokenless rejection and successful live delivery tests are recorded, though the signed-in settings were not independently readable. The direct endpoint remains public, with Formspree now rejecting submissions lacking Turnstile verification.

- The GitHub contribution calendar intentionally keeps a dense 11px visual grid; its roving keyboard focus and day labels are accessible, but a larger alternative touch-selection control would improve precision on phones. This pass did not alter the approved calendar layout.

- Contact submissions use the owner-provided Formspree endpoint. The owner confirmed live-site submissions arrived in the inbox rather than spam, including after enabling the production-domain restriction and CAPTCHA; the post-CAPTCHA submission displayed success on the site and the owner confirmed mobile use works. The Copy address fallback displayed its success message after copying. The free plan is limited to 50 monthly submissions. A hidden spam-trap field and Formspree's own protections help, but cannot fully prevent automated submissions or quota exhaustion. The Cloudflare Turnstile widget is live, has a compact responsive maximum width in the form, and visibly succeeds on the custom production hostname. A tokenless test returned HTTP `400` with a Turnstile-required error.
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
