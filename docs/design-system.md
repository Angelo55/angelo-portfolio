# Approved UI and design system

## Source direction

Approved on 2026-10-08 from the supplied portfolio screenshots and proposal. The site adapts the reference's editorial typography, near-white canvas, rounded white surfaces, teal and lavender accents, generous whitespace, and alternating large/compact compositions.

## Page flow

Header, hero, mission statement, capabilities, selected projects, certificates, experience and education, contact, and social footer.

## Tokens

- Canvas: near-white `#f3f3f1`.
- Primary surface: white.
- Text: `#202020`; muted text: `#777873`.
- Teal accent: `#319daf`.
- Lavender accent: `#aaa9f6`.
- Radius family: 2038px for major surfaces; pill radius for actions and tags.
- Typography: Geist Sans for interface and content; Geist Mono for section indices.

## Animation specification

- Section reveal: opacity 0�1 and vertical translation 26py�0.
- Duration: 680ms with `[0.22, 1, 0.36, 1]` easing.
- Related cards use a 4060ms stagger.
- Hover motion is limited to short translation, rotation, or scale changes.
- Only opacity and transforms animate for scroll effects.
- `prefers-reduced-motion` disables smooth scrolling and shortens transitions.

## Responsive behavior

- Desktop uses asymmetric two-column compositions and a sticky section introduction.
- Tablet stacks the hero and content regions while retaining large type and whitespace.
- Mobile uses a compact menu, single-column cards, fluid headings, touch-friendly controls, and simplified metadata.
- No content depends on hover, animation, or a desktop-only arrangement.
- At 1200px and above, the page shell expands to the full browser width with an 8px frame and the hero uses the available viewport height.
- The existing 980px and 700px tablet/mobile breakpoints remain intact.


## Overlay and interaction system

Approved on 2026-10-09.

- Supporting content opens in one reusable dialog language rather than unrelated pages or inconsistent popups.
- Desktop dialogs are centered surfaces with a blurred backdrop; mobile dialogs become bottom-aligned sheets.
- Dialogs trap focus, close with Escape or backdrop selection, restore focus, and lock page scrolling.
- Resume content embeds in the dialog and includes open and download fallbacks.
- Project dialogs use a two-column narrative and visual composition that stacks on smaller screens.
- Hover feedback is enabled only for devices that support precise hovering. Touch devices receive active-state feedback.
- Interactive controls retain visible keyboard focus and at least 44px touch targets.

## Profile image specification

- Source: `public/images/lacsao-formal-photo.png`, copied from the supplied `Lacsao's Formal Photo.png`.
- Use Next.js Image with responsive `sizes`, a stable aspect ratio, cover rendering, and a face-conscious object position.
- The portrait remains subordinate to the hero headline and keeps compact metadata directly below it.


## Header behavior update

Approved on 2026-10-09.

- The desktop header uses the available shell width with generous expanded spacing.
- Downward scrolling past the top region compresses its height, padding, logo, radius, and action size.
- Upward scrolling or returning near the page top expands it.
- Scroll work is passive and grouped through requestAnimationFrame.
- Mobile compression preserves accessible control sizes.
- Reduced-motion mode removes animated interpolation.

## Reversible reveal behavior

- Reveals use Motion viewport observation with `once: false`.
- Elements fade and translate into view and return to the subtle resting state after leaving the viewport.
- The visible threshold and viewport margins prevent boundary flicker.
- Delays are capped at 160ms.
- Only opacity and transform animate.
- Reduced-motion mode keeps content fully visible.

## Horizontal project showcase

- Each project is a wide row with a dominant site preview and a supporting information panel.
- The project collection is data-driven so future work can be added without changing the section structure.
- Tablet and mobile layouts stack the preview and information panel.
- The project overlay remains the detailed reading experience.
