import { KeyboardEvent, SyntheticEvent } from 'react';

export interface NavigationProps {
	/** Label for button to go to the next month */
	assistiveTextNextMonth?: string;
	/** Label for button to go to the previous month */
	assistiveTextPreviousMonth?: string;
	/** Label for year picklist/combobox */
	assistiveTextYear?: string;
	/** HTML id for component */
	id?: string;
	/** Date used to create calendar that is displayed */
	initialDateForCalendarRender?: Date;
	/** Called when month changes */
	onChangeMonth?: (event: SyntheticEvent | undefined, date: Date) => void;
	/** Names of the months */
	monthLabels?: string[];
	/** Called on previous month button keydown */
	onPreviousMonthKeyDown?: (event: KeyboardEvent) => void;
	/** Ref callback for previous month button */
	previousMonthRef?: (ref: HTMLButtonElement | null) => void;
	/** Years before current year in dropdown */
	relativeYearFrom?: number;
	/** Years after current year in dropdown */
	relativeYearTo?: number;
}

declare const Navigation: React.FC<NavigationProps>;
export default Navigation;
