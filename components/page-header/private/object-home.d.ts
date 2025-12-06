import { ReactNode, ReactElement } from 'react';
import { PageHeaderVariant, PageHeaderDetail } from '../index';

export interface ObjectHomeProps {
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

declare const ObjectHome: React.FC<ObjectHomeProps>;
export default ObjectHome;
