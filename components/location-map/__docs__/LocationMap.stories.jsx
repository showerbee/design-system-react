import { useState } from 'react';
import IconSettings from '../../icon-settings';
import LocationMap from '../';

export default {
	title: 'Components/LocationMap',
	component: LocationMap,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium" style={{ height: '400px' }}>
				<IconSettings iconPath="./assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
};

const sampleLocations = [
	{
		id: '1',
		name: 'Salesforce Tower',
		address: '415 Mission St, San Francisco, CA 94105',
	},
	{
		id: '2',
		name: 'Salesforce West',
		address: '50 Fremont St, San Francisco, CA 94105',
	},
	{
		id: '3',
		name: 'Salesforce East',
		address: '350 Mission St, San Francisco, CA 94105',
	},
];

// Note: Replace with your own Google Maps API key for the map to work
const DEMO_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

// Default map (without API key, map won't display)
export const Default = {
	render: () => (
		<LocationMap
			defaultLocation={sampleLocations[0]}
			locations={sampleLocations}
			googleAPIKey={DEMO_API_KEY}
			labels={{
				title: 'Salesforce Offices',
			}}
			onClickLocation={(event, location) => console.log('Selected:', location)}
		/>
	),
};

// Single location
export const SingleLocation = {
	render: () => (
		<LocationMap
			defaultLocation={sampleLocations[0]}
			locations={[sampleLocations[0]]}
			googleAPIKey={DEMO_API_KEY}
			labels={{
				title: 'Salesforce Tower',
			}}
		/>
	),
};

// Multiple locations with selection
export const WithSelection = {
	render: () => {
		const [selection, setSelection] = useState(sampleLocations[0]);

		return (
			<LocationMap
				defaultLocation={sampleLocations[0]}
				locations={sampleLocations}
				googleAPIKey={DEMO_API_KEY}
				selection={selection}
				onClickLocation={(event, location) => setSelection(location)}
				labels={{
					title: 'Select a Location',
				}}
			/>
		);
	},
};
