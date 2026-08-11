/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Global Navigation Dropdown Component

// ## Dependencies

import checkProps from './check-props';
import componentDoc from './component.json';

// ### Dropdown
import MenuDropdown, { type MenuDropdownOption } from '../menu-dropdown';
import GlobalNavigationTrigger from './dropdown-trigger';

// ## Constants
import { GLOBAL_NAVIGATION_BAR_DROPDOWN } from '../../utilities/constants';

export interface GlobalNavigationBarDropdownAssistiveText {
	icon?: string;
}

export interface GlobalNavigationBarDropdownProps {
	/**
	 * Whether the item is active or not.
	 */
	active?: boolean;
	/**
	 * Allows alignment of active item with active application background color.
	 */
	activeBackgroundColor?: string;
	/**
	 * **Assistive text for accessibility.**
	 * This object is merged with the default props object on every render.
	 * * `icon`: Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means. If the button has an icon and a visible label, you can omit the <code>assistiveText.icon</code> prop and use the <code>label</code> prop.
	 */
	assistiveText?: GlobalNavigationBarDropdownAssistiveText;
	/**
	 * Aligns the right or left side of the menu with the respective side of the trigger. This is not intended for use with `nubbinPosition`.
	 */
	align?: 'left' | 'right';
	/**
	 * Extra classnames to apply to the dropdown menu.
	 */
	className?: string;
	/**
	 * Determines position of separating bar.
	 */
	dividerPosition?: 'left' | 'right';
	/**
	 * CSS classes to be added to `li` element.
	 */
	buttonClassName?: string[] | Record<string, boolean> | string;
	/**
	 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
	 */
	id?: string;
	/**
	 * Provided to List to indicate number of items visible in the List. Pass `null` to display all items, or a string containing one of the numeric option values listed under [Dropdown Height](https://www.lightningdesignsystem.com/components/menus/#flavor-dropdown-height) at the right (eg. '5').
	 */
	length?: null | '5' | '7' | '10';
	/**
	 *  Offset adds pixels to the absolutely positioned dropdown menu in the format: ([vertical]px [horizontal]px).
	 */
	offset?: string;
	/**
	 * Triggered when an item in the menu is clicked.
	 */
	onSelect?: (...args: unknown[]) => void;
	/**
	 * An array of menu item.
	 */
	options: MenuDropdownOption[];
	[key: string]: unknown;
}

/**
 * This component is an implementation of `MenuDropdown` with a custom trigger. All the properties listed below are provided to the `MenuDropdown` component. Any additional properties are provided to the Custom Trigger (that is the `Button` or `li` tag).
 */
const GlobalNavigationBarDropdown = ({
	align = 'right',
	length = null,
	active,
	activeBackgroundColor,
	assistiveText,
	dividerPosition,
	...rest
}: GlobalNavigationBarDropdownProps) => {
	(checkProps as (name: string, props: unknown, doc: unknown) => void)(
		GLOBAL_NAVIGATION_BAR_DROPDOWN,
		{
			align,
			length,
			active,
			activeBackgroundColor,
			assistiveText,
			dividerPosition,
			...rest,
		},
		componentDoc
	);

	return (
		<MenuDropdown
			align="right"
			hasStaticAlignment
			// only need if using hybrid or hover
			hoverCloseDelay={400}
			length={length ?? undefined}
			menuPosition="relative"
			{...rest}
		>
			<GlobalNavigationTrigger
				active={active}
				assistiveText={assistiveText}
				activeBackgroundColor={activeBackgroundColor}
				dividerPosition={dividerPosition}
			/>
		</MenuDropdown>
	);
};

// ### Display Name
// Always use the canonical component name (set in the core) as the React
// display name.
GlobalNavigationBarDropdown.displayName = GLOBAL_NAVIGATION_BAR_DROPDOWN;

export default GlobalNavigationBarDropdown;
