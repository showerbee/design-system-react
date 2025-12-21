import React from 'react';
import IconSettings from '../../icon-settings';
import BrandBand from '../';

export default {
	title: 'Components/BrandBand',
	component: BrandBand,
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
		size: {
			control: { type: 'select' },
			options: ['small', 'medium', 'large'],
		},
		image: {
			control: { type: 'select' },
			options: ['default', 'none', 'group', 'user'],
		},
		backgroundSize: {
			control: { type: 'select' },
			options: ['contain', 'cover'],
		},
	},
};

// Default brand band
export const Default = {
	render: () => (
		<BrandBand style={{ height: '300px', position: 'relative' }}>
			<div className="slds-p-around_large slds-text-align_center">
				<h1 className="slds-text-heading_large">Welcome</h1>
				<p>Content inside the brand band</p>
			</div>
		</BrandBand>
	),
};

// Small size
export const Small = {
	render: () => (
		<BrandBand size="small" style={{ height: '200px', position: 'relative' }}>
			<div className="slds-p-around_medium slds-text-align_center">
				<p>Small brand band</p>
			</div>
		</BrandBand>
	),
};

// Large size
export const Large = {
	render: () => (
		<BrandBand size="large" style={{ height: '400px', position: 'relative' }}>
			<div className="slds-p-around_large slds-text-align_center">
				<h1 className="slds-text-heading_large">Large Brand Band</h1>
			</div>
		</BrandBand>
	),
};

// No image
export const NoImage = {
	render: () => (
		<BrandBand image="none" style={{ height: '200px', position: 'relative' }}>
			<div className="slds-p-around_medium slds-text-align_center">
				<p>Brand band without background image</p>
			</div>
		</BrandBand>
	),
};

// User image
export const UserImage = {
	render: () => (
		<BrandBand image="user" style={{ height: '300px', position: 'relative' }}>
			<div className="slds-p-around_large slds-text-align_center">
				<h1 className="slds-text-heading_medium">User Profile</h1>
			</div>
		</BrandBand>
	),
};

// Group image
export const GroupImage = {
	render: () => (
		<BrandBand image="group" style={{ height: '300px', position: 'relative' }}>
			<div className="slds-p-around_large slds-text-align_center">
				<h1 className="slds-text-heading_medium">Group Page</h1>
			</div>
		</BrandBand>
	),
};

// Cover background size
export const CoverBackground = {
	render: () => (
		<BrandBand backgroundSize="cover" style={{ height: '300px', position: 'relative' }}>
			<div className="slds-p-around_large slds-text-align_center">
				<p>Brand band with cover background size</p>
			</div>
		</BrandBand>
	),
};
