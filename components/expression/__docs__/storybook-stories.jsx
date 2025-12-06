import React, { useState } from 'react';
import IconSettings from '../../icon-settings';
import Expression from '../';
import ExpressionCondition from '../condition';

export default {
	title: 'Components/Expression',
	component: Expression,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
	argTypes: {
		triggerType: {
			control: { type: 'select' },
			options: ['all', 'any', 'custom', 'always', 'formula'],
		},
	},
};

// Default expression
export const Default = {
	render: () => {
		const [triggerType, setTriggerType] = useState('all');

		return (
			<Expression
				triggerType={triggerType}
				events={{
					onChangeTrigger: (event, data) => setTriggerType(data.triggerType),
					onAddCondition: () => console.log('Add condition'),
					onAddGroup: () => console.log('Add group'),
				}}
			>
				<ExpressionCondition
					labels={{
						resource: 'Resource',
						operator: 'Operator',
						value: 'Value',
					}}
				/>
			</Expression>
		);
	},
};

// All conditions trigger
export const AllConditions = {
	render: () => (
		<Expression
			triggerType="all"
			labels={{
				title: 'Filter Conditions',
			}}
			events={{
				onChangeTrigger: (event, data) => console.log('Trigger changed:', data.triggerType),
				onAddCondition: () => console.log('Add condition'),
			}}
		>
			<ExpressionCondition />
			<ExpressionCondition />
		</Expression>
	),
};

// Any condition trigger
export const AnyCondition = {
	render: () => (
		<Expression
			triggerType="any"
			labels={{
				title: 'Match Any Condition',
			}}
			events={{
				onChangeTrigger: (event, data) => console.log('Trigger changed:', data.triggerType),
				onAddCondition: () => console.log('Add condition'),
			}}
		>
			<ExpressionCondition />
		</Expression>
	),
};

// Custom logic
export const CustomLogic = {
	render: () => {
		const [customLogicValue, setCustomLogicValue] = useState('1 AND 2 OR 3');

		return (
			<Expression
				triggerType="custom"
				customLogicValue={customLogicValue}
				events={{
					onChangeTrigger: () => {},
					onChangeCustomLogicValue: (e) => setCustomLogicValue(e.target.value),
					onAddCondition: () => console.log('Add condition'),
				}}
			>
				<ExpressionCondition />
				<ExpressionCondition />
				<ExpressionCondition />
			</Expression>
		);
	},
};
