/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type ReactNode, type ReactElement, type MouseEvent } from 'react';
import EventUtil from '../../utilities/event';
import {
	GLOBAL_HEADER,
	GLOBAL_HEADER_FAVORITES,
	GLOBAL_HEADER_HELP,
	GLOBAL_HEADER_NOTIFICATIONS,
	GLOBAL_HEADER_PROFILE,
	GLOBAL_HEADER_SEARCH,
	GLOBAL_HEADER_SETUP,
	GLOBAL_HEADER_TASK,
	GLOBAL_HEADER_TOOL,
} from '../../utilities/constants';

/**
 * Assistive text for GlobalHeader
 */
export interface GlobalHeaderAssistiveText {
	/** Skip to navigation link text */
	skipToNav?: string;
	/** Skip to content link text */
	skipToContent?: string;
}

/**
 * Props for the GlobalHeader component
 */
export interface GlobalHeaderProps {
	/** Assistive text for accessibility */
	assistiveText?: GlobalHeaderAssistiveText;
	/** Header items (Search, Button, Dropdown, Profile) */
	children?: ReactNode;
	/** Logo image source */
	logoSrc?: string;
	/** Navigation bar component */
	navigation?: ReactNode;
	/** Skip to content handler */
	onSkipToContent?: (event: MouseEvent<HTMLAnchorElement>) => void;
	/** Skip to navigation handler */
	onSkipToNav?: (event: MouseEvent<HTMLAnchorElement>) => void;
	/** @deprecated Use assistiveText.skipToContent */
	skipToContentAssistiveText?: string;
	/** @deprecated Use assistiveText.skipToNav */
	skipToNavAssistiveText?: string;
}

const defaultAssistiveText: GlobalHeaderAssistiveText = {
	skipToNav: 'Skip to Navigation',
	skipToContent: 'Skip to Main Content',
};

/**
 * The global header is the anchor for the Salesforce platform and spans all other parts of the UI.
 * It accepts children to define the items displayed within.
 */
const GlobalHeader = ({
	assistiveText: propAssistiveText,
	children,
	logoSrc = '/assets/images/logo-noname.svg',
	navigation,
	onSkipToContent,
	onSkipToNav,
	skipToContentAssistiveText,
	skipToNavAssistiveText,
}: GlobalHeaderProps): React.ReactElement => {
	const assistiveText = { ...defaultAssistiveText, ...propAssistiveText };

	const handleSkipToContent = (e: MouseEvent<HTMLAnchorElement>) => {
		EventUtil.trap(e);
		onSkipToContent?.(e);
	};

	const handleSkipToNav = (e: MouseEvent<HTMLAnchorElement>) => {
		EventUtil.trap(e);
		onSkipToNav?.(e);
	};

	// Organize children by type
	const actionsByType: Record<string, ReactElement[]> = {
		[GLOBAL_HEADER_FAVORITES]: [],
		[GLOBAL_HEADER_HELP]: [],
		[GLOBAL_HEADER_NOTIFICATIONS]: [],
		[GLOBAL_HEADER_PROFILE]: [],
		[GLOBAL_HEADER_SETUP]: [],
		[GLOBAL_HEADER_TASK]: [],
		[GLOBAL_HEADER_TOOL]: [],
	};
	let search: ReactElement | null = null;

	// Sort each child into its bucket by `displayName`. Children grouped in a
	// `React.Fragment` (`<>...</>`) must be recursed into — `React.Children.forEach`
	// treats a Fragment as a single child with no `displayName`, which would
	// otherwise silently drop every action inside it.
	const sortChild = (child: ReactNode) => {
		if (!child || !React.isValidElement(child)) {
			return;
		}
		if (child.type === React.Fragment) {
			React.Children.forEach(
				(child.props as { children?: ReactNode }).children,
				sortChild
			);
			return;
		}
		const displayName = (child.type as { displayName?: string }).displayName;
		if (displayName === GLOBAL_HEADER_SEARCH) {
			search = child;
		} else if (displayName && actionsByType[displayName]) {
			actionsByType[displayName].push(child);
		}
	};

	React.Children.forEach(children, sortChild);

	const actions = [
		...actionsByType[GLOBAL_HEADER_FAVORITES],
		...actionsByType[GLOBAL_HEADER_TASK],
		...actionsByType[GLOBAL_HEADER_HELP],
		...actionsByType[GLOBAL_HEADER_SETUP],
		...actionsByType[GLOBAL_HEADER_NOTIFICATIONS],
		...actionsByType[GLOBAL_HEADER_TOOL],
		...actionsByType[GLOBAL_HEADER_PROFILE],
	];

	return (
		<header className="slds-global-header_container">
			{onSkipToNav && (
				<a
					href="#"
					className="slds-assistive-text slds-assistive-text_focus"
					onClick={handleSkipToNav}
				>
					{skipToNavAssistiveText || assistiveText.skipToNav}
				</a>
			)}
			{onSkipToContent && (
				<a
					href="#"
					className="slds-assistive-text slds-assistive-text_focus"
					onClick={handleSkipToContent}
				>
					{skipToContentAssistiveText || assistiveText.skipToContent}
				</a>
			)}
			<div className="slds-global-header slds-grid slds-grid_align-spread">
				<div className="slds-global-header__item">
					<div
						className="slds-global-header__logo"
						style={{ backgroundImage: `url(${logoSrc})` }}
					/>
				</div>
				{search}
				<div className="slds-global-header__item">
					<ul className="slds-global-actions">
						{actions.map((actionItem, index) => (
							<li className="slds-global-actions__item" key={`actions-item-${index}`}>
								{actionItem}
							</li>
						))}
					</ul>
				</div>
			</div>
			{navigation}
		</header>
	);
};

GlobalHeader.displayName = GLOBAL_HEADER;

export default GlobalHeader;














