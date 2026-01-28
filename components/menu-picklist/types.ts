/**
 * Type definitions for MenuPicklist component (DEPRECATED)
 */

import { ReactNode } from 'react';

export interface MenuPicklistOption {
	label: ReactNode;
	value: string | number;
	type?: 'header' | 'divider' | string;
	disabled?: boolean;
}

export interface MenuPicklistLabels {
	multipleOptionsSelected?: string;
}

export interface MenuPicklistSelectData {
	option: MenuPicklistOption;
	optionIndex: number;
}

export type MenuPicklistSelectHandler = (
	option: MenuPicklistOption,
	data: MenuPicklistSelectData
) => void;

export type MenuPicklistRemoveHandler = (
	option: MenuPicklistOption,
	data: MenuPicklistSelectData
) => void;



