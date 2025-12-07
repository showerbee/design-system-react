import { MouseEvent, FocusEvent } from 'react';
import type { CarouselItemData } from '../index';

export interface CarouselIndicatorsProps {
	/** Parent carousel ID */
	carouselId?: string;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** Current selected indicator index */
	currentIndex?: number;
	/** Function to generate panel ID */
	getPanelId?: (params: { carouselId: string; itemId: string }) => string;
	/** Whether indicators have focus */
	hasFocus?: boolean;
	/** Carousel items */
	items?: CarouselItemData[];
	/** Number of items per panel */
	itemsPerPanel?: number;
	/** Total number of indicators */
	noOfIndicators: number;
	/** Blur handler */
	onBlur?: () => void;
	/** Click handler */
	onClick?: (event: MouseEvent, panel: number) => void;
	/** Focus handler */
	onFocus?: (event: FocusEvent) => void;
}

declare const CarouselIndicators: React.FC<CarouselIndicatorsProps>;
export default CarouselIndicators;
