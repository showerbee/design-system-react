import { ReactNode } from 'react';
import { TabsVariant } from '../index';

export interface TabPanelProps {
	children: ReactNode;
	id: string;
	selected: boolean;
	tabId: string;
	variant: TabsVariant;
}

declare const TabPanel: React.FC<TabPanelProps>;
export default TabPanel;
