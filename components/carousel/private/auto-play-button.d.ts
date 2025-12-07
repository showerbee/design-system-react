import { MouseEvent } from 'react';

export interface AutoplayButtonProps {
	/** Assistive text */
	assistiveText?: string;
	/** Whether autoplay is on */
	isAutoplayOn?: boolean;
	/** Click handler */
	onClick?: (event: MouseEvent) => void;
}

declare const AutoplayButton: React.FC<AutoplayButtonProps>;
export default AutoplayButton;
