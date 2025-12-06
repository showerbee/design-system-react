import { ProgressStep, ProgressIndicatorAssistiveText, ProgressIndicatorVariant, TooltipPosition, StepEventData } from '../index';

export interface StepProps {
	assistiveText: ProgressIndicatorAssistiveText;
	id: string;
	index: number;
	isSelected: boolean;
	isDisabled: boolean;
	isError: boolean;
	isCompleted: boolean;
	onClick: (event: React.MouseEvent | React.KeyboardEvent, data: StepEventData) => void;
	onFocus: (event: React.FocusEvent, data: StepEventData) => void;
	step: ProgressStep;
	tooltipIsOpen?: boolean;
	tooltipPosition: TooltipPosition;
	variant: ProgressIndicatorVariant;
}

declare const Step: React.FC<StepProps>;
export default Step;
