import IconSettings from '../../icon-settings';
import GlobalNavigationBar from '../';
import GlobalNavigationBarRegion from '../region';

export default {
	title: 'Components/GlobalNavigationBar',
	component: GlobalNavigationBar,
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
		theme: {
			control: { type: 'select' },
			options: ['light', 'dark'],
		},
	},
};

// Default navigation bar
export const Default = {
	render: () => (
		<GlobalNavigationBar>
			<GlobalNavigationBarRegion region="primary">
				<span className="slds-context-bar__label-action slds-context-bar__app-name">
					<span className="slds-truncate" title="Sales">
						Sales
					</span>
				</span>
			</GlobalNavigationBarRegion>
			<GlobalNavigationBarRegion region="secondary">
				<ul className="slds-grid">
					<li className="slds-context-bar__item">
						<a href="#" className="slds-context-bar__label-action" title="Home">
							<span className="slds-truncate">Home</span>
						</a>
					</li>
					<li className="slds-context-bar__item slds-is-active">
						<a href="#" className="slds-context-bar__label-action" title="Accounts">
							<span className="slds-truncate">Accounts</span>
						</a>
					</li>
					<li className="slds-context-bar__item">
						<a href="#" className="slds-context-bar__label-action" title="Contacts">
							<span className="slds-truncate">Contacts</span>
						</a>
					</li>
				</ul>
			</GlobalNavigationBarRegion>
		</GlobalNavigationBar>
	),
};

// Light theme
export const LightTheme = {
	render: () => (
		<GlobalNavigationBar theme="light">
			<GlobalNavigationBarRegion region="primary">
				<span className="slds-context-bar__label-action slds-context-bar__app-name">
					<span className="slds-truncate" title="Service">
						Service
					</span>
				</span>
			</GlobalNavigationBarRegion>
			<GlobalNavigationBarRegion region="secondary">
				<ul className="slds-grid">
					<li className="slds-context-bar__item slds-is-active">
						<a href="#" className="slds-context-bar__label-action" title="Cases">
							<span className="slds-truncate">Cases</span>
						</a>
					</li>
					<li className="slds-context-bar__item">
						<a href="#" className="slds-context-bar__label-action" title="Queue">
							<span className="slds-truncate">Queue</span>
						</a>
					</li>
				</ul>
			</GlobalNavigationBarRegion>
		</GlobalNavigationBar>
	),
};

// Dark theme
export const DarkTheme = {
	render: () => (
		<GlobalNavigationBar theme="dark">
			<GlobalNavigationBarRegion region="primary">
				<span className="slds-context-bar__label-action slds-context-bar__app-name">
					<span className="slds-truncate" title="Marketing">
						Marketing
					</span>
				</span>
			</GlobalNavigationBarRegion>
			<GlobalNavigationBarRegion region="secondary">
				<ul className="slds-grid">
					<li className="slds-context-bar__item">
						<a href="#" className="slds-context-bar__label-action" title="Campaigns">
							<span className="slds-truncate">Campaigns</span>
						</a>
					</li>
					<li className="slds-context-bar__item">
						<a href="#" className="slds-context-bar__label-action" title="Leads">
							<span className="slds-truncate">Leads</span>
						</a>
					</li>
				</ul>
			</GlobalNavigationBarRegion>
		</GlobalNavigationBar>
	),
};

// With cloud theming
export const SalesCloud = {
	render: () => (
		<GlobalNavigationBar cloud="sales">
			<GlobalNavigationBarRegion region="primary">
				<span className="slds-context-bar__label-action slds-context-bar__app-name">
					<span className="slds-truncate" title="Sales Cloud">
						Sales Cloud
					</span>
				</span>
			</GlobalNavigationBarRegion>
		</GlobalNavigationBar>
	),
};
