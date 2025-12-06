import { ReactNode } from 'react';
import { ProgressIndicatorAssistiveText, ProgressIndicatorOrientation, ProgressIndicatorVariant } from '../index';

export interface ProgressProps {
	assistiveText: ProgressIndicatorAssistiveText;
	children: ReactNode;
	className?: string | string[] | Record<string, boolean>;
	id: string;
	orientation: ProgressIndicatorOrientation;
	value: string;
	variant: ProgressIndicatorVariant;
}

declare const Progress: React.FC<ProgressProps>;
export default Progress;
