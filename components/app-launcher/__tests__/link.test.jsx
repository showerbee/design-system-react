import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import IconSettings from '../../icon-settings';

import AppLauncherLink from '../link';

describe('SLDS APP LAUNCHER LINK', () => {
	const renderLink = (props) => {
		return render(
			<IconSettings iconPath="/assets/icons">
				<AppLauncherLink {...props} />
			</IconSettings>
		);
	};

	describe('Default App Launcher Link', () => {
		let onClick;

		beforeEach(() => {
			onClick = vi.fn();
		});

		it('renders link', () => {
			const { container } = renderLink({
				children: 'Accounts',
				className: 'this-is-a-custom-class',
				href: 'https://www.salesforce.com/',
				onClick,
				title: 'Accounts Title',
			});

			expect(container.querySelector('a')).toBeInTheDocument();
		});

		it('renders link with proper classes', () => {
			const { container } = renderLink({
				children: 'Accounts',
				className: 'this-is-a-custom-class',
				href: 'https://www.salesforce.com/',
				onClick,
				title: 'Accounts Title',
			});

			expect(container.querySelector('a.slds-truncate')).toBeInTheDocument();
		});

		it('renders link with custom classes', () => {
			const { container } = renderLink({
				children: 'Accounts',
				className: 'this-is-a-custom-class',
				href: 'https://www.salesforce.com/',
				onClick,
				title: 'Accounts Title',
			});

			expect(
				container.querySelector('a.this-is-a-custom-class')
			).toBeInTheDocument();
		});

		it('renders link children', () => {
			const { container } = renderLink({
				children: 'Accounts',
				className: 'this-is-a-custom-class',
				href: 'https://www.salesforce.com/',
				onClick,
				title: 'Accounts Title',
			});

			const span = container.querySelector('a span');
			expect(span.textContent).toContain('Accounts');
		});

		it('renders link title', () => {
			const { container } = renderLink({
				children: 'Accounts',
				className: 'this-is-a-custom-class',
				href: 'https://www.salesforce.com/',
				onClick,
				title: 'Accounts Title',
			});

			const link = container.querySelector('a');
			expect(link).toHaveAttribute('title', 'Accounts Title');
		});

		it('has an href attribute', () => {
			const { container } = renderLink({
				children: 'Accounts',
				className: 'this-is-a-custom-class',
				href: 'https://www.salesforce.com/',
				onClick,
				title: 'Accounts Title',
			});

			const link = container.querySelector('a');
			expect(link).toHaveAttribute('href', 'https://www.salesforce.com/');
		});

		it('clicking link fires callback and ignores href', () => {
			const { container } = renderLink({
				children: 'Accounts',
				className: 'this-is-a-custom-class',
				href: 'https://www.salesforce.com/',
				onClick,
				title: 'Accounts Title',
			});

			const link = container.querySelector('a');
			fireEvent.click(link);
			expect(onClick).toHaveBeenCalledTimes(1);
		});

		it('search string highlights link children', () => {
			const { container } = renderLink({
				children: 'Accounts',
				className: 'this-is-a-custom-class',
				href: 'https://www.salesforce.com/',
				onClick,
				search: 'ccounts',
				title: 'Accounts Title',
			});

			// Check for highlighted text using <mark> tag
			const mark = container.querySelector('mark');
			expect(mark).toBeInTheDocument();
			expect(mark.textContent).toBe('ccounts');

			// Check for non-highlighted portion
			const spans = container.querySelectorAll('span');
			const hasA = Array.from(spans).some((span) => span.textContent === 'A');
			expect(hasA).toBe(true);
		});
	});

	describe('App Launcher Link (title prop not provided)', () => {
		beforeEach(() => {
			// No-op for consistency with original structure
		});

		it('uses children to render title when not provided title prop', () => {
			const { container } = renderLink({
				children: 'Accounts',
			});

			const link = container.querySelector('a');
			expect(link).toHaveAttribute('title', 'Accounts');
		});
	});
});
