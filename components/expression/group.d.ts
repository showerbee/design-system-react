import { ReactNode, MouseEvent, ChangeEvent, SyntheticEvent } from 'react';

export type ExpressionTriggerType = 'all' | 'any' | 'custom' | 'always' | 'formula';

export interface ExpressionGroupAssistiveText {
	label?: string;
	addCondition?: string;
	addGroup?: string;
}

export interface ExpressionGroupEvents {
	onChangeTrigger?: (event: SyntheticEvent, data: { triggerType: ExpressionTriggerType }) => void;
	onChangeCustomLogicValue?: (event: ChangeEvent<HTMLInputElement>) => void;
	onAddCondition?: (event: MouseEvent) => void;
	onAddGroup?: (event: MouseEvent) => void;
}

export interface ExpressionGroupLabels {
	addCondition?: string;
	addGroup?: string;
	customLogic?: string;
	label?: string;
	takeAction?: string;
	triggerAll?: string;
	triggerAlways?: string;
	triggerAny?: string;
	triggerCustom?: string;
	triggerFormula?: string;
}

export interface ExpressionGroupProps {
	assistiveText?: ExpressionGroupAssistiveText;
	children?: ReactNode;
	className?: string | string[] | Record<string, boolean>;
	customLogicValue?: string;
	events?: ExpressionGroupEvents;
	focusOnMount?: boolean;
	id?: string;
	isRoot?: boolean;
	labels?: ExpressionGroupLabels;
	triggerType?: ExpressionTriggerType;
}

declare const ExpressionGroup: React.FC<ExpressionGroupProps>;
export default ExpressionGroup;
