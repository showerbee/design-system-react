import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TrialBar from '../index';
import TrialBarButton from '../button';
import IconSettings from '../../icon-settings';

describe('SLDSTrialBar', () => {
	const renderTrialBar = (props, children) => {
		return render(
			<IconSettings iconPath="/assets/icons">
				<TrialBar {...props}>{children}</TrialBar>
			</IconSettings>
		);
	};

	describe('Basic TrialBar Render', () => {
		it('renders base slds-trial-header class', () => {
			const { container } = renderTrialBar();
			const bar = container.querySelector('.slds-trial-header');
			expect(bar).toBeInTheDocument();
			expect(bar).toHaveClass('slds-grid');
		});

		it('renders children inside the bar', () => {
			renderTrialBar({}, <span>Trial Bar Child</span>);
			expect(screen.getByText('Trial Bar Child')).toBeInTheDocument();
		});
	});

	describe('Labels Render', () => {
		it('renders timeLeft and timeLeftUnit values', () => {
			renderTrialBar({ labels: { timeLeft: '30', timeLeftUnit: 'days' } });
			expect(screen.getByText('30')).toBeInTheDocument();
			expect(screen.getByText(/days/)).toBeInTheDocument();
		});

		it('defaults timeLeftUnitAfter to "left in trial" when not provided', () => {
			renderTrialBar({ labels: { timeLeft: '30', timeLeftUnit: 'days' } });
			expect(screen.getByText(/left in trial/)).toBeInTheDocument();
		});

		it('renders custom timeLeftUnitAfter text', () => {
			renderTrialBar({
				labels: {
					timeLeft: '5',
					timeLeftUnit: 'hours',
					timeLeftUnitAfter: 'remaining',
				},
			});
			expect(screen.getByText(/remaining/)).toBeInTheDocument();
			expect(screen.queryByText(/left in trial/)).not.toBeInTheDocument();
		});

		it('omits the after-text entirely when timeLeftUnitAfter is empty', () => {
			const { container } = renderTrialBar({
				labels: { timeLeft: '5', timeLeftUnit: 'hours', timeLeftUnitAfter: '' },
			});
			expect(container.textContent).not.toMatch(/left in trial/);
		});
	});

	describe('onRenderActions Render', () => {
		it('renders the node returned by onRenderActions', () => {
			const onRenderActions = vi.fn(() => <button type="button">Subscribe Now</button>);
			renderTrialBar({ onRenderActions });

			expect(onRenderActions).toHaveBeenCalled();
			expect(screen.getByRole('button', { name: 'Subscribe Now' })).toBeInTheDocument();
		});

		it('renders nothing extra when onRenderActions is not provided', () => {
			renderTrialBar();
			expect(screen.queryByRole('button')).not.toBeInTheDocument();
		});
	});

	describe('Custom className and style', () => {
		it('merges custom className and applies inline style', () => {
			const { container } = renderTrialBar({
				className: 'my-trial-bar',
				style: { backgroundColor: 'rgb(1, 2, 3)' },
			});
			const bar = container.querySelector('.slds-trial-header');
			expect(bar).toHaveClass('my-trial-bar');
			expect(bar).toHaveStyle({ backgroundColor: 'rgb(1, 2, 3)' });
		});
	});

	describe('TrialBarButton integration', () => {
		it('renders an inverse button as a child and responds to clicks', () => {
			const onClick = vi.fn();
			renderTrialBar(
				{},
				<TrialBarButton label="Take the tour" onClick={onClick} />
			);

			const btn = screen.getByRole('button', { name: 'Take the tour' });
			expect(btn).toBeInTheDocument();
			expect(btn).toHaveClass('slds-button_inverse');

			fireEvent.click(btn);
			expect(onClick).toHaveBeenCalledTimes(1);
		});
	});
});
