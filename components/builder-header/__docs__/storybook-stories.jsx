import React from 'react';
import IconSettings from '../../icon-settings';
import BuilderHeader from '../';

export default {
	title: 'Components/BuilderHeader',
	component: BuilderHeader,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
};

// Default builder header
export const Default = {
	render: () => (
		<BuilderHeader
			events={{
				onClickBack: () => console.log('Back clicked'),
				onClickHelp: () => console.log('Help clicked'),
			}}
		/>
	),
};

// Custom labels
export const CustomLabels = {
	render: () => (
		<BuilderHeader
			labels={{
				title: 'My App Builder',
				pageType: 'Home Page',
				back: 'Go Back',
				help: 'Get Help',
			}}
			events={{
				onClickBack: () => console.log('Back clicked'),
				onClickHelp: () => console.log('Help clicked'),
			}}
		/>
	),
};

// Custom icon
export const CustomIcon = {
	render: () => (
		<BuilderHeader
			iconCategory="standard"
			iconName="account"
			labels={{
				title: 'Account Builder',
				pageType: 'Account Details',
			}}
			events={{
				onClickBack: () => console.log('Back clicked'),
				onClickHelp: () => console.log('Help clicked'),
			}}
		/>
	),
};
