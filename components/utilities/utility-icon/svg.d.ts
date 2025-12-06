import { CSSProperties, ReactElement } from 'react';

export interface SvgProps {
	'aria-hidden'?: boolean | 'true' | 'false';
	className?: string;
	data?: object;
	name?: string;
	style?: CSSProperties;
}

declare const Svg: React.FC<SvgProps>;
export default Svg;

