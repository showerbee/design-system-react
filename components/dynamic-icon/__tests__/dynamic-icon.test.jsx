import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DynamicIcon from '../index';

describe('SLDSDynamicIcon', () => {
	describe('ellie variant', () => {
		it('renders svg with slds-icon-ellie class and assistive text', () => {
			const { container } = render(
				<DynamicIcon title="Ellie icon title" variant="ellie" />
			);

			const root = container.firstChild;
			expect(root).toHaveClass('slds-icon-ellie');
			expect(root).toHaveClass('slds-is-animated');
			expect(root.tagName).toBe('SPAN');

			const svg = container.querySelector('svg');
			expect(svg).toBeInTheDocument();

			const assistive = container.querySelector('.slds-assistive-text');
			expect(assistive).toHaveTextContent('Ellie icon title');
		});

		it('applies slds-is-paused class when isPaused is set', () => {
			const { container } = render(
				<DynamicIcon isPaused title="Ellie icon title" variant="ellie" />
			);
			expect(container.firstChild).toHaveClass('slds-is-paused');
		});

		it('omits slds-is-animated when isStatic is set', () => {
			const { container } = render(
				<DynamicIcon isStatic title="Ellie icon title" variant="ellie" />
			);
			expect(container.firstChild).not.toHaveClass('slds-is-animated');
		});

		it('merges custom className', () => {
			const { container } = render(
				<DynamicIcon
					className="my-custom-class"
					title="Ellie icon title"
					variant="ellie"
				/>
			);
			expect(container.firstChild).toHaveClass('my-custom-class');
		});
	});

	describe('eq variant', () => {
		it('renders a div with three bar elements', () => {
			const { container } = render(
				<DynamicIcon title="Eq icon title" variant="eq" />
			);

			const root = container.firstChild;
			expect(root.tagName).toBe('DIV');
			expect(root).toHaveClass('slds-icon-eq');

			const bars = container.querySelectorAll('.slds-icon-eq__bar');
			expect(bars).toHaveLength(3);
		});
	});

	describe('score variant', () => {
		it('defaults data-slds-state to positive', () => {
			const { container } = render(
				<DynamicIcon title="Score icon title" variant="score" />
			);

			const root = container.firstChild;
			expect(root).toHaveAttribute('data-slds-state', 'positive');
			expect(container.querySelector('.slds-icon-score__positive')).toBeInTheDocument();
			expect(container.querySelector('.slds-icon-score__negative')).toBeInTheDocument();
		});

		it('reflects scorePolarity in data-slds-state', () => {
			const { container } = render(
				<DynamicIcon
					scorePolarity="negative"
					title="Score icon title"
					variant="score"
				/>
			);
			expect(container.firstChild).toHaveAttribute('data-slds-state', 'negative');
		});
	});

	describe('strength variant', () => {
		it('defaults data-slds-strength to 0', () => {
			const { container } = render(
				<DynamicIcon title="Strength icon title" variant="strength" />
			);
			expect(container.firstChild).toHaveAttribute('data-slds-strength', '0');
		});

		it('reflects numeric strengthLevel', () => {
			const { container } = render(
				<DynamicIcon
					strengthLevel={2}
					title="Strength icon title"
					variant="strength"
				/>
			);
			expect(container.firstChild).toHaveAttribute('data-slds-strength', '2');
		});

		it('reflects string strengthLevel', () => {
			const { container } = render(
				<DynamicIcon
					strengthLevel="-3"
					title="Strength icon title"
					variant="strength"
				/>
			);
			expect(container.firstChild).toHaveAttribute('data-slds-strength', '-3');
		});
	});

	describe('trend variant', () => {
		it('defaults data-slds-trend to neutral', () => {
			const { container } = render(
				<DynamicIcon title="Trend icon title" variant="trend" />
			);
			expect(container.firstChild).toHaveAttribute('data-slds-trend', 'neutral');
		});

		it('reflects trendDirection', () => {
			const { container } = render(
				<DynamicIcon
					title="Trend icon title"
					trendDirection="up"
					variant="trend"
				/>
			);
			expect(container.firstChild).toHaveAttribute('data-slds-trend', 'up');
		});
	});

	describe('typing variant', () => {
		it('renders three typing dots', () => {
			const { container } = render(
				<DynamicIcon title="User is typing" variant="typing" />
			);
			const dots = container.querySelectorAll('.slds-icon-typing__dot');
			expect(dots).toHaveLength(3);
		});

		it('uses provided title as assistive text', () => {
			const { container } = render(
				<DynamicIcon title="Custom typing title" variant="typing" />
			);
			expect(container.querySelector('.slds-assistive-text')).toHaveTextContent(
				'Custom typing title'
			);
		});

		it('falls back to default assistive text when title is empty', () => {
			const { container } = render(
				<DynamicIcon title="" variant="typing" />
			);
			expect(container.querySelector('.slds-assistive-text')).toHaveTextContent(
				'User is typing'
			);
		});

		it('assistiveText.label overrides the default/title', () => {
			const { container } = render(
				<DynamicIcon
					assistiveText={{ label: 'Someone is typing now' }}
					title="Custom typing title"
					variant="typing"
				/>
			);
			expect(container.querySelector('.slds-assistive-text')).toHaveTextContent(
				'Someone is typing now'
			);
		});
	});

	describe('waffle variant', () => {
		it('renders as a button with waffle grid squares', () => {
			const { container } = render(
				<DynamicIcon title="Open App Launcher" variant="waffle" />
			);

			const root = container.firstChild;
			expect(root.tagName).toBe('BUTTON');
			expect(root).toHaveClass('slds-button');
			expect(root).toHaveClass('slds-icon-waffle_container');

			const waffle = container.querySelector('.slds-icon-waffle');
			expect(waffle).toBeInTheDocument();
			for (let i = 1; i <= 9; i += 1) {
				expect(waffle.querySelector(`.slds-r${i}`)).toBeInTheDocument();
			}
		});

		it('falls back to default assistive text when title is empty', () => {
			const { container } = render(<DynamicIcon title="" variant="waffle" />);
			expect(container.querySelector('.slds-assistive-text')).toHaveTextContent(
				'Open App Launcher'
			);
		});
	});
});
