/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';

export interface TooltipProps {
	/** Tooltip content */
	content?: React.ReactNode;
	/** Children can be a node or a function returning a node */
	children?: React.ReactNode | (() => React.ReactElement);
	/** Alignment of the tooltip */
	align?: 'top' | 'top left' | 'top right' | 'right' | 'right top' | 'right bottom' | 'bottom' | 'bottom left' | 'bottom right' | 'left' | 'left top' | 'left bottom';
	/** Custom class name */
	className?: string;
	/** Dialog class name */
	dialogClassName?: string;
	/** Whether tooltip has close button */
	hasCloseButton?: boolean;
	/** Unique identifier */
	id?: string;
	/** Open state */
	isOpen?: boolean;
	/** Trigger element */
	trigger?: React.ReactNode;
	/** Variant */
	variant?: 'base' | 'learnMore';
	/** Position (deprecated) */
	position?: string;
}

declare const Tooltip: React.FC<TooltipProps>;
export default Tooltip;



