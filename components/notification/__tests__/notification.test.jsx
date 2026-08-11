import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import SLDSNotification from '../index';
import IconSettings from '../../icon-settings';

describe('SLDSNotification', () => {
	describe('component renders', () => {
		it('notification renders', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<SLDSNotification
						variant="toast"
						theme="success"
						isOpen
						content="hi"
						silenceDeprecationWarning
					/>
				</IconSettings>
			);

			expect(container.querySelector('.slds-notify')).toBeInTheDocument();
		});
	});

	describe('component basic props render', () => {
		it('renders variant', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<SLDSNotification
						variant="toast"
						theme="success"
						icon="notification"
						isOpen
						texture
						animated
						content="hi"
						silenceDeprecationWarning
					/>
				</IconSettings>
			);

			const alert = container.querySelector('.slds-notify');
			expect(alert).toHaveClass('slds-notify_toast');
		});

		it('renders theme', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<SLDSNotification
						variant="toast"
						theme="error"
						isOpen
						content="hi"
						silenceDeprecationWarning
					/>
				</IconSettings>
			);

			const alert = container.querySelector('.slds-notify');
			expect(alert).toHaveClass('slds-theme_error');
		});

		it('renders icon', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<SLDSNotification
						variant="alert"
						theme="success"
						iconName="notification"
						isOpen
						texture
						content="hi"
						silenceDeprecationWarning
					/>
				</IconSettings>
			);

			const closeBtn = container.querySelector('button.slds-notify__close');
			expect(closeBtn).toBeInTheDocument();

			const svg = container.querySelector('use[href*="notification"]');
			expect(svg).toBeInTheDocument();
		});
	});

	describe('dismiss notification click', () => {
		it('button onClick invokes method from props', () => {
			const onClick = vi.fn();
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<SLDSNotification
						variant="toast"
						theme="success"
						iconName="notification"
						onDismiss={onClick}
						isOpen
						content="hi"
						silenceDeprecationWarning
					/>
				</IconSettings>
			);

			const dismissBtn = container.querySelector('button');
			fireEvent.click(dismissBtn);

			expect(onClick).toHaveBeenCalledTimes(1);
		});
	});
});
