/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useId, useRef, useCallback, type MouseEvent } from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import { LOCATION_MAP } from '../../utilities/constants';

/**
 * Location object for the map
 */
export interface LocationMapLocation {
	/** Unique identifier */
	id: string;
	/** Name of the location */
	name: string;
	/** Address of the location */
	address: string;
}

/**
 * Labels for LocationMap
 */
export interface LocationMapLabels {
	/** Title for the map */
	title?: string;
}

/**
 * Props for the LocationMap component
 */
export interface LocationMapProps {
	/** CSS classes for the map */
	className?: string | string[] | Record<string, boolean>;
	/** CSS classes for the container */
	classNameContainer?: string | string[] | Record<string, boolean>;
	/** Default location to show */
	defaultLocation: LocationMapLocation;
	/** Google Maps API key */
	googleAPIKey: string;
	/** HTML id */
	id?: string;
	/** Text labels */
	labels?: LocationMapLabels;
	/** Array of locations */
	locations: LocationMapLocation[];
	/** Callback when a location is clicked */
	onClickLocation?: (event: MouseEvent<HTMLButtonElement>, location: LocationMapLocation) => void;
	/** Currently selected location */
	selection?: LocationMapLocation;
}

const defaultLabels: LocationMapLabels = {
	title: 'Interactive Map',
};

/**
 * A location map component is used to find and show locations.
 */
const LocationMap = ({
	className,
	classNameContainer,
	defaultLocation,
	googleAPIKey,
	id: propId,
	labels: propLabels,
	locations,
	onClickLocation,
	selection,
}: LocationMapProps): React.ReactElement => {
	const generatedId = useId();
	const id = propId || generatedId;
	const labels = { ...defaultLabels, ...propLabels };
	const mapRef = useRef<HTMLDivElement>(null);

	const handleClick = useCallback(
		(event: MouseEvent<HTMLButtonElement>, index: number) => {
			if (typeof onClickLocation === 'function') {
				onClickLocation(event, locations[index]);
			}
			if (mapRef.current) {
				mapRef.current.focus();
			}
		},
		[onClickLocation, locations]
	);

	const currentAddress = selection?.address || defaultLocation.address;

	return (
		<div
			id={id}
			className={classNames(
				'slds-grid',
				{ 'slds-has-coordinates': locations },
				classNameContainer as string
			)}
		>
			<div className="slds-map_container" style={{ padding: '4px' }}>
				<div
					className={classNames('slds-map', className as string)}
					ref={mapRef}
					tabIndex={0}
					title={labels.title}
				>
					<iframe
						id={`${id}-google-map`}
						src={`https://www.google.com/maps/embed/v1/place?key=${googleAPIKey}&q=${encodeURIComponent(currentAddress)}`}
						title={labels.title}
					/>
				</div>
			</div>
			{locations.length > 1 ? (
				<div className="slds-coordinates">
					<div className="slds-coordinates__header">
						<h2 className="slds-coordinates__title">
							{`${labels.title} (${locations.length})`}
						</h2>
					</div>
					<ul className="slds-coordinates__list">
						{locations.map((location, i) => (
							<li key={location.id} className="slds-coordinates__item">
								<span className="slds-assistive-text" aria-live="polite">
									{`${location.name} is currently selected`}
								</span>
								<button
									type="button"
									onClick={(event) => handleClick(event, i)}
									className="slds-coordinates__item-action slds-button_reset slds-media"
									aria-pressed={selection?.id === location.id}
								>
									<span className="slds-media__figure">
										<Icon category="standard" name="account" />
									</span>
									<span className="slds-media__body">
										<span className="slds-text-link">{location.name}</span>
										<span>{location.address}</span>
									</span>
								</button>
							</li>
						))}
					</ul>
				</div>
			) : null}
		</div>
	);
};

LocationMap.displayName = LOCATION_MAP;

export default LocationMap;










