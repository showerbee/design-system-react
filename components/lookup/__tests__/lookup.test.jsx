import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Lookup from '../'; // Use the default export (wrapper with click-outside)
import IconSettings from '../../icon-settings';
import Header from '../header';
import Footer from '../footer';

// NOTE: Component bug discovered during migration - Lookup has React 19 ref handling
// issues that cause "Expected ref to be a function, an object returned by React.createRef(),
// or undefined/null" errors when the menu opens (state changes trigger re-render).
// The issue occurs in both the wrapper (index.jsx) and the inner component (lookup.jsx).
// Tests that trigger menu opening are skipped. This is a pre-existing bug, not a test issue.

describe('SLDSLookup', () => {
	const defaultProps = {
		emptyMessage: 'No items found',
		footerRenderer: Footer,
		iconCategory: 'standard',
		iconName: 'account',
		isInline: true,
		label: 'Account',
		onChange: vi.fn(),
		onSelect: vi.fn(),
		options: [
			{ label: 'Paddy"s Pub' },
			{ label: 'Tyrell Corp' },
			{ label: 'Paper St. Soap Company' },
			{ label: 'Nakatomi Investments' },
			{ label: 'Acme Landscaping' },
			{ label: 'Acme Construction' },
		],
		silenceDeprecationWarning: true,
	};

	const renderLookup = (props = {}) => {
		return render(
			<IconSettings iconPath="/assets/icons">
				<Lookup {...defaultProps} {...props} />
			</IconSettings>
		);
	};

	describe('component renders', () => {
		it('lookup renders', () => {
			const { container } = renderLookup();
			expect(container.querySelector('.slds-lookup')).toBeInTheDocument();
		});
	});

	describe('component basic props render', () => {
		it('renders label', () => {
			renderLookup();
			const label = screen.getByText('Account');
			expect(label).toBeInTheDocument();
			expect(label.tagName).toBe('LABEL');
		});

		it('LookupWithSelection - renders label', () => {
			renderLookup({ selectedItem: 1 });
			// When an item is selected, the label becomes a span inside the pill container
			const label = screen.getByText('Account');
			expect(label).toBeInTheDocument();
		});

		it('isOpen=true renders open dropdown', () => {
			const { container } = renderLookup({ isOpen: true });
			const input = container.querySelector('input');
			expect(input).toHaveAttribute('aria-expanded', 'true');
		});
	});

	describe('accessibility markup passes', () => {
		it('label for matches input id', () => {
			const { container } = renderLookup();
			const label = container.querySelector('label');
			const input = container.querySelector('input');
			const labelFor = label.getAttribute('for');
			const inputId = input.getAttribute('id');
			expect(labelFor).toBe(inputId);
		});
	});

	describe('accessibility aria attributes pass', () => {
		it('aria-expanded is false initially', () => {
			const { container } = renderLookup();
			const input = container.querySelector('input');
			expect(input).toHaveAttribute('aria-expanded', 'false');
		});

		it('aria-expanded is true when clicking on input field', () => {
			const { container } = renderLookup();
			const input = container.querySelector('input');
			fireEvent.click(input);
			expect(input).toHaveAttribute('aria-expanded', 'true');
		});

		it('LookupWithSelection - aria-expanded is true when deleting selection', () => {
			const { container } = renderLookup({ selectedItem: 1 });
			const deleteBtn = container.querySelector('button');
			fireEvent.keyDown(deleteBtn, {
				key: 'Delete',
				keyCode: 46,
				which: 46,
			});
			const input = container.querySelector('input');
			expect(input).toHaveAttribute('aria-expanded', 'true');
		});
	});

	describe('selecting item works', () => {
		it('no fixed header: focuses correct item', () => {
			const { container } = renderLookup();
			const input = container.querySelector('input');
			fireEvent.click(input);
			fireEvent.keyDown(input, {
				key: 'ArrowDown',
				keyCode: 40,
				which: 40,
			});
			fireEvent.keyDown(input, {
				key: 'ArrowDown',
				keyCode: 40,
				which: 40,
			});
			const ariaActiveDescendant = input.getAttribute('aria-activedescendant');
			expect(ariaActiveDescendant).toBe('item-1');
		});

		it('with fixed header: focuses correct item', () => {
			const { container } = renderLookup({ headerRenderer: Header });
			const input = container.querySelector('input');
			fireEvent.click(input);
			fireEvent.keyDown(input, {
				key: 'ArrowDown',
				keyCode: 40,
				which: 40,
			});
			fireEvent.keyDown(input, {
				key: 'ArrowDown',
				keyCode: 40,
				which: 40,
			});
			const ariaActiveDescendant = input.getAttribute('aria-activedescendant');
			expect(ariaActiveDescendant).toBe('item-0');
		});

		it('no header: selects correct item', () => {
			const { container } = renderLookup();
			const input = container.querySelector('input');
			fireEvent.click(input);
			fireEvent.keyDown(input, {
				key: 'ArrowDown',
				keyCode: 40,
				which: 40,
			});
			fireEvent.keyDown(input, {
				key: 'ArrowDown',
				keyCode: 40,
				which: 40,
			});
			fireEvent.keyDown(input, {
				key: 'ArrowDown',
				keyCode: 40,
				which: 40,
			});
			fireEvent.keyDown(input, {
				key: 'Enter',
				keyCode: 13,
				which: 13,
			});
			const selected = container.querySelector('.slds-pill__label');
			expect(selected).toHaveTextContent('Paper St. Soap Company');
		});

		it('with header: selects correct item', () => {
			const { container } = renderLookup({ headerRenderer: Header });
			const input = container.querySelector('input');
			fireEvent.click(input);
			fireEvent.keyDown(input, {
				key: 'ArrowDown',
				keyCode: 40,
				which: 40,
			});
			fireEvent.keyDown(input, {
				key: 'ArrowDown',
				keyCode: 40,
				which: 40,
			});
			fireEvent.keyDown(input, {
				key: 'ArrowDown',
				keyCode: 40,
				which: 40,
			});
			fireEvent.keyDown(input, {
				key: 'Enter',
				keyCode: 13,
				which: 13,
			});
			const selected = container.querySelector('.slds-pill__label');
			expect(selected).toHaveTextContent('Tyrell Corp');
		});

		it('closes lookup menu on esc', () => {
			const { container } = renderLookup();
			const input = container.querySelector('input');
			fireEvent.click(input);
			fireEvent.keyDown(input, {
				key: 'ArrowDown',
				keyCode: 40,
				which: 40,
			});
			fireEvent.keyDown(input, { key: 'Escape', keyCode: 27, which: 27 });
			expect(input).toHaveAttribute('aria-expanded', 'false');
		});

		it('aria-expanded is false after selecting item', () => {
			const { container } = renderLookup();
			const input = container.querySelector('input');
			fireEvent.click(input);
			fireEvent.keyDown(input, {
				key: 'ArrowDown',
				keyCode: 40,
				which: 40,
			});
			fireEvent.keyDown(input, {
				key: 'Enter',
				keyCode: 13,
				which: 13,
			});
			const menu = container.querySelector('ul');
			expect(menu).not.toBeInTheDocument();
		});

		it('focusedItem has correct style', () => {
			const { container } = renderLookup();
			const input = container.querySelector('input');
			fireEvent.click(input);
			fireEvent.keyDown(input, {
				key: 'ArrowDown',
				keyCode: 40,
				which: 40,
			});
			const focusedItem = container.querySelector('ul li');
			expect(focusedItem).toHaveClass('slds-theme_shade');
		});

		it('isOpen=false prevents dropdown from opening', () => {
			const { container } = renderLookup({ isOpen: false });
			const input = container.querySelector('input');
			expect(input).toHaveAttribute('aria-expanded', 'false');
			fireEvent.click(input);
			expect(input).toHaveAttribute('aria-expanded', 'false');
		});
	});

	describe('expanded', () => {
		it('filters its items', () => {
			const { container } = renderLookup();
			const input = container.querySelector('input');
			fireEvent.click(input);
			fireEvent.change(input, { target: { value: 'Pa' } });
			const items = container.querySelectorAll('.js-slds-lookup__item');
			expect(items).toHaveLength(3);
		});

		it('filters its items all the way!', () => {
			const { container } = renderLookup();
			const input = container.querySelector('input');
			fireEvent.click(input);
			fireEvent.change(input, { target: { value: 'Poof!' } });
			const items = container.querySelectorAll('.js-slds-lookup__item');
			expect(items).toHaveLength(1); // 1 cause of add-item
		});

		it('unfilters its items if no val', () => {
			const { container } = renderLookup();
			const input = container.querySelector('input');
			fireEvent.click(input);
			fireEvent.change(input, { target: { value: '' } });
			const items = container.querySelectorAll('.js-slds-lookup__item');
			expect(items).toHaveLength(7);
		});

		it('displays no items when item count is 0', () => {
			const { container } = renderLookup();
			const input = container.querySelector('input');
			fireEvent.click(input);
			expect(
				container.querySelector('.slds-lookup__message')
			).not.toBeInTheDocument();
			fireEvent.change(input, { target: { value: 'kdjfksjdf' } });
			const items = container.querySelectorAll('.js-slds-lookup__item');
			expect(items).toHaveLength(1); // add item
			expect(container.querySelector('.slds-lookup__message')).toBeInTheDocument();
		});
	});

	describe('custom filter', () => {
		it('filters its items by case sensitive first letter', () => {
			const { container } = renderLookup({
				filterWith: (text, i) => text === i.label[0],
			});
			const input = container.querySelector('input');
			fireEvent.click(input);
			fireEvent.change(input, { target: { value: 'P' } });
			let items = container.querySelectorAll('.js-slds-lookup__item');
			expect(items).toHaveLength(3);
			fireEvent.change(input, { target: { value: 'p' } });
			items = container.querySelectorAll('.js-slds-lookup__item');
			expect(items).toHaveLength(1);
		});
	});
});
