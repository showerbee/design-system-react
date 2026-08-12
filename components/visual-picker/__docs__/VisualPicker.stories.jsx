import { useState } from 'react';
import IconSettings from '../../icon-settings';
import VisualPicker from '../';
import Radio from '../../radio';
import Checkbox from '../../checkbox';

export default {
	title: 'Components/VisualPicker',
	component: VisualPicker,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<IconSettings iconPath="./assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
	argTypes: {
		size: {
			control: { type: 'select' },
			options: ['medium', 'large'],
		},
		vertical: { control: 'boolean' },
		coverable: { control: 'boolean' },
	},
};

// Radio variant
export const RadioPicker = {
	render: () => {
		const [selected, setSelected] = useState('option1');

		return (
			<VisualPicker id="radio-picker" label="Select an Option">
				<Radio
					id="option1"
					labels={{ label: 'Lightning Professional' }}
					checked={selected === 'option1'}
					onChange={() => setSelected('option1')}
				/>
				<Radio
					id="option2"
					labels={{ label: 'Lightning Enterprise' }}
					checked={selected === 'option2'}
					onChange={() => setSelected('option2')}
				/>
				<Radio
					id="option3"
					labels={{ label: 'Lightning Unlimited' }}
					checked={selected === 'option3'}
					onChange={() => setSelected('option3')}
				/>
			</VisualPicker>
		);
	},
};

// Checkbox variant
export const CheckboxPicker = {
	render: () => {
		const [checked, setChecked] = useState({
			accounts: true,
			contacts: false,
			leads: false,
		});

		return (
			<VisualPicker id="checkbox-picker" label="Select Features">
				<Checkbox
					id="accounts"
					labels={{ label: 'Accounts' }}
					checked={checked.accounts}
					onChange={() => setChecked((prev) => ({ ...prev, accounts: !prev.accounts }))}
				/>
				<Checkbox
					id="contacts"
					labels={{ label: 'Contacts' }}
					checked={checked.contacts}
					onChange={() => setChecked((prev) => ({ ...prev, contacts: !prev.contacts }))}
				/>
				<Checkbox
					id="leads"
					labels={{ label: 'Leads' }}
					checked={checked.leads}
					onChange={() => setChecked((prev) => ({ ...prev, leads: !prev.leads }))}
				/>
			</VisualPicker>
		);
	},
};

// Large size
export const LargeSize = {
	render: () => {
		const [selected, setSelected] = useState('option1');

		return (
			<VisualPicker id="large-picker" label="Select Size" size="large">
				<Radio
					id="option1"
					labels={{ label: 'Small' }}
					checked={selected === 'option1'}
					onChange={() => setSelected('option1')}
				/>
				<Radio
					id="option2"
					labels={{ label: 'Medium' }}
					checked={selected === 'option2'}
					onChange={() => setSelected('option2')}
				/>
				<Radio
					id="option3"
					labels={{ label: 'Large' }}
					checked={selected === 'option3'}
					onChange={() => setSelected('option3')}
				/>
			</VisualPicker>
		);
	},
};

// Vertical layout
export const VerticalLayout = {
	render: () => {
		const [selected, setSelected] = useState('option1');

		return (
			<VisualPicker id="vertical-picker" label="Select Plan" vertical>
				<Radio
					id="option1"
					labels={{ label: 'Starter' }}
					checked={selected === 'option1'}
					onChange={() => setSelected('option1')}
				/>
				<Radio
					id="option2"
					labels={{ label: 'Professional' }}
					checked={selected === 'option2'}
					onChange={() => setSelected('option2')}
				/>
				<Radio
					id="option3"
					labels={{ label: 'Enterprise' }}
					checked={selected === 'option3'}
					onChange={() => setSelected('option3')}
				/>
			</VisualPicker>
		);
	},
};

// Coverable
export const Coverable = {
	render: () => {
		const [selected, setSelected] = useState('option1');

		return (
			<VisualPicker id="coverable-picker" label="Select with Cover Effect" coverable>
				<Radio
					id="option1"
					labels={{ label: 'Option 1' }}
					checked={selected === 'option1'}
					onChange={() => setSelected('option1')}
				/>
				<Radio
					id="option2"
					labels={{ label: 'Option 2' }}
					checked={selected === 'option2'}
					onChange={() => setSelected('option2')}
				/>
			</VisualPicker>
		);
	},
};
