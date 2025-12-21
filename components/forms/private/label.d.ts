import { ReactNode } from 'react';

export interface LabelProps {
	/** Assistive text for accessibility */
	assistiveText?: {
		label?: string;
		[key: string]: unknown;
	};
	/** Id of associated input */
	htmlFor?: string;
	/** Label content */
	label?: ReactNode | string;
	/** Required field styling */
	required?: boolean;
	/** Label variant */
	variant?: 'base' | 'static';
}

declare const Label: React.FC<LabelProps>;
export default Label;
