import { ReactNode } from 'react';
import { TabsVariant } from '../index';

export interface TabsListProps {
	children: ReactNode;
	id: string;
	variant: TabsVariant;
}

declare const TabsList: React.FC<TabsListProps>;
export default TabsList;
