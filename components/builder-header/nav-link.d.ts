import { MouseEvent } from 'react';

export interface BuilderHeaderNavLinkAssistiveText {
	icon?: string;
}

export interface BuilderHeaderNavLinkProps {
	assistiveText?: BuilderHeaderNavLinkAssistiveText;
	iconCategory?: string;
	iconName?: string;
	label?: string;
	onClick?: (event: MouseEvent) => void;
}

declare const BuilderHeaderNavLink: React.FC<BuilderHeaderNavLinkProps>;
export default BuilderHeaderNavLink;
