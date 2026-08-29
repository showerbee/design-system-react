import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Breadcrumb from '../index';
import Dropdown from '../../menu-dropdown';
import IconSettings from '../../icon-settings';

describe('SLDSBreadcrumb', () => {
	const trail = [
		<a href="#entity" key="parent">
			Parent Entity
		</a>,
		<a href="#record" key="child">
			Parent Record Name
		</a>,
	];

	const renderBreadcrumb = (props) => {
		return render(
			<IconSettings iconPath="/assets/icons">
				<Breadcrumb trail={trail} {...props} />
			</IconSettings>
		);
	};

	describe('Basic Breadcrumb Render', () => {
		it('renders a nav with default assistive label', () => {
			renderBreadcrumb();
			const nav = screen.getByRole('navigation', { name: 'Breadcrumbs' });
			expect(nav).toBeInTheDocument();
		});

		it('renders an ordered list with the correct classes', () => {
			const { container } = renderBreadcrumb();
			const list = container.querySelector('ol');
			expect(list).toBeInTheDocument();
			expect(list).toHaveClass('slds-breadcrumb');
			expect(list).toHaveClass('slds-list_horizontal');
		});

		it('renders one list item per trail entry', () => {
			const { container } = renderBreadcrumb();
			const items = container.querySelectorAll('li.slds-breadcrumb__item');
			expect(items).toHaveLength(2);
		});

		it('renders the trail links with correct text and hrefs', () => {
			renderBreadcrumb();
			const parentLink = screen.getByRole('link', { name: 'Parent Entity' });
			const childLink = screen.getByRole('link', { name: 'Parent Record Name' });
			expect(parentLink).toHaveAttribute('href', '#entity');
			expect(childLink).toHaveAttribute('href', '#record');
		});
	});

	describe('Single Item Trail', () => {
		it('renders a single breadcrumb item', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Breadcrumb
						trail={[
							<a href="#entity" key="single">
								Parent Entity
							</a>,
						]}
					/>
				</IconSettings>
			);
			const items = container.querySelectorAll('li.slds-breadcrumb__item');
			expect(items).toHaveLength(1);
		});
	});

	describe('Assistive Text Props', () => {
		it('accepts a string assistiveText prop', () => {
			renderBreadcrumb({ assistiveText: 'You are here:' });
			expect(
				screen.getByRole('navigation', { name: 'You are here:' })
			).toBeInTheDocument();
		});

		it('accepts an assistiveText object with a label', () => {
			renderBreadcrumb({ assistiveText: { label: 'Custom Trail Label' } });
			expect(
				screen.getByRole('navigation', { name: 'Custom Trail Label' })
			).toBeInTheDocument();
		});
	});

	describe('Custom Styles', () => {
		it('applies styleContainer to the nav element', () => {
			renderBreadcrumb({
				styleContainer: { backgroundColor: 'rgb(243, 243, 243)' },
			});
			const nav = screen.getByRole('navigation');
			expect(nav).toHaveStyle({ backgroundColor: 'rgb(243, 243, 243)' });
		});
	});

	describe('Overflow Dropdown Menu', () => {
		it('renders the overflow dropdown as an additional breadcrumb item', () => {
			const { container } = renderBreadcrumb({
				id: 'my-breadcrumb',
				overflowDropdownMenu: (
					<Dropdown
						assistiveText={{ icon: 'More Options' }}
						iconCategory="utility"
						iconName="down"
						onSelect={vi.fn()}
						options={[
							{ label: 'Menu Item One', value: 'A0' },
							{ label: 'Menu Item Two', value: 'B0' },
						]}
					/>
				),
			});

			const items = container.querySelectorAll('li.slds-breadcrumb__item');
			// dropdown item + 2 trail items
			expect(items).toHaveLength(3);
			expect(screen.getByText('More Options')).toBeInTheDocument();
		});
	});
});
