import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Radio from '../index';
import IconSettings from '../../icon-settings';

describe('SLDSRadio', () => {
	const renderRadio = (props) => {
		return render(
			<IconSettings iconPath="/assets/icons">
				<Radio {...props} />
			</IconSettings>
		);
	};

	describe('Base variant', () => {
		it('associates the label with the input via htmlFor/id', () => {
			renderRadio({ id: 'radio-1', labels: { label: 'Option One' } });
			const radio = screen.getByLabelText('Option One');
			expect(radio).toBeInTheDocument();
			expect(radio).toHaveAttribute('type', 'radio');
			expect(radio).toHaveAttribute('id', 'radio-1');
		});

		it('renders unchecked by default', () => {
			renderRadio({ id: 'radio-2', labels: { label: 'Unchecked' } });
			const radio = screen.getByLabelText('Unchecked');
			expect(radio).not.toBeChecked();
		});

		it('renders checked when checked prop is true', () => {
			renderRadio({ id: 'radio-3', labels: { label: 'Checked' }, checked: true, onChange: vi.fn() });
			const radio = screen.getByLabelText('Checked');
			expect(radio).toBeChecked();
		});

		it('renders disabled state', () => {
			renderRadio({ id: 'radio-4', labels: { label: 'Disabled' }, disabled: true });
			const radio = screen.getByLabelText('Disabled');
			expect(radio).toBeDisabled();
		});

		it('calls onChange with checked data when clicked', () => {
			const onChange = vi.fn();
			renderRadio({ id: 'radio-6', labels: { label: 'Clickable' }, onChange });
			const radio = screen.getByLabelText('Clickable');

			fireEvent.click(radio);

			expect(onChange).toHaveBeenCalledTimes(1);
			const [, data] = onChange.mock.calls[0];
			expect(data).toEqual({ checked: true });
		});

		it('sets name and value attributes for grouping', () => {
			renderRadio({ id: 'radio-7', labels: { label: 'Grouped' }, name: 'my-group', value: 'option-a' });
			const radio = screen.getByLabelText('Grouped');
			expect(radio).toHaveAttribute('name', 'my-group');
			expect(radio).toHaveAttribute('value', 'option-a');
		});

		it('renders assistive text visually hidden alongside the visible label', () => {
			renderRadio({
				id: 'radio-8',
				labels: { label: 'Visible label' },
				assistiveText: { label: 'Assistive description' },
			});
			expect(screen.getByText('Assistive description')).toHaveClass('slds-assistive-text');
		});

		it('does not toggle off a checked, non-deselectable radio on click', () => {
			const onChange = vi.fn();
			renderRadio({
				id: 'radio-9',
				labels: { label: 'Sticky checked' },
				checked: true,
				onChange,
			});
			fireEvent.click(screen.getByLabelText('Sticky checked'));
			expect(onChange).not.toHaveBeenCalled();
		});

		it('fires onChange with checked:false when a checked deselectable radio is clicked', () => {
			const onChange = vi.fn();
			renderRadio({
				id: 'radio-10',
				labels: { label: 'Deselectable' },
				checked: true,
				deselectable: true,
				onChange,
			});
			fireEvent.click(screen.getByLabelText('Deselectable'));

			expect(onChange).toHaveBeenCalledTimes(1);
			expect(onChange.mock.calls[0][1]).toEqual({ checked: false });
		});
	});

	describe('Button-group variant', () => {
		it('renders as a button-styled radio with faux label', () => {
			const { container } = renderRadio({
				id: 'button-group-1',
				variant: 'button-group',
				labels: { label: 'Bold' },
			});
			expect(container.querySelector('.slds-radio_button')).toBeInTheDocument();
			const radio = screen.getByLabelText('Bold');
			expect(radio).toHaveAttribute('type', 'radio');
			expect(container.querySelector('.slds-radio_faux')).toHaveTextContent('Bold');
		});

		it('fires onChange when the button-group radio is clicked', () => {
			const onChange = vi.fn();
			renderRadio({
				id: 'button-group-2',
				variant: 'button-group',
				labels: { label: 'Italic' },
				onChange,
			});
			fireEvent.click(screen.getByLabelText('Italic'));
			expect(onChange).toHaveBeenCalledTimes(1);
		});
	});

	describe('Swatch variant', () => {
		it('renders a color swatch label associated with the input', () => {
			const { container } = renderRadio({
				id: 'swatch-1',
				variant: 'swatch',
				labels: { label: 'Red' },
				value: '#ff0000',
			});
			const radio = screen.getByLabelText('Red');
			expect(radio).toHaveAttribute('type', 'radio');
			expect(radio).toHaveAttribute('value', '#ff0000');
			expect(container.querySelector('label.slds-radio_button__label')).toBeInTheDocument();
		});
	});

	describe('Visual-picker variant', () => {
		it('renders visual picker markup with heading and label', () => {
			const { container } = renderRadio({
				id: 'visual-picker-1',
				variant: 'visual-picker',
				labels: { heading: 'Pick me', label: 'Option A' },
			});
			expect(container.querySelector('.slds-visual-picker')).toBeInTheDocument();
			expect(screen.getByText('Pick me')).toBeInTheDocument();
			expect(screen.getByText('Option A')).toBeInTheDocument();
		});

		it('applies vertical layout class when vertical is set', () => {
			const { container } = renderRadio({
				id: 'visual-picker-2',
				variant: 'visual-picker',
				labels: { label: 'Vertical picker' },
				vertical: true,
			});
			expect(container.querySelector('.slds-visual-picker_vertical')).toBeInTheDocument();
		});
	});
});
