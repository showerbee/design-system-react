/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { useContext, useEffect, useRef, useState, Children } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { PortalSettingsContext } from '../../portal-settings';

/*
 * This component mounts its children within a disconnected render tree (portal).
 *
 * Reimplemented on top of React 18/19's `ReactDOM.createPortal`. The previous
 * implementation relied on `ReactDOM.unstable_renderSubtreeIntoContainer` and
 * `ReactDOM.unmountComponentAtNode`, both of which were removed in React 19.
 */

const documentDefined = typeof document !== 'undefined';

const Portal = (props) => {
	const {
		renderTag = 'span',
		renderTo = null,
		id,
		className,
		style,
		onMount,
		onOpen,
		onUpdate,
		children,
	} = props;

	const context = useContext(PortalSettingsContext);
	const portalNodeRef = useRef(null);
	const portalNodeInstanceRef = useRef(null);
	const [isMounted, setIsMounted] = useState(false);

	// Resolve where the portal's DOM node should be appended. Precedence matches
	// the legacy implementation: explicit `renderTo` selector/node > context
	// `renderTo` selector > `document.body`.
	const getPortalParentNode = () => {
		if (typeof renderTo === 'string') {
			return document.querySelector(renderTo);
		}
		if (
			context &&
			typeof context.renderTo === 'string' &&
			document.querySelectorAll(context.renderTo)[0]
		) {
			return document.querySelectorAll(context.renderTo)[0];
		}
		return renderTo || (documentDefined && document.body);
	};

	// Create the portal container node, append it to the parent, and tear it
	// down on unmount. Runs once (mount/unmount lifecycle).
	useEffect(() => {
		if (!documentDefined) {
			return undefined;
		}

		const node = document.createElement(renderTag);
		node.setAttribute('style', 'display: block; height: 0px; width: 0px;');
		node.className = 'design-system-react-portal';

		const parent = getPortalParentNode();
		if (parent) {
			parent.appendChild(node);
		}

		portalNodeRef.current = node;
		portalNodeInstanceRef.current = onMount
			? onMount(undefined, { portal: node })
			: node;

		setIsMounted(true);

		if (onOpen) {
			onOpen(undefined, { portal: children });
		}

		return () => {
			if (node.parentNode) {
				node.parentNode.removeChild(node);
			}
			portalNodeRef.current = null;
			portalNodeInstanceRef.current = null;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Keep the container node's id/className/style in sync with props, and fire
	// `onUpdate` after each render (matches the legacy `updatePortal` behavior).
	useEffect(() => {
		const node = portalNodeRef.current;
		if (!node) {
			return;
		}

		if (id) {
			node.id = id;
		}
		if (className) {
			node.className = className;
		}
		if (style) {
			Object.keys(style).forEach((key) => {
				node.style[key] = style[key];
			});
		}
		if (onUpdate) {
			portalNodeInstanceRef.current = onUpdate(portalNodeInstanceRef.current);
		}
	});

	const child = children ? Children.only(children) : null;

	if (!isMounted || !portalNodeRef.current || !child) {
		return null;
	}

	return createPortal(child, portalNodeRef.current);
};

Portal.displayName = 'Portal';

Portal.propTypes = {
	/*
	 * What tag to use for the portal, defaults to `span`.
	 */
	renderTag: PropTypes.string,
	/*
	 * What node the portal is rendered to, defaults to `document.body`.
	 */
	renderTo: PropTypes.any,
	/*
	 * React id prop.
	 */
	id: PropTypes.string,
	/*
	 * Accepts a _single_ element or component.
	 */
	children: PropTypes.node,
	/*
	 * ClassName added to the portal node.
	 */
	className: PropTypes.any,
	/*
	 * An object of styles that are applied to the portal.
	 */
	style: PropTypes.object,
	/*
	 * Triggers when Portal render tree mounts. Pass in an undefined event and `{ portal: [node] }`
	 */
	onMount: PropTypes.func,
	/*
	 * Triggers when the portal is mounted.
	 */
	onOpen: PropTypes.func,
	/*
	 * Triggers when Portal re-renders its tree.
	 */
	onUpdate: PropTypes.func,
};

export default Portal;
