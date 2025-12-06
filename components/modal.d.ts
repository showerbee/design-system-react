import { ReactNode, CSSProperties } from 'react';

export interface ModalAssistiveText {
	closeButton?: string;
	dialogLabel?: string;
	dialogLabelledBy?: string;
}

export interface ModalProps {
	ariaHideApp?: boolean;
	assistiveText?: ModalAssistiveText;
	children?: ReactNode;
	className?: string | string[] | Record<string, boolean>;
	containerClassName?: string;
	contentClassName?: string;
	contentStyle?: CSSProperties;
	directional?: boolean;
	disableClose?: boolean;
	dismissOnClickOutside?: boolean;
	footer?: ReactNode | ReactNode[];
	footerClassName?: string;
	header?: ReactNode;
	heading?: ReactNode;
	headerClassName?: string;
	id?: string;
	isOpen?: boolean;
	onRequestClose?: () => void;
	parentSelector?: () => HTMLElement;
	portalClassName?: string;
	prompt?: 'success' | 'warning' | 'error' | 'wrench' | 'offline' | 'info';
	size?: 'small' | 'medium' | 'large';
	tagline?: ReactNode;
	title?: ReactNode;
}

declare const Modal: React.FC<ModalProps>;
export default Modal;
