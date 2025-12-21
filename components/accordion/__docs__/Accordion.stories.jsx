import React from 'react';
import IconSettings from '../../icon-settings';
import Accordion from '../';
import AccordionPanel from '../panel';

export default {
	title: 'Components/Accordion',
	component: Accordion,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium" style={{ maxWidth: '600px' }}>
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
};

// Default accordion
export const Default = {
	render: () => (
		<Accordion>
			<AccordionPanel
				expanded
				summary="Accordion Panel 1"
				onTogglePanel={() => {}}
			>
				<p>Panel 1 content goes here.</p>
			</AccordionPanel>
			<AccordionPanel
				summary="Accordion Panel 2"
				onTogglePanel={() => {}}
			>
				<p>Panel 2 content goes here.</p>
			</AccordionPanel>
			<AccordionPanel
				summary="Accordion Panel 3"
				onTogglePanel={() => {}}
			>
				<p>Panel 3 content goes here.</p>
			</AccordionPanel>
		</Accordion>
	),
};

// Multiple panels expanded
export const MultipleExpanded = {
	render: () => (
		<Accordion>
			<AccordionPanel
				expanded
				summary="First Panel"
				onTogglePanel={() => {}}
			>
				<p>First panel is expanded by default.</p>
			</AccordionPanel>
			<AccordionPanel
				expanded
				summary="Second Panel"
				onTogglePanel={() => {}}
			>
				<p>Second panel is also expanded.</p>
			</AccordionPanel>
			<AccordionPanel
				summary="Third Panel"
				onTogglePanel={() => {}}
			>
				<p>Third panel is collapsed.</p>
			</AccordionPanel>
		</Accordion>
	),
};

// With rich content
export const WithRichContent = {
	render: () => (
		<Accordion>
			<AccordionPanel
				expanded
				summary="Account Details"
				onTogglePanel={() => {}}
			>
				<dl className="slds-list_horizontal slds-wrap">
					<dt className="slds-item_label slds-text-color_weak slds-truncate">Name:</dt>
					<dd className="slds-item_detail slds-truncate">Acme Corporation</dd>
					<dt className="slds-item_label slds-text-color_weak slds-truncate">Industry:</dt>
					<dd className="slds-item_detail slds-truncate">Technology</dd>
				</dl>
			</AccordionPanel>
			<AccordionPanel
				summary="Contact Information"
				onTogglePanel={() => {}}
			>
				<dl className="slds-list_horizontal slds-wrap">
					<dt className="slds-item_label slds-text-color_weak slds-truncate">Email:</dt>
					<dd className="slds-item_detail slds-truncate">contact@acme.com</dd>
					<dt className="slds-item_label slds-text-color_weak slds-truncate">Phone:</dt>
					<dd className="slds-item_detail slds-truncate">(555) 123-4567</dd>
				</dl>
			</AccordionPanel>
		</Accordion>
	),
};
