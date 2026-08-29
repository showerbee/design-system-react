import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Grid from '../index';

describe('SLDSGrid', () => {
	describe('Basic Grid Props Render', () => {
		it('renders slds-grid class with children', () => {
			const { container } = render(
				<Grid>
					<div>Content</div>
				</Grid>
			);
			const grid = container.firstChild;
			expect(grid).toHaveClass('slds-grid');
			expect(screen.getByText('Content')).toBeInTheDocument();
		});

		it('renders additional className alongside slds-grid', () => {
			const { container } = render(<Grid className="my-custom-grid" />);
			const grid = container.firstChild;
			expect(grid).toHaveClass('slds-grid');
			expect(grid).toHaveClass('my-custom-grid');
		});

		it('renders flavor as a slds-grid_{flavor} modifier class', () => {
			const { container } = render(<Grid flavor="vertical" />);
			const grid = container.firstChild;
			expect(grid).toHaveClass('slds-grid');
			expect(grid).toHaveClass('slds-grid_vertical');
		});

		it('does not render a flavor modifier class when flavor is not provided', () => {
			const { container } = render(<Grid />);
			const grid = container.firstChild;
			expect(grid).toHaveClass('slds-grid');
			expect(grid.className).not.toMatch(/slds-grid_/);
		});
	});

	describe('Grid.Column Props Render', () => {
		it('renders slds-col class with children', () => {
			const { container } = render(
				<Grid>
					<Grid.Column>
						<span>Column content</span>
					</Grid.Column>
				</Grid>
			);
			const column = container.querySelector('.slds-col');
			expect(column).toBeInTheDocument();
			expect(screen.getByText('Column content')).toBeInTheDocument();
		});

		it('renders additional className alongside slds-col', () => {
			const { container } = render(
				<Grid>
					<Grid.Column className="slds-size_1-of-2" />
				</Grid>
			);
			const column = container.querySelector('.slds-col');
			expect(column).toHaveClass('slds-size_1-of-2');
		});
	});

	describe('Grid with multiple columns', () => {
		it('renders a grid containing multiple slds-col children', () => {
			const { container } = render(
				<Grid flavor="pull-padded">
					<Grid.Column className="slds-size_1-of-3">
						<span>First</span>
					</Grid.Column>
					<Grid.Column className="slds-size_2-of-3">
						<span>Second</span>
					</Grid.Column>
				</Grid>
			);
			const grid = container.firstChild;
			expect(grid).toHaveClass('slds-grid');
			expect(grid).toHaveClass('slds-grid_pull-padded');

			const columns = container.querySelectorAll('.slds-col');
			expect(columns).toHaveLength(2);
			expect(screen.getByText('First')).toBeInTheDocument();
			expect(screen.getByText('Second')).toBeInTheDocument();
		});
	});
});
