import { ReactNode, CSSProperties, MouseEvent, KeyboardEvent, FocusEvent } from 'react';
import { PillOption, PillContainerLabels } from '../index';

export interface SelectedListBoxProps {
	activeOption?: PillOption;
	activeOptionIndex: number;
	assistiveText?: {
		removePill?: string;
		selectedListboxLabel?: string;
	};
	className?: string | string[] | Record<string, boolean>;
	events: {
		onBlurPill: () => void;
		onClickPill: (event: MouseEvent | KeyboardEvent, data: { index: number; option: PillOption }) => void;
		onPillFocus: (event: FocusEvent, data: { index: number; option: PillOption }) => void;
		onRequestFocus: (event: unknown, data: { ref: HTMLElement | null }) => void;
		onRequestFocusOnNextPill: (event: KeyboardEvent, data: { direction: 'next' | 'previous' }) => void;
		onRequestFocusOnPreviousPill: (event: KeyboardEvent, data: { direction: 'next' | 'previous' }) => void;
		onRequestRemove: (event: MouseEvent | KeyboardEvent, data: { index: number; option: PillOption }) => void;
	};
	id: string;
	isBare?: boolean;
	isPillContainer?: boolean;
	labels?: PillContainerLabels;
	listboxHasFocus: boolean;
	renderAtSelectionLength: number;
	selection: PillOption[];
	style?: CSSProperties;
}

declare const SelectedListBox: React.FC<SelectedListBoxProps>;
export default SelectedListBox;
