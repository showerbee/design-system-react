/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { type ReactNode } from 'react';

const displayName = 'LookupDefaultSectionDivider';

export interface LookupSectionDividerProps {
	data: { label?: ReactNode } & Record<string, unknown>;
}

const DefaultSectionDivider = (props: LookupSectionDividerProps) => (
	<li className="slds-p-around_x-small slds-lookup__divider" tabIndex={-1}>
		<span className="slds-m-left_x-small">
			<strong>{props.data.label}</strong>
		</span>
	</li>
);

DefaultSectionDivider.displayName = displayName;

export default DefaultSectionDivider;
