/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import type { MouseEvent, FC } from 'react';

export interface InputIconAssistiveText {
	icon?: string;
}

export interface InputIconProps {
	/** Assistive text for accessibility */
	assistiveText?: InputIconAssistiveText;
	/** Icon category from lightningdesignsystem.com/icons/ */
	category?: string;
	/** Position of icon (left or right) - handled by Input component */
	iconPosition?: 'left' | 'right';
	/** Name of the icon */
	name?: string;
	/** Path to the icon (overrides global settings) */
	path?: string;
	/** Click handler */
	onClick?: (event: MouseEvent) => void;
	/** Variant style */
	variant?: 'base' | 'combobox';
}

declare const InputIcon: FC<InputIconProps>;

export default InputIcon;






