import React from 'react';

export interface BodyProps {
	children?: React.ReactNode;
	className?: string | string[] | Record<string, boolean>;
	id?: string;
}

declare const Body: React.FC<BodyProps>;
export default Body;
