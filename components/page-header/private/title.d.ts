import { ReactNode } from 'react';

export interface TitleProps {
	children?: ReactNode;
	className?: string;
	title?: ReactNode;
	align?: 'left' | 'center' | 'right';
}

declare const Title: React.FC<TitleProps>;
export default Title;
