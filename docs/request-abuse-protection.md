# Portfolio request-abuse protection (2026-10-19)

Scope: this portfolio only. The separate PESO system is not part of this work.

## Request surfaces and controls

| Surface | Existing and new controls | Residual risk |
| --- | --- | --- |
| `POST /api/chat` | 4 KiB streamed body, 2–500 character question, origin check, 12 requests/minute/IP, 80 requests/rolling 24 hours/IP, 1-second cooldown, 32 distinct provider calls in flight, 12-second DeepSeek timeout, no retry. Identical pending questions share one provider call but each request consumes quota. Invalid configuration falls back to bounded defaults. | App counters and concurrency are per function instance, not a global or provider-account budget. IP-based quotas can affect shared networks. |
| `POST /api/analytics` | 4 KiB streamed body, event schema checks, 30 requests/minute/IP, 64 active stores per instance, event-ID same-instance deduplication, 5-second Supabase timeout, no retry. Limits are configurable within safe bounds. | Public clients can submit claimed events; limits and deduplication are not globally atomic. |
| Contact form | Native field lengths, honeypot, same-tab duplicate guard, 12-second timeout, no automatic retry, email-copy fallback. Formspree receives the POST directly. | Browser controls cannot stop direct requests to the public Formspree URL or guarantee its 50/month free quota. The Formspree account's CAPTCHA/domain settings were not available for authenticated verification here. |
| GitHub activity / owner dashboard | Cached one-hour GitHub reads with 8-second timeout; authenticated dashboard read. | No new public write/cost-generating endpoint; no new per-route limiter added. |

The app uses Vercel's forwarded client-address header in production and validates that it is an IP address; local development uses `x-forwarded-for`. Origin comparison no longer accepts a separately constructed forwarded-host origin. Origin is browser defense-in-depth, **not** authentication against scripts. Rejection logs contain a route, fixed reason, and count only—no IP, prompt, message, or key.

## Configuration

All settings are optional server-side environment variables. Values outside the allowed integer range revert to defaults. No new secret or database is required.

| Variable | Default | Accepted range |
| --- | ---: | ---: |
| `CHAT_RATE_LIMIT_PER_MINUTE` | 12 | 1–120 |
| `CHAT_DAILY_LIMIT_PER_IP` | 80 | 1–500 |
| `CHAT_COOLDOWN_MS` | 1000 | 0–10000 |
| `CHAT_MAX_IN_FLIGHT` | 32 | 1–128 |
| `ANALYTICS_RATE_LIMIT_PER_MINUTE` | 30 | 1–300 |
| `ANALYTICS_MAX_ACTIVE_STORES` | 64 | 1–128 |

The daily chat window is a rolling 24 hours from an instance's first admitted request for an IP, not a calendar day. `429` responses include `Retry-After`; busy `503` responses retain a short retry hint. These quotas are best-effort **per instance**. A strict global AI spend cap would require a shared atomic counter or a provider-level spending limit; neither is claimed here. Do not add Supabase or another store solely for this unless monitored abuse or a strict cost requirement justifies it.

## Vercel firewall rollout

On 2026-10-19, Vercel `angelo55s-projects/angelo-portfolio` had no custom rules; automatic platform DDoS mitigation was available, Bot Protection was off, and Attack Mode was off. The rule `Chat POST rate-limit observation` (`rule_chat_post_rate_limit_observation_tKj3E6`) matches exact path `/api/chat` and method `POST`, counting by IP at 30 requests/60 seconds with **log-only** action when exceeded. `vercel firewall diff --json` and rule inspection confirmed its conditions and validity before publication. It was then published; `vercel firewall rules list --json` confirmed `_status: live`, `hasDraft: false`, and zero pending changes. This rule records matches but does **not** block requests or return `429` itself; the existing application limits continue to enforce their own responses.

Inspect the [filtered traffic view](https://vercel.com/angelo55s-projects/angelo-portfolio/firewall/traffic?filter=rule_chat_post_rate_limit_observation_tKj3E6) for legitimate users, shared-IP effects, and expected chat traffic. Only after a meaningful observation period should a separate preview-enforcement and then production-`429` change be considered. Stage and inspect each future firewall edit before publishing. Roll back a false positive by staging log-only or disabling the rule, inspecting the diff, and publishing that change. Hobby's one rate-limiting-rule allowance is reserved for chat; Vercel WAF counters are regional, not a global cost cap.

## Formspree decision

The owner previously reported that account UI required a paid subscription for domain restriction. Current Formspree documentation lists domain restriction and CAPTCHA as available on all plans, so the discrepancy must be checked in this actual account before changing the form. An attempt to inspect the account on 2026-10-19 redirected to Formspree sign-in; neither setting could be verified without the owner's authenticated session. A `Referer`-based domain restriction is not a strong defense against scripted clients and can misclassify privacy-protected browsers. Keep the direct email-copy fallback. Monitor Formspree's 50/month usage alerts and spam inbox; do not send test submissions just to prove this protection. If quota exhaustion occurs, evaluate rotating the public form ID together with provider-side restrictions or moving to a server-controlled contact service. A proxy to the existing public Formspree URL alone is bypassable and would not close the issue.

The owner subsequently enabled the production-domain restriction and confirmed a legitimate submission reached the inbox. CAPTCHA remained disabled at that point. The contact form now supports an optional Cloudflare Turnstile widget with `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (public site key only). When configured, the browser must obtain a `cf-turnstile-response` token before sending; the existing Formspree AJAX request includes it and resets the widget after each attempt. The site key is embedded at build time, so adding it to Vercel Production requires a fresh deployment. Do **not** enable Formspree CAPTCHA before the widget is deployed and visible on the production contact form. Configure Turnstile in Formspree with the **secret key in Formspree only**, then enable CAPTCHA and make one legitimate live submission; confirm inbox receipt and check the Formspree response/error state. Do not put the secret in this repository, a `NEXT_PUBLIC_` variable, or chat. If the widget fails to load, the form displays an email-copy fallback rather than submitting without verification. The Turnstile integration and live Formspree verification remain pending until the owner supplies a public site key and configures the provider-side secret.

## Verification and limits

- `npm run test:security`: four passing helper tests covering configuration bounds, client-address selection, minute/daily/cooldown behavior, window reset, and duplicate-request quota accounting.
- `npm run lint`, `npm run build`, and `git diff --check`: passed.
- Local production server with provider/storage credentials disabled: configured 2/minute chat and analytics limits each admitted two requests and returned `429` with `Retry-After: 60` on the third; a foreign `Origin` returned `403`. A second local run showed a 1-second cooldown and two-request rolling-day quota with `Retry-After` guidance. No DeepSeek, Supabase, or Formspree live request was sent.
- The prior backend reliability audit recorded desktop/mobile mocked browser checks, but this change did not add a new rendered-browser pass. Cross-instance quota behavior, real provider failure, live Formspree settings, and production WAF traffic remain unverified. Do not describe the log-only WAF rule or app counters as a proven global defense.
