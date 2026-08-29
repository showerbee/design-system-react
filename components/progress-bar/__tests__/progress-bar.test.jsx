import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProgressBar from '../index';

describe('SLDSProgressBar', () => {
	describe('Basic Render', () => {
		it('renders a progressbar role with default assistive text and value', () => {
			render(<ProgressBar value={50} />);
			const bar = screen.getByRole('progressbar', { name: 'Progress' });
			expect(bar).toBeInTheDocument();
			expect(bar).toHaveAttribute('aria-valuemin', '0');
			expect(bar).toHaveAttribute('aria-valuemax', '100');
			expect(bar).toHaveAttribute('aria-valuenow', '50');
			expect(bar).toHaveAttribute('aria-valuetext', 'Progress: 50%');
		});

		it('renders custom assistive text for the accessible name', () => {
			render(<ProgressBar value={30} assistiveText={{ progress: 'Upload progress' }} />);
			const bar = screen.getByRole('progressbar', { name: 'Upload progress' });
			expect(bar).toHaveAttribute('aria-valuenow', '30');
			expect(bar).toHaveAttribute('aria-valuetext', 'Upload progress: 30%');
		});

		it('renders a custom id on the container', () => {
			render(<ProgressBar id="setup-progress-bar" value={90} />);
			expect(document.getElementById('setup-progress-bar')).toBeInTheDocument();
		});
	});

	describe('Descriptive label (horizontal orientation)', () => {
		it('renders label text and percent-complete text, using aria-labelledby instead of aria-label', () => {
			render(
				<ProgressBar
					value={75}
					labels={{ label: 'Einstein Setup Assistant', complete: 'Complete' }}
				/>
			);
			const bar = screen.getByRole('progressbar');
			expect(bar).not.toHaveAttribute('aria-label');
			expect(bar).toHaveAttribute('aria-labelledby');

			expect(screen.getByText('Einstein Setup Assistant')).toBeInTheDocument();
			expect(screen.getByText('75% Complete')).toBeInTheDocument();

			const labelledBy = bar.getAttribute('aria-labelledby');
			expect(document.getElementById(labelledBy)).toBeInTheDocument();
		});

		it('does not render the label section for vertical orientation, even when a label is provided', () => {
			render(
				<ProgressBar
					value={60}
					orientation="vertical"
					labels={{ label: 'Einstein Setup Assistant' }}
				/>
			);
			expect(screen.queryByText('Einstein Setup Assistant')).not.toBeInTheDocument();

			const bar = screen.getByRole('progressbar', { name: 'Progress' });
			expect(bar).not.toHaveAttribute('aria-labelledby');
		});
	});

	describe('Orientation and sizing', () => {
		it('sizes the vertical fill by height instead of width', () => {
			const { container } = render(
				<ProgressBar value={60} orientation="vertical" style={{ height: '200px' }} />
			);
			const bar = screen.getByRole('progressbar');
			expect(bar).toHaveClass('slds-progress-bar_vertical');

			const fill = container.querySelector('.slds-progress-bar__value');
			expect(fill).toHaveStyle({ height: '60%' });
		});

		it('sizes the horizontal fill by width', () => {
			const { container } = render(<ProgressBar value={42} />);
			const fill = container.querySelector('.slds-progress-bar__value');
			expect(fill).toHaveStyle({ width: '42%' });
		});
	});

	describe('Visual variant props', () => {
		it('applies thickness and radius modifier classes', () => {
			render(<ProgressBar value={65} thickness="large" radius="circular" />);
			const bar = screen.getByRole('progressbar');
			expect(bar).toHaveClass('slds-progress-bar_large');
			expect(bar).toHaveClass('slds-progress-bar_circular');
		});

		it('applies the success color class to the fill element', () => {
			const { container } = render(<ProgressBar value={100} color="success" />);
			const fill = container.querySelector('.slds-progress-bar__value');
			expect(fill).toHaveClass('slds-progress-bar__value_success');
		});

		it('applies a caller-supplied className to the progressbar element', () => {
			render(<ProgressBar value={10} className="my-custom-class" />);
			expect(screen.getByRole('progressbar')).toHaveClass('my-custom-class');
		});
	});

	describe('Edge values', () => {
		it('renders 0% without error', () => {
			render(<ProgressBar value={0} />);
			expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
		});

		it('renders 100% without error', () => {
			render(<ProgressBar value={100} />);
			expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
		});
	});
});
