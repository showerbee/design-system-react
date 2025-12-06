import { ReactNode, ReactElement } from 'react';
import { PageHeaderVariant, PageHeaderDetail } from '../index';

export interface RecordHomeProps {
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

declare const RecordHome: React.FC<RecordHomeProps>;
export default RecordHome;
