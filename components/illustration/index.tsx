/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type ReactNode, type CSSProperties } from 'react';
import classNames from '../../utilities/class-names';
import Svg from '../utilities/utility-icon/svg';
import { ILLUSTRATION } from '../../utilities/constants';
// Development-only prop validation (commented out for TS migration)
// import checkProps from './check-props';
// import componentDoc from './component.json';

/**
 * Illustration size options
 */
export type IllustrationSize = 'small' | 'large';

/**
 * SVG illustration data structure
 */
export interface IllustrationData {
	viewBox?: string;
	[key: string]: unknown;
}

/**
 * Props for the Illustration component
 */
export interface IllustrationProps {
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** Heading text */
	heading?: string;
	/** Custom SVG object */
	illustration?: IllustrationData;
	/** Whether SVGs are from design-system-react repo */
	internalIllustration?: boolean;
	/** Message body below heading */
	messageBody?: string | ReactNode;
	/** Name of the illustration */
	name?: string;
	/** Path to illustration SVG */
	path?: string;
	/** Size of illustration */
	size?: IllustrationSize;
	/** Custom styles for SVG */
	style?: CSSProperties;
}

/**
 * An illustration is an image and inline text that work in tandem to communicate a state in a more friendly way.
 */
const Illustration = ({
	className,
	illustration,
	heading,
	messageBody,
	name,
	path,
	internalIllustration = true,
	size = 'small',
	style = {},
	...rest
}: IllustrationProps): React.ReactElement => {
	const kebabCaseName = name ? name.replace(/_| /g, '-').toLowerCase() : '';
	const styles: CSSProperties = { ...style };
	let illustrationSvg: React.ReactNode = null;

	// Large illustration SVG should have a default height of 400px if not already specified
	if (size === 'large' && !styles.height) {
		styles.height = '400px';
	}

	if (illustration) {
		// Use SVG data passed in with `illustration` prop
		illustrationSvg = (
			<Svg
				className="slds-illustration__svg"
				aria-hidden="true"
				data={illustration}
				name={kebabCaseName}
				style={styles}
			/>
		);
	} else if (path) {
		illustrationSvg = (
			<svg
				className="slds-illustration__svg"
				aria-hidden="true"
				name={kebabCaseName}
				style={styles}
			>
				<use xlinkHref={path} />
			</svg>
		);
	}

	return (
		<div
			className={classNames(className as string, 'slds-illustration', {
				'slds-illustration_small': size === 'small',
				'slds-illustration_large': size === 'large',
			})}
		>
			{illustrationSvg}
			<div className="slds-text-longform">
				{heading && <h3 className="slds-text-heading_medium">{heading}</h3>}
				{messageBody && <p className="slds-text-body_regular">{messageBody}</p>}
			</div>
		</div>
	);
};

Illustration.displayName = ILLUSTRATION;

export default Illustration;

