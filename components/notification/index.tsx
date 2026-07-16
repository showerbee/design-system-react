/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { Component, type ReactNode } from 'react';

import classNames from 'classnames';
import Button, { type ButtonIconSize } from '../button';
import Icon from '../icon';
import type { IconCategory } from '../../types/common';
import checkProps from './check-props';

const displayName = 'Notification';

export type NotificationTheme = 'success' | 'warning' | 'error' | 'offline';
export type NotificationVariant = 'alert' | 'toast';

export interface NotificationProps {
	/**
	 * Category of the icon. Defaults to `'utility'`.
	 */
	iconCategory?: IconCategory;
	/**
	 * Custom classes applied to Notification element.
	 */
	className?: string;
	/**
	 * Message for Notification.
	 */
	content: ReactNode;
	/**
	 * If true, close button appears for users to dismiss Notification.
	 */
	dismissible?: boolean;
	/**
	 * If duration exists, the Notification will disappear after that amount of time.
	 */
	duration?: number;
	/**
	 * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lighning Design System Icons</a> to reference icon names.
	 */
	iconName?: string;
	/**
	 * Controls the open state of the Notification.
	 */
	isOpen: boolean;
	/**
	 * Callback invoked when the Notification is dismissed.
	 */
	onDismiss?: () => void;
	/**
	 * Suppresses the deprecation warning logged in development.
	 */
	silenceDeprecationWarning?: boolean;
	/**
	 * Styling for Notification background.
	 */
	texture?: boolean;
	/**
	 * Styling for Notification background color. Please reference <a href='http://www.lightningdesignsystem.com/components/utilities/themes/#color'>Lighning Design System Themes > Color</a>.
	 */
	theme?: NotificationTheme;
	/**
	 * Notification variant, either an inline `alert` or a `toast`.
	 */
	variant: NotificationVariant;
}

interface NotificationState {
	returnFocusTo?: HTMLElement | null;
}

const defaultProps: Partial<NotificationProps> = {
	iconCategory: 'utility',
	dismissible: true,
	isOpen: false,
	texture: false,
};

/**
 * ** Notification is deprecated. Please use an Alert and Toast instead.**
 * The Notification component is the Alert and Toast variants of the Lightning Design System Notification component. For prompt notifications, use the <a href='#/modal'>Modal</a> component with <code>prompt={true}</code>.
 * The Notification opens from a state change outside of the component itself (pass this state to the <code>isOpen</code> prop).
 */
class Notification extends Component<NotificationProps, NotificationState> {
	static displayName = displayName;

	static defaultProps = defaultProps;

	timeout: ReturnType<typeof setTimeout> | null;

	dismissBtnRef?: HTMLButtonElement | null;

	constructor(props: NotificationProps) {
		super(props);
		this.state = {};
		this.timeout = null;
	}

	componentDidMount() {
		checkProps('Notification', this.props as unknown as Record<string, unknown>);

		if (this.props.duration) {
			this.timeout = setTimeout(() => {
				this.onDismiss();
			}, this.props.duration);
		}
	}

	// eslint-disable-next-line camelcase, react/sort-comp
	UNSAFE_componentWillReceiveProps(nextProps: NotificationProps) {
		if (nextProps.duration) {
			if (this.timeout) {
				clearTimeout(this.timeout);
			}
			if (nextProps.isOpen) {
				this.timeout = setTimeout(() => {
					this.onDismiss();
				}, this.props.duration);
			}
		}
		if (nextProps.isOpen !== this.props.isOpen) {
			this.setState({ returnFocusTo: document.activeElement as HTMLElement });
		}
	}

	componentDidUpdate(prevProps: NotificationProps) {
		if (prevProps.isOpen !== this.props.isOpen) {
			const btn = this.dismissBtnRef;
			if (btn) btn.focus();
		}
	}

	onDismiss = () => {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}

		if (this.props.onDismiss) this.props.onDismiss();
		if (this.state.returnFocusTo && this.state.returnFocusTo.focus) {
			this.state.returnFocusTo.focus();
		}
	};

	getClassName() {
		return classNames(this.props.className, 'slds-notify', {
			[`slds-notify_${this.props.variant}`]: this.props.variant,
			[`slds-theme_${this.props.theme}`]: this.props.theme,
			'slds-theme_alert-texture': this.props.texture,
		});
	}

	/*
	 * The parent container with role='alert' only announces its content if there is a change inside of it.
	 * Because React renders the entire element to the DOM, we must switch out a blank div for the real content.
	 * Bummer, I know.
	 */
	// eslint-disable-next-line class-methods-use-this
	blankContent() {
		return <div />;
	}

	renderAlertContent() {
		return (
			<h2 id="dialogTitle">
				{this.renderIcon()}
				{this.props.content}
			</h2>
		);
	}

	renderClose() {
		if (this.props.dismissible) {
			let size: ButtonIconSize | undefined;
			if (this.props.variant === 'toast') size = 'large';

			// i18n
			return (
				<Button
					assistiveText={{ icon: 'Dismiss Notification' }}
					iconCategory="utility"
					iconName="close"
					iconSize={size}
					inverse
					className="slds-notify__close"
					onClick={this.onDismiss}
					buttonRef={(dismissBtn) => {
						this.dismissBtnRef = dismissBtn;
					}}
					variant="icon"
				/>
			);
		}

		return null;
	}

	renderContent() {
		return (
			<div>
				<span className="slds-assistive-text">{this.props.theme}</span>
				{this.renderClose()}
				{this.props.variant === 'toast' ? this.renderToastContent() : null}
				{this.props.variant === 'alert' ? this.renderAlertContent() : null}
			</div>
		);
	}

	renderIcon() {
		if (this.props.iconName) {
			let classes = '';

			if (this.props.variant === 'alert') {
				classes = 'slds-m-right_x-small';
			} else if (this.props.variant === 'toast') {
				classes = 'slds-m-right_small slds-col slds-no-flex';
			}

			return (
				<Icon
					category={this.props.iconCategory}
					className={classes}
					inverse
					name={this.props.iconName}
					size="small"
				/>
			);
		}

		return null;
	}

	renderToastContent() {
		return (
			<section className="notify__content slds-grid">
				{this.renderIcon()}
				<div className="slds-col slds-align-middle">
					<h2 id="dialogTitle" className="slds-text-heading_small">
						{this.props.content}
					</h2>
				</div>
			</section>
		);
	}

	render() {
		// TODO: If there are multiple notifications on a page, we must 'hide' the ones that aren't open.
		// Need to find a better way to do this than using width:0 to override slds-notify-container.
		let styles;
		if (!this.props.isOpen) {
			styles = { width: '0px' };
		} else {
			styles =
				this.props.variant === 'toast'
					? { width: 'auto', left: '50%', transform: 'translateX(-50%)' }
					: { width: '100%' };
		}

		const alertStyles = !this.props.isOpen ? { display: 'none' } : undefined;
		return (
			<div className="slds-notify-container" style={styles}>
				<div
					className={this.getClassName()}
					role="alertdialog"
					aria-labelledby="dialogTitle"
					style={alertStyles}
				>
					{this.props.isOpen ? this.renderContent() : this.blankContent()}
				</div>
			</div>
		);
	}
}

export default Notification;
