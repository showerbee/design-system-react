import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import IconSettings from '../../icon-settings';
import AppLauncherLink from '../link';
import AppLauncherTile from '../tile';
import AppLauncherExpandableSection from '../expandable-section';

describe('SLDS APP LAUNCHER EXPANDABLE SECTION', () => {
	const defaultSectionProps = {
		title: 'All Items',
	};

	const defaultChildren = [
		<AppLauncherTile key="asdf" title="Marketing Cloud" />,
		<AppLauncherTile key="qwer" title="Support Cloud" />,
	];

	const linkChildren = [
		<AppLauncherLink key="asdf">Accounts</AppLauncherLink>,
		<AppLauncherLink key="qwer">Announcements</AppLauncherLink>,
	];

	const createSection = (props, children) => (
		<AppLauncherExpandableSection {...defaultSectionProps} {...props}>
			{children}
		</AppLauncherExpandableSection>
	);

	const renderSection = (props, children = defaultChildren) => {
		return render(
			<IconSettings iconPath="/assets/icons">
				{createSection(props, children)}
			</IconSettings>
		);
	};

	describe('App Launcher Expandable Section', () => {
		let onToggleOpen;

		beforeEach(() => {
			onToggleOpen = vi.fn();
		});

		it('section exists', () => {
			const { container } = renderSection({
				assistiveText: { toggleSection: 'Collapse Section' },
				onToggleOpen,
				title: 'ALL THE ITEMS!',
			});

			expect(container.querySelector('.slds-section')).toBeInTheDocument();
		});

		it('section has "slds-is-open" class when open', () => {
			const { container } = renderSection({
				assistiveText: { toggleSection: 'Collapse Section' },
				onToggleOpen,
				title: 'ALL THE ITEMS!',
			});

			expect(
				container.querySelector('.slds-section.slds-is-open')
			).toBeInTheDocument();
		});

		it('section has a title', () => {
			const { container } = renderSection({
				assistiveText: { toggleSection: 'Collapse Section' },
				onToggleOpen,
				title: 'ALL THE ITEMS!',
			});

			expect(
				container.querySelector('.slds-section__title')
			).toBeInTheDocument();
		});

		it('ul has proper classes', () => {
			const { container } = renderSection({
				assistiveText: { toggleSection: 'Collapse Section' },
				onToggleOpen,
				title: 'ALL THE ITEMS!',
			});

			const ul = container.querySelector(
				'ul.slds-grid.slds-grid_pull-padded.slds-wrap'
			);
			expect(ul).toBeInTheDocument();
		});

		it('li exists', () => {
			const { container } = renderSection({
				assistiveText: { toggleSection: 'Collapse Section' },
				onToggleOpen,
				title: 'ALL THE ITEMS!',
			});

			const lis = container.querySelectorAll('li');
			expect(lis).toHaveLength(2);
		});

		it('renders li with proper classes', () => {
			const { container } = renderSection({
				assistiveText: { toggleSection: 'Collapse Section' },
				onToggleOpen,
				title: 'ALL THE ITEMS!',
			});

			const li = container.querySelector('li');
			expect(li).toHaveClass('slds-p-horizontal_small');
			expect(li).toHaveClass('slds-size_1-of-1');
			expect(li).toHaveClass('slds-medium-size_1-of-3');
		});

		it('renders custom section title', () => {
			const { container } = renderSection({
				assistiveText: { toggleSection: 'Collapse Section' },
				onToggleOpen,
				title: 'ALL THE ITEMS!',
			});

			const title = container.querySelector('h3 .slds-truncate');
			expect(title).toBeInTheDocument();
			expect(title.textContent).toBe('ALL THE ITEMS!');
		});

		it('renders custom toggle assistive text', () => {
			const { container } = renderSection({
				assistiveText: { toggleSection: 'Collapse Section' },
				onToggleOpen,
				title: 'ALL THE ITEMS!',
			});

			const assistiveText = container.querySelector(
				'h3 span.slds-assistive-text'
			);
			expect(assistiveText).toBeInTheDocument();
			expect(assistiveText.textContent).toBe('Collapse Section');
		});

		it('toggling section fires callback', () => {
			const { container } = renderSection({
				assistiveText: { toggleSection: 'Collapse Section' },
				onToggleOpen,
				title: 'ALL THE ITEMS!',
			});

			const button = container.querySelector('h3 button.slds-button');
			fireEvent.click(button);
			expect(onToggleOpen).toHaveBeenCalledTimes(1);
		});
	});

	describe('App Launcher Expandable Section (non-collapsible) with links', () => {
		beforeEach(() => {
			// No-op for consistency with original structure
		});

		it('does not render toggle if non-collapsible is true', () => {
			const { container } = renderSection({ nonCollapsible: true }, linkChildren);

			// NOTE: Original test checked for absence of specific button classes
			// We check that toggle button doesn't exist when non-collapsible
			const toggleButton = container.querySelector(
				'h3 button.slds-button.slds-button_icon'
			);
			expect(toggleButton).not.toBeInTheDocument();
		});

		it('renders li with proper classes', () => {
			const { container } = renderSection({ nonCollapsible: true }, linkChildren);

			const li = container.querySelector('li');
			expect(li).toHaveClass('slds-col_padded');
			expect(li).toHaveClass('slds-p-vertical_xx-small');
			expect(li).toHaveClass('slds-size_1-of-5');
		});
	});

	describe('App Launcher Expandable Section (closed)', () => {
		beforeEach(() => {
			// No-op for consistency with original structure
		});

		it('section does not have "slds-is-open" class when closed', () => {
			const { container } = renderSection({
				isOpen: false,
			});

			const closedSection = container.querySelectorAll(
				'.slds-section.slds-is-open'
			);
			expect(closedSection).toHaveLength(0);
		});
	});
});
