/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Global Header Search Component

// ## Dependencies

// ### React
import { type ReactNode } from 'react';

// ## Constants
import { GLOBAL_HEADER_SEARCH } from '../../utilities/constants';

export interface GlobalHeaderSearchProps {
	/**
	 * A required `Combobox` component. The props from this combobox will be merged and override any default props.
	 */
	combobox: ReactNode;
}

/**
 * The GlobalHeaderSearch component is used for application wide search. The form element is implemented as a `Combobox`.
 */
const GlobalHeaderSearch = (props: GlobalHeaderSearchProps) => (
	<div className="slds-global-header__item slds-global-header__item_search">
		{props.combobox}
	</div>
);

GlobalHeaderSearch.displayName = GLOBAL_HEADER_SEARCH;

export default GlobalHeaderSearch;
