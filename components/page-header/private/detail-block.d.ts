import { ReactNode } from 'react';

export interface DetailBlockProps {
	children?: ReactNode;
	className?: string;
	flavor?: string;
	label?: ReactNode;
	content?: ReactNode;
	truncate?: boolean;
}

declare const DetailBlock: React.FC<DetailBlockProps>;
export default DetailBlock;
