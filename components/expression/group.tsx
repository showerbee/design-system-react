/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Expression Group design pattern](https://lightningdesignsystem.com/components/expression/) in React.
import React, { type ReactNode, type SyntheticEvent } from 'react';
import classNames from 'classnames';
import assign from 'lodash.assign';

import { EXPRESSION_GROUP } from '../../utilities/constants';
import generateId from '../../utilities/generate-id';

import Combobox, { type ComboboxOption } from '../combobox';
import Button from '../button';
import Input from '../input';

export type ExpressionTriggerType =
	| 'all'
	| 'any'
	| 'custom'
	| 'always'
	| 'formula';

export interface ExpressionGroupAssistiveText {
	/** Assistive text for the expression group's label. */
	label?: string;
	/** Assistive text for the Add Condition button's icon. */
	addCondition?: string;
	/** Assistive text for the Add Group button's icon. */
	addGroup?: string;
}

export interface ExpressionGroupEvents {
	onChangeTrigger?: (
		event: SyntheticEvent,
		data: { triggerType: ExpressionTriggerType }
	) => void;
	onChangeCustomLogicValue?: (
		event: React.ChangeEvent<HTMLInputElement>
	) => void;
	onAddCondition?: (event: React.MouseEvent) => void;
	onAddGroup?: (event: React.MouseEvent) => void;
}

export interface ExpressionGroupLabels {
	addCondition?: string;
	addGroup?: string;
	customLogic?: string;
	label?: string;
	takeAction?: string;
	triggerAll?: string;
	triggerAlways?: string;
	triggerAny?: string;
	triggerCustom?: string;
	triggerFormula?: string;
}

export interface ExpressionGroupProps {
	/**
	 *  **Assistive text for accessibility.**
	 * * `label`: For users of assistive technology, assistive text for the expression group's label.
	 * * `addCondition`: For users of assistive technology, assistive text for the Add Condition button's icon.
	 * * `addGroup`: For users of assistive technology, assistive text for the Add Group button's icon.
	 */
	assistiveText?: ExpressionGroupAssistiveText;
	/**
	 * HTML id for ExpressionGroup component.
	 */
	id?: string;
	/**
	 * `ExpressionGroup` children, accepts `ExpressionCondition`. (Also accepts sub-`ExpressionGroup` if `isRoot`)
	 */
	children?: ReactNode;
	/**
	 * CSS classes to be added to the element with class `.slds-expression__group`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className?: unknown[] | Record<string, unknown> | string;
	/**
	 * Callbacks for various expression group events such as trigger change, add condition etc
	 */
	events?: ExpressionGroupEvents;
	/**
	 * If set to true, the component will focus on the first focusable input upon mounting. This is useful for accessibility when adding new groups.
	 */
	focusOnMount?: boolean;
	/**
	 * **Text labels for internationalization**
	 * This object is merged with the default props object on every render.
	 */
	labels?: ExpressionGroupLabels;
	/**
	 * Whether the group is at root level
	 */
	isRoot?: boolean;
	/**
	 * Trigger type for the Group
	 */
	triggerType?: ExpressionTriggerType;
	/**
	 * Sets the input for the custom logic value input box, shown if the `triggerType` is set to `custom`.
	 */
	customLogicValue?: string;
}

interface Trigger {
	id: string;
	label?: string;
}

const defaultProps: Partial<ExpressionGroupProps> = {
	triggerType: 'all',
	customLogicValue: '',
	labels: {
		label: '',
		takeAction: 'Take Action When',
		customLogic: 'Custom Logic',
		addCondition: 'Add Condition',
		addGroup: 'Add Group',
		triggerAll: 'All Conditions Are Met',
		triggerAny: 'Any Condition Is Met',
		triggerCustom: 'Custom Logic Is Met',
		triggerAlways: 'Always (No Criteria)',
		triggerFormula: 'Formula Evaluates To True',
	},
};

/**
 * Expression Group Component
 */
class ExpressionGroup extends React.Component<ExpressionGroupProps> {
	static displayName = EXPRESSION_GROUP;

	static defaultProps = defaultProps;

	/**
	 *  Return triggerType selected, processing the triggerType objects generated
	 */
	static triggerChange(
		event: SyntheticEvent,
		data: { selection: ComboboxOption[] }
	): ExpressionTriggerType {
		const selection = data.selection[0].id;
		let trigger: ExpressionTriggerType = 'all';
		if (selection === '1') {
			trigger = 'all';
		} else if (selection === '2') {
			trigger = 'any';
		} else if (selection === '3') {
			trigger = 'custom';
		} else if (selection === '4') {
			trigger = 'always';
		} else if (selection === '5') {
			trigger = 'formula';
		}
		return trigger;
	}

	generatedId: string;

	rootNode: HTMLElement | null = null;

	constructor(props: ExpressionGroupProps) {
		super(props);
		this.generatedId = generateId();
	}

	componentDidMount() {
		if (this.props.focusOnMount && this.rootNode) {
			const input = this.rootNode.querySelector('input');
			if (input) {
				input.focus();
			}
		}
	}

	/**
	 * Get the Expression Group's HTML id. Generate a new one if no ID present.
	 */
	getId() {
		return this.props.id || this.generatedId;
	}

	/**
	 * Generate and return trigger type objects, with labels either sent as props or using default props.
	 */
	getTriggers(): Trigger[] {
		const labels = assign({}, defaultProps.labels, this.props.labels);
		return [
			{ id: '1', label: labels.triggerAll },
			{ id: '2', label: labels.triggerAny },
			{ id: '3', label: labels.triggerCustom },
			{ id: '4', label: labels.triggerAlways },
			{ id: '5', label: labels.triggerFormula },
		];
	}

	/**
	 *  Returns object of trigger from trigger passed as prop
	 */
	getTriggerSelection(): Trigger[] {
		const selection = this.props.triggerType;
		const Triggers = this.getTriggers();
		const t: Trigger[] = [];
		if (selection === 'all') {
			t.push(Triggers[0]);
		} else if (selection === 'any') {
			t.push(Triggers[1]);
		} else if (selection === 'custom') {
			t.push(Triggers[2]);
		} else if (selection === 'always') {
			t.push(Triggers[3]);
		} else if (selection === 'formula') {
			t.push(Triggers[4]);
		}
		return t;
	}

	render() {
		const assistiveText = assign(
			{},
			defaultProps.assistiveText,
			this.props.assistiveText
		);
		const labels = assign({}, defaultProps.labels, this.props.labels);

		const triggerCombobox = (
			<Combobox
				events={{
					onSelect: (event: SyntheticEvent, data: { selection: ComboboxOption[] }) =>
						this.props.events?.onChangeTrigger?.(event, {
							triggerType: ExpressionGroup.triggerChange(event, data),
						}),
				}}
				id={`${this.getId()}-take-action-trigger`}
				multiple={false}
				options={this.getTriggers()}
				variant="readonly"
				labels={{ label: labels.takeAction }}
				selection={this.getTriggerSelection()}
			/>
		);

		const buttons =
			this.props.triggerType !== 'always' &&
			this.props.triggerType !== 'formula' ? (
				<div className="slds-expression__buttons">
					<Button
						iconCategory="utility"
						iconName="add"
						iconPosition="left"
						id={`${this.getId()}-add-condition-button`}
						label={labels.addCondition}
						assistiveText={{ icon: assistiveText.addCondition }}
						onClick={this.props.events?.onAddCondition}
					/>
					{this.props.isRoot ? (
						<Button
							iconCategory="utility"
							iconName="add"
							iconPosition="left"
							id={`${this.getId()}-add-group-button`}
							label={labels.addGroup}
							assistiveText={{ icon: assistiveText.addGroup }}
							onClick={this.props.events?.onAddGroup}
						/>
					) : null}
				</div>
			) : null;

		let body: ReactNode = null;

		if (this.props.triggerType !== 'always') {
			if (this.props.isRoot && this.props.triggerType === 'formula') {
				body = this.props.children;
			} else {
				body = (
					<React.Fragment>
						{this.props.triggerType === 'custom' ? (
							<Input
								label={labels.customLogic}
								className="slds-expression__custom-logic"
								id={`${this.getId()}-custom-logic-input`}
								value={this.props.customLogicValue}
								variant="base"
								onChange={this.props.events?.onChangeCustomLogicValue}
							/>
						) : null}
						<ul>{this.props.children}</ul>
					</React.Fragment>
				);
			}
		}

		if (this.props.isRoot) {
			if (this.props.triggerType === 'formula') {
				return (
					<React.Fragment>
						<div className="slds-expression__options">{triggerCombobox}</div>
						{body}
					</React.Fragment>
				);
			}

			return (
				<div
					className={classNames(this.props.className as string)}
					id={this.getId()}
				>
					<div className="slds-expression__options">{triggerCombobox}</div>
					{body}
					{buttons}
				</div>
			);
		}

		return (
			<li
				className={classNames(
					'slds-expression__group',
					this.props.className as string
				)}
				id={this.getId()}
				ref={(rootNode) => {
					this.rootNode = rootNode;
				}}
			>
				<fieldset>
					<legend className="slds-expression__legend slds-expression__legend_group">
						<span>{labels.label}</span>
						<span className="slds-assistive-text">{assistiveText.label}</span>
					</legend>
					<div className="slds-expression__options">{triggerCombobox}</div>
					{body}
					{buttons}
				</fieldset>
			</li>
		);
	}
}

export default ExpressionGroup;
