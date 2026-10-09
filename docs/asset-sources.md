# Asset sources

## Hero logo field

The animated hero logo field is decorative. It is hidden from assistive technologies and does not represent sponsorship, endorsement, certification, or a commercial partnership.

Motion uses deterministic, per-logo CSS profiles rather than runtime randomness. Durations, negative phase offsets, travel directions, easing curves, rotations, and intensity vary within a small range to create a controlled back-and-forth bounce without affecting layout or adding client-side JavaScript. Logos are progressively reduced on narrower viewports, and animation is disabled when `prefers-reduced-motion: reduce` is active.

| Local asset | Mark | Source | License or usage condition | Notes |
| --- | --- | --- | --- | --- |
| `public/icons/hero/n8n.svg` | n8n | [Official n8n logo kit](https://n8n.io/brandguidelines/n8n_logos.zip) | Subject to [n8n brand guidelines](https://n8n.io/brandguidelines/) | Uses the supplied full black lockup, remains upright, unmodified, shadow-free, and at least 100 px wide. Hidden below 700 px. |
| `public/icons/hero/python.svg` | Python | [Devicon Python SVG](https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg) | [Devicon MIT license](https://github.com/devicons/devicon/blob/master/LICENSE) | Brand mark remains property of its owner. |
| `public/icons/hero/javascript.svg` | JavaScript | [Devicon JavaScript SVG](https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg) | Devicon MIT | Brand mark remains property of its owner. |
| `public/icons/hero/typescript.svg` | TypeScript | [Devicon TypeScript SVG](https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg) | Devicon MIT | Brand mark remains property of its owner. |
| `public/icons/hero/react.svg` | React | [Devicon React SVG](https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg) | Devicon MIT | Brand mark remains property of its owner. |
| `public/icons/hero/nodejs.svg` | Node.js | [Devicon Node.js SVG](https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg) | Devicon MIT | Brand mark remains property of its owner. |
| `public/icons/hero/php.svg` | PHP | [Devicon PHP SVG](https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg) | Devicon MIT | Brand mark remains property of its owner. |
| `public/icons/hero/nextjs.svg` | Next.js | [Devicon Next.js SVG](https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg) | Devicon MIT | Brand mark remains property of its owner. |

### Deliberately excluded provider marks

OpenAI, Google Gemini, Anthropic, and DeepSeek are not used as decorative hero marks. This prevents the portfolio from implying endorsement, partnership, or a direct product relationship. The decision follows [OpenAI’s brand guidance](https://openai.com/brand/) and [Google’s brand guidance](https://partnermarketinghub.withgoogle.com/brands/google/branding-guidelines/how-to-show-googles-brand/).

Devicon notes that its package license does not replace individual brand policies; product names and logos remain the property of their respective owners. Review these sources before adding or replacing any mark.