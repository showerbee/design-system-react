import Grid from '../';

export default {
	title: 'Components/Grid',
	component: Grid,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<Story />
			</div>
		),
	],
	argTypes: {
		flavor: {
			control: 'select',
			options: [
				undefined,
				'vertical',
				'reverse',
				'align-spread',
				'align-center',
				'align-end',
				'vertical-align-center',
				'vertical-align-end',
				'vertical-stretch',
				'pull-padded',
				'frame',
			],
		},
	},
	tags: ['autodocs'],
};

const box = {
	background: '#f4f6f9',
	border: '1px solid #dddbda',
	padding: '0.75rem',
};

/**
 * Default grid with two equally sized columns.
 */
export const Default = {
	render: () => (
		<Grid>
			<Grid.Column>
				<div style={box}>Column 1</div>
			</Grid.Column>
			<Grid.Column>
				<div style={box}>Column 2</div>
			</Grid.Column>
		</Grid>
	),
};

/**
 * Columns can be sized using SLDS column-width utility classes
 * (e.g. `slds-size_1-of-3`) passed via `className`.
 */
export const ColumnSpans = {
	render: () => (
		<Grid>
			<Grid.Column className="slds-size_1-of-3">
				<div style={box}>1 of 3</div>
			</Grid.Column>
			<Grid.Column className="slds-size_2-of-3">
				<div style={box}>2 of 3</div>
			</Grid.Column>
		</Grid>
	),
};

/**
 * The `flavor` prop appends an `slds-grid_{flavor}` modifier class,
 * here used to spread columns apart horizontally.
 */
export const AlignSpread = {
	render: () => (
		<Grid flavor="align-spread">
			<Grid.Column>
				<div style={box}>Start</div>
			</Grid.Column>
			<Grid.Column>
				<div style={box}>End</div>
			</Grid.Column>
		</Grid>
	),
};

/**
 * A vertical flavor stacks columns instead of laying them out horizontally.
 */
export const Vertical = {
	render: () => (
		<Grid flavor="vertical">
			<Grid.Column>
				<div style={box}>Row 1</div>
			</Grid.Column>
			<Grid.Column>
				<div style={box}>Row 2</div>
			</Grid.Column>
		</Grid>
	),
};

/**
 * `Grid` and `Grid.Column` both accept an additional `className` for
 * combining with other SLDS utility classes.
 */
export const CustomClassName = {
	render: () => (
		<Grid className="slds-wrap">
			<Grid.Column className="slds-size_1-of-1 slds-medium-size_1-of-2">
				<div style={box}>Wraps on small viewports</div>
			</Grid.Column>
			<Grid.Column className="slds-size_1-of-1 slds-medium-size_1-of-2">
				<div style={box}>Wraps on small viewports</div>
			</Grid.Column>
		</Grid>
	),
};
