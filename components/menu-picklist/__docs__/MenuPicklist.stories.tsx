import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import IconSettings from '../../icon-settings';
import Picklist from '../index';
import Base from '../__examples__/base';
import SnapshotDefault from '../__examples__/snapshot-default';
import TooltipListItem from '../__examples__/tooltip-list-item';

const options = [
	{ label: 'An option that is Super Super Long', value: 'A0' },
	{ label: 'Another option', value: 'B0' },
	{ label: 'C Option', value: 'C0' },
	{ label: 'D Option', value: 'D0' },
	{ label: 'E Option', value: 'E0' },
	{ label: 'A1 Option', value: 'A1' },
	{ label: 'B2 Option', value: 'B1' },
	{ label: 'C2 Option', value: 'C1' },
	{ label: 'D2 Option', value: 'D1' },
	{ label: 'E2 Option Super Super Long', value: 'E1' },
];

interface PicklistWrapperProps {
	label?: string;
	isInline?: boolean;
	onClick?: (event: React.MouseEvent) => void;
	placeholder?: string;
	onSelect?: (...args: unknown[]) => void;
	errorText?: string;
	required?: boolean;
}

const PicklistWrapper: React.FC<PicklistWrapperProps> = (props) => (
	<div>
		<Picklist {...props} options={options} silenceDeprecationWarning />
		<button
			type="button"
			style={{
				padding: '10px',
				margin: '50px',
			}}
		>
			test
		</button>
	</div>
);

const MultipleExample: React.FC = () => {
	const [selectedIndexes, setSelectedIndexes] = useState<Set<number>>(
		new Set()
	);

	const handleSelect = (
		_selectedItem: unknown,
		data: { optionIndex: number }
	) => {
		setSelectedIndexes((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(data.optionIndex)) {
				newSet.delete(data.optionIndex);
			} else {
				newSet.add(data.optionIndex);
			}
			return newSet;
		});
	};

	return (
		<Picklist
			label="Contacts"
			labels={{
				multipleOptionsSelected: `${selectedIndexes.size} Contacts Selected`,
			}}
			multiple
			onSelect={handleSelect}
			options={options}
			onPillRemove={(_removedItem, data) => {
				handleSelect(_removedItem, data);
			}}
			silenceDeprecationWarning
		/>
	);
};

const meta: Meta<typeof Picklist> = {
	title: 'Components/MenuPicklist',
	component: Picklist,
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
					'⚠️ **DEPRECATED**: MenuPicklist is deprecated. Please use a read-only Combobox instead.',
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof Picklist>;

export const Modal: Story = {
	name: 'Modal',
	render: () => (
		<PicklistWrapper
			label="Contacts"
			placeholder="Select a contact"
			onSelect={(...rest) => action('Selected')(...rest)}
		/>
	),
};

export const NonModal: Story = {
	name: 'Non-modal',
	render: () => (
		<PicklistWrapper
			label="Contacts"
			isInline
			onClick={(event) => console.log('clicked', event.target)}
			placeholder="Select a contact"
			onSelect={(...rest) => action('Selected')(...rest)}
		/>
	),
};

export const ErrorState: Story = {
	name: 'Error state',
	render: () => (
		<PicklistWrapper
			errorText="This field is required"
			label="Contacts"
			placeholder="Select a contact"
			onSelect={(...rest) => action('Selected')(...rest)}
			required
		/>
	),
};

export const Multiselect: Story = {
	name: 'Multiselect',
	render: () => <MultipleExample />,
};

export const DocsBase: Story = {
	name: 'Docs site Base',
	render: () => <Base />,
};

export const DocsSnapshotDefault: Story = {
	name: 'Docs site SnapshotDefault',
	render: () => <SnapshotDefault />,
};

export const DocsTooltipListItem: Story = {
	name: 'Docs site TooltipListItem',
	render: () => <TooltipListItem />,
};



