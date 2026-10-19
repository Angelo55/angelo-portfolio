# Portfolio backend reliability and concurrency audit (2026-10-19)

## Scope and request lifecycle

This audit covers **only** the portfolio repository. The PESO Kabankalan system is a separate application and was explicitly excluded. This site has no account registration, job-application, referral, resume-import, messaging, upload, publication, or Make.com execution endpoint.

| Flow | Classification | State and external dependency | Safeguard / outcome |
| --- | --- | --- | --- |
| Page and GitHub activity reads | Read-only, cached | GitHub REST/GraphQL | Independent fetches run concurrently; one-hour Next cache and 8-second upstream timeouts bound GitHub load; no write/idempotency key needed. |
| `/api/analytics` | Best-effort state-changing | Supabase event insert when configured | Validated 4 KiB streamed body limit; 30/minute per-IP per-instance limiter; 64 concurrent storage requests per instance; 5-second storage timeout; per-event UUID with same-instance in-flight and 10-minute completion deduplication. No automatic POST retry. |
| `/api/chat` | Cost-generating, stateless | DeepSeek | Validated 4 KiB streamed body limit and 500-character question limit; 12/minute per-IP per-instance limiter; at most 32 distinct in-flight questions per instance; simultaneous identical questions from one IP share one provider request; 12-second upstream timeout. No automatic provider retry. |
| Contact form | External state-changing | Formspree free plan | Native validation, honeypot, synchronous client submission guard, 12-second client timeout, no automatic retry. Timeout text explicitly says delivery is uncertain. Formspree controls actual delivery and server-side quota. |
| Owner analytics dashboard | Authenticated read-only | Supabase Auth and aggregate queries | No writes or duplicate-processing risk in this repository; existing auth/session checks remain unchanged. |

Request processing remains: client interaction → Next route or Formspree → origin/body/rate checks where applicable → bounded upstream operation → response and UI state. The public routes do not use account authentication; the owner dashboard does. No database transaction spans Formspree or DeepSeek because the portfolio does not write related business records for those operations.

## Verified findings and fixes

1. **Duplicate clicks could race React state updates.** Contact and chatbot handlers now use synchronous refs before the first `await`, so two same-tick activations produce one browser request. The chatbot's New chat action is disabled while a response is pending to prevent a late reply from entering a freshly reset conversation.
2. **Analytics delivery could be repeated.** Each browser event now has a UUID. In one server instance, overlapping deliveries with the same ID share one storage request; successful IDs are remembered for ten minutes. Reuse of an ID with different event content returns `409`. The fallback fetch is used if `sendBeacon` reports that it could not queue the event.
3. **Unbounded request parsing and analytics storage wait.** Both POST routes now stop reading after 4 KiB even without `Content-Length`. Supabase analytics writes time out after five seconds; busy instances return `503` with `Retry-After` rather than accumulating unlimited storage work.
4. **Simultaneous identical AI questions could spend multiple provider calls.** Same-instance requests from the same IP with the same normalized question now await one provider promise. At most 32 distinct questions are in flight per instance; provider failures return the existing fallback text. Safe status-only warning logs avoid recording questions, email addresses, IPs, or keys.
5. **Uncertain contact timeout was presented as a simple failure.** The message now distinguishes an unconfirmed delivery from a confirmed rejection and does not automatically retry a potentially successful submission.

## Controlled validation

- `npm run lint`, `npm run build`, and `git diff --check` passed. The build required normal network access to fetch the configured Geist fonts; the initial sandboxed build failed only on that font fetch.
- With provider/storage credentials disabled, ten simultaneous identical analytics POSTs returned `202`; reuse of that UUID with different content returned `409`; an oversized request returned `413`.
- Fourteen simultaneous chatbot POSTs returned twelve `200` fallbacks and two `429` rate-limit responses. A streamed body without `Content-Length` above 4 KiB returned `413`.
- Thirty-five simultaneous distinct analytics events returned thirty `202` responses and five `429` responses, matching the local per-IP window.
- Against a delayed local mock storage service, ten simultaneous deliveries of one analytics UUID produced **one** upstream POST; a later retry within the cache window produced no second POST. Against a mock that responded only after the five-second timeout, two simultaneous deliveries produced one upstream POST and two `503` responses; a later retry made a second upstream POST. This confirms the timeout/duplicate ambiguity that only a database uniqueness constraint can remove across failures and instances.
- Desktop (1440px) and mobile (390px) Playwright checks mocked Formspree and chat responses. Two same-tick activations sent one Formspree request and one chat request on each viewport, reached the expected UI states, and produced no page errors. No live provider or Formspree quota was consumed.

## Boundaries and follow-ups

- The in-memory limiters, in-flight maps, and ten-minute analytics event cache are **per server instance**, not distributed. A retry routed to a different Vercel instance can still create a duplicate analytics row. The portfolio Supabase project was not available through the connected Supabase account or local `SUPABASE_URL`; the visible connected PESO project was not inspected or modified. Before claiming cross-instance exactly-once analytics, connect the portfolio database, add a nullable `event_id` UUID column with a unique constraint, store the client ID on insert, and test conflict handling on the real table. Existing rows must remain valid. A durable atomic rate-limit counter is only warranted if traffic or abuse shows the per-instance limits are insufficient.
- Formspree does not provide this repo with a transaction or inbox-level idempotency guarantee. The client guard prevents accidental repeated clicks in one tab, but retries after network uncertainty or submissions from multiple tabs can still produce duplicate email. Do not automatically retry those submissions. A server-side persisted idempotency layer would require a connected store and an agreed retention policy; it should not be added merely for this small contact form without evidence of duplicates.
- No live concurrency or failure-injection load was sent to Supabase, DeepSeek, or Formspree. The controlled tests cannot prove behavior across multiple production instances, actual provider outages, or Formspree delivery. Monitor operational logs and quota usage before introducing a distributed limiter, queue, or outbox; none is currently justified for this portfolio's workflows.
