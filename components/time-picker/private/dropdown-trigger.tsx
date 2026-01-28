/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type ReactNode, type KeyboardEvent, type FocusEvent, type MouseEvent } from 'react';
import Input from '../../input';
import KEYS from '../../../utilities/key-code';
import { MENU_DROPDOWN_TRIGGER } from '../../../utilities/constants';

export interface TimepickerDropdownTriggerProps {
	/** Icon for right side of trigger */
	iconRight?: ReactNode;
	/** A unique ID for keyboard navigation and ARIA support */
	id?: string;
	/** This label appears above the input */
	label?: string;
	/** The dropdown menu */
	menu?: ReactNode;
	/** Called when trigger loses focus */
	onBlur?: (event: FocusEvent<HTMLDivElement>) => void;
	/** Called when trigger is clicked */
	onClick?: (event: MouseEvent) => void;
	/** Called when trigger gains focus */
	onFocus?: (event: FocusEvent<HTMLDivElement>) => void;
	/** Called when a key is pressed */
	onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
	/** Called when mouse button is pressed down */
	onMouseDown?: (event: MouseEvent<HTMLDivElement>) => void;
	/** Callback to get ref to the input element */
	triggerRef?: (ref: HTMLInputElement | null) => void;
	/** Input value */
	value?: string;
	/** Placeholder text */
	placeholder?: string;
	/** Input type */
	type?: string;
	/** Whether field is required */
	required?: boolean;
	/** Called when input value changes */
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Dropdown trigger for TimePicker - renders an input with keyboard handling
 */
const TimepickerDropdownTrigger: React.FC<TimepickerDropdownTriggerProps> & {
	displayName: string;
} = (props) => {
	const {
		iconRight,
		menu,
		onBlur,
		onFocus,
		onKeyDown,
		onMouseDown,
		triggerRef,
		...inputProps
	} = props;

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (onKeyDown && event.keyCode) {
			if (
				event.keyCode === KEYS.ENTER ||
				event.keyCode === KEYS.DOWN ||
				event.keyCode === KEYS.UP ||
				event.keyCode === KEYS.ESCAPE
			) {
				onKeyDown(event);
			}
		}
	};

	return (
		<div
			onBlur={onBlur}
			onFocus={onFocus}
			onKeyDown={handleKeyDown}
			onMouseDown={onMouseDown}
		>
			{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
			<Input iconRight={iconRight} {...(inputProps as any)} inputRef={triggerRef}>
				{menu}
			</Input>
		</div>
	);
};

TimepickerDropdownTrigger.displayName = MENU_DROPDOWN_TRIGGER;

export default TimepickerDropdownTrigger;





