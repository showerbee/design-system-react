import { ReactNode, CSSProperties, KeyboardEvent, MouseEvent, Ref } from 'react';

export type DialogAlign =
	| 'top'
	| 'top left'
	| 'top right'
	| 'right'
	| 'right top'
	| 'right bottom'
	| 'bottom'
	| 'bottom left'
	| 'bottom right'
	| 'left'
	| 'left top'
	| 'left bottom';

export type DialogPosition = 'absolute' | 'overflowBoundaryElement' | 'relative';

export type DialogVariant = 'dropdown' | 'popover' | 'tooltip';

export interface DialogContainerProps {
	id?: string;
	'aria-labelledby'?: string;
	'aria-describedby'?: string;
	[key: string]: unknown;
}

export interface DialogProps {
	align?: DialogAlign;
	children: ReactNode;
	className?: string | string[] | Record<string, boolean>;
	closeOnTabKey?: boolean;
	contentsClassName?: string | string[] | Record<string, boolean>;
	context?: unknown;
	containerProps?: DialogContainerProps;
	hasNubbin?: boolean;
	hasStaticAlignment?: boolean;
	offset?: string;
	onCancel?: (event?: MouseEvent | KeyboardEvent, data?: { trigger?: string }) => void;
	onClose?: (event?: MouseEvent | KeyboardEvent, data?: { componentWillUnmount?: boolean }) => void;
	onKeyDown?: (event: KeyboardEvent) => void;
	onMouseEnter?: (event: MouseEvent) => void;
	onMouseLeave?: (event: MouseEvent) => void;
	onOpen?: (event: unknown, data: { portal?: HTMLElement }) => void;
	onRequestTargetElement?: () => HTMLElement | null;
	outsideClickIgnoreClass?: string;
	position?: DialogPosition;
	style?: CSSProperties;
	variant?: DialogVariant;
	ref?: Ref<HTMLElement>;
}

declare const Dialog: React.ForwardRefExoticComponent<DialogProps & React.RefAttributes<HTMLElement>>;
export default Dialog;










