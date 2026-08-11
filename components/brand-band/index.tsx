/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useId, type ReactNode, type CSSProperties } from 'react';
import classNames from '../../utilities/class-names';
import { BRAND_BAND } from '../../utilities/constants';

/**
 * Brand band image options
 */
export type BrandBandImage = 'default' | 'none' | 'group' | 'user';

/**
 * Brand band background size options
 */
export type BrandBandBackgroundSize = 'contain' | 'cover';

/**
 * Brand band size options
 */
export type BrandBandSize = 'small' | 'medium' | 'large';

/**
 * Props for the BrandBand component
 */
export interface BrandBandProps {
	/** Content to display within brand band */
	children?: ReactNode;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** HTML id */
	id?: string;
	/** Image type */
	image?: BrandBandImage;
	/** Background size */
	backgroundSize?: BrandBandBackgroundSize;
	/** Size of brand band */
	size?: BrandBandSize;
	/** Custom styles */
	style?: CSSProperties;
}

/**
 * The brand band provides theming capability that adds personality and improves information density and contrast.
 */
const BrandBand = ({
	children,
	className,
	id: propId,
	image = 'default',
	backgroundSize = 'contain',
	size = 'medium',
	style,
}: BrandBandProps): React.ReactElement => {
	const generatedId = useId();
	const id = propId || generatedId;

	return (
		<div
			className={classNames(
				'slds-brand-band',
				{
					'slds-brand-band_small': size === 'small',
					'slds-brand-band_medium': size === 'medium',
					'slds-brand-band_large': size === 'large',
					'slds-brand-band_cover': backgroundSize === 'cover',
					'slds-brand-band_none': image === 'none',
					'slds-brand-band_group': image === 'group',
					'slds-brand-band_user': image === 'user',
				},
				className as string
			)}
			id={id}
			style={style}
		>
			{children}
		</div>
	);
};

BrandBand.displayName = BRAND_BAND;

export default BrandBand;

