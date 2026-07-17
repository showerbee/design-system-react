/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # GlobalNavigationBar Label Component

// ## Dependencies

// ### classNames
import classNames from 'classnames';

import colors from '../../utilities/design-tokens/dist/salesforce-skin.common.js';

// ## Constants
import { GLOBAL_NAVIGATION_BAR_LABEL } from '../../utilities/constants';

export interface GlobalNavigationBarLabelProps {
	/**
	 * Class names to be added to the `span` element
	 */
	className?: unknown[] | Record<string, unknown> | string;
	/**
	 * Determines position of separating bar.
	 */
	dividerPosition?: 'left' | 'right';
	/**
	 * Id string applied to first <span> inside of <li>
	 */
	id?: string;
	/**
	 * Text to show
	 */
	label?: string;
}

/**
 * Wraps text in the proper markup and removes link styling to support use in the GlobalNavigationBar.
 */
const GlobalNavigationBarLabel = (props: GlobalNavigationBarLabelProps) => {
	// Separate props we care about in order to pass others along passively to the `span` tag
	const { className, dividerPosition, id, label } = props;

	return (
		<li className="slds-context-bar__item slds-no-hover">
			<span
				id={id}
				// inline style override
				style={{ color: colors.colorTextLinkDisabled }}
				className={classNames(
					'slds-context-bar__label-action',
					{
						[`slds-context-bar__item_divider-${dividerPosition}`]:
							dividerPosition,
					},
					className as string
				)}
			>
				<span className="slds-truncate">{label}</span>
			</span>
		</li>
	);
};

GlobalNavigationBarLabel.displayName = GLOBAL_NAVIGATION_BAR_LABEL;

export default GlobalNavigationBarLabel;
