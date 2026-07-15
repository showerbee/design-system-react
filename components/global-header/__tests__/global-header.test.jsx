import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import Combobox from '../../combobox';
import IconSettings from '../../icon-settings';
import GlobalHeader from '../index';
import GlobalHeaderFavorites from '../favorites';
import GlobalHeaderHelp from '../help';
import GlobalHeaderNotifications from '../notifications';
import GlobalHeaderProfile from '../profile';
import GlobalHeaderSearch from '../search';
import GlobalHeaderSetup from '../setup';
import GlobalHeaderTask from '../task';

describe('SLDSGlobalHeader', () => {
	const renderGlobalHeader = (children) => {
		return render(
			<IconSettings iconPath="/assets/icons">
				<GlobalHeader>{children}</GlobalHeader>
			</IconSettings>
		);
	};

	describe('SLDSGlobalHeader index', () => {
		it('arranges components correctly even if the developer put them out of order', () => {
			const { container, debug } = renderGlobalHeader(
				<>
					<GlobalHeaderProfile />
					<GlobalHeaderSetup />
					<GlobalHeaderFavorites />
					<GlobalHeaderTask />
					<GlobalHeaderNotifications />
					<GlobalHeaderSearch
						combobox={
							<Combobox
								assistiveText={{ label: 'Search' }}
								id="global-header-search-combobox-test"
								labels={{ placeholder: 'Search Salesforce' }}
								options={[]}
							/>
						}
					/>
					<GlobalHeaderHelp />
				</>
			);

			// Check that header rendered
			const header = container.querySelector('header.slds-global-header_container');
			expect(header).toBeInTheDocument();

			const globalHeader = container.querySelector('.slds-global-header');
			expect(globalHeader).toBeInTheDocument();

			// Check for actions list
			const actionsList = container.querySelector('ul.slds-global-actions');
			expect(actionsList).toBeInTheDocument();

			// Each action renders as a `<li class="slds-global-actions__item">`,
			// and GlobalHeader reorders them regardless of the source order:
			// Favorites, Task, Help, Setup, Notifications, Profile.
			const actionItems = container.querySelectorAll(
				'ul.slds-global-actions li.slds-global-actions__item'
			);

			const order = [
				'div.slds-global-actions__favorites',
				'button.slds-global-actions__task',
				'button.slds-global-actions__help',
				'button.slds-global-actions__setup',
				'button.slds-global-actions__notifications',
				'button.slds-global-actions__avatar',
			];

			expect(actionItems).toHaveLength(order.length);

			// Verify the rendered items appear in the correct (reordered) sequence
			actionItems.forEach((item, index) => {
				const element = item.querySelector(order[index]);
				expect(element).toBeInTheDocument();
			});
		});

		it('renders header structure correctly', () => {
			const { container } = renderGlobalHeader(
				<>
					<GlobalHeaderProfile />
					<GlobalHeaderNotifications />
				</>
			);

			// Check header container
			const header = container.querySelector('header.slds-global-header_container');
			expect(header).toBeInTheDocument();

			// Check global header
			const globalHeader = container.querySelector('.slds-global-header');
			expect(globalHeader).toBeInTheDocument();

			// Check logo
			const logo = container.querySelector('.slds-global-header__logo');
			expect(logo).toBeInTheDocument();

			// Check actions list
			const actionsList = container.querySelector('ul.slds-global-actions');
			expect(actionsList).toBeInTheDocument();
		});

		it('renders custom logo source', () => {
			const customLogoSrc = '/custom/logo.svg';
			const { container } = renderGlobalHeader(
				<GlobalHeaderProfile />
			);

			// Re-render with custom logo
			const { container: customContainer } = render(
				<IconSettings iconPath="/assets/icons">
					<GlobalHeader logoSrc={customLogoSrc}>
						<GlobalHeaderProfile />
					</GlobalHeader>
				</IconSettings>
			);

			const logo = customContainer.querySelector('.slds-global-header__logo');
			expect(logo).toHaveStyle({ backgroundImage: `url(${customLogoSrc})` });
		});
	});

	describe('Skip links', () => {
		it('renders skip to navigation link when handler provided', () => {
			const onSkipToNav = vi.fn();
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<GlobalHeader onSkipToNav={onSkipToNav}>
						<GlobalHeaderProfile />
					</GlobalHeader>
				</IconSettings>
			);

			const skipLink = container.querySelector('a.slds-assistive-text');
			expect(skipLink).toBeInTheDocument();
			expect(skipLink.textContent).toBe('Skip to Navigation');
		});

		it('renders skip to content link when handler provided', () => {
			const onSkipToContent = vi.fn();
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<GlobalHeader onSkipToContent={onSkipToContent}>
						<GlobalHeaderProfile />
					</GlobalHeader>
				</IconSettings>
			);

			const skipLinks = container.querySelectorAll('a.slds-assistive-text');
			expect(skipLinks.length).toBeGreaterThan(0);

			const skipToContentLink = Array.from(skipLinks).find(
				link => link.textContent === 'Skip to Main Content'
			);
			expect(skipToContentLink).toBeInTheDocument();
		});

		it('calls onSkipToNav when skip link clicked', async () => {
			const onSkipToNav = vi.fn();
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<GlobalHeader onSkipToNav={onSkipToNav}>
						<GlobalHeaderProfile />
					</GlobalHeader>
				</IconSettings>
			);

			const skipLink = container.querySelector('a.slds-assistive-text');
			await userEvent.click(skipLink);

			expect(onSkipToNav).toHaveBeenCalledTimes(1);
		});

		it('calls onSkipToContent when skip link clicked', async () => {
			const onSkipToContent = vi.fn();
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<GlobalHeader onSkipToContent={onSkipToContent}>
						<GlobalHeaderProfile />
					</GlobalHeader>
				</IconSettings>
			);

			const skipLinks = container.querySelectorAll('a.slds-assistive-text');
			const skipToContentLink = Array.from(skipLinks).find(
				link => link.textContent === 'Skip to Main Content'
			);

			await userEvent.click(skipToContentLink);

			expect(onSkipToContent).toHaveBeenCalledTimes(1);
		});
	});

	describe('SLDSGlobalHeaderFavorites', () => {
		it('handles actionDisabled correctly', () => {
			const { container } = renderGlobalHeader(
				<GlobalHeaderFavorites actionDisabled />
			);

			const actionButton = container.querySelector(
				'button.slds-global-actions__favorites-action'
			);

			expect(actionButton).toHaveClass('slds-is-disabled');
			expect(actionButton).toHaveAttribute('disabled');
		});

		it('handles actionSelected correctly', () => {
			const { container } = renderGlobalHeader(
				<GlobalHeaderFavorites actionSelected />
			);

			const actionButton = container.querySelector(
				'button.slds-global-actions__favorites-action'
			);

			expect(actionButton).toHaveClass('slds-is-selected');
			expect(actionButton).toHaveAttribute('aria-pressed', 'true');
		});

		it('handles onToggleActionSelected correctly', async () => {
			let callbackArgs = null;
			const onToggleActionSelected = vi.fn((event, data) => {
				callbackArgs = { event, data };
			});

			const { container } = renderGlobalHeader(
				<GlobalHeaderFavorites onToggleActionSelected={onToggleActionSelected} />
			);

			const actionButton = container.querySelector(
				'button.slds-global-actions__favorites-action'
			);

			// Test click
			await userEvent.click(actionButton);
			expect(onToggleActionSelected).toHaveBeenCalledTimes(1);
			expect(callbackArgs).not.toBeNull();
			expect(typeof callbackArgs.event).toBe('object');
			expect(typeof callbackArgs.data).toBe('object');
			expect(typeof callbackArgs.data.actionSelected).toBe('boolean');

			// Test Enter key
			callbackArgs = null;
			actionButton.focus();
			await userEvent.keyboard('{Enter}');
			expect(onToggleActionSelected).toHaveBeenCalledTimes(2);
			expect(callbackArgs).not.toBeNull();
			expect(typeof callbackArgs.event).toBe('object');
			expect(typeof callbackArgs.data).toBe('object');
			expect(typeof callbackArgs.data.actionSelected).toBe('boolean');
		});

		it('does not toggle when disabled', async () => {
			const onToggleActionSelected = vi.fn();

			const { container } = renderGlobalHeader(
				<GlobalHeaderFavorites
					actionDisabled
					onToggleActionSelected={onToggleActionSelected}
				/>
			);

			const actionButton = container.querySelector(
				'button.slds-global-actions__favorites-action'
			);

			// Try to click disabled button
			await userEvent.click(actionButton);

			// Should not be called because button is disabled
			expect(onToggleActionSelected).not.toHaveBeenCalled();
		});
	});

	describe('SLDSGlobalHeaderNotifications', () => {
		it('handles notificationCount correctly when no value provided', () => {
			const { container } = renderGlobalHeader(
				<GlobalHeaderNotifications />
			);

			const badge = container.querySelector('.slds-notification-badge');
			expect(badge).toBeInTheDocument();
			expect(badge.textContent).toBe('');
		});

		it('handles notificationCount correctly when a value is provided', () => {
			const { container } = renderGlobalHeader(
				<GlobalHeaderNotifications notificationCount={5} />
			);

			const badge = container.querySelector('.slds-notification-badge');
			expect(badge).toBeInTheDocument();
			expect(badge.textContent).toBe('5');
		});

		it('displays large notification count', () => {
			const { container } = renderGlobalHeader(
				<GlobalHeaderNotifications notificationCount={99} />
			);

			const badge = container.querySelector('.slds-notification-badge');
			expect(badge.textContent).toBe('99');
		});
	});

	describe('SLDSGlobalHeaderSearch', () => {
		it('renders search component', () => {
			const { container } = renderGlobalHeader(
				<GlobalHeaderSearch
					combobox={
						<Combobox
							assistiveText={{ label: 'Search' }}
							id="search-combobox"
							labels={{ placeholder: 'Search Salesforce' }}
							options={[]}
						/>
					}
				/>
			);

			// Search should be in the global header
			const combobox = container.querySelector('#search-combobox');
			expect(combobox).toBeInTheDocument();
		});
	});

	describe('Multiple action components', () => {
		it('renders all action components', () => {
			const { container } = renderGlobalHeader(
				<>
					<GlobalHeaderFavorites />
					<GlobalHeaderTask />
					<GlobalHeaderHelp />
					<GlobalHeaderSetup />
					<GlobalHeaderNotifications />
					<GlobalHeaderProfile />
				</>
			);

			const actionsList = container.querySelector('ul.slds-global-actions');
			expect(actionsList).toBeInTheDocument();

			// All six actions render, including when grouped in a Fragment (the
			// GlobalHeader now recurses into Fragment children when sorting them).
			const actionItems = container.querySelectorAll('.slds-global-actions__item');
			expect(actionItems).toHaveLength(6);
		});

		it('handles empty children', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<GlobalHeader />
				</IconSettings>
			);

			const header = container.querySelector('header.slds-global-header_container');
			expect(header).toBeInTheDocument();

			const actionItems = container.querySelectorAll('.slds-global-actions__item');
			expect(actionItems).toHaveLength(0);
		});
	});

	describe('Navigation prop', () => {
		it('renders navigation when provided', () => {
			const navigation = <nav data-testid="custom-nav">Custom Navigation</nav>;
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<GlobalHeader navigation={navigation}>
						<GlobalHeaderProfile />
					</GlobalHeader>
				</IconSettings>
			);

			expect(screen.getByTestId('custom-nav')).toBeInTheDocument();
		});
	});
});
