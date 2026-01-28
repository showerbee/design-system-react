import { CSSProperties } from 'react';

export interface SwatchProps {
	label?: string;
	style?: CSSProperties;
	color?: string;
}

declare const Swatch: React.FC<SwatchProps>;
export default Swatch;















