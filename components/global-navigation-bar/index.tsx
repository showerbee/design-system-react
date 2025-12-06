/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type ReactNode, type ReactElement } from 'react';
import classNames from 'classnames';
import {
	GLOBAL_NAVIGATION_BAR,
	GLOBAL_NAVIGATION_BAR_REGION,
} from '../../utilities/constants';

/**
 * Theme options for GlobalNavigationBar
 */
export type GlobalNavigationBarTheme = 'light' | 'dark';

/**
 * Region type for child components
 */
export type GlobalNavigationBarRegionType = 'primary' | 'secondary' | 'tertiary';

/**
 * Props for region child components
 */
export interface GlobalNavigationBarRegionProps {
	region?: GlobalNavigationBarRegionType;
}

/**
 * Props for the GlobalNavigationBar component
 */
export interface GlobalNavigationBarProps {
	/** Navigation bar items */
	children?: ReactNode;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** Cloud name for theming (e.g., "sales", "marketing") */
	cloud?: string;
	/** Theme for text and interactions */
	theme?: GlobalNavigationBarTheme;
}

/**
 * Audit and organize children by region
 */
const auditChildren = (children: ReactNode): ReactElement[] => {
	let primaryRegion: ReactElement | undefined;
	const secondaryRegions: ReactElement[] = [];
	let tertiaryRegion: ReactElement | undefined;

	React.Children.forEach(children, (child) => {
		if (child && React.isValidElement(child)) {
			const displayName = (child.type as { displayName?: string }).displayName;
			if (displayName === GLOBAL_NAVIGATION_BAR_REGION) {
				const childProps = child.props as GlobalNavigationBarRegionProps;
				if (childProps.region === 'primary') {
					primaryRegion = child;
				} else if (childProps.region === 'secondary') {
					secondaryRegions.push(child);
				} else if (childProps.region === 'tertiary') {
					tertiaryRegion = child;
				}
			}
		}
	});

	const result: ReactElement[] = [];
	if (primaryRegion) result.push(primaryRegion);
	result.push(...secondaryRegions);
	if (tertiaryRegion) result.push(tertiaryRegion);

	return result;
};

/**
 * Global Navigation Bar represents a list of links that either take the user
 * to another page or parts of the page the user is in.
 */
const GlobalNavigationBar = ({
	children,
	className,
	cloud,
	theme,
}: GlobalNavigationBarProps): React.ReactElement => (
	<div
		className={classNames(
			'slds-context-bar',
			{
				[`slds-context-bar_theme-${cloud}`]: cloud,
				[`slds-context-bar_theme-${theme}`]: theme,
			},
			className as string
		)}
	>
		{auditChildren(children)}
	</div>
);

GlobalNavigationBar.displayName = GLOBAL_NAVIGATION_BAR;

export default GlobalNavigationBar;

