# Change history

## 2026-10-08  v0.1 approved foundation

Approved:

- Next.js App Router, React, TypeScript, and Supabase-ready architecture.
- Reference-inspired visual system with teal and lavender accents.
- Page flow including dedicated certificate navigation.
- Motion for scroll reveals and CSS for smaller interactions.
- Mobile-first adaptive behavior.

Implemented:

- Initial project scaffold and full single-page portfolio structure.
- Responsive design system, interaction styles, and reduced-motion behavior.
- Dedicated `docs/` project memory requested by the user.
- Local package configuration for the resolver build required by this development environment.

Next state:

- Production build compiled successfully.
- Desktop render reviewed at 1440�1000 using Edge headless after the built-in browser was unavailable.
- Fixed reduced-motion rendering so reveal content cannot remain hidden.
- True mobile emulation remains the next fidelity checkpoint.

## 2026-10-08  v0.1.1 local developer workflow

- Added Start Portfolio.bat to open VS Code, start Next.js in the background, wait for readiness, and open the browser.
- Added Stop Portfolio.bat to stop the saved background server process.
- Added VS Code tasks that use the project-local Next.js executable.
- Avoided dependence on unavailable global code and pnpm commands.
- Verified the launcher successfully against the installed nonstandard VS Code path.

## 2026-10-08  v0.2 resume content and desktop viewport

- Approved and implemented a desktop-only full-viewport correction while preserving the 980px and 700px responsive behavior.
- Removed the 1480px desktop shell cap and changed the hero to use the available viewport height.
- Integrated Angelo Lacsao's formal portrait and downloadable resume.
- Replaced fictional project, certificate, experience, skill, location, email, and language placeholders with resume-verified content.
- Omitted private address, phone number, birth date, and birthplace from the public portfolio.
- Production build completed successfully and the updated desktop hero was visually reviewed at 1920x1080.


## 2026-10-09 - v0.3 interaction and portfolio evidence audit

Approved and implemented:

- Refined the profile card into a smaller, cleaner presentation and confirmed the requested `Lacsao's Formal Photo.png` is the active source image.
- Restored LinkedIn, Facebook, Instagram, Gmail, and resume access.
- Added a shared accessible overlay dialog for project, resume, and credential content.
- Added focus trapping, focus restoration, Escape and backdrop close, body scroll locking, responsive sizing, and reduced-motion compatibility.
- Replaced the inert PESO project card with an interactive case study based on the official public website.
- Limited project claims to public features and Angelo's resume-supported role areas: architecture and infrastructure, frontend and backend functionality, and UI/UX.
- Replaced misleading certificate links with detail dialogs that clearly state when evidence has not yet been supplied.
- Connected the contact form to a validated mail draft workflow.
- Improved card, button, link, modal, hover, focus, active, and touch interactions.
- Improved mobile navigation behavior and fixed its desktop-button specificity conflict.
- Corrected narrow-screen hero text sizing to prevent horizontal clipping.
- Production build completed successfully.


## 2026-10-09 - v0.4 horizontal showcase and responsive motion

Approved and implemented:

- Rebuilt the selected-work area as a wide horizontal PESO Kabankalan showcase with the official public-site image, editorial project details, and the existing accessible case-study dialog.
- Moved project content into an extensible project data collection so additional applications can be rendered as matching showcase rows.
- Restored a wide desktop navigation composition.
- Added scroll-direction-aware header compression using a passive listener and requestAnimationFrame. The header compresses while scrolling down and expands while scrolling up or near the page top.
- Preserved the accessible mobile menu, keyboard behavior, focus restoration, and minimum touch sizes.
- Converted reveal animations from one-time entrances to reversible viewport-aware transitions using opacity and transform only.
- Added reduced-motion behavior for the reveal and header systems.
- Production build and TypeScript validation pass.

Asset status:

- The corrected source asset is `Lacsao's Formal Photo.png`.
- The production asset was verified byte-for-byte against the supplied PNG.
- The supplied PNG is the final approved source asset.

## 2026-10-09 - v1.0 production release

- Confirmed the production profile image matches the supplied Formal Photo PNG byte-for-byte.
- Published the image as public/images/lacsao-formal-photo.png and removed the superseded public asset.
- Reworked header scroll detection to accumulate directional movement and applied a clearly visible compressed state.
- Added ESLint 9 flat configuration; lint, TypeScript, and production build all pass.
- Created private GitHub repository: https://github.com/Angelo55/angelo-portfolio
- Connected Vercel project: angelo55s-projects/angelo-portfolio
- Deployed production: https://angelo-portfolio-angelo55s-projects.vercel.app
- Disabled Vercel SSO protection for this public portfolio project.
- Added canonical metadata, Open Graph metadata, robots route, sitemap, and favicon.
- Supabase was omitted because the static portfolio has no persistence requirement.

## 2026-10-09 - v1.1 focused visual refinement

- Reduced the expanded and compressed navigation height while preserving every navigation and interaction behavior.
- Centered the approved formal portrait with a stable responsive crop and unchanged aspect ratio handling.
- Added a low-motion looping highlight treatment to the hero phrase "digital products" with a static reduced-motion fallback.
- Kept the existing Lucide visual language and added one semantic public-service icon beside the PESO category label.
- Replaced the cropped PESO preview with the supplied full 16:9 preview image in both the showcase and case-study overlay.
- Verified desktop, mobile, and PESO showcase renders locally; ESLint and the production build pass.

## 2026-10-09 - v1.2 profile, navigation, and certificate refinement

- Corrected the profile image at the container level with isolated profile card, media, and metadata styles.
- Matched the profile frame to the approved PNG aspect ratio and centered its responsive crop.
- Reduced and centered the navigation width, with a narrower compressed state while preserving its links, mobile menu, and scroll behavior.
- Replaced placeholder certificate rows with a reusable, data-driven certificate gallery.
- Added optimized previews and original PDF access for the Mapua/ACHIEVE AI literacy and Cisco Networking Academy generative AI certificates.
- Reused the accessible blurred overlay for responsive PDF viewing, metadata, download, focus management, Escape close, and focus restoration.
- Confirmed ESLint and the Next.js production build pass.
- Adopted `update my local docs and etc. and commit and push` as the standard project finalization reminder.

## 2026-10-09 - v1.3 production URL refinement

- Added `https://angelolacsao-portfolio.vercel.app` as the preferred public production alias.
- Verified the new alias returns HTTP 200 and serves the portfolio.
- Updated canonical metadata, robots sitemap reference, generated sitemap URL, and current project state to use the preferred address.
- Retained earlier deployment addresses as Vercel aliases for compatibility.
## 2026-10-09 - v1.4 responsive navigation refinement

- Corrected the narrow-header grid override that placed the menu trigger in the center column.
- Restored a left-aligned brand and right-aligned menu trigger across tablet and mobile breakpoints.
- Added reversible dropdown fade, slide, and scale transitions using the established easing and timing language.
- Added a coordinated menu-to-close icon transition and a motion-free reduced-motion state.
- Preserved first-link focus, Escape close with focus restoration, outside-click close, link selection, and scroll-responsive header behavior.
- Verified the interaction at 390x844 and 820x1180 with automated browser tests and visual screenshots.
- Confirmed ESLint and the Next.js production build pass.
## 2026-10-09 - v1.5 automation internship positioning

- Updated hero, profile, current-focus, mission, workflow-automation capability, and contact messaging to include AI automation and automation internship positioning.
- Described n8n and AI-powered workflow automation as foundational hands-on exposure and practical interest, without claiming expert or production-specialist experience.
- Retained full-stack development, IT support, and hardware support as parallel career opportunities.
- Preserved the approved layout, responsive behavior, navigation, animations, and interaction system.
- Verified desktop hero, workflow-automation capability section, and mobile contact CTA; ESLint and the production build pass.


## 2026-10-09 - v1.6 continuous hero bounce and logo-field documentation

- Replaced the static emphasis shimmer with a Motion-powered orb, curved trace, and immediate continuous path handoff.
- Kept cadence and easing steady while randomizing arc height, rebound, landing location, and travel direction; direction selection permits consecutive travel in the same direction as well as reversals.
- Preserved responsive sizing and removed decorative motion under `prefers-reduced-motion`.
- Documented hero logo asset sources, deterministic per-mark motion profiles, CSS variables, responsive reductions, and accessibility behavior.
- `npm run lint`, `npm run build`, and `git diff --check` pass. A local production-browser sample observed seven landings with both consecutive same-direction travel and reversals.
- The proposed fade-out/randomized re-entry second stage remains pending user approval.


## 2026-10-12 - v1.7 GitHub and live-demo project actions

- Added a visible GitHub profile link to the portfolio's social links.
- Added explicit live-demo and source-repository actions to the project showcase and case-study overlay.
- Kept the current PESO deployment as the live demo and labeled the known portfolio repository accurately; no unverified PESO repository was invented.
- Preserved keyboard access, external-link semantics, responsive wrapping, and the existing case-study interaction.

## 2026-10-12 - v1.8 privacy-conscious analytics foundation

- Added a client tracker that separates page views from meaningful link/button clicks and deduplicates page views per browser session/day.
- Added a server-only analytics endpoint with payload validation, bounded labels, hashed visitor/IP identifiers, and an in-memory rate limit.
- Added an RLS-protected Supabase schema for optional persistent storage; no service-role key is exposed to the browser.
- The endpoint intentionally degrades to a successful non-persistent response until Supabase environment variables and the reviewed schema are configured.

## 2026-10-12 - v1.9 private analytics dashboard

- Added `/analytics/login` with Supabase email/password sign-in and a protected `/analytics` dashboard.
- Added server-side metric aggregation for page views, estimated unique visitors, and tracked clicks.
- Kept the dashboard out of public navigation; Supabase publishable keys are client-safe and the service-role key remains server-only.

## 2026-10-12 - v1.10 theme preference and dark mode

- Added an accessible header theme toggle with system-theme fallback and local preference persistence.
- Added dark-theme surfaces, borders, controls, project actions, contact panel, and navigation contrast overrides.
- Preserved the existing light theme as the default baseline and kept theme transitions compatible with reduced motion.

## 2026-10-12 - v1.11 accessibility hardening

- Added a keyboard focus loop for the mobile navigation so Tab cannot escape an open menu unexpectedly.
- Preserved Escape-to-close and focus restoration behavior.
- Removed the Supabase proxy lint warning and re-ran lint, production build, and diff checks successfully.

## 2026-10-12 - v1.12 SEO and contact-flow hardening

- Added Twitter card metadata, explicit favicon metadata, and Person JSON-LD for search and social previews.
- Excluded the private analytics dashboard and API routes from indexing.
- Added trimmed, bounded contact fields and a clear client-side message when the inquiry lacks enough detail.

## 2026-10-12 - v1.13 analytics runtime performance

- Deferred page-view tracking until browser idle time to keep initial rendering responsive.
- Prefer `sendBeacon` for analytics delivery and retain a fetch fallback.
- Suppressed rapid duplicate click events to reduce noise and unnecessary requests.
- Re-ran lint, production build, and diff checks successfully.

## 2026-10-12 - v1.14 security hardening

- Added `nosniff`, frame, referrer, permissions, and HSTS response headers through Next configuration.
- Added analytics origin validation and a 4 KB request-size limit before processing or persistence.
- Kept the service-role boundary server-only and verified the production build after the change.

## 2026-10-12 - v1.15 CI quality gates

- Added a GitHub Actions workflow for pull requests and `main` pushes.
- The workflow uses Node 22, pnpm 10.28.0, frozen-lockfile installation, lint, production build, and `git diff --check`.
- Added least-privilege read-only repository permissions and cancel-in-progress concurrency.

## 2026-10-12 - v1.16 privacy transparency

- Added a public privacy page linked from the footer.
- Documented the actual analytics, local-storage, theme, contact, access, and retention behavior without implying unimplemented consent or deletion controls.

## 2026-10-12 - v1.17 final release QA

- Verified production root and privacy routes return HTTP 200.
- Verified robots and sitemap endpoints return HTTP 200 and private paths are excluded from indexing.
- Verified the unauthenticated analytics route redirects to `/analytics/login`.
- Verified JSON-LD and the baseline security headers are present.
- Verified cross-origin analytics requests are rejected with HTTP 403.
- Browser automation was not available in this environment; interactive QA remains a manual follow-up if needed.

## 2026-10-12 - v1.18 recruiter-focused DeepSeek assistant

- Added a floating, theme-aware portfolio assistant with recruiter quick actions and responsive chat layout.
- Added a server-side DeepSeek route grounded in verified portfolio facts; credentials never reach the browser.
- Added message validation, per-IP request limits, timeout/error fallback, and no conversation persistence.
- Added `ChatbotPortfolio.txt` to `.gitignore`; the local credential file is not tracked.

## 2026-10-12 - v1.19 chatbot motion alignment

- Replaced the static chatbot open state with Motion-based panel enter/exit, staggered message entry, and restrained action micro-interactions.
- Matched the existing easing and interaction language while preserving keyboard access and reduced-motion behavior.

## 2026-10-09 - retained continuous hero bounce baseline

- Tested an approved two-stage fade/re-entry variation locally, then reverted it at the user's request.
- Kept the committed continuous randomized bounce as the active implementation; no animation code changed in this documentation update.

## 2026-10-12 - v1.20 recruiter assistant and first-person content

- Standardized the visible candidate narrative and DeepSeek grounding prompt around a concise, authentic first-person voice.
- Aligned page, Open Graph, and Twitter descriptions with the same first-person content standard.
- Fixed the responsive header grid so the theme toggle and mobile menu trigger remain aligned at tablet and small-screen widths; anchored the dropdown to the full header height.
- Removed the theme-toggle hydration mismatch by keeping the initial server/client render stable and applying the saved or system preference after mount.
- Rebuilt the chatbot surface as a compact recruiter assistant with quick prompts, assistant/visitor avatars, clearer input copy, a functional New chat reset, focus containment, Escape/outside-click dismissal, premium backdrop blur, and reduced-motion behavior.
- Added an in-chat PESO project preview with live demo, source, and in-page case-study actions; reused the document dialog for resume preview and linked credentials to the existing certificate gallery.
- Added the LCP loading hint for the first decorative hero logo and re-ran fresh-page console checks.
- Verification: `npm run lint`, `npm run build`, `git diff --check`, local browser interaction QA at default desktop and 390x844 mobile sizes. Confirmed assistant open/close, outside click, reset, PESO preview, mobile menu alignment, and no fresh console errors.

## 2026-10-12 - v1.21 full-stack audit and remediation

- Completed a repository-wide architecture, UI/UX, accessibility, performance, security, and production-configuration audit.
- Fixed unreadable dark-mode resource dialogs, profile controls, and certificate cards; added explicit keyboard focus rings for contact and chatbot inputs.
- Replaced the document-blocking `X-Frame-Options: DENY` policy with `SAMEORIGIN` so the portfolio can frame its own resume and certificates while blocking external framing.
- Hardened analytics against blocked browser storage, stale idle callbacks, missing hash salt, unreachable Supabase, and unbounded rate-limit state.
- Hardened the DeepSeek route with request-size and origin validation, bounded rate-limit state, no-store responses, and safe provider JSON handling.
- Improved private analytics sign-in and dashboard failure states without exposing provider details.
- Added eager loading for the small above-the-fold hero SVG field after a non-Python logo was observed as LCP.
- Codex Security scan `80239b26-8940-4b43-81eb-d16d39c6059e` reported two low-severity issues on the prior snapshot; both are remediated here.
- Verification passed: `npm run lint`, `npm run build`, `git diff --check`, `pnpm audit --prod`, local API boundary tests, desktop/mobile browser QA, keyboard flows, theme switching, chatbot reset/resources, and contact validation.
- Production smoke testing found and fixed literal DeepSeek Markdown emphasis markers in assistant bubbles; answers now remain text-only while preserving scannable line breaks.

## 2026-10-14 - v1.22 English for Career Development certificate

- Added Angelo Pama Lacsao's English for Career Development MOOC Certificate of Award to the reusable certificate collection.
- Recorded the document-verified issuer, program, issue date, credential type, sponsorship context, and QR verification mark without relying on the PDF filename as the award title.
- Added the unchanged source PDF and an optimized, tightly cropped WebP preview for legible certificate-card rendering.
- Reused the existing responsive card, animated overlay, focus management, embedded PDF viewer, and open/download fallbacks without altering the two existing certificate records.
- Verification passed: ESLint, Next.js production build, `git diff --check`, byte-for-byte PDF hash comparison, HTTP asset checks, clean browser console, desktop overlay interaction, and 390x844 mobile card/overlay QA with Escape focus restoration.
