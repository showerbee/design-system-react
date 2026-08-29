import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import PopoverTooltip from '../index';
import Button from '../../button';
import IconSettings from '../../icon-settings';

describe('SLDSPopoverTooltip', () => {
	const defaultTextContent = 'This is some tooltip content.';
	const defaultProps = {
		content: <span>{defaultTextContent}</span>,
		hasStaticAlignment: true,
		id: 'myPopoverTooltip123',
	};

	const renderPopoverTooltip = (props = {}, children = <Button label="Hover Me" />) => {
		return render(
			<IconSettings iconPath="/assets/icons">
				<PopoverTooltip {...defaultProps} {...props}>
					{children}
				</PopoverTooltip>
			</IconSettings>
		);
	};

	afterEach(() => {
		document.querySelectorAll('.slds-popover_tooltip').forEach((el) => {
			if (el.parentNode) {
				el.parentNode.removeChild(el);
			}
		});
	});

	describe('Basic PopoverTooltip Props Render', () => {
		it('renders the trigger element', () => {
			renderPopoverTooltip();
			const trigger = screen.getByRole('button', { name: 'Hover Me' });
			expect(trigger).toBeInTheDocument();
		});

		it('is not open initially', () => {
			renderPopoverTooltip();
			expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
		});
	});

	describe('Opening and closing via hover', () => {
		it('shows tooltip content on mouse enter', async () => {
			renderPopoverTooltip({ hoverOpenDelay: 0 });
			const trigger = screen.getByRole('button', { name: 'Hover Me' });

			fireEvent.mouseEnter(trigger);

			await waitFor(() => {
				const tooltip = screen.getByRole('tooltip');
				expect(tooltip).toBeInTheDocument();
				expect(tooltip).toHaveTextContent(defaultTextContent);
			});
		});

		it('closes tooltip on mouse leave', async () => {
			renderPopoverTooltip({ hoverOpenDelay: 0, hoverCloseDelay: 0 });
			const trigger = screen.getByRole('button', { name: 'Hover Me' });

			fireEvent.mouseEnter(trigger);

			await waitFor(() => {
				expect(screen.getByRole('tooltip')).toBeInTheDocument();
			});

			fireEvent.mouseLeave(trigger, { relatedTarget: document.body });

			await waitFor(() => {
				expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
			});
		});
	});

	describe('Controlled via isOpen prop', () => {
		it('renders open immediately when isOpen is true', async () => {
			renderPopoverTooltip({ isOpen: true });

			await waitFor(() => {
				const tooltip = screen.getByRole('tooltip');
				expect(tooltip).toBeInTheDocument();
				expect(tooltip).toHaveTextContent(defaultTextContent);
			});
		});

		it('does not open on hover when isOpen is false', async () => {
			renderPopoverTooltip({ isOpen: false });
			const trigger = screen.getByRole('button', { name: 'Hover Me' });

			fireEvent.mouseEnter(trigger);

			await act(async () => {
				await new Promise((resolve) => {
					setTimeout(resolve, 60);
				});
			});

			expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
		});
	});

	describe('aria-describedby wiring', () => {
		it('adds aria-describedby to trigger once open', async () => {
			renderPopoverTooltip({ isOpen: true, id: 'described-by-tooltip' });
			const trigger = screen.getByRole('button', { name: 'Hover Me' });

			await waitFor(() => {
				expect(trigger).toHaveAttribute('aria-describedby', 'described-by-tooltip');
			});
		});

		it('has no aria-describedby while closed', () => {
			renderPopoverTooltip();
			const trigger = screen.getByRole('button', { name: 'Hover Me' });
			expect(trigger).not.toHaveAttribute('aria-describedby');
		});
	});

	describe('Alignment prop', () => {
		it('applies the nubbin class matching the align prop', async () => {
			renderPopoverTooltip({ isOpen: true, align: 'bottom' });

			await waitFor(() => {
				const tooltip = screen.getByRole('tooltip');
				expect(tooltip).toHaveClass('slds-nubbin_top');
			});
		});
	});

	describe('Theme prop', () => {
		it('applies error theme class', async () => {
			renderPopoverTooltip({ isOpen: true, theme: 'error' });

			await waitFor(() => {
				const tooltip = screen.getByRole('tooltip');
				expect(tooltip).toHaveClass('slds-theme_error');
			});
		});
	});

	describe('Custom trigger', () => {
		it('renders with a custom child trigger', () => {
			renderPopoverTooltip({}, <button type="button">Custom Trigger</button>);
			const trigger = screen.getByRole('button', { name: 'Custom Trigger' });
			expect(trigger).toBeInTheDocument();
		});
	});

	describe('onClickTrigger callback', () => {
		it('calls onClickTrigger when learnMore variant trigger is clicked', () => {
			const onClickTrigger = vi.fn();
			render(
				<IconSettings iconPath="/assets/icons">
					<PopoverTooltip
						{...defaultProps}
						variant="learnMore"
						onClickTrigger={onClickTrigger}
					/>
				</IconSettings>
			);

			const link = screen.getByRole('link');
			fireEvent.click(link);

			expect(onClickTrigger).toHaveBeenCalledTimes(1);
		});
	});
});
