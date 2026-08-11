/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Global Header Help Component
// Implements the [Global Header Help design pattern](https://www.lightningdesignsystem.com/components/global-header/#Help) in React.

import React, { type ReactElement } from 'react';
import assign from 'lodash.assign';
import Button from '../button';
import Popover from '../popover';

import { GLOBAL_HEADER_HELP } from '../../utilities/constants';

export interface GlobalHeaderHelpAssistiveText {
	triggerButton?: string;
}

export interface GlobalHeaderHelpProps {
	/**
	 * **Assistive text for accessibility**
	 * * `triggerButton`: Assistive text for the GlobalHeaderHelp trigger button. The default is `Help and Training`.
	 */
	assistiveText?: GlobalHeaderHelpAssistiveText;
	/**
	 * A `Popover` component. The props from this popover will be merged and override any default props. The `children` prop will be ignored.
	 */
	popover?: ReactElement;
}

/**
 * A GlobalHeaderHelp component.
 */
class GlobalHeaderHelp extends React.Component<GlobalHeaderHelpProps> {
	static displayName = GLOBAL_HEADER_HELP;

	static defaultProps: Partial<GlobalHeaderHelpProps> = {
		assistiveText: {
			triggerButton: 'Help and Training',
		},
	};

	render() {
		const buttonAriaProps = {
			'aria-haspopup': true,
		};
		const popoverProps: Record<string, unknown> = assign(
			{
				align: 'bottom',
				body: <span />,
				triggerClassName:
					'slds-dropdown-trigger slds-dropdown-trigger_click',
			},
			this.props.popover ? this.props.popover.props : {}
		);

		delete popoverProps.children;

		const assistiveText = this.props
			.assistiveText as GlobalHeaderHelpAssistiveText;

		return (
			<Popover {...(popoverProps as unknown as React.ComponentProps<typeof Popover>)}>
				<Button
					assistiveText={{ icon: assistiveText.triggerButton }}
					className="slds-button_icon slds-global-actions__help slds-global-actions__item-action"
					iconCategory="utility"
					iconClassName="slds-global-header__icon"
					iconName="question"
					iconSize="small"
					iconVariant="container"
					title={assistiveText.triggerButton}
					variant="icon"
					{...buttonAriaProps}
				/>
			</Popover>
		);
	}
}

export default GlobalHeaderHelp;
