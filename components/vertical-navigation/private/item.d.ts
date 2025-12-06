import { MouseEvent } from 'react';
import { NavigationItem, NavigationSelectData } from '../index';

export interface ItemProps {
	categoryId: string;
	isSelected: boolean;
	item: NavigationItem;
	onSelect?: (event: MouseEvent<HTMLAnchorElement>, data: NavigationSelectData) => void;
}

declare const Item: React.FC<ItemProps>;
export default Item;
