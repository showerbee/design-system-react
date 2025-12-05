import React from 'react';

export interface HeaderProps {
	filter?: React.ReactNode;
	filterId?: string;
	header?: React.ReactNode;
	headerActions?: React.ReactNode;
	headerActionsId?: string;
	heading?: React.ReactNode;
	headingId?: string;
	icon?: React.ReactNode;
}

declare const Header: React.FC<HeaderProps>;
export default Header;
