/**
 * Per-theme SLDS 2 stylesheet paths for Storybook.
 *
 * All files are shipped by the npm package `@salesforce-ux/design-system-2`,
 * served from `/slds2` (see main.ts staticDirs).
 *
 * - Lightning Blue and Cosmos are single bundled builds (tokens + everything).
 * - Glass is a *sub-theme*: an overlay of brand-token overrides layered ON TOP of
 *   the Cosmos base, matching how the upstream SLDS 2 Storybook loads it.
 *
 * `href`    → the base stylesheet swapped into <link id="slds2-theme">.
 * `overlay` → optional second stylesheet appended after the base (Glass only).
 *
 * Modeled on the upstream SLDS 2 Storybook's `themes.ts`.
 */
export const THEMES = {
	'lightning-blue': {
		title: 'Lightning Blue',
		href: '/slds2/bundled/slds2.lightning-blue.css',
	},
	cosmos: {
		title: 'Cosmos (SLDS2)',
		href: '/slds2/bundled/slds2.cosmos.css',
	},
	glass: {
		title: 'Glass',
		href: '/slds2/bundled/slds2.cosmos.css',
		overlay: '/slds2/sub-themes/glass.css',
	},
};

export const DEFAULT_THEME = 'lightning-blue';
