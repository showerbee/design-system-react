import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import TimePicker from '../index';
import IconSettings from '../../icon-settings';

const meta: Meta<typeof TimePicker> = {
	title: 'Components/TimePicker',
	component: TimePicker,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
	parameters: {
		docs: {
			description: {
				component:
					'**Deprecated: Please use an auto-complete Combobox instead.** A timepicker is an autocomplete text input to capture a time.',
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

// Default story with controlled component
const DefaultComponent = () => {
	const [value, setValue] = useState<Date | null>(null);
	const [strValue, setStrValue] = useState<string>('');

	return (
		<TimePicker
			label="Time"
			placeholder="Select a time"
			onDateChange={(date, str) => {
				console.log('onDateChange', date, str);
				setValue(date);
				setStrValue(str);
			}}
			value={value}
			strValue={strValue}
		/>
	);
};

export const Default: Story = {
	render: () => <DefaultComponent />,
};

// 15 minute intervals
const FifteenMinuteComponent = () => {
	const [value, setValue] = useState<Date | null>(null);
	const [strValue, setStrValue] = useState<string>('');

	return (
		<TimePicker
			label="Time (15 min intervals)"
			placeholder="Select a time"
			stepInMinutes={15}
			onDateChange={(date, str) => {
				console.log('onDateChange', date, str);
				setValue(date);
				setStrValue(str);
			}}
			value={value}
			strValue={strValue}
		/>
	);
};

export const FifteenMinuteIntervals: Story = {
	name: '15 Minute Intervals',
	render: () => <FifteenMinuteComponent />,
};

// 1 hour intervals
const OneHourComponent = () => {
	const [value, setValue] = useState<Date | null>(null);
	const [strValue, setStrValue] = useState<string>('');

	return (
		<TimePicker
			label="Time (1 hour intervals)"
			placeholder="Select a time"
			stepInMinutes={60}
			onDateChange={(date, str) => {
				console.log('onDateChange', date, str);
				setValue(date);
				setStrValue(str);
			}}
			value={value}
			strValue={strValue}
		/>
	);
};

export const OneHourIntervals: Story = {
	name: '1 Hour Intervals',
	render: () => <OneHourComponent />,
};

// Required field
const RequiredComponent = () => {
	const [value, setValue] = useState<Date | null>(null);
	const [strValue, setStrValue] = useState<string>('');

	return (
		<TimePicker
			label="Time (Required)"
			placeholder="Select a time"
			required
			onDateChange={(date, str) => {
				console.log('onDateChange', date, str);
				setValue(date);
				setStrValue(str);
			}}
			value={value}
			strValue={strValue}
		/>
	);
};

export const Required: Story = {
	render: () => <RequiredComponent />,
};

// Disabled state
const DisabledComponent = () => {
	return (
		<TimePicker
			label="Time (Disabled)"
			placeholder="Select a time"
			disabled
		/>
	);
};

export const Disabled: Story = {
	render: () => <DisabledComponent />,
};

// Preselected value
const PreselectedComponent = () => {
	const initialDate = new Date();
	initialDate.setHours(14, 30, 0, 0); // 2:30 PM

	const [value, setValue] = useState<Date | null>(initialDate);
	const [strValue, setStrValue] = useState<string>(
		initialDate.toLocaleTimeString(navigator.language, {
			hour: '2-digit',
			minute: '2-digit',
		})
	);

	return (
		<TimePicker
			label="Time (Preselected)"
			onDateChange={(date, str) => {
				console.log('onDateChange', date, str);
				setValue(date);
				setStrValue(str);
			}}
			value={value}
			strValue={strValue}
		/>
	);
};

export const PreselectedValue: Story = {
	name: 'Preselected Value',
	render: () => <PreselectedComponent />,
};

// Custom formatter (24 hour)
const TwentyFourHourComponent = () => {
	const [value, setValue] = useState<Date | null>(null);
	const [strValue, setStrValue] = useState<string>('');

	const formatter = (date: Date | null): string | null => {
		if (date) {
			return date.toLocaleTimeString('en-GB', {
				hour: '2-digit',
				minute: '2-digit',
				hour12: false,
			});
		}
		return null;
	};

	return (
		<TimePicker
			label="Time (24-hour format)"
			placeholder="Select a time"
			formatter={formatter}
			onDateChange={(date, str) => {
				console.log('onDateChange', date, str);
				setValue(date);
				setStrValue(str);
			}}
			value={value}
			strValue={strValue}
		/>
	);
};

export const TwentyFourHourFormat: Story = {
	name: '24-Hour Format',
	render: () => <TwentyFourHourComponent />,
};

// Relative menu position
const RelativePositionComponent = () => {
	const [value, setValue] = useState<Date | null>(null);
	const [strValue, setStrValue] = useState<string>('');

	return (
		<TimePicker
			label="Time (Relative Position)"
			placeholder="Select a time"
			menuPosition="relative"
			onDateChange={(date, str) => {
				console.log('onDateChange', date, str);
				setValue(date);
				setStrValue(str);
			}}
			value={value}
			strValue={strValue}
		/>
	);
};

export const RelativePosition: Story = {
	render: () => <RelativePositionComponent />,
};





