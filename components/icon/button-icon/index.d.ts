/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import type { IconCategory } from '../../../types/common';

export interface ButtonIconProps {
	/** Icon category */
	category?: IconCategory;
	/** Size of the icon */
	size?: 'x-small' | 'small' | 'medium' | 'large';
	/** Hint styling */
	hint?: boolean;
	/** Custom SVG icon data */
	icon?: Record<string, unknown>;
	/** CSS class names */
	className?: string | string[] | Record<string, boolean>;
	/** Inverse colors */
	inverse?: boolean;
	/** Icon name */
	name?: string;
	/** Direct path to icon */
	path?: string;
	/** Icon position relative to label */
	position?: 'left' | 'right';
}

declare const ButtonIcon: React.FC<ButtonIconProps>;
export default ButtonIcon;


