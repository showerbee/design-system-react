import React from 'react';

export interface EmptyProps {
	heading?: React.ReactNode;
	id?: string;
}

declare const Empty: React.FC<EmptyProps>;
export default Empty;
