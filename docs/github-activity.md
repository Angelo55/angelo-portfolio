# GitHub Activity integration

The GitHub Activity section sits between Featured Projects and Certificates. It follows the supplied reference's hierarchy (introduction, four compact metrics, contribution calendar) while using the portfolio's existing colors, type, spacing, and motion rules. The reference's example counts are never used as portfolio data.

## Data and privacy

- The public repository count comes from GitHub's public user REST endpoint. Stars are summed from owned public repositories only when the fetched list covers every public repository. Requests are server-side and cached for one hour.
- The contribution calendar and the longest streak require the official GitHub GraphQL API. The server-only `GITHUB_ACTIVITY_TOKEN` environment variable is optional; when absent or rejected, these metrics show an em dash and the calendar displays an honest unavailable state with a direct GitHub profile link. No counts or dates are fabricated.
- Use a token limited to public profile resources. Do not grant private-repository access merely to populate a portfolio chart. Depending on GitHub account visibility settings and token access, private contribution *counts* may be included; review those settings before enabling the token. Repository names, private URLs, and private content are never queried or rendered.
- The token must be stored in Vercel's Production environment variables (and optionally a local ignored `.env.local`), never committed or prefixed `NEXT_PUBLIC_`. Redeploy after adding or changing it because the homepage is prerendered with hourly revalidation.

## States and interaction

- A Suspense skeleton covers server fetch time. REST failures degrade individual public metrics to an em dash; missing or failed GraphQL data shows the unavailable calendar state.
- When GraphQL data is available, the calendar shows real daily counts for GitHub's returned year. The longest streak is calculated only within that displayed period. Day buttons expose counts to screen readers and support arrow-key navigation; the grid scrolls horizontally on narrow screens.
- The GitHub profile action is explicit. The separate portfolio repository remains private and is not presented as a public activity source.

## Validation

- Confirm section order, desktop/tablet/mobile layout, no horizontal page overflow, light/dark themes, reduced motion, and navigation.
- Confirm public repository and star totals against signed-out GitHub REST results. Check empty/error states without a token, then check full calendar counts, date range, keyboard navigation, and privacy behavior after a public-only token is configured.
- Verify the profile location and current college in the profile card, assistant grounding, and ATS-readable one-page resume.

## Production activation (2026-10-18)

The owner added `GITHUB_ACTIVITY_TOKEN` to Vercel Production as a hidden Secret with a 90-day expiration. The value was not read, logged, or committed. Production deployment `dpl_8pJr7eDXVXrBck3wNSCwZK9buYKL` built successfully and reached READY; `angelolacsao-portfolio.vercel.app` was explicitly assigned to it. A public HTTP smoke test returned 200, found the GitHub Activity section and contribution-calendar accessibility label, and did not find the unavailable-calendar message. This confirms the production calendar is rendered, but is not a visual, keyboard, or mobile-device QA result.

Replace the token in Vercel before its 90-day expiration and redeploy. If the token expires or GitHub rejects it, the section falls back to the unavailable state without exposing a credential.
