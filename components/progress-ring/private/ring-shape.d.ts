import { ReactNode } from 'react';

export interface ProgressRingShapeProps {
	id?: string;
	className?: string;
	size?: 'medium' | 'large';
	fillPercentDecimal: number;
	flowDirection?: 'drain' | 'fill';
	children?: ReactNode;
}

declare const ProgressRingShape: React.FC<ProgressRingShapeProps>;
export default ProgressRingShape;


