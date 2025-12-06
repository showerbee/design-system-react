import { ReactNode } from 'react';

export interface DetailRowProps {
	children?: ReactNode;
	className?: string;
}

declare const DetailRow: React.FC<DetailRowProps>;
export default DetailRow;
