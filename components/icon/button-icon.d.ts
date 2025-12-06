import React from 'react';

export interface ButtonIconProps {
	/** Icon category */
	category?: 'action' | 'custom' | 'doctype' | 'standard' | 'utility';
	/** Class names for SVG */
	className?: string | string[] | Record<string, boolean>;
	/** Disabled state */
	disabled?: boolean;
	/** Hint mode */
	hint?: boolean;
	/** SVG object override */
	icon?: Record<string, unknown>;
	/** Inverse colors */
	inverse?: boolean;
	/** Icon name */
	name?: string;
	/** Path override */
	path?: string;
	/** Position relative to label */
	position?: 'left' | 'right';
	/** Icon size */
	size?: 'x-small' | 'small' | 'medium' | 'large';
}

declare const ButtonIcon: React.FC<ButtonIconProps>;
export default ButtonIcon;
