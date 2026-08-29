import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Checkbox from '../index';
import IconSettings from '../../icon-settings';

describe('SLDSCheckbox', () => {
	const renderCheckbox = (props) => {
		return render(
			<IconSettings iconPath="/assets/icons">
				<Checkbox {...props} />
			</IconSettings>
		);
	};

	describe('Base variant', () => {
		it('associates the label with the input via htmlFor/id', () => {
			renderCheckbox({ id: 'checkbox-1', labels: { label: 'Accept terms' } });
			const checkbox = screen.getByLabelText('Accept terms');
			expect(checkbox).toBeInTheDocument();
			expect(checkbox).toHaveAttribute('type', 'checkbox');
			expect(checkbox).toHaveAttribute('id', 'checkbox-1');
		});

		it('renders unchecked by default', () => {
			renderCheckbox({ id: 'checkbox-2', labels: { label: 'Unchecked' } });
			const checkbox = screen.getByLabelText('Unchecked');
			expect(checkbox).not.toBeChecked();
		});

		it('renders checked when checked prop is true', () => {
			renderCheckbox({ id: 'checkbox-3', labels: { label: 'Checked' }, checked: true, onChange: vi.fn() });
			const checkbox = screen.getByLabelText('Checked');
			expect(checkbox).toBeChecked();
		});

		it('renders disabled state', () => {
			renderCheckbox({ id: 'checkbox-4', labels: { label: 'Disabled' }, disabled: true });
			const checkbox = screen.getByLabelText('Disabled');
			expect(checkbox).toBeDisabled();
		});

		it('renders required state with abbr marker', () => {
			const { container } = renderCheckbox({ id: 'checkbox-5', labels: { label: 'Required' }, required: true });
			const checkbox = screen.getByLabelText('Required');
			expect(checkbox).toBeRequired();
			expect(container.querySelector('abbr.slds-required')).toBeInTheDocument();
		});

		it('renders error text and marks the form element as errored', () => {
			const { container } = renderCheckbox({
				id: 'checkbox-6',
				labels: { label: 'With error' },
				errorText: 'This field is required',
			});
			expect(screen.getByText('This field is required')).toBeInTheDocument();
			expect(container.querySelector('.slds-has-error')).toBeInTheDocument();
		});

		it('calls onChange with checked data when clicked', () => {
			const onChange = vi.fn();
			renderCheckbox({ id: 'checkbox-7', labels: { label: 'Clickable' }, onChange });
			const checkbox = screen.getByLabelText('Clickable');

			fireEvent.click(checkbox);

			expect(onChange).toHaveBeenCalledTimes(1);
			const [, data] = onChange.mock.calls[0];
			expect(data).toEqual({ checked: true, indeterminate: false });
		});

		it('sets the indeterminate DOM property when indeterminate is true', () => {
			renderCheckbox({ id: 'checkbox-9', labels: { label: 'Indeterminate' }, indeterminate: true, checked: true, onChange: vi.fn() });
			const checkbox = screen.getByLabelText('Indeterminate');
			expect(checkbox.indeterminate).toBe(true);
		});
	});

	describe('Toggle variant', () => {
		it('renders toggle markup with on/off labels', () => {
			const { container } = renderCheckbox({
				id: 'toggle-1',
				variant: 'toggle',
				labels: { label: 'Toggle me', toggleEnabled: 'On', toggleDisabled: 'Off' },
			});
			expect(container.querySelector('.slds-checkbox_toggle')).toBeInTheDocument();
			expect(screen.getByText('Toggle me')).toBeInTheDocument();
			expect(screen.getByText('On')).toBeInTheDocument();
			expect(screen.getByText('Off')).toBeInTheDocument();
			const checkbox = container.querySelector('input#toggle-1');
			expect(checkbox).toHaveAttribute('type', 'checkbox');
			// Toggle's <label> wraps both the label text and the on/off state text,
			// so its accessible name includes all of them (not just the label prop).
			expect(screen.getByLabelText(/Toggle me/)).toBe(checkbox);
		});

		it('toggles via onChange when clicked', () => {
			const onChange = vi.fn();
			const { container } = renderCheckbox({
				id: 'toggle-2',
				variant: 'toggle',
				labels: { label: 'Toggle click' },
				checked: false,
				onChange,
			});
			const checkbox = container.querySelector('input#toggle-2');

			fireEvent.click(checkbox);

			expect(onChange).toHaveBeenCalledTimes(1);
			expect(onChange.mock.calls[0][1]).toEqual({ checked: true, indeterminate: false });
		});
	});

	describe('Button-group variant', () => {
		it('renders as a button-styled checkbox with faux label', () => {
			const { container } = renderCheckbox({
				id: 'button-group-1',
				variant: 'button-group',
				labels: { label: 'Bold' },
			});
			expect(container.querySelector('.slds-checkbox_button')).toBeInTheDocument();
			const checkbox = screen.getByLabelText('Bold');
			expect(checkbox).toHaveAttribute('type', 'checkbox');
			expect(container.querySelector('.slds-checkbox_faux')).toHaveTextContent('Bold');
		});

		it('fires onChange when the button-group checkbox is clicked', () => {
			const onChange = vi.fn();
			renderCheckbox({
				id: 'button-group-2',
				variant: 'button-group',
				labels: { label: 'Italic' },
				onChange,
			});
			fireEvent.click(screen.getByLabelText('Italic'));
			expect(onChange).toHaveBeenCalledTimes(1);
		});
	});

	describe('Visual-picker variant', () => {
		it('renders visual picker markup with heading and label', () => {
			const { container } = renderCheckbox({
				id: 'visual-picker-1',
				variant: 'visual-picker',
				labels: { heading: 'Pick me', label: 'Option A' },
			});
			expect(container.querySelector('.slds-visual-picker')).toBeInTheDocument();
			expect(screen.getByText('Pick me')).toBeInTheDocument();
			expect(screen.getByText('Option A')).toBeInTheDocument();
		});

		it('applies medium/large size classes', () => {
			const { container } = renderCheckbox({
				id: 'visual-picker-2',
				variant: 'visual-picker',
				labels: { label: 'Large picker' },
				size: 'large',
			});
			expect(container.querySelector('.slds-visual-picker_large')).toBeInTheDocument();
		});
	});
});
