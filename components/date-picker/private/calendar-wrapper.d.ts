import { ReactNode, SyntheticEvent } from 'react';

export interface CalendarWrapperProps {
	/** Label for button to go to the next month */
	assistiveTextNextMonth?: string;
	/** Label for button to go to the previous month */
	assistiveTextPreviousMonth?: string;
	/** Label for year picklist/combobox */
	assistiveTextYear?: string;
	/** One letter abbreviations of the days of the week, starting on Sunday */
	abbreviatedWeekDayLabels?: string[];
	/** Whether or not the CalendarWrapper can steal focus from the main Input */
	canFocusCalendar?: boolean;
	/** CSS classes for datepicker */
	className?: string | string[] | Record<string, boolean>;
	/** Function to determine if a date should be disabled */
	dateDisabled?: (date: Date) => boolean;
	/** HTML id for component */
	id?: string;
	/** Makes Monday the first day of the week */
	isIsoWeekday?: boolean;
	/** For use of datepicker outside of dropdown */
	isolated?: boolean;
	/** Names of the months */
	monthLabels?: string[];
	/** Called when keyboard moves focus on calendar */
	onCalendarFocus?: (event: SyntheticEvent | null, data: { date?: Date; ref?: HTMLElement; direction?: string }) => void;
	/** Called when calendar should close */
	onRequestClose?: (event?: SyntheticEvent, data?: Record<string, unknown>) => void;
	/** Called when a date is selected */
	onSelectDate?: (event: SyntheticEvent, data: { date: Date }) => void;
	/** Years before current year in dropdown */
	relativeYearFrom?: number;
	/** Years after current year in dropdown */
	relativeYearTo?: number;
	/** Currently selected date */
	selectedDate?: Date;
	/** Ref callback for selected date cell */
	selectedDateRef?: (ref: HTMLElement | null) => void;
	/** Label for today shortcut */
	todayLabel?: string;
	/** Full names of the days of the week */
	weekDayLabels?: string[];
}

declare const CalendarWrapper: React.FC<CalendarWrapperProps>;
export default CalendarWrapper;
