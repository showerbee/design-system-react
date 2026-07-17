/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

// # App Launcher Tile Component

// ## Dependencies

import React, { type ReactNode } from 'react';
import classNames from 'classnames';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';
import componentDoc from './component.json';

// ## Children
import Button from '../button';
// @ts-expect-error - Module declaration doesn't match relative import
import Highlighter from '../utilities/highlighter';
import Tooltip from '../tooltip';
// @ts-expect-error - Module declaration doesn't match relative import
import Truncate from '../utilities/truncate';

import { APP_LAUNCHER_TILE } from '../../utilities/constants';

export interface AppLauncherTileAssistiveText {
	/** Text that describes the purpose of the drag handle icon. */
	dragIconText?: string;
}

export interface AppLauncherTileProps {
	/**
	 * **Assistive text for accessibility.**
	 * * `dragIconText`: Text that describes the purpose of the drag handle icon.
	 */
	assistiveText?: AppLauncherTileAssistiveText;
	/**
	 * Class names to be added to the tile.
	 */
	className?: unknown[] | Record<string, unknown> | string;
	/**
	 * The description of the app. Not visible on small tiles.
	 */
	description?: string;
	/**
	 * Heading for app description. NOTE: this prop is DEPRECATED and use should be avoided
	 */
	descriptionHeading?: string;
	/**
	 * The `href` attribute of the tile. Please pass in bookmarkable URLs from your routing library. If the `onClick` callback is specified this URL will be prevented from changing the browser's location.
	 */
	href?: string;
	/**
	 * Background color to be used on the icon. Only applied if iconNode is undefined
	 */
	iconBackgroundColor?: string;
	/**
	 * Icon node for app tile. Takes priority over `iconText`
	 */
	iconNode?: ReactNode;
	/**
	 * Text to be used as an icon. Only renders if iconNode is undefined
	 */
	iconText?: string;
	/**
	 * Open the More Tooltip
	 */
	isOpenTooltip?: boolean;
	/**
	 * The localized text for the "More information" tooltip.
	 */
	moreLabel?: string;
	/**
	 * Function that will be executed when clicking on a tile
	 */
	onClick?: (event: React.MouseEvent, data: { href?: string }) => void;
	/**
	 * Text used to highlight content in app tiles
	 */
	search?: string;
	/**
	 * App name for the tile's title.
	 */
	title: string;
}

const defaultProps: Partial<AppLauncherTileProps> = {
	assistiveText: {
		dragIconText: 'Reorder',
	},
	href: '#',
	moreLabel: ' More',
};

/**
 * App Launcher Tiles provide information and links to a user's apps
 */
class AppLauncherTile extends React.Component<AppLauncherTileProps> {
	// ### Display Name
	// Always use the canonical component name as the React display name.
	static displayName = APP_LAUNCHER_TILE;

	// ### Default Props
	static defaultProps = defaultProps;

	constructor(props: AppLauncherTileProps) {
		super(props);

		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		(checkProps as (name: string, props: unknown, doc: unknown) => void)(
			APP_LAUNCHER_TILE,
			props,
			componentDoc
		);
	}

	handleClick = (event: React.MouseEvent) => {
		if (this.props.onClick) {
			event.preventDefault();
			this.props.onClick(event, { href: this.props.href });
		}
	};

	render() {
		const dragButtonAriaProps = { 'aria-pressed': false };
		const iconStyles: React.CSSProperties = {};

		if (this.props.iconBackgroundColor) {
			iconStyles.backgroundColor = this.props.iconBackgroundColor;
		}

		return (
			<div
				className={classNames(
					'slds-app-launcher__tile slds-text-link_reset slds-is-draggable', // NOTE: while the draggable class is here for stylistic purposes, the draggable attribute is not present as draggability has not been implemented yet
					this.props.className as string
				)}
				onClick={this.handleClick}
				role="button"
				tabIndex={0}
			>
				<div className="slds-app-launcher__tile-figure">
					{this.props.iconNode || (
						<span className="slds-avatar slds-avatar_large">
							<abbr
								className="slds-avatar__initials slds-icon-custom-27"
								style={iconStyles}
								title={this.props.title}
							>
								{this.props.iconText}
							</abbr>
						</span>
					)}
					<div className="slds-m-top_xxx-small">
						<Button
							assistiveText={{
								icon: this.props.assistiveText?.dragIconText,
							}}
							iconCategory="utility"
							iconName="rows"
							title={this.props.assistiveText?.dragIconText}
							variant="icon"
							{...dragButtonAriaProps}
						/>
					</div>
				</div>
				<div className="slds-app-launcher__tile-body">
					<a
						href={this.props.href}
						onClick={(event) =>
							this.props.href === '#' && event.preventDefault()
						}
					>
						<Highlighter search={this.props.search}>
							{this.props.title}
						</Highlighter>
					</a>
					<Truncate
						line={2}
						prefix={
							this.props.descriptionHeading &&
							this.props.descriptionHeading.toUpperCase()
						}
						suffix={this.props.moreLabel}
						text={this.props.description}
						textTruncateChild={
							<Tooltip
								align="bottom"
								content={
									<Highlighter search={this.props.search}>
										{this.props.description}
									</Highlighter>
								}
								isOpen={this.props.isOpenTooltip}
							>
								<Button
									className="slds-button_reset slds-text-link"
									variant="base"
								>
									{this.props.moreLabel}
								</Button>
							</Tooltip>
						}
						wrapper={(text: ReactNode, textTruncateChild: ReactNode) => (
							<React.Fragment>
								{this.props.descriptionHeading && (
									// inline style override
									<div
										className="slds-text-heading_label"
										style={{ letterSpacing: '0.025rem' }}
									>
										{this.props.descriptionHeading}{' '}
									</div>
								)}
								<Highlighter search={this.props.search}>{text}</Highlighter>
								{textTruncateChild && ' '}
								{textTruncateChild}
							</React.Fragment>
						)}
					/>
				</div>
			</div>
		);
	}
}

export default AppLauncherTile;
