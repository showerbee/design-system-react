/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

// # Global Navigation Dropdown Component

// ## Dependencies

// ### React
import React, { type ReactNode, type CSSProperties } from 'react';

// ### classNames
import classNames from 'classnames';

import colors from '../../utilities/design-tokens/dist/salesforce-skin.common.js';

import checkProps from './check-props';
import componentDoc from './component.json';

import Button from '../button';

// ## Constants
import { MENU_DROPDOWN_TRIGGER } from '../../utilities/constants';

export interface GlobalNavigationDropdownTriggerAssistiveText {
	icon?: string;
}

export interface GlobalNavigationDropdownTriggerProps {
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
	assistiveText?: GlobalNavigationDropdownTriggerAssistiveText;
	/**
	 * CSS classes to be added to the 'li'.
	 */
	className?: unknown[] | Record<string, unknown> | string;
	/**
	 * Determines position of separating bar.
	 */
	dividerPosition?: 'left' | 'right';
	/**
	 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
	 */
	id?: string;
	/**
	 * Allows the dropdown menu to style itself accordingly when open since CSS hover rules cannot take effect if the menu is not inline.
	 */
	isOpen?: boolean;
	/**
	 * Visible label on the dropdown menu trigger button.
	 */
	label?: string;
	/**
	 * The dropdown menu.
	 */
	menu?: ReactNode;
	/**
	 * Is only called when `openOn` is set to `hover` and when the triggering li loses focus.
	 */
	onBlur?: React.FocusEventHandler<HTMLLIElement>;
	/**
	 * This prop is passed onto the triggering `li`. Triggered when the trigger li is clicked.
	 */
	onClick?: React.MouseEventHandler<HTMLLIElement>;
	/**
	 * Is only called when `openOn` is set to `hover` and when the triggering li gains focus.
	 */
	onFocus?: React.FocusEventHandler<HTMLLIElement>;
	/**
	 * Called when a key pressed.
	 */
	onKeyDown?: React.KeyboardEventHandler<HTMLLIElement>;
	/**
	 * Called when mouse clicks down on the trigger `li`.
	 */
	onMouseDown?: React.MouseEventHandler<HTMLLIElement>;
	/**
	 * Called when mouse hovers over the trigger `li`.
	 */
	onMouseEnter?: React.MouseEventHandler<HTMLLIElement>;
	/**
	 * Called when mouse leaves trigger `li` or the menu.
	 */
	onMouseLeave?: React.MouseEventHandler<HTMLLIElement>;
	/**
	 * The ref of the actual triggering button.
	 */
	triggerRef?: React.Ref<HTMLLIElement>;
	[key: string]: unknown;
}

/**
 *  The Dropdown Button Trigger renders the default trigger button for the dropdown menu. If this component has children, it does not render itself to the DOM. Instead, it renders its child element, `Button`, and all that child's properties. This component may be used as a template to create custom triggers that do not use `Button`.
 */
class GlobalNavigationDropdownTrigger extends React.Component<GlobalNavigationDropdownTriggerProps> {
	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	static displayName = MENU_DROPDOWN_TRIGGER;

	static defaultProps: Partial<GlobalNavigationDropdownTriggerProps> = {
		assistiveText: { icon: 'Open menu item submenu' },
	};

	constructor(props: GlobalNavigationDropdownTriggerProps) {
		super(props);
		(
			checkProps as (
				name: string,
				props: unknown,
				doc: unknown
			) => void
		)(MENU_DROPDOWN_TRIGGER, this.props, componentDoc);
	}

	// ### Render
	render() {
		const {
			active,
			activeBackgroundColor,
			className,
			dividerPosition,
			id,
			isOpen,
			label,
			menu,
			onBlur,
			onClick,
			onFocus,
			onKeyDown,
			onMouseDown,
			onMouseEnter,
			onMouseLeave,
			triggerRef,
			...rest
		} = this.props;

		const listItemstyle: CSSProperties = {};
		// Uses design token to get correct color
		const hoverBackgroundColor = (colors as Record<string, string>)
			.brandPrimaryTransparent10;

		if (active) {
			listItemstyle.backgroundColor = activeBackgroundColor;
			listItemstyle.borderBottomColor = activeBackgroundColor;
		}

		// Per SLDS pattern, set trigger style like hover style, so that hover visuals and menu being open and closed are in same state
		if (isOpen) {
			listItemstyle.backgroundColor = hoverBackgroundColor;
		}

		return (
			// eslint-disable-next-line jsx-a11y/role-supports-aria-props
			<li
				aria-haspopup="true"
				className={classNames(
					'slds-context-bar__item slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_click',
					{
						'slds-is-open': isOpen,
						'slds-is-active': active,
						[`slds-context-bar__item_divider-${dividerPosition}`]:
							dividerPosition,
					},
					className as string
				)}
				id={id}
				onBlur={onBlur}
				onClick={onClick}
				onFocus={onFocus}
				onKeyDown={onKeyDown}
				onMouseDown={onMouseDown}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				ref={triggerRef}
				style={listItemstyle}
			>
				<a className="slds-context-bar__label-action" title={label}>
					<span className="slds-truncate" title={label}>
						{label}
					</span>
				</a>
				<div className="slds-context-bar__icon-action slds-p-left_none">
					<Button
						assistiveText={this.props.assistiveText}
						{...rest}
						className="slds-context-bar__button"
						aria-haspopup="true"
						iconCategory="utility"
						iconName="chevrondown"
						iconVariant="bare"
						variant="icon"
					/>
				</div>
				{menu}
			</li>
		);
	}
}

export default GlobalNavigationDropdownTrigger;
