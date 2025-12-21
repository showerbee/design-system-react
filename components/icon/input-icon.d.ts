import React from 'react';

export interface InputIconProps {
	/** aria-expanded attribute */
	'aria-expanded'?: boolean;
	/** aria-haspopup attribute */
	'aria-haspopup'?: boolean | 'dialog' | 'menu' | 'listbox' | 'tree' | 'grid';
	/** Assistive text for accessibility */
	assistiveText?: {
		icon?: string;
	};
	/** Ref callback for the button element */
	buttonRef?: (ref: HTMLButtonElement | null) => void;
	/** Icon category */
	category?: string;
	/** Icon position */
	iconPosition?: 'left' | 'right';
	/** Icon name */
	name?: string;
	/** Path to the icon */
	path?: string;
	/** Title attribute */
	title?: string;
	/** HTML type attribute for button */
	type?: 'button' | 'submit' | 'reset';
	/** Click handler */
	onClick?: (event: React.MouseEvent) => void;
	/** Variant styling */
	variant?: 'base' | 'combobox';
}

declare const InputIcon: React.FC<InputIconProps>;
export default InputIcon;
