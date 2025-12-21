import { ReactNode, CSSProperties, MouseEvent, KeyboardEvent, FocusEvent, SyntheticEvent } from 'react';

export interface SelectedListBoxOption {
	id?: string;
	label?: ReactNode | string;
	title?: string;
	icon?: ReactNode | { category?: string; name?: string };
	avatar?: ReactNode | { imgSrc?: string; title?: string; variant?: string };
	bare?: boolean;
	error?: boolean;
	[key: string]: unknown;
}

export interface SelectedListBoxLabels {
	removePillTitle?: string;
	selectedListboxLabel?: string;
}

export interface SelectedListBoxProps {
	activeOption?: SelectedListBoxOption;
	activeOptionIndex?: number;
	assistiveText?: {
		removePill?: string;
		selectedListboxLabel?: string;
		[key: string]: unknown;
	};
	className?: string | string[] | Record<string, boolean>;
	containerRole?: string;
	containerAriaOrientation?: string | null;
	listboxRole?: string;
	listboxAriaOrientation?: string | null;
	events: {
		onBlurPill?: () => void;
		onClickPill?: (event: MouseEvent | KeyboardEvent, data: { index: number; option: SelectedListBoxOption }) => void;
		onPillFocus?: (event: FocusEvent, data: { index: number; option: SelectedListBoxOption }) => void;
		onRequestFocus?: (event: SyntheticEvent | unknown, data: { ref: HTMLElement | null }) => void;
		onRequestFocusOnNextPill?: (event: SyntheticEvent | KeyboardEvent, data: { direction: 'next' | 'previous' }) => void;
		onRequestFocusOnPreviousPill?: (event: SyntheticEvent | KeyboardEvent, data: { direction: 'next' | 'previous' }) => void;
		onRequestRemove?: (event: MouseEvent | KeyboardEvent | SyntheticEvent, data: { index?: number; option: SelectedListBoxOption }) => void;
	};
	id: string;
	isBare?: boolean;
	isPillContainer?: boolean;
	labels?: SelectedListBoxLabels;
	listboxHasFocus?: boolean;
	renderAtSelectionLength?: number;
	selectedListboxRef?: (ref: HTMLUListElement | null) => void;
	selection?: SelectedListBoxOption[];
	style?: CSSProperties;
	variant?: string;
}

declare const SelectedListBox: React.FC<SelectedListBoxProps>;
export default SelectedListBox;
