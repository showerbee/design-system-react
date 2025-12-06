import { ReactNode } from 'react';

export interface InfoProps {
	children?: ReactNode;
	className?: string;
}

declare const Info: React.FC<InfoProps>;
export default Info;
