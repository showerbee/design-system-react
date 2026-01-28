/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useId, type ReactNode, type ReactElement } from 'react';
import classNames from 'classnames';
import { VISUAL_PICKER } from '../../utilities/constants';

/**
 * Visual picker size options
 */
export type VisualPickerSize = 'medium' | 'large';

/**
 * Props for child elements that can be cloned
 */
export interface VisualPickerChildProps {
	index?: string;
	coverable?: boolean;
	variant?: string;
	name?: string;
	size?: VisualPickerSize;
	vertical?: boolean;
}

/**
 * Props for the VisualPicker component
 */
export interface VisualPickerProps {
	/** Visual Picker children (Checkbox, Radio, VisualPickerLink) */
	children?: ReactNode;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** Whether items are coverable on selection */
	coverable?: boolean;
	/** HTML id */
	id?: string;
	/** Label for the visual picker */
	label?: string;
	/** Whether the picker has links as children */
	links?: boolean;
	/** Size of the picker */
	size?: VisualPickerSize;
	/** Whether layout is vertical */
	vertical?: boolean;
}

/**
 * Visual Picker allows users to select an option from a set of visual choices.
 */
const VisualPicker = ({
	children,
	className,
	coverable,
	id: propId,
	label,
	links = false,
	size = 'medium',
	vertical = false,
}: VisualPickerProps): React.ReactElement => {
	const generatedId = useId();
	const id = propId || generatedId;

	if (links) {
		return <div className="slds-form-element__control">{children}</div>;
	}

	const options = React.Children.map(children, (option, index) => {
		if (!React.isValidElement(option)) return option;
		return React.cloneElement(option as ReactElement<VisualPickerChildProps>, {
			index: `${id}-${index}`,
			coverable,
			variant: 'visual-picker',
			name: `${id}_options`,
			size,
			vertical: !!vertical,
		});
	});

	return (
		<fieldset id={id} className={classNames('slds-form-element', className as string)}>
			<legend className="slds-form-element__legend slds-form-element__label">{label}</legend>
			<div className="slds-form-element__control">{options}</div>
		</fieldset>
	);
};

VisualPicker.displayName = VISUAL_PICKER;

export default VisualPicker;














