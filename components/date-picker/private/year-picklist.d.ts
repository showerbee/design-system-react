export interface YearPicklistProps {
	/** Label for year picklist/combobox */
	assistiveTextYear?: string;
	/** HTML id for component */
	id?: string;
	/** Date used to create calendar that is displayed */
	initialDateForCalendarRender?: Date;
	/** Called when year changes */
	onChangeMonth?: (date: Date) => void;
	/** Years before current year in dropdown */
	relativeYearFrom?: number;
	/** Years after current year in dropdown */
	relativeYearTo?: number;
}

declare const YearPicklist: React.FC<YearPicklistProps>;
export default YearPicklist;
