/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useState, useCallback, useEffect, useMemo, type ChangeEvent } from 'react';
import isDate from 'lodash.isdate';

import checkProps from './check-props';
import InputIcon from '../icon/input-icon';
import MenuDropdown from '../menu-dropdown';
import TimepickerDropdownTrigger from './private/dropdown-trigger';
import { TIME_PICKER } from '../../utilities/constants';
import componentDoc from './component.json';

// ===== Types =====

export interface TimePickerOption {
	label: string;
	value: Date;
}

export interface TimePickerProps {
	/** If true, constrains the menu to the scroll parent */
	constrainToScrollParent?: boolean;
	/** Disables the input and prevents editing the contents */
	disabled?: boolean;
	/** Time formatting function */
	formatter?: (date: Date | null) => string | null;
	/** Sets the dialog width to the width of the target */
	inheritTargetWidth?: boolean;
	/** This label appears above the input */
	label?: string;
	/** Custom element that overrides the default Menu Item component */
	listItemRenderer?: (option: TimePickerOption) => React.ReactNode;
	/** Menu position strategy */
	menuPosition?: 'absolute' | 'overflowBoundaryElement' | 'relative';
	/** Called when date changes - receives (dateValue, stringValue) */
	onDateChange?: (date: Date, strValue: string) => void;
	/** Parsing date string into Date */
	parser?: (timeStr: string) => Date;
	/** Text that will appear in an empty input */
	placeholder?: string;
	/** If true, adds asterisk next to input label */
	required?: boolean;
	/** Frequency of options in minutes */
	stepInMinutes?: number;
	/** Value for input that is parsed to create internal state */
	strValue?: string;
	/** Date value instance */
	value?: Date | null;
}

// ===== Helper Functions =====

const defaultFormatter = (date: Date | null): string | null => {
	if (date) {
		return date.toLocaleTimeString(navigator.language, {
			hour: '2-digit',
			minute: '2-digit',
		});
	}
	return null;
};

const defaultParser = (timeStr: string): Date => {
	const date = new Date();
	const dateStr = date.toLocaleString(navigator.language, {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	});
	return new Date(`${dateStr} ${timeStr}`);
};

const generateOptions = (
	stepInMinutes: number,
	formatter: (date: Date | null) => string | null
): TimePickerOption[] => {
	const baseDate = new Date();
	const options: TimePickerOption[] = [];

	baseDate.setHours(0);
	baseDate.setMinutes(0);
	baseDate.setSeconds(0);
	baseDate.setMilliseconds(0);

	const curDate = new Date(baseDate);

	while (baseDate.getDate() === curDate.getDate()) {
		const formatted = formatter(curDate);

		if (formatted) {
			options.push({
				label: formatted,
				value: new Date(curDate),
			});
		}

		curDate.setMinutes(curDate.getMinutes() + stepInMinutes);
	}

	return options;
};

// ===== Component =====

/**
 * **Timepicker is deprecated. Please use an auto-complete Combobox instead.**
 * A timepicker is an autocomplete text input to capture a time.
 */
const Timepicker: React.FC<TimePickerProps> = (props) => {
	const {
		constrainToScrollParent,
		disabled,
		formatter = defaultFormatter,
		inheritTargetWidth,
		label,
		listItemRenderer,
		menuPosition = 'absolute',
		onDateChange,
		parser = defaultParser,
		placeholder,
		required,
		stepInMinutes = 30,
		strValue: strValueProp,
		value: valueProp = null,
	} = props;

	// State
	const [value, setValue] = useState<Date | null>(valueProp);
	const [strValue, setStrValue] = useState<string>(strValueProp || '');

	// Generate options based on step
	const options = useMemo(
		() => generateOptions(stepInMinutes, formatter),
		[stepInMinutes, formatter]
	);

	// Check props on mount (development only)
	useEffect(() => {
		if (typeof checkProps === 'function') {
			checkProps(TIME_PICKER, props as unknown as Record<string, unknown>, componentDoc);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Sync with controlled props
	useEffect(() => {
		if (valueProp && value) {
			const currentTime = value.getTime();
			const nextTime = valueProp.getTime();

			if (currentTime !== nextTime) {
				setValue(valueProp);
				setStrValue(formatter(valueProp) || '');
			}
		}
	}, [valueProp, value, formatter]);

	useEffect(() => {
		if (strValueProp !== undefined && strValueProp !== strValue) {
			setStrValue(strValueProp);
		}
	}, [strValueProp, strValue]);

	// Handlers
	const handleChange = useCallback(
		(date: Date, newStrValue: string) => {
			setValue(date);
			setStrValue(newStrValue);

			if (onDateChange) {
				onDateChange(date, newStrValue);
			}
		},
		[onDateChange]
	);

	const handleSelect = useCallback(
		(val: TimePickerOption | null) => {
			if (val && val.value) {
				handleChange(val.value, val.label);
			}
		},
		[handleChange]
	);

	const handleInputChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const newStrValue = event.target.value;
			setStrValue(newStrValue);

			if (onDateChange) {
				const parsedDate = parser(newStrValue);
				onDateChange(parsedDate, newStrValue);
			}
		},
		[onDateChange, parser]
	);

	// Cast props for compatibility with MenuDropdown's types
	const dropdownProps = {
		checkmark: false,
		constrainToScrollParent,
		disabled,
		inheritTargetWidth,
		label,
		listItemRenderer,
		menuStyle: {
			maxHeight: '20em',
			overflowX: 'hidden' as const,
			minWidth: '100%',
		},
		menuPosition,
		onSelect: handleSelect,
		options,
	};

	return (
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		<MenuDropdown {...(dropdownProps as any)}>
			<TimepickerDropdownTrigger
				iconRight={<InputIcon category="utility" name="clock" />}
				onChange={handleInputChange}
				placeholder={placeholder}
				required={required}
				type="text"
				value={strValue}
			/>
		</MenuDropdown>
	);
};

Timepicker.displayName = TIME_PICKER;

export default Timepicker;

