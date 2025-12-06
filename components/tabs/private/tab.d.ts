import { ReactNode, Ref } from 'react';
import { TabsVariant } from '../index';

export interface TabProps {
	assistiveText?: string;
	children: ReactNode;
	disabled?: boolean;
	focus?: boolean;
	hasError?: boolean;
	id: string;
	panelId: string;
	selected: boolean;
	variant: TabsVariant;
	ref?: Ref<HTMLElement>;
}

declare const Tab: React.ForwardRefExoticComponent<TabProps & React.RefAttributes<HTMLElement>>;
export default Tab;
