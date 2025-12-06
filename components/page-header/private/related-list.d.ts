import { ReactNode, ReactElement } from 'react';
import { PageHeaderVariant, PageHeaderDetail } from '../index';

export interface RelatedListProps {
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

declare const RelatedList: React.FC<RelatedListProps>;
export default RelatedList;
