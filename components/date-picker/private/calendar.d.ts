import { SyntheticEvent } from 'react';

export interface CalendarProps {
	/** Three letter abbreviations of the days of the week */
	abbreviatedWeekDayLabels?: string[];
	/** Function to determine if a date should be disabled */
	dateDisabled?: (data: { date: Date }) => boolean;
	/** HTML id for component */
	id?: string;
	/** Date used to create calendar that is displayed */
	initialDateForCalendarRender?: Date;
	/** Makes Monday the first day of the week */
	isIsoWeekday?: boolean;
	/** Called when focus moves off calendar */
	onCalendarBlur?: (event: SyntheticEvent, data: { direction: string }) => void;
	/** Called when month changes */
	onChangeMonth?: (event: SyntheticEvent | undefined, date: Date) => void;
	/** Called when internal focus date requested */
	onRequestInternalFocusDate?: (event: SyntheticEvent | undefined, data: { date: Date; ref?: HTMLElement; triggerCallback?: boolean }) => void;
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
	/** Called on last focusable node keydown */
	onLastFocusableNodeKeyDown?: (event: React.KeyboardEvent) => void;
	/** Ref callback for today link */
	todayRef?: (ref: HTMLAnchorElement | null) => void;
	/** Full names of the days of the week */
	weekDayLabels?: string[];
}

declare const Calendar: React.FC<CalendarProps>;
export default Calendar;
