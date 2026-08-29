import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ScopedNotification from '../index';
import Icon from '../../icon';
import IconSettings from '../../icon-settings';

describe('SLDSScopedNotification', () => {
	const renderNotification = (props, children) => {
		return render(
			<IconSettings iconPath="/assets/icons">
				<ScopedNotification {...props}>
					{children || (
						<p>
							It looks as if duplicates exist for this lead.{' '}
							<a href="https://example.com/duplicates">View Duplicates.</a>
						</p>
					)}
				</ScopedNotification>
			</IconSettings>
		);
	};

	describe('Basic Render', () => {
		it('renders with base classes and status role', () => {
			const { container } = renderNotification();
			const notification = container.querySelector('.slds-scoped-notification');
			expect(notification).toBeInTheDocument();
			expect(notification).toHaveClass('slds-media');
			expect(notification).toHaveClass('slds-media_center');
			expect(notification).toHaveAttribute('role', 'status');
		});

		it('renders children content', () => {
			renderNotification();
			expect(
				screen.getByText(/It looks as if duplicates exist for this lead\./)
			).toBeInTheDocument();
			expect(screen.getByRole('link', { name: 'View Duplicates.' })).toBeInTheDocument();
		});

		it('renders a default info icon with assistive text', () => {
			const { container } = renderNotification();
			const icon = container.querySelector('.slds-media__figure svg');
			expect(icon).toBeInTheDocument();
			expect(screen.getByText('Info')).toBeInTheDocument();
		});
	});

	describe('Theme Variants', () => {
		it('applies no theme class by default', () => {
			const { container } = renderNotification();
			const notification = container.querySelector('.slds-scoped-notification');
			expect(notification).not.toHaveClass('slds-scoped-notification_light');
			expect(notification).not.toHaveClass('slds-scoped-notification_dark');
		});

		it('applies the light theme class', () => {
			const { container } = renderNotification({ theme: 'light' });
			const notification = container.querySelector('.slds-scoped-notification');
			expect(notification).toHaveClass('slds-scoped-notification_light');
		});

		it('applies the dark theme class', () => {
			const { container } = renderNotification({ theme: 'dark' });
			const notification = container.querySelector('.slds-scoped-notification');
			expect(notification).toHaveClass('slds-scoped-notification_dark');
		});
	});

	describe('Custom className', () => {
		it('merges a custom className onto the container', () => {
			const { container } = renderNotification({ className: 'my-custom-class' });
			const notification = container.querySelector('.slds-scoped-notification');
			expect(notification).toHaveClass('my-custom-class');
		});
	});

	describe('Icon Props', () => {
		it('renders a custom iconName instead of the default info icon', () => {
			renderNotification({ iconName: 'announcement' });
			// default assistive text label remains "Info" since no assistiveText override given
			expect(screen.getByText('Info')).toBeInTheDocument();
		});

		it('renders a fully custom icon element passed via the icon prop', () => {
			renderNotification({
				icon: (
					<Icon
						assistiveText={{ label: 'Warning' }}
						category="utility"
						colorVariant="warning"
						name="warning"
						size="small"
					/>
				),
			});
			expect(screen.getByText('Warning')).toBeInTheDocument();
			expect(screen.queryByText('Info')).not.toBeInTheDocument();
		});

		it('overrides custom icon assistive text via assistiveText.icon', () => {
			renderNotification({
				assistiveText: { icon: 'Custom label' },
				icon: <Icon category="utility" name="warning" size="small" />,
			});
			expect(screen.getByText('Custom label')).toBeInTheDocument();
		});
	});
});
