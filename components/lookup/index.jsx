/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### onClickOutside
// Listen for clicks that occur somewhere in the document, outside of the
// element itself. Replaces the deprecated `react-onclickoutside` HOC (which
// relied on `findDOMNode` and caps its React peer at 18) with the modern,
// React-19-compatible `useClickOutside` hook.
import React, { useRef } from 'react';
import { useClickOutside } from '../../utilities/hooks';
import DefaultFooter from './menu/default-footer';
import DefaultHeader from './menu/default-header';
import DefaultSectionDivider from './menu/default-section-divider';
import Lookup from './lookup';

const LookupWithClickOutside = React.forwardRef((props, forwardedRef) => {
	const wrapperRef = useRef(null);
	const instanceRef = useRef(null);

	useClickOutside(wrapperRef, () => {
		// Preserve the original HOC behavior: delegate to the wrapped
		// component's `handleClickOutside` method (which closes the menu).
		if (instanceRef.current && instanceRef.current.handleClickOutside) {
			instanceRef.current.handleClickOutside();
		}
	});

	return (
		<div ref={wrapperRef}>
			<Lookup
				{...props}
				ref={(node) => {
					instanceRef.current = node;
					if (typeof forwardedRef === 'function') {
						forwardedRef(node);
					} else if (forwardedRef) {
						forwardedRef.current = node;
					}
				}}
			/>
		</div>
	);
});

LookupWithClickOutside.displayName = 'Lookup';

export default LookupWithClickOutside;

export { DefaultHeader };
export { DefaultSectionDivider };
export { DefaultFooter };
