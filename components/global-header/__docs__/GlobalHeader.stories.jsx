import IconSettings from '../../icon-settings';
import GlobalHeader from '../';
// Note: GlobalHeaderSearch and GlobalHeaderProfile use react-onclickoutside
// which is not compatible with React 19 (uses deprecated findDOMNode).
// These stories use simplified examples until that dependency is updated.

export default {
	title: 'Components/GlobalHeader',
	component: GlobalHeader,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<IconSettings iconPath="./assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
};

// Simple header (no children)
export const Default = {
	render: () => (
		<GlobalHeader 
			logoSrc="./assets/images/logo-noname.svg"
			onSkipToContent={() => console.log('Skip to content')}
			onSkipToNav={() => console.log('Skip to nav')}
		/>
	),
};

// Header with navigation
export const WithNavigation = {
	render: () => (
		<GlobalHeader
			logoSrc="./assets/images/logo-noname.svg"
			navigation={
				<nav className="slds-context-bar" role="navigation">
					<div className="slds-context-bar__primary">
						<span className="slds-context-bar__label-action slds-context-bar__app-name">
							<span className="slds-truncate" title="App Name">
								Sales
							</span>
						</span>
					</div>
				</nav>
			}
		/>
	),
};

// Header with custom actions (without using dropdown components)
export const WithActions = {
	render: () => (
		<GlobalHeader
			logoSrc="./assets/images/logo-noname.svg"
			navigation={
				<nav className="slds-context-bar" role="navigation">
					<div className="slds-context-bar__primary">
						<span className="slds-context-bar__label-action slds-context-bar__app-name">
							<span className="slds-truncate" title="Sales Console">
								Sales Console
							</span>
						</span>
					</div>
				</nav>
			}
		>
			{/* Custom action items can be added here */}
		</GlobalHeader>
	),
};
