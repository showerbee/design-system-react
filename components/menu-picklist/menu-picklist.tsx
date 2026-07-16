/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/**
 * @deprecated MenuPicklist is deprecated. Please use a read-only Combobox instead.
 */

import React, {
	useState,
	useRef,
	useCallback,
	useEffect,
	useMemo,
	useContext,
} from 'react';
import classNames from 'classnames';

import checkProps from './check-props';
import Dialog from '../utilities/dialog';
import Icon from '../icon';
import BaseList from '../utilities/menu-list';
import ListItemLabel from '../utilities/menu-list/item-label';

// The menu-list `List` accepts additional legacy consumer props (`onCancel`) and
// is passed a callback `ref` typed against the DOM element by historical callers.
// Alias to a permissive type here rather than widen the public MenuListProps.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const List = BaseList as unknown as React.ComponentType<any>;
// @ts-expect-error - Module declaration doesn't match relative import
import Pill from '../utilities/pill';

import EventUtil from '../../utilities/event';
import generateId from '../../utilities/generate-id';
import keyboardNavigate from '../../utilities/keyboard-navigate';
import KeyBuffer from '../../utilities/key-buffer';
import KEYS from '../../utilities/key-code';
import { MENU_PICKLIST } from '../../utilities/constants';
import { IconSettingsContext } from '../icon-settings';

import {
	MenuPicklistOption,
	MenuPicklistLabels,
	MenuPicklistSelectHandler,
	MenuPicklistRemoveHandler,
} from './types';

export interface MenuPicklistProps {
	/** Callback for button DOM reference */
	buttonRef?: (ref: HTMLButtonElement | null) => void;
	/** Additional CSS classes */
	className?: string;
	/** Renders checkmark icon on selected item */
	checkmark?: boolean;
	/** Disabled state */
	disabled?: boolean;
	/** Error message that highlights component as in error */
	errorText?: string;
	/** Unique ID for keyboard navigation and ARIA support */
	id?: string;
	/** Renders menu inline instead of in portal */
	isInline?: boolean;
	/** Form element label */
	label?: string;
	/** Text labels for internationalization */
	labels?: MenuPicklistLabels;
	/** Custom menu item renderer */
	listItemRenderer?: React.ComponentType;
	/** Callback when trigger button is clicked */
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	/** Callback when an item is selected */
	onSelect?: MenuPicklistSelectHandler;
	/** Callback when a pill is removed */
	onPillRemove?: MenuPicklistRemoveHandler;
	/** Menu item data */
	options: MenuPicklistOption[];
	/** Placeholder text when no items selected */
	placeholder?: string;
	/** Required field styling */
	required?: boolean;
	/** Current selected value */
	value?: string | number;
	/** Initial selected item index */
	initValueIndex?: number;
	/** Enable multiple selection */
	multiple?: boolean;
	/** Constrain to scroll parent */
	constrainToScrollParent?: boolean;
	/** Inherit target width */
	inheritTargetWidth?: boolean;
	/** Menu position */
	menuPosition?: 'absolute' | 'relative' | 'overflowBoundaryElement';
	/** ARIA describedby */
	'aria-describedby'?: string;
	/** Silence deprecation warning */
	silenceDeprecationWarning?: boolean;
}

interface NavigableItem {
	index: number;
	text: string;
}

interface NavigableItems extends Array<NavigableItem> {
	indexes: number[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	keyBuffer: any;
}

const itemIsSelectable = (item: MenuPicklistOption) =>
	item.type !== 'header' && item.type !== 'divider' && !item.disabled;

const getNavigableItems = (items: MenuPicklistOption[]): NavigableItems => {
	const navigableItems: NavigableItems = [] as unknown as NavigableItems;
	navigableItems.indexes = [];
	navigableItems.keyBuffer = new KeyBuffer();

	if (Array.isArray(items)) {
		items.forEach((item, index) => {
			if (itemIsSelectable(item)) {
				navigableItems.push({
					index,
					text: `${item.label}`.toLowerCase(),
				});
				navigableItems.indexes.push(index);
			}
		});
	}

	return navigableItems;
};

const defaultLabels: MenuPicklistLabels = {
	multipleOptionsSelected: 'Multiple Options Selected',
};

/**
 * @deprecated MenuPicklist is deprecated. Please use a read-only Combobox instead.
 *
 * The MenuPicklist component is a variant of the Lightning Design System Menu component.
 */
const MenuPicklist: React.FC<MenuPicklistProps> = ({
	buttonRef: buttonRefProp,
	className,
	checkmark = true,
	disabled = false,
	errorText,
	id: idProp,
	isInline = false,
	label,
	labels: labelsProp,
	listItemRenderer,
	onClick,
	onSelect,
	onPillRemove,
	options,
	placeholder = 'Select an Option',
	required = false,
	value,
	initValueIndex,
	multiple = false,
	constrainToScrollParent,
	inheritTargetWidth = true,
	menuPosition = 'absolute',
	'aria-describedby': ariaDescribedBy,
	silenceDeprecationWarning = false,
}) => {
	const iconSettings = useContext(IconSettingsContext);
	
	// Generate stable IDs
	const generatedId = useMemo(() => generateId(), []);
	const generatedErrorId = useMemo(() => (errorText ? generateId() : ''), [errorText]);
	const id = idProp || generatedId;
	const errorId = ariaDescribedBy || generatedErrorId;

	// Merge labels with defaults
	const labels = useMemo(
		() => ({ ...defaultLabels, ...labelsProp }),
		[labelsProp]
	);

	// Refs
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const listRef = useRef<HTMLUListElement | null>(null);
	const listItemsRef = useRef<Record<number, HTMLLIElement | null>>({});
	const isUnmountingRef = useRef(false);
	const clickEventNameRef = useRef(`SLDS${id}ClickEvent`);

	// Get index by value
	const getIndexByValue = useCallback(
		(val: string | number | undefined) => {
			if (val === undefined) return -1;
			const foundIndex = options.findIndex((opt) => opt.value === val);
			return foundIndex;
		},
		[options]
	);

	// State
	const [isOpen, setIsOpen] = useState(false);
	const [focusedIndex, setFocusedIndex] = useState(
		initValueIndex !== undefined ? initValueIndex : -1
	);
	const [selectedIndex, setSelectedIndex] = useState(() => {
		if (initValueIndex !== undefined) return initValueIndex;
		return getIndexByValue(value);
	});
	const [selectedIndices, setSelectedIndices] = useState<number[]>(() => {
		if (multiple) {
			const idx = getIndexByValue(value);
			return idx !== -1 ? [idx] : [];
		}
		return [];
	});
	const [triggerRendered, setTriggerRendered] = useState(false);

	// Navigable items
	const navigableItems = useMemo(() => getNavigableItems(options), [options]);

	// Check props on mount
	useEffect(() => {
		if (!silenceDeprecationWarning) {
			console.warn(
				'MenuPicklist is deprecated. Please use a read-only Combobox instead.'
			);
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(checkProps as any)(MENU_PICKLIST, {
			checkmark,
			disabled,
			errorText,
			id,
			isInline,
			label,
			labels,
			listItemRenderer,
			onClick,
			onSelect,
			onPillRemove,
			options,
			placeholder,
			required,
			value,
			initValueIndex,
			multiple,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Update selected index when value changes
	useEffect(() => {
		if (!multiple) {
			setSelectedIndex(getIndexByValue(value));
		} else {
			const idx = getIndexByValue(value);
			if (idx !== -1 && !selectedIndices.includes(idx)) {
				setSelectedIndices((prev) => [...prev, idx]);
			}
		}
	}, [value, multiple, getIndexByValue, selectedIndices]);

	// Close on outside click
	useEffect(() => {
		const closeOnClick = (event: MouseEvent) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			if (!(event as any)[clickEventNameRef.current] && isOpen) {
				setIsOpen(false);
			}
		};

		window.addEventListener('click', closeOnClick, false);
		return () => {
			isUnmountingRef.current = true;
			window.removeEventListener('click', closeOnClick, false);
		};
	}, [isOpen]);

	// Get list item ID
	const getListItemId = useCallback(
		(index: number | undefined) => {
			if (index !== undefined) {
				return `${id}-item-${index}`;
			}
			return undefined;
		},
		[id]
	);

	// Set focus to button
	const setFocus = useCallback(() => {
		if (!isUnmountingRef.current && buttonRef.current) {
			buttonRef.current.focus();
		}
	}, []);

	// Handle close
	const handleClose = useCallback(() => {
		setIsOpen(false);
	}, []);

	// Handle cancel
	const handleCancel = useCallback(() => {
		setFocus();
		handleClose();
	}, [setFocus, handleClose]);

	// Focus menu item
	const focusMenuItem = useCallback((menuItem: HTMLElement) => {
		const anchor = menuItem.getElementsByTagName('a')[0];
		if (anchor) {
			anchor.focus();
		}
	}, []);

	// Scroll to menu item
	const scrollToMenuItem = useCallback(
		(menu: HTMLElement | null, menuItem: HTMLElement) => {
			if (menu && menuItem) {
				const menuHeight = menu.offsetHeight;
				const menuTop = menu.scrollTop;
				const menuItemTop = menuItem.offsetTop - menu.offsetTop;
				if (menuItemTop < menuTop) {
					menu.scrollTop = menuItemTop;
				} else {
					const menuBottom = menuTop + menuHeight + menu.offsetTop;
					const menuItemBottom =
						menuItemTop + menuItem.offsetHeight + menu.offsetTop;
					if (menuItemBottom > menuBottom) {
						menu.scrollTop = menuItemBottom - menuHeight - menu.offsetTop;
					}
				}
			}
		},
		[]
	);

	// Handle keyboard focus
	const handleKeyboardFocus = useCallback(
		(newFocusedIndex: number) => {
			if (focusedIndex !== newFocusedIndex) {
				setFocusedIndex(newFocusedIndex);
			}
			const menuItemId = getListItemId(newFocusedIndex);
			const menuItem = menuItemId ? document.getElementById(menuItemId) : null;
			if (menuItem) {
				focusMenuItem(menuItem);
				const menu = buttonRef.current?.parentElement?.querySelector(
					'ul.dropdown__list'
				) as HTMLElement | null;
				scrollToMenuItem(menu, menuItem);
			}
		},
		[focusedIndex, getListItemId, focusMenuItem, scrollToMenuItem]
	);

	// Handle select
	const handleSelect = useCallback(
		(index: number) => {
			if (!multiple) {
				setSelectedIndex(index);
				handleClose();
				setFocus();
			} else {
				setSelectedIndices((prev) => {
					if (prev.includes(index)) {
						return prev.filter((i) => i !== index);
					}
					return [...prev, index];
				});
			}

			if (onSelect) {
				const option = options[index];
				onSelect(option, { option, optionIndex: index });
			}
		},
		[multiple, handleClose, setFocus, onSelect, options]
	);

	// Handle keyboard navigate
	const handleKeyboardNavigate = useCallback(
		({
			keyCode,
			isOpenState,
			toggleOpen,
		}: {
			keyCode: number;
			isOpenState: boolean;
			toggleOpen: () => void;
		}) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(keyboardNavigate as any)({
				componentContext: {
					state: { focusedIndex },
				},
				currentFocusedIndex: focusedIndex,
				isOpen: isOpenState,
				keyCode,
				navigableItems,
				onFocus: handleKeyboardFocus,
				onSelect: handleSelect,
				toggleOpen,
			});
		},
		[focusedIndex, navigableItems, handleKeyboardFocus, handleSelect]
	);

	// Toggle open
	const toggleOpen = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	// Handle click
	const handleClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(event.nativeEvent as any)[clickEventNameRef.current] = true;

			if (!isOpen) {
				setIsOpen(true);
				setFocus();
				onClick?.(event);
			} else {
				handleClose();
			}
		},
		[isOpen, setFocus, onClick, handleClose]
	);

	// Handle mouse down
	const handleMouseDown = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			EventUtil.trapImmediate(event);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(event.nativeEvent as any)[clickEventNameRef.current] = true;
		},
		[]
	);

	// Handle key down
	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			if (event.keyCode) {
				if (
					event.keyCode === KEYS.ENTER ||
					event.keyCode === KEYS.SPACE ||
					event.keyCode === KEYS.DOWN ||
					event.keyCode === KEYS.UP
				) {
					EventUtil.trap(event);
				}

				if (event.keyCode !== KEYS.TAB) {
					const openMenuKeys =
						event.keyCode === KEYS.ENTER ||
						event.keyCode === KEYS.DOWN ||
						event.keyCode === KEYS.UP;
					const isTrigger = (event.target as HTMLElement).tagName === 'BUTTON';
					if (openMenuKeys && isTrigger && onClick) {
						onClick(event as unknown as React.MouseEvent<HTMLButtonElement>);
					}

					handleKeyboardNavigate({
						isOpenState: isOpen,
						keyCode: event.keyCode,
						toggleOpen,
					});
				} else {
					handleCancel();
				}
			}
		},
		[onClick, isOpen, handleKeyboardNavigate, toggleOpen, handleCancel]
	);

	// Save refs
	const saveRefToTrigger = useCallback(
		(trigger: HTMLButtonElement | null) => {
			buttonRef.current = trigger;
			buttonRefProp?.(trigger);
			if (!triggerRendered) {
				setTriggerRendered(true);
			}
		},
		[buttonRefProp, triggerRendered]
	);

	const saveRefToList = useCallback((list: HTMLUListElement | null) => {
		listRef.current = list;
	}, []);

	const saveRefToListItem = useCallback(
		(listItem: HTMLLIElement | null, index: number) => {
			listItemsRef.current[index] = listItem;
			if (index === focusedIndex) {
				handleKeyboardFocus(focusedIndex);
			}
		},
		[focusedIndex, handleKeyboardFocus]
	);

	// Get input value
	const getInputValue = () => {
		if (multiple && selectedIndices.length === 0) {
			return placeholder;
		}
		if (multiple && selectedIndices.length === 1) {
			return options[selectedIndices[0]]?.label;
		}
		if (multiple && selectedIndices.length > 1) {
			return labels.multipleOptionsSelected;
		}
		const option = options[selectedIndex];
		return option?.label || placeholder;
	};

	// Get list item renderer
	const getListItemRenderer = () => listItemRenderer || ListItemLabel;

	// Render menu content
	const renderMenuContent = () => (
		<List
			checkmark={checkmark}
			getListItemId={getListItemId}
			itemRefs={saveRefToListItem}
			itemRenderer={getListItemRenderer()}
			onCancel={handleCancel}
			onSelect={handleSelect}
			options={options}
			ref={saveRefToList}
			selectedIndex={!multiple ? selectedIndex : undefined}
			selectedIndices={multiple ? selectedIndices : undefined}
			triggerId={id}
		/>
	);

	// Render inline menu
	const renderInlineMenu = () =>
		!disabled && isOpen ? (
			<div
				className="slds-dropdown slds-dropdown_left"
				style={{
					maxHeight: '20em',
					overflowX: 'hidden',
					minWidth: '100%',
				}}
			>
				{renderMenuContent()}
			</div>
		) : null;

	// Render dialog
	const renderDialog = () => {
		if (disabled || !isOpen) return null;

		const dialogProps = {
			closeOnTabKey: true,
			constrainToScrollParent,
			contentsClassName: 'slds-dropdown slds-dropdown_left',
			context: iconSettings,
			flippable: true,
			onClose: handleCancel,
			onKeyDown: handleKeyDown,
			onRequestTargetElement: () => buttonRef.current,
			inheritWidthOf: inheritTargetWidth ? 'target' : 'none',
			position: menuPosition,
		};

		return (
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			<Dialog {...(dialogProps as any)}>{renderMenuContent()}</Dialog>
		);
	};

	// Render pills
	const renderPills = () => {
		if (!multiple || selectedIndices.length === 0) return null;

		const selectedPills = selectedIndices.map((selectedPill) => {
			const pillLabel = options[selectedPill]?.label;
			return (
				<li
					className="slds-listbox__item"
					key={`pill-${selectedPill}`}
					role="presentation"
				>
					<Pill
						eventData={{
							item: options[selectedPill],
							index: selectedPill,
						}}
						events={{
							onRequestFocus: () => {},
							onRequestFocusOnNextPill: () => {},
							onRequestFocusOnPreviousPill: () => {},
							onRequestRemove: (
								_event: React.SyntheticEvent,
								data: { index: number }
							) => {
								const index = data.index;
								setSelectedIndices((prev) =>
									prev.filter((i) => i !== index)
								);

								if (onPillRemove) {
									const option = options[index];
									onPillRemove(option, { option, optionIndex: index });
								}
							},
						}}
						labels={{
							label: pillLabel,
						}}
					/>
				</li>
			);
		});

		return (
			<div
				id="listbox-selections-unique-id"
				// @ts-expect-error - orientation is valid for listbox role
				orientation="horizontal"
				role="listbox"
			>
				<ul
					className="slds-listbox slds-listbox_inline slds-p-top_xxx-small"
					role="group"
					aria-label="Selected Options:"
				>
					{selectedPills}
				</ul>
			</div>
		);
	};

	const requiredElem = required ? (
		<span style={{ color: 'red' }}>{'* '}</span>
	) : null;

	return (
		<div
			className={classNames(
				'slds-form-element',
				{
					'slds-has-error': errorText,
				},
				className
			)}
		>
			{label ? (
				<label
					className="slds-form-element__label"
					htmlFor={id}
					style={{ width: '100%' }}
				>
					{requiredElem}
					{label}
				</label>
			) : null}
			<div
				className={classNames(
					'slds-picklist slds-dropdown-trigger slds-dropdown-trigger_click',
					{ 'slds-is-open': isOpen },
					className
				)}
				onKeyDown={handleKeyDown}
				onMouseDown={handleMouseDown}
			>
				<button
					aria-describedby={errorId}
					aria-expanded={isOpen}
					aria-haspopup="true"
					className="slds-button slds-button_neutral slds-picklist__label"
					disabled={disabled}
					id={id}
					onClick={!disabled ? handleClick : undefined}
					ref={saveRefToTrigger}
					tabIndex={isOpen ? -1 : 0}
					type="button"
				>
					<span className="slds-truncate">{getInputValue()}</span>
					<Icon name="down" category="utility" />
				</button>
				{isInline ? renderInlineMenu() : renderDialog()}
			</div>
			{renderPills()}
			{errorText && (
				<div id={errorId} className="slds-form-element__help">
					{errorText}
				</div>
			)}
		</div>
	);
};

MenuPicklist.displayName = MENU_PICKLIST;

export default MenuPicklist;
export { ListItemLabel };

