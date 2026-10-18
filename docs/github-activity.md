# GitHub Activity integration

The GitHub Activity section sits between Featured Projects and Certificates. It follows the supplied reference's hierarchy (introduction, compact metrics, contribution calendar) while using the portfolio's existing colors, type, spacing, and motion rules. The reference's example counts are never used as portfolio data.

## Data and privacy

- The public repository count comes from GitHub's public user REST endpoint. Stars are summed from owned public repositories only when the fetched list covers every public repository. Requests are server-side and cached for one hour.
- The private repository count comes from the authenticated GitHub GraphQL `viewer.repositories(privacy: PRIVATE).totalCount` field, but only when the token identifies `Angelo55` and the returned count is valid. The UI displays the count alone; it never requests or renders private repository names, URLs, or contents. A token without sufficient private-repository metadata access may return an incomplete count, so verify it against the owner's signed-in GitHub repository totals before treating it as authoritative.
- The contribution calendar and the longest streak require the official GitHub GraphQL API. The server-only `GITHUB_ACTIVITY_TOKEN` environment variable is optional; when absent or rejected, these metrics show an em dash and the calendar displays an honest unavailable state with a direct GitHub profile link. No counts or dates are fabricated.
- The owner opted to publish the number of private repositories. The token may therefore need access to all owned repositories with only read-only metadata permission; do not grant Contents or write permissions. Depending on GitHub's separate Private contributions visibility setting, private contribution *counts* may be included in the calendar. Activity overview is a different setting and does not itself enable private contributions. Repository names, private URLs, and private content are never queried or rendered.
- The token must be stored in Vercel's Production environment variables (and optionally a local ignored `.env.local`), never committed or prefixed `NEXT_PUBLIC_`. Redeploy after adding or changing it because the homepage is prerendered with hourly revalidation.

## States and interaction

- A Suspense skeleton covers server fetch time. REST failures degrade individual public metrics to an em dash; missing or failed GraphQL data shows the unavailable calendar state.
- Once loaded, the section body uses the same viewport reveal as adjacent portfolio sections; reduced-motion users see it immediately without movement. The loading skeleton is not animated by the reveal wrapper.
- When GraphQL data is available, the calendar shows real daily counts for GitHub's returned year. The longest streak is calculated only within that displayed period. Day buttons expose counts to screen readers and support arrow-key navigation; the grid scrolls horizontally on narrow screens.
- The GitHub profile action is explicit. The separate portfolio repository remains private and is not presented as a public activity source.

## Validation

- Confirm section order, desktop/tablet/mobile layout, no horizontal page overflow, light/dark themes, reduced motion, and navigation.
- Confirm public repository and star totals against signed-out GitHub REST results, and confirm the private count against the owner's signed-in repository totals. Check empty/error states without a token, then check full calendar counts, date range, keyboard navigation, and privacy behavior with the configured token.
- Verify the profile location and current college in the profile card, assistant grounding, and ATS-readable one-page resume.

## Production activation (2026-10-18)

The owner added `GITHUB_ACTIVITY_TOKEN` to Vercel Production as a hidden Secret with a 90-day expiration. The value was not read, logged, or committed. Production deployment `dpl_8pJr7eDXVXrBck3wNSCwZK9buYKL` built successfully and reached READY; `angelolacsao-portfolio.vercel.app` was explicitly assigned to it. A public HTTP smoke test returned 200, found the GitHub Activity section and contribution-calendar accessibility label, and did not find the unavailable-calendar message. This confirms the production calendar is rendered, but is not a visual, keyboard, or mobile-device QA result.

Replace the token in Vercel before its 90-day expiration and redeploy. If the token expires or GitHub rejects it, the section falls back to the unavailable state without exposing a credential.

## Private-count verification (2026-10-18)

The owner expanded the fine-grained token to all owned repositories with read-only metadata access and requested that the private repository *count* be public. Commit `4bd2ee4` added the count without private names, URLs, or contents. `npm run lint`, `npm run build`, and `git diff --check` passed. Vercel deployment `dpl_23hzhMn4PQCE4XArqVWGVTMsGzVB` reached READY. A public HTTP test of the production alias returned 200, showed 3 public and 8 private repositories, and rendered the contribution calendar rather than its unavailable state. The repository totals are an October 18 snapshot; compare the private count against GitHub's signed-in repository list if the account changes. This check did not cover visual/mobile or keyboard interaction.

The owner subsequently enabled both Activity overview and Private contributions on GitHub. A fresh production build was checked before alias assignment: its 631-contribution total matched GitHub's public contribution heading. This confirmed the earlier 70-count display was from the pre-setting build/cache, not a repository-count mismatch.

## Layout refinement (2026-10-18)

The calendar grid is horizontally centered when it fits the card and remains horizontally scrollable when it does not. The profile card contains a single residence statement; the college statement sits below “Explore my work.” Desktop Chrome checks at 1440px measured equal 212.75px calendar margins; mobile checks at 390px confirmed horizontal graph scrolling and working day selection. Local desktop/mobile hero screenshots confirmed no page-wide overflow or console errors. Browser plugin was unavailable, so regular Playwright with installed Chrome was used. Local GraphQL credentials are absent, so the graph layout was previewed against public production data with the same CSS rule; final deployment QA must confirm the actual production layout.
