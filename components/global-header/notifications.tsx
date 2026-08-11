/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Global Header Notifications Component
// Implements the [Global Header Notifications design pattern](https://www.lightningdesignsystem.com/components/global-header/#Notifications) in React.

import React, { type ReactElement } from 'react';
import assign from 'lodash.assign';
import Button from '../button';
import Popover from '../popover';

import { GLOBAL_HEADER_NOTIFICATIONS } from '../../utilities/constants';

export interface GlobalHeaderNotificationsAssistiveText {
	newNotificationsAfter?: string;
	newNotificationsBefore?: string;
	noNotifications?: string;
}

export interface GlobalHeaderNotificationsProps {
	/**
	 * **Assistive text for accessibility**
	 * * `newNotificationsAfter`: Assistive text for when there are new notifications, after the notificationCount. The default is ' new notifications'.
	 * * `newNotificationsBefore`: Assistive text for when there are new notifications, before the notificationCount. The default is ''.
	 * * `noNotifications`: Assistive text for when there are no new notifications.
	 */
	assistiveText?: GlobalHeaderNotificationsAssistiveText;
	/**
	 * Dictates the number of notifications shown in the new notifications badge.
	 */
	notificationCount?: number;
	/**
	 * A `Popover` component. The props from this popover will be merged and override any default props. The `children` prop will be ignored.
	 */
	popover?: ReactElement;
}

/**
 * A GlobalHeaderNotifications component. Notifications are a way to notify a user about a global change within the application.
 */
class GlobalHeaderNotifications extends React.Component<GlobalHeaderNotificationsProps> {
	static displayName = GLOBAL_HEADER_NOTIFICATIONS;

	static defaultProps: Partial<GlobalHeaderNotificationsProps> = {
		assistiveText: {
			newNotificationsAfter: ' new notifications',
			newNotificationsBefore: '',
			noNotifications: 'No new notifications',
		},
		notificationCount: 0,
	};

	render() {
		const buttonAriaProps: Record<string, unknown> = {
			'aria-live': 'assertive',
		};
		const notificationCount = this.props.notificationCount ?? 0;
		const popoverProps: Record<string, unknown> = assign(
			{
				align: 'bottom right',
				body: <span />,
				triggerClassName:
					'slds-dropdown-trigger slds-dropdown-trigger_click',
			},
			this.props.popover ? this.props.popover.props : {}
		);
		const assistiveText = this.props
			.assistiveText as GlobalHeaderNotificationsAssistiveText;
		let notificationsAssistiveText = assistiveText.noNotifications;

		delete popoverProps.children;

		if (notificationCount > 0) {
			notificationsAssistiveText = `${assistiveText.newNotificationsBefore}${notificationCount}${assistiveText.newNotificationsAfter}`;
		} else {
			buttonAriaProps['aria-atomic'] = true;
		}

		return (
			<Popover {...(popoverProps as unknown as React.ComponentProps<typeof Popover>)}>
				<Button
					assistiveText={{ icon: notificationsAssistiveText }}
					className="slds-button_icon slds-global-actions__notifications slds-global-actions__item-action"
					iconCategory="utility"
					iconClassName="slds-global-header__icon"
					iconName="notification"
					iconSize="small"
					iconVariant="container"
					title={notificationsAssistiveText}
					variant="icon"
					{...buttonAriaProps}
				/>
				{notificationCount > 0 ? (
					<span
						aria-hidden="true"
						className="slds-notification-badge slds-incoming-notification slds-show-notification"
					>
						{notificationCount}
					</span>
				) : (
					<span aria-hidden="true" className="slds-notification-badge" />
				)}
			</Popover>
		);
	}
}

export default GlobalHeaderNotifications;
