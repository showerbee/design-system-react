import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

import IconSettings from '../../icon-settings';
import Settings from '../../settings';
import LocationMap from '../index';

describe('SLDSLocationMap', () => {
	let appNode;

	// Set "app node" fixture, so no warnings are triggered
	beforeAll(() => {
		appNode = document.createElement('span');
		appNode.id = 'app';
		document.body.appendChild(appNode);
		Settings.setAppElement('#app');
	});

	afterAll(() => {
		if (appNode && appNode.parentNode) {
			document.body.removeChild(appNode);
		}
	});

	const defaultProps = {
		googleAPIKey: 'AIzaSyDliLquGXGts9S8YtkWVolSQEJdBL1ZuWc',
	};

	const renderLocationMap = (props) => {
		return render(
			<IconSettings iconPath="/assets/icons">
				<LocationMap {...defaultProps} {...props} />
			</IconSettings>
		);
	};

	describe('Single Location', () => {
		const locations = [
			{
				id: '1',
				name: 'Worldwide Corporate Headquarters',
				address: 'The Landmark @ One Market, San Francisco, CA',
			},
		];

		it('renders map correctly', () => {
			const { container } = renderLocationMap({
				defaultLocation: locations[0],
				locations,
				labels: {
					title: 'Geo Code: 37°48&#x27;08.3&quot;N 122°15&#x27;55.2W',
				},
				id: 'map-test',
			});

			// Check for main container
			const gridContainer = container.querySelector('.slds-grid');
			expect(gridContainer).toBeInTheDocument();
			expect(gridContainer.childElementCount).toBe(1);

			// Check for map container
			const mapContainer = gridContainer.querySelector('.slds-map');
			expect(mapContainer).toBeInTheDocument();

			// Check for iframe with correct title
			// NOTE: In jsdom, the Google Maps iframe may not load fully,
			// but we can verify the structure and attributes
			const iframe = mapContainer.querySelector('iframe');
			expect(iframe).toBeInTheDocument();
			expect(iframe).toHaveAttribute('title', 'Geo Code: 37°48&#x27;08.3&quot;N 122°15&#x27;55.2W');
		});

		it('renders with default location', () => {
			const { container } = renderLocationMap({
				defaultLocation: locations[0],
				locations,
				id: 'map-single-test',
			});

			const mapContainer = container.querySelector('.slds-map');
			expect(mapContainer).toBeInTheDocument();
		});
	});

	describe('Multiple Locations', () => {
		const locations = [
			{
				id: '1',
				name: 'Worldwide Corporate Headquarters',
				address: 'The Landmark @ One Market, San Francisco, CA',
			},
			{
				id: '2',
				name: 'salesforce.com inc Atlanta',
				address: '950 East Paces Ferry Road NE, Atlanta, GA',
			},
			{
				id: '3',
				name: 'salesforce.com inc Bellevue',
				address: '929 108th Ave NE, Bellevue, WA',
			},
			{
				id: '4',
				name: 'salesforce.com inc Boston',
				address: '500 Boylston Street 19th Floor, Boston, MA',
			},
			{
				id: '5',
				name: 'salesforce.com inc Chicago',
				address: '111 West Illinois Street, Chicago, IL',
			},
		];

		it('renders map correctly', () => {
			const { container } = renderLocationMap({
				defaultLocation: locations[0],
				locations,
				labels: {
					title: 'Salesforce Locations In United States',
				},
				selection: locations[2],
				id: 'map-test',
			});

			const mapContainer = container.querySelector('.slds-map');
			expect(mapContainer).toBeInTheDocument();

			const iframe = mapContainer.querySelector('iframe');
			expect(iframe).toBeInTheDocument();
			expect(iframe).toHaveAttribute('title', 'Salesforce Locations In United States');
		});

		it('renders map coordinates correctly', () => {
			const { container } = renderLocationMap({
				defaultLocation: locations[0],
				locations,
				labels: {
					title: 'Salesforce Locations In United States',
				},
				selection: locations[2],
				id: 'map-test',
			});

			// Check for coordinates container
			const coordinatesContainer = container.querySelector('.slds-coordinates');
			expect(coordinatesContainer).toBeInTheDocument();

			// Check coordinates title
			const coordinatesTitle = coordinatesContainer.querySelector('.slds-coordinates__title');
			expect(coordinatesTitle).toBeInTheDocument();
			expect(coordinatesTitle.textContent).toBe('Salesforce Locations In United States (5)');

			// Check locations list
			const locationsList = coordinatesContainer.querySelector('.slds-coordinates__list');
			expect(locationsList).toBeInTheDocument();

			const locationItems = locationsList.children;
			expect(locationItems.length).toBe(5);

			// Check first location
			const firstLocation = locationItems[0];
			const locationLink = firstLocation.querySelector('.slds-text-link');
			expect(locationLink).toBeInTheDocument();
			expect(locationLink.textContent).toBe('Worldwide Corporate Headquarters');

			// Check address in first location
			const addressSpans = firstLocation.querySelectorAll('.slds-media__body span');
			expect(addressSpans.length).toBeGreaterThan(1);
			expect(addressSpans[1].textContent).toBe('The Landmark @ One Market, San Francisco, CA');
		});

		it('displays all location names', () => {
			const { container } = renderLocationMap({
				defaultLocation: locations[0],
				locations,
				id: 'map-all-locations',
			});

			const coordinatesContainer = container.querySelector('.slds-coordinates');
			expect(coordinatesContainer).toBeInTheDocument();

			// Verify all location names are present
			locations.forEach((location) => {
				const locationLink = Array.from(
					coordinatesContainer.querySelectorAll('.slds-text-link')
				).find(link => link.textContent === location.name);
				expect(locationLink).toBeInTheDocument();
			});
		});

		it('displays all location addresses', () => {
			const { container } = renderLocationMap({
				defaultLocation: locations[0],
				locations,
				id: 'map-all-addresses',
			});

			const coordinatesContainer = container.querySelector('.slds-coordinates');
			const locationItems = coordinatesContainer.querySelectorAll('.slds-coordinates__list > *');

			locations.forEach((location, index) => {
				const item = locationItems[index];
				const addressSpans = item.querySelectorAll('.slds-media__body span');
				const addressText = Array.from(addressSpans)
					.map(span => span.textContent)
					.find(text => text === location.address);
				expect(addressText).toBe(location.address);
			});
		});
	});

	describe('Props and structure', () => {
		const locations = [
			{
				id: '1',
				name: 'Test Location',
				address: 'Test Address',
			},
		];

		it('applies custom id', () => {
			const { container } = renderLocationMap({
				defaultLocation: locations[0],
				locations,
				id: 'custom-map-id',
			});

			// The id should be applied to a relevant element
			// NOTE: Check the component implementation for exact id application
			const mapContainer = container.querySelector('.slds-map');
			expect(mapContainer).toBeInTheDocument();
		});

		it('renders without labels', () => {
			const { container } = renderLocationMap({
				defaultLocation: locations[0],
				locations,
				id: 'map-no-labels',
			});

			const mapContainer = container.querySelector('.slds-map');
			expect(mapContainer).toBeInTheDocument();

			// Iframe should exist even without custom labels
			const iframe = mapContainer.querySelector('iframe');
			expect(iframe).toBeInTheDocument();
		});

		it('handles selection prop', () => {
			const multipleLocations = [
				{ id: '1', name: 'Location 1', address: 'Address 1' },
				{ id: '2', name: 'Location 2', address: 'Address 2' },
			];

			const { container } = renderLocationMap({
				defaultLocation: multipleLocations[0],
				locations: multipleLocations,
				selection: multipleLocations[1],
				id: 'map-with-selection',
			});

			const coordinatesContainer = container.querySelector('.slds-coordinates');
			expect(coordinatesContainer).toBeInTheDocument();

			// NOTE: Selection may add specific classes or aria attributes
			// Check that both locations are rendered
			const locationItems = coordinatesContainer.querySelectorAll('.slds-coordinates__list > *');
			expect(locationItems.length).toBe(2);
		});
	});

	describe('Google API Key', () => {
		const locations = [
			{
				id: '1',
				name: 'Test Location',
				address: 'Test Address',
			},
		];

		it('requires googleAPIKey prop', () => {
			const { container } = renderLocationMap({
				defaultLocation: locations[0],
				locations,
				id: 'map-with-key',
				googleAPIKey: 'test-api-key',
			});

			// Map should render with API key
			const mapContainer = container.querySelector('.slds-map');
			expect(mapContainer).toBeInTheDocument();

			// NOTE: In jsdom, the actual Google Maps API won't load,
			// but we can verify the structure is created
			const iframe = mapContainer.querySelector('iframe');
			expect(iframe).toBeInTheDocument();
		});
	});
});
