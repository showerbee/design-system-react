/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	useState,
	useId,
	useRef,
	useCallback,
	type ReactNode,
	type MouseEvent,
} from 'react';
import classNames from 'classnames';
import Modal from '../modal';
import { APP_LAUNCHER } from '../../utilities/constants';

/**
 * Assistive text for AppLauncher
 */
export interface AppLauncherAssistiveText {
	/** Assistive text for the trigger button */
	trigger?: string;
}

/**
 * Props for the AppLauncher component
 */
export interface AppLauncherProps {
	/** Assistive text for accessibility */
	assistiveText?: AppLauncherAssistiveText;
	/** Whether to hide the app element when modal is open */
	ariaHideApp?: boolean;
	/** AppLauncherExpandableSection children */
	children: ReactNode;
	/** HTML id */
	id?: string;
	/** Control open/close state */
	isOpen?: boolean;
	/** CSS classes for modal */
	modalClassName?: string | string[] | Record<string, boolean>;
	/** Button in modal header */
	modalHeaderButton?: ReactNode;
	/** Allow longer names without truncation */
	noTruncate?: boolean;
	/** Callback when modal closes */
	onClose?: (event: MouseEvent | React.KeyboardEvent, data: Record<string, never>) => void;
	/** Search bar component */
	search?: ReactNode;
	/** Title text */
	title?: string;
	/** @deprecated Use assistiveText.trigger instead */
	triggerAssistiveText?: string;
	/** Name displayed next to trigger */
	triggerName?: ReactNode;
	/** Callback when trigger is clicked */
	triggerOnClick?: (event: MouseEvent, data: Record<string, never>) => void;
}

const defaultAssistiveText: AppLauncherAssistiveText = {
	trigger: 'Open App Launcher',
};

/**
 * The App Launcher allows the user to quickly access all the apps and functionality
 * within their organization. The App Launcher should generally only be used as a
 * sub-component of the Global Navigation Bar.
 */
const AppLauncher = ({
	assistiveText: propAssistiveText,
	ariaHideApp = true,
	children,
	id: propId,
	isOpen: controlledIsOpen,
	modalClassName,
	modalHeaderButton,
	noTruncate = false,
	onClose,
	search,
	title = 'App Launcher',
	triggerAssistiveText: propTriggerAssistiveText,
	triggerName,
	triggerOnClick,
}: AppLauncherProps): React.ReactElement => {
	const generatedId = useId();
	const id = propId || generatedId;
	const [internalIsOpen, setInternalIsOpen] = useState(false);
	const focusedOnSearchRef = useRef(false);

	const assistiveText = { ...defaultAssistiveText, ...propAssistiveText };
	const triggerAssistiveText = propTriggerAssistiveText || assistiveText.trigger;

	const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

	const openAppLauncher = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			setInternalIsOpen(true);
			if (typeof triggerOnClick === 'function') {
				triggerOnClick(event, {});
			}
		},
		[triggerOnClick]
	);

	const closeAppLauncher = useCallback(() => {
		setInternalIsOpen(false);
		if (typeof onClose === 'function') {
			// Note: Modal.onRequestClose doesn't pass event, so we create a synthetic one
			onClose({} as MouseEvent, {});
		}
	}, [onClose]);

	const renderSearch = () => {
		if (!search) return null;

		return (
			<div
				className="slds-app-launcher__header-search"
				ref={(component) => {
					if (component) {
						if (!focusedOnSearchRef.current) {
							const input = component.querySelector('input');
							if (input) {
								setTimeout(() => {
									input.focus();
									focusedOnSearchRef.current = true;
								}, 0);
							}
						}
					} else {
						focusedOnSearchRef.current = false;
					}
				}}
			>
				{search}
			</div>
		);
	};

	const style = noTruncate ? { maxWidth: 'none' } : undefined;

	const customModalHeader = (
		<React.Fragment>
			<h2
				className="slds-text-heading_medium"
				id={`${id}-app-launcher-title`}
			>
				{title}
			</h2>

			{renderSearch()}

			{modalHeaderButton || <span className="slds-size_1-of-7" />}
		</React.Fragment>
	);

	const modalContentStaticHeight = '90%';

	return (
		<div
			className="slds-context-bar__item slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_click slds-no-hover"
			style={style}
		>
			<div className="slds-context-bar__icon-action">
				<button
					aria-haspopup="true"
					className="slds-button slds-icon-waffle_container slds-context-bar__button"
					onClick={openAppLauncher}
					title={triggerAssistiveText}
					type="button"
				>
					<span className="slds-icon-waffle">
						<span className="slds-r1" />
						<span className="slds-r2" />
						<span className="slds-r3" />
						<span className="slds-r4" />
						<span className="slds-r5" />
						<span className="slds-r6" />
						<span className="slds-r7" />
						<span className="slds-r8" />
						<span className="slds-r9" />
					</span>
					{triggerAssistiveText && (
						<span className="slds-assistive-text">
							{triggerAssistiveText}
						</span>
					)}
				</button>
			</div>
			<Modal
				ariaHideApp={ariaHideApp}
				assistiveText={{
					dialogLabelledBy: `${id}-app-launcher-title`,
				}}
				className={classNames('slds-app-launcher', modalClassName as string)}
				contentClassName="slds-app-launcher__content slds-p-around_medium"
				contentStyle={{ minHeight: modalContentStaticHeight }}
				isOpen={isOpen}
				onRequestClose={closeAppLauncher}
				size="large"
				header={customModalHeader}
				headerClassName="slds-grid slds-grid_align-spread slds-grid_vertical-align-center"
			>
				{children}
			</Modal>
			{triggerName ? (
				<span className="slds-context-bar__label-action slds-context-bar__app-name">
					{noTruncate ? (
						triggerName
					) : (
						<span className="slds-truncate" title={typeof triggerName === 'string' ? triggerName : undefined}>
							{triggerName}
						</span>
					)}
				</span>
			) : null}
		</div>
	);
};

AppLauncher.displayName = APP_LAUNCHER;

export default AppLauncher;

