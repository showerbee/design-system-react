import { SyntheticEvent } from 'react';

export interface DayProps {
	/** If elements within the calendar have focus */
	calendarHasFocus?: boolean;
	/** Date of day */
	date?: Date;
	/** If date is disabled */
	disabled?: boolean;
	/** Date used to create calendar that is displayed */
	initialDateForCalendarRender?: Date;
	/** Date that has focus */
	focusedDate?: Date;
	/** Called when focus moves off calendar */
	onCalendarBlur?: (event: SyntheticEvent, data: { direction: string }) => void;
	/** Called on next day keyboard navigation */
	onKeyboardNavigateToNextDay?: (event: SyntheticEvent, data: { date: Date }) => void;
	/** Called on next week keyboard navigation */
	onKeyboardNavigateToNextWeek?: (event: SyntheticEvent, data: { date: Date }) => void;
	/** Called on previous day keyboard navigation */
	onKeyboardNavigateToPreviousDay?: (event: SyntheticEvent, data: { date: Date }) => void;
	/** Called on previous week keyboard navigation */
	onKeyboardNavigateToPreviousWeek?: (event: SyntheticEvent, data: { date: Date }) => void;
	/** Called when internal focus date requested */
	onRequestInternalFocusDate?: (event: SyntheticEvent | undefined, data: { date: Date; ref?: HTMLElement }) => void;
	/** Called when a date is selected */
	onSelectDate?: (event: SyntheticEvent, data: { date: Date }) => void;
	/** Currently selected date */
	selectedDate?: Date;
	/** Ref callback for selected date cell */
	selectedDateRef?: (ref: HTMLElement | null) => void;
	/** Label for today shortcut */
	todayLabel?: string;
	/** Text direction */
	direction?: 'ltr' | 'rtl';
}

declare const Day: React.FC<DayProps>;
export default Day;
