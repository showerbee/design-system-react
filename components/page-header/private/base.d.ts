import { ReactNode, ReactElement } from 'react';
import { PageHeaderVariant, PageHeaderDetail } from '../index';

export interface BaseProps {
	details?: PageHeaderDetail[];
	icon?: ReactElement;
	info?: ReactNode;
	label?: ReactNode;
	nameSwitcherDropdown?: ReactNode;
	onRenderActions?: () => ReactNode;
	onRenderControls?: () => ReactNode;
	title?: ReactNode;
	trail?: ReactElement[];
	variant?: PageHeaderVariant;
}

declare const Base: React.FC<BaseProps>;
export default Base;
