import React, { useState } from 'react';
import IconSettings from '../../icon-settings';
import AppLauncher from '../';
import AppLauncherExpandableSection from '../expandable-section';
import AppLauncherTile from '../tile';
import AppLauncherLink from '../link';
import Input from '../../input';

export default {
	title: 'Components/AppLauncher',
	component: AppLauncher,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium" style={{ height: '600px' }}>
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
};

// Default app launcher
export const Default = {
	render: () => {
		const [isOpen, setIsOpen] = useState(false);

		return (
			<AppLauncher
				isOpen={isOpen}
				triggerOnClick={() => setIsOpen(true)}
				onClose={() => setIsOpen(false)}
				title="App Launcher"
			>
				<AppLauncherExpandableSection title="All Apps">
					<AppLauncherTile
						title="Sales"
						iconText="Sales"
						description="Manage your sales process"
					/>
					<AppLauncherTile
						title="Service"
						iconText="Serv"
						description="Customer service tools"
					/>
					<AppLauncherTile
						title="Marketing"
						iconText="Mktg"
						description="Marketing automation"
					/>
				</AppLauncherExpandableSection>
			</AppLauncher>
		);
	},
};

// With trigger name
export const WithTriggerName = {
	render: () => {
		const [isOpen, setIsOpen] = useState(false);

		return (
			<AppLauncher
				isOpen={isOpen}
				triggerOnClick={() => setIsOpen(true)}
				onClose={() => setIsOpen(false)}
				triggerName="Sales Console"
				title="App Launcher"
			>
				<AppLauncherExpandableSection title="All Apps">
					<AppLauncherTile
						title="Sales Console"
						iconText="SC"
						description="Your primary sales app"
					/>
				</AppLauncherExpandableSection>
			</AppLauncher>
		);
	},
};

// With search
export const WithSearch = {
	render: () => {
		const [isOpen, setIsOpen] = useState(false);
		const [searchTerm, setSearchTerm] = useState('');

		return (
			<AppLauncher
				isOpen={isOpen}
				triggerOnClick={() => setIsOpen(true)}
				onClose={() => setIsOpen(false)}
				title="App Launcher"
				search={
					<Input
						placeholder="Search apps..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				}
			>
				<AppLauncherExpandableSection title="All Apps">
					<AppLauncherTile
						title="Sales"
						iconText="Sales"
						description="Manage your sales process"
					/>
					<AppLauncherTile
						title="Service"
						iconText="Serv"
						description="Customer service tools"
					/>
				</AppLauncherExpandableSection>
			</AppLauncher>
		);
	},
};

// With links
export const WithLinks = {
	render: () => {
		const [isOpen, setIsOpen] = useState(false);

		return (
			<AppLauncher
				isOpen={isOpen}
				triggerOnClick={() => setIsOpen(true)}
				onClose={() => setIsOpen(false)}
				title="App Launcher"
			>
				<AppLauncherExpandableSection title="All Items">
					<AppLauncherLink>Accounts</AppLauncherLink>
					<AppLauncherLink>Contacts</AppLauncherLink>
					<AppLauncherLink>Opportunities</AppLauncherLink>
					<AppLauncherLink>Leads</AppLauncherLink>
				</AppLauncherExpandableSection>
			</AppLauncher>
		);
	},
};
