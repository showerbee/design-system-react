/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import type { FC } from 'react';

export interface LabelAssistiveText {
	label?: string;
}

export interface LabelProps {
	/** Assistive text to use instead of a visible label */
	assistiveText?: LabelAssistiveText | Record<string, unknown>;
	/** CSS classes for the label */
	className?: string | string[] | Record<string, boolean>;
	/** ID of the input associated with this label */
	htmlFor?: string;
	/** Label text */
	label?: string;
	/** Applies required styling */
	required?: boolean;
	/** Label variant */
	variant?: 'base' | 'static';
}

declare const Label: FC<LabelProps>;

export default Label;




