import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Navigation from '../index';
import IconSettings from '../../icon-settings';

describe('SLDSNavigation', () => {
	const categories = [
		{
			id: 'reports',
			label: 'Reports',
			items: [
				{ id: 'recent', label: 'Recent', url: '#recent' },
				{ id: 'created-by-me', label: 'Created by Me', url: '#created' },
			],
		},
		{
			id: 'folders',
			label: 'Folders',
			items: [{ id: 'my-folders', label: 'My Folders' }],
		},
	];

	const renderNavigation = (props) =>
		render(
			<IconSettings iconPath="/assets/icons">
				<Navigation id="sample-navigation" categories={categories} {...props} />
			</IconSettings>
		);

	describe('Basic render', () => {
		it('renders a nav element with slds-nav-vertical class', () => {
			const { container } = renderNavigation();
			const nav = container.querySelector('nav#sample-navigation');
			expect(nav).toBeInTheDocument();
			expect(nav).toHaveClass('slds-nav-vertical');
		});

		it('renders a section, title, and list per category', () => {
			const { container } = renderNavigation();
			const sections = container.querySelectorAll('.slds-nav-vertical__section');
			expect(sections).toHaveLength(2);

			expect(screen.getByText('Reports')).toBeInTheDocument();
			expect(screen.getByText('Folders')).toBeInTheDocument();

			sections.forEach((section) => {
				expect(section.querySelector('h2.slds-nav-vertical__title')).toBeInTheDocument();
				expect(section.querySelector('ul')).toBeInTheDocument();
			});
		});

		it('renders each item as a link with the correct structure', () => {
			const { container } = renderNavigation();
			const items = container.querySelectorAll('li.slds-nav-vertical__item');
			expect(items).toHaveLength(3);

			items.forEach((item) => {
				expect(item.querySelector('a.slds-nav-vertical__action')).toBeInTheDocument();
			});

			expect(container.querySelector('a[data-id="recent"]')).toHaveAttribute(
				'href',
				'#recent'
			);
			expect(container.querySelector('a[data-id="my-folders"]')).toHaveAttribute(
				'href',
				'#'
			);
		});
	});

	describe('selectedId prop', () => {
		it('marks the matching item as active with aria-current', () => {
			const { container } = renderNavigation({ selectedId: 'my-folders' });

			const selectedItem = container.querySelector('li.slds-is-active');
			expect(selectedItem).toBeInTheDocument();
			expect(selectedItem.querySelector('a[data-id="my-folders"]')).toBeInTheDocument();

			const selectedLink = container.querySelector('a[data-id="my-folders"]');
			expect(selectedLink).toHaveAttribute('aria-current', 'true');

			const otherLink = container.querySelector('a[data-id="recent"]');
			expect(otherLink).not.toHaveAttribute('aria-current');
		});

		it('defaults to the first item of the first category when not provided', () => {
			const { container } = renderNavigation();
			const selectedItem = container.querySelector('li.slds-is-active');
			expect(selectedItem.querySelector('a[data-id="recent"]')).toBeInTheDocument();
		});
	});

	describe('onSelect callback', () => {
		it('fires onSelect with the clicked item when clicked', () => {
			const onSelect = vi.fn();
			const { container } = renderNavigation({ onSelect });

			const link = container.querySelector('a[data-id="created-by-me"]');
			fireEvent.click(link);

			expect(onSelect).toHaveBeenCalledTimes(1);
			expect(onSelect).toHaveBeenCalledWith(
				expect.any(Object),
				expect.objectContaining({
					item: expect.objectContaining({ id: 'created-by-me', label: 'Created by Me' }),
				})
			);
		});

		it('prevents default navigation for items without a url', () => {
			const onSelect = vi.fn();
			const { container } = renderNavigation({ onSelect });

			const link = container.querySelector('a[data-id="my-folders"]');
			fireEvent.click(link);

			expect(onSelect).toHaveBeenCalledTimes(1);
			expect(onSelect.mock.calls[0][0].defaultPrevented).toBe(true);
		});
	});
});
