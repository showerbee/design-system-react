import IconSettings from '../../icon-settings';
import Notification from '../../notification';
import Alerts from '../__examples__/alerts';
import Toasts from '../__examples__/toasts';
import WithinModal from '../__examples__/within-modal';

export default {
	title: 'Components/Notification',
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<IconSettings iconPath="./assets/icons">{Story()}</IconSettings>
			</div>
		),
	],
};

export const BaseAlert = {
	name: 'Base: Alert',
	render: () => (
		<Notification
			content={[
				'Your new contact ',
				<a href="#" key="0123">
					Sara Smith
				</a>,
				' was successfully created.',
			]}
			iconName="notification"
			isOpen
			onDismiss={() => {
				console.log('dismiss alert');
			}}
			texture
			theme="success"
			variant="alert"
			silenceDeprecationWarning
		/>
	),
};

export const BaseToast = {
	name: 'Base: Toast',
	render: () => (
		<Notification
			content="toast notification"
			inverse
			isOpen
			name="account"
			onDismiss={() => {
				console.log('dismiss toast');
			}}
			theme="error"
			variant="toast"
			silenceDeprecationWarning
		/>
	),
};

export const DocsSiteAlerts = {
	name: 'Docs site Alerts',
	render: () => <Alerts />,
};

export const DocsSiteToasts = {
	name: 'Docs site Toasts',
	render: () => <Toasts />,
};

export const DocsSiteWithinModal = {
	name: 'Docs site WithinModal',
	render: () => <WithinModal />,
};
