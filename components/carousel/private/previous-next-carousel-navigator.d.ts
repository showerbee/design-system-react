import { MouseEvent, CSSProperties } from 'react';

export interface PreviousNextCarouselNavigatorProps {
	/** Assistive text */
	assistiveText?: string;
	/** Icon name (chevronleft or chevronright) */
	iconName?: string;
	/** Custom inline styles */
	inlineStyle?: CSSProperties;
	/** Whether button is disabled */
	isDisabled?: boolean;
	/** Click handler */
	onClick?: (event: MouseEvent) => void;
}

declare const PreviousNextCarouselNavigator: React.FC<PreviousNextCarouselNavigatorProps>;
export default PreviousNextCarouselNavigator;
