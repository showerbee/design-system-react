import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProgressRing from '../index';
import Icon from '../../icon';
import IconSettings from '../../icon-settings';

describe('SLDSProgressRing', () => {
	const renderRing = (props) => {
		return render(
			<IconSettings iconPath="/assets/icons">
				<ProgressRing {...props} />
			</IconSettings>
		);
	};

	describe('Basic Render', () => {
		it('renders a progressbar role with default assistive text derived from value', () => {
			renderRing({ value: 20 });
			const ring = screen.getByRole('progressbar', { name: 'Progress: 20%' });
			expect(ring).toBeInTheDocument();
			expect(ring).toHaveAttribute('aria-valuemin', '0');
			expect(ring).toHaveAttribute('aria-valuemax', '100');
			expect(ring).toHaveAttribute('aria-valuenow', '20');
		});

		it('renders custom assistiveText for the accessible name', () => {
			renderRing({ value: 40, assistiveText: 'Setup 40 percent done' });
			expect(
				screen.getByRole('progressbar', { name: 'Setup 40 percent done' })
			).toBeInTheDocument();
		});

		it('forwards id and className to the ring container', () => {
			const { container } = renderRing({ value: 50, id: 'my-ring', className: 'custom-ring' });
			const wrapper = container.querySelector('#my-ring');
			expect(wrapper).toBeInTheDocument();
			expect(wrapper).toHaveClass('slds-progress-ring');
			expect(wrapper).toHaveClass('custom-ring');
		});
	});

	describe('Theme variants', () => {
		it.each([
			['active', 'slds-progress-ring_active-step'],
			['warning', 'slds-progress-ring_warning'],
			['expired', 'slds-progress-ring_expired'],
			['complete', 'slds-progress-ring_complete'],
		])('applies the %s theme class', (theme, className) => {
			const { container } = renderRing({ value: 30, theme });
			expect(container.querySelector('.slds-progress-ring')).toHaveClass(className);
		});
	});

	describe('Icon rendering', () => {
		it('renders no icon by default even when a theme is set', () => {
			const { container } = renderRing({ value: 100, theme: 'complete' });
			const content = container.querySelector('.slds-progress-ring__content');
			expect(content).toBeEmptyDOMElement();
		});

		it('renders the default themed icon when hasIcon is true', () => {
			const { container } = renderRing({ value: 20, theme: 'warning', hasIcon: true });
			expect(container.querySelector('span[title="Warning"]')).toBeInTheDocument();
		});

		it('renders a caller-supplied custom icon instead of the theme default', () => {
			renderRing({
				value: 20,
				theme: 'expired',
				hasIcon: true,
				icon: <Icon assistiveText={{ label: 'Custom lock icon' }} category="utility" name="lock" />,
			});
			expect(screen.getByText('Custom lock icon')).toBeInTheDocument();
		});
	});

	describe('Size and flow direction', () => {
		it('uses a taller ring height for size="large"', () => {
			const { container } = renderRing({ value: 50, size: 'large' });
			expect(container.querySelector('.slds-progress-ring')).toHaveClass(
				'slds-progress-ring_large'
			);
			const progressEl = container.querySelector('.slds-progress-ring__progress');
			expect(progressEl).toHaveStyle({ height: '2rem' });
		});

		it('uses the default (medium) ring height otherwise', () => {
			const { container } = renderRing({ value: 50 });
			const progressEl = container.querySelector('.slds-progress-ring__progress');
			expect(progressEl).toHaveStyle({ height: '1.5rem' });
		});

		it('applies a rotation transform when flowDirection is "fill"', () => {
			const { container } = renderRing({ value: 50, flowDirection: 'fill' });
			const progressEl = container.querySelector('.slds-progress-ring__progress');
			expect(progressEl).toHaveStyle({ transform: 'scaleX(1) rotate(-90deg)' });
		});

		it('applies no rotation transform for the default "drain" flow', () => {
			const { container } = renderRing({ value: 50 });
			const progressEl = container.querySelector('.slds-progress-ring__progress');
			expect(progressEl.style.transform).toBe('');
		});
	});

	describe('Edge values', () => {
		it('renders 0% without error', () => {
			renderRing({ value: 0 });
			expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
		});

		it('renders 100% without error', () => {
			renderRing({ value: 100 });
			expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
		});
	});
});
