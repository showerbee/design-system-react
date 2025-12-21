import { SyntheticEvent } from 'react';

export interface WeekProps {
	/** Date used to create calendar that is displayed */
	initialDateForCalendarRender?: Date;
	/** Is true if calendar day has focus */
	calendarHasFocus?: boolean;
	/** Function to determine if a date should be disabled */
	dateDisabled?: (data: { date: Date }) => boolean;
	/** First day of week */
	firstDayOfWeek?: Date;
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
	/** Called when calendar should close */
	onRequestClose?: (event?: SyntheticEvent, data?: Record<string, unknown>) => void;
	/** Called when a date is selected */
	onSelectDate?: (event: SyntheticEvent, data: { date: Date }) => void;
	/** Currently selected date */
	selectedDate?: Date;
	/** Ref callback for selected date cell */
	selectedDateRef?: (ref: HTMLElement | null) => void;
	/** Label for today shortcut */
	todayLabel?: string;
}

declare const Week: React.FC<WeekProps>;
export default Week;
