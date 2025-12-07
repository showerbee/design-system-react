import { ReactNode, ReactElement, MouseEvent, FocusEvent } from 'react';
import type { CarouselItemData } from '../index';

export interface CarouselItemProps {
	/** Button label */
	buttonLabel?: string;
	/** Parent carousel ID */
	carouselId?: string;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** Description text */
	description?: string | ReactNode;
	/** Function to generate panel ID */
	getPanelId?: (params: { carouselId: string; itemId: string }) => string;
	/** Heading text */
	heading?: string | Record<string, unknown>;
	/** Link URL */
	href?: string;
	/** Item ID */
	id?: string;
	/** Image alt text */
	imageAssistiveText?: string;
	/** Whether item is in current panel */
	isInCurrentPanel?: boolean;
	/** Width of the item */
	itemWidth?: number;
	/** Click handler */
	onClick?: (event: MouseEvent) => void;
	/** Focus handler */
	onFocus?: (event: FocusEvent) => void;
	/** Custom item renderer */
	onRenderItem?: (item: CarouselItemData) => ReactElement;
	/** Panel index this item belongs to */
	panelIndex?: number;
	/** Image source URL */
	src?: string;
}

declare const CarouselItem: React.FC<CarouselItemProps>;
export default CarouselItem;
