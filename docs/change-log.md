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
- The portfolio remains on the supplied non-2 PNG until the distinct JPG is added.
