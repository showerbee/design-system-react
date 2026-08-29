import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Panel from '../index';
import PanelFilterGroup from '../filtering/group';
import PanelFilterList from '../filtering/list';
import PanelFilterListHeading from '../filtering/list-heading';
import IconSettings from '../../icon-settings';

describe('SLDSPanel', () => {
	const renderWithIcons = (children) =>
		render(<IconSettings iconPath="/assets/icons">{children}</IconSettings>);

	describe('Panel', () => {
		it('renders children within base panel classes', () => {
			const { container } = renderWithIcons(
				<Panel>
					<div>panel content</div>
				</Panel>
			);

			const panel = container.querySelector('.slds-panel');
			expect(panel).toBeInTheDocument();
			expect(panel).toHaveClass('slds-grid', 'slds-grid_vertical', 'slds-nowrap');
			expect(panel).not.toHaveClass('slds-panel_filters');
			expect(screen.getByText('panel content')).toBeInTheDocument();
		});

		it('adds the filters variant class when variant="filters"', () => {
			const { container } = renderWithIcons(
				<Panel variant="filters">
					<div>filters content</div>
				</Panel>
			);

			expect(container.querySelector('.slds-panel')).toHaveClass(
				'slds-panel_filters'
			);
		});

		it('applies a custom className alongside the default classes', () => {
			const { container } = renderWithIcons(
				<Panel className="my-custom-panel">
					<div>content</div>
				</Panel>
			);

			expect(container.querySelector('.slds-panel')).toHaveClass(
				'my-custom-panel'
			);
		});

		it('wraps children in a scrollable form-stacked body', () => {
			const { container } = renderWithIcons(
				<Panel>
					<div>body content</div>
				</Panel>
			);

			const body = container.querySelector(
				'.slds-panel > .slds-form_stacked'
			);
			expect(body).toBeInTheDocument();
			expect(body).toHaveClass('slds-scrollable_y', 'slds-grow');
			expect(body).toContainElement(screen.getByText('body content'));
		});
	});

	describe('Panel with filtering composition', () => {
		it('renders a realistic filters panel with header, list, and footer', () => {
			const onRequestClose = vi.fn();
			const onClickAdd = vi.fn();
			const onClickRemoveAll = vi.fn();

			renderWithIcons(
				<Panel variant="filters">
					<PanelFilterGroup
						variant="panel"
						heading="Filter"
						onRequestClose={onRequestClose}
						onClickAdd={onClickAdd}
						onClickRemoveAll={onClickRemoveAll}
					>
						<PanelFilterList>
							<div>Show Me filter</div>
						</PanelFilterList>
						<PanelFilterListHeading heading="Matching all these filters" />
					</PanelFilterGroup>
				</Panel>
			);

			// Header heading
			expect(
				screen.getByRole('heading', { level: 2, name: 'Filter' })
			).toBeInTheDocument();

			// List content rendered inside an <ol> per PanelFilterList
			expect(screen.getByText('Show Me filter').closest('ol')).not.toBeNull();

			// Filter list heading
			expect(
				screen.getByText('Matching all these filters')
			).toBeInTheDocument();

			// Footer buttons
			const addButton = screen.getByRole('button', { name: 'Add Filter' });
			const removeAllButton = screen.getByRole('button', {
				name: 'Remove All',
			});
			fireEvent.click(addButton);
			fireEvent.click(removeAllButton);
			expect(onClickAdd).toHaveBeenCalledTimes(1);
			expect(onClickRemoveAll).toHaveBeenCalledTimes(1);

			// Close button in header
			const closeButton = screen.getByRole('button', {
				name: 'Close Filter Panel',
			});
			fireEvent.click(closeButton);
			expect(onRequestClose).toHaveBeenCalledTimes(1);
		});

		it('shows cancel/save actions instead of heading when modified is true', () => {
			const onRequestCancel = vi.fn();
			const onRequestSave = vi.fn();

			renderWithIcons(
				<Panel variant="filters">
					<PanelFilterGroup
						variant="panel"
						modified
						cancelLabel="Cancel"
						saveLabel="Save"
						onRequestCancel={onRequestCancel}
						onRequestSave={onRequestSave}
					>
						<PanelFilterList>
							<div>a filter</div>
						</PanelFilterList>
					</PanelFilterGroup>
				</Panel>
			);

			expect(
				screen.queryByRole('heading', { level: 2 })
			).not.toBeInTheDocument();

			fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
			fireEvent.click(screen.getByRole('button', { name: 'Save' }));
			expect(onRequestCancel).toHaveBeenCalledTimes(1);
			expect(onRequestSave).toHaveBeenCalledTimes(1);
		});

		it('renders an error label when errorLabel is provided', () => {
			renderWithIcons(
				<Panel variant="filters">
					<PanelFilterGroup errorLabel="Something went wrong">
						<PanelFilterList>
							<div>a filter</div>
						</PanelFilterList>
					</PanelFilterGroup>
				</Panel>
			);

			const alert = screen.getByRole('alert');
			expect(alert).toHaveTextContent('Something went wrong');
		});
	});
});
