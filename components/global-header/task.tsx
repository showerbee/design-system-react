/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Global Header Task Component
// Implements the [Global Header Task design pattern](https://www.lightningdesignsystem.com/components/global-header/#Task) in React.

import React, { type ReactElement } from 'react';
import assign from 'lodash.assign';
import Button from '../button';
import Dropdown from '../menu-dropdown';
import DropdownTrigger from '../menu-dropdown/button-trigger';

import { GLOBAL_HEADER_TASK } from '../../utilities/constants';

export interface GlobalHeaderTaskAssistiveText {
	triggerButton?: string;
}

export interface GlobalHeaderTaskProps {
	/**
	 * **Assistive text for accessibility**
	 * * `triggerButton`: Assistive text for the GlobalHeaderTask trigger button. The default is `Global Actions`.
	 */
	assistiveText?: GlobalHeaderTaskAssistiveText;
	/**
	 * A `Dropdown` component. The props from this dropdown will be merged and override any default props. This also allows custom content to be passed as children and rendered in the dropdown.
	 */
	dropdown?: ReactElement;
}

/**
 * A GlobalHeaderTask component.
 */
class GlobalHeaderTask extends React.Component<GlobalHeaderTaskProps> {
	static displayName = GLOBAL_HEADER_TASK;

	static defaultProps: Partial<GlobalHeaderTaskProps> = {
		assistiveText: {
			triggerButton: 'Global Actions',
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
			.assistiveText as GlobalHeaderTaskAssistiveText;

		return (
			<Dropdown {...(dropdownProps as React.ComponentProps<typeof Dropdown>)}>
				<DropdownTrigger>
					<Button
						assistiveText={{ icon: assistiveText.triggerButton }}
						className="slds-button_icon slds-global-actions__task slds-global-actions__item-action"
						iconCategory="utility"
						iconName="add"
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

export default GlobalHeaderTask;
