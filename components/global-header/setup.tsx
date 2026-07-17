/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Global Header Setup Component
// Implements the [Global Header Setup design pattern](https://www.lightningdesignsystem.com/components/global-header/#Setup) in React.

import React, { type ReactElement } from 'react';
import assign from 'lodash.assign';
import Button from '../button';
import Dropdown from '../menu-dropdown';
import DropdownTrigger from '../menu-dropdown/button-trigger';

import { GLOBAL_HEADER_SETUP } from '../../utilities/constants';

export interface GlobalHeaderSetupAssistiveText {
	triggerButton?: string;
}

export interface GlobalHeaderSetupProps {
	/**
	 * **Assistive text for accessibility**
	 * * `triggerButton`: Assistive text for the GlobalHeaderSetup trigger button. The default is `Setup`.
	 */
	assistiveText?: GlobalHeaderSetupAssistiveText;
	/**
	 * A `Dropdown` component. The props from this dropdown will be merged and override any default props. This also allows custom content to be passed as children and rendered in the dropdown.
	 */
	dropdown?: ReactElement;
}

/**
 * A GlobalHeaderSetup component.
 */
class GlobalHeaderSetup extends React.Component<GlobalHeaderSetupProps> {
	static displayName = GLOBAL_HEADER_SETUP;

	static defaultProps: Partial<GlobalHeaderSetupProps> = {
		assistiveText: {
			triggerButton: 'Setup',
		},
	};

	render() {
		const buttonAriaProps = {
			'aria-haspopup': true,
		};
		const dropdownProps: Record<string, unknown> = assign(
			{
				align: 'right',
				nubbinPosition: 'top right',
			},
			this.props.dropdown ? this.props.dropdown.props : {}
		);
		const dropdownChildren = dropdownProps.children || null;

		delete dropdownProps.children;

		const assistiveText = this.props
			.assistiveText as GlobalHeaderSetupAssistiveText;

		return (
			<Dropdown {...(dropdownProps as React.ComponentProps<typeof Dropdown>)}>
				<DropdownTrigger>
					<Button
						assistiveText={{ icon: assistiveText.triggerButton }}
						className="slds-button_icon slds-global-actions__setup slds-global-actions__item-action"
						iconCategory="utility"
						iconClassName="slds-global-header__icon"
						iconName="setup"
						iconSize="small"
						iconVariant="container"
						title={assistiveText.triggerButton}
						variant="icon"
						{...buttonAriaProps}
					/>
				</DropdownTrigger>
				{dropdownChildren as React.ReactNode}
			</Dropdown>
		);
	}
}

export default GlobalHeaderSetup;
