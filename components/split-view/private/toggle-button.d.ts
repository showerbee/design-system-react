import { MouseEvent } from 'react';
import { SplitViewAssistiveText } from '../index';

export const TOGGLE_BUTTON_WIDTH: string;

export interface ToggleButtonProps {
	assistiveText?: SplitViewAssistiveText;
	ariaControls: string;
	isOpen: boolean;
	events: {
		onClick: (event: MouseEvent<HTMLButtonElement>) => void;
	};
}

declare const ToggleButton: React.FC<ToggleButtonProps>;
export default ToggleButton;












