import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Badge from '../index';
import Icon from '../../icon';
import IconSettings from '../../icon-settings';

describe('SLDSBadge', () => {
	const renderBadge = (props) => {
		return render(
			<IconSettings iconPath="/assets/icons">
				<Badge {...props} />
			</IconSettings>
		);
	};

	describe('Basic Badge Render', () => {
		it('renders content with base slds-badge class', () => {
			renderBadge({ id: 'badge-1', content: 'Badge Label' });
			const badge = screen.getByText('Badge Label');
			expect(badge).toBeInTheDocument();
			expect(badge).toHaveClass('slds-badge');
			expect(badge).toHaveAttribute('id', 'badge-1');
		});
	});

	describe('Color Variant Render', () => {
		it('renders inverse color class', () => {
			renderBadge({ content: 'Inverse Badge', color: 'inverse' });
			const badge = screen.getByText('Inverse Badge');
			expect(badge).toHaveClass('slds-badge_inverse');
		});

		it('renders light color class', () => {
			renderBadge({ content: 'Light Badge', color: 'light' });
			const badge = screen.getByText('Light Badge');
			expect(badge).toHaveClass('slds-badge_lightest');
		});

		it('renders success theme class', () => {
			renderBadge({ content: 'Success', color: 'success' });
			const badge = screen.getByText('Success');
			expect(badge).toHaveClass('slds-theme_success');
		});

		it('renders warning theme class', () => {
			renderBadge({ content: 'Warning', color: 'warning' });
			const badge = screen.getByText('Warning');
			expect(badge).toHaveClass('slds-theme_warning');
		});

		it('renders error theme class', () => {
			renderBadge({ content: 'Error', color: 'error' });
			const badge = screen.getByText('Error');
			expect(badge).toHaveClass('slds-theme_error');
		});

		it('does not add a color class for default color', () => {
			renderBadge({ content: 'Default' });
			const badge = screen.getByText('Default');
			expect(badge).not.toHaveClass('slds-badge_inverse');
			expect(badge).not.toHaveClass('slds-badge_lightest');
			expect(badge).not.toHaveClass('slds-theme_success');
			expect(badge).not.toHaveClass('slds-theme_warning');
			expect(badge).not.toHaveClass('slds-theme_error');
		});
	});

	describe('Icon Render', () => {
		it('renders icon before content by default (left alignment)', () => {
			const { container } = renderBadge({
				content: '423 Credits Available',
				icon: <Icon category="utility" name="moneybag" size="xx-small" />,
			});

			const iconWrapper = container.querySelector('.slds-badge__icon');
			expect(iconWrapper).toBeInTheDocument();
			expect(iconWrapper).toHaveClass('slds-badge__icon_left');

			const badge = container.querySelector('.slds-badge');
			// Icon wrapper should be the first child when aligned left
			expect(badge.firstElementChild).toBe(iconWrapper);
		});

		it('renders icon after content when iconAlignment is right', () => {
			const { container } = renderBadge({
				content: '423 Credits Available',
				icon: <Icon category="utility" name="moneybag" size="xx-small" />,
				iconAlignment: 'right',
			});

			const iconWrapper = container.querySelector('.slds-badge__icon');
			expect(iconWrapper).toBeInTheDocument();
			expect(iconWrapper).toHaveClass('slds-badge__icon_right');

			const badge = container.querySelector('.slds-badge');
			expect(badge.lastElementChild).toBe(iconWrapper);
		});

		it('does not render an icon wrapper when no icon is provided', () => {
			const { container } = renderBadge({ content: 'No Icon' });
			expect(container.querySelector('.slds-badge__icon')).not.toBeInTheDocument();
		});
	});

	describe('Custom className and style', () => {
		it('merges custom className onto the badge', () => {
			renderBadge({ content: 'Custom', className: 'my-custom-class' });
			const badge = screen.getByText('Custom');
			expect(badge).toHaveClass('slds-badge');
			expect(badge).toHaveClass('my-custom-class');
		});
	});
});
