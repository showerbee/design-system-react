import React from 'react';
import IconSettings from '../../icon-settings';
import Files from '../';
import File from '../file';

export default {
	title: 'Components/Files',
	component: Files,
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
		crop: {
			control: { type: 'select' },
			options: ['16-by-9', '4-by-3', '1-by-1'],
		},
	},
};

// Default files grid
export const Default = {
	render: () => (
		<Files>
			<File
				id="file-1"
				title="Document 1"
				labels={{
					title: 'Sales Presentation.pptx',
				}}
			/>
			<File
				id="file-2"
				title="Document 2"
				labels={{
					title: 'Q4 Report.pdf',
				}}
			/>
			<File
				id="file-3"
				title="Document 3"
				labels={{
					title: 'Budget.xlsx',
				}}
			/>
		</Files>
	),
};

// 16 by 9 crop
export const Crop16By9 = {
	render: () => (
		<Files crop="16-by-9">
			<File
				id="file-1"
				labels={{
					title: 'Video.mp4',
				}}
			/>
			<File
				id="file-2"
				labels={{
					title: 'Webinar.mp4',
				}}
			/>
		</Files>
	),
};

// 1 by 1 crop (square)
export const Crop1By1 = {
	render: () => (
		<Files crop="1-by-1">
			<File
				id="file-1"
				labels={{
					title: 'Avatar.png',
				}}
			/>
			<File
				id="file-2"
				labels={{
					title: 'Logo.svg',
				}}
			/>
			<File
				id="file-3"
				labels={{
					title: 'Icon.png',
				}}
			/>
		</Files>
	),
};
