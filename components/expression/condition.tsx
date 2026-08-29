/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Expression Condition design pattern](https://lightningdesignsystem.com/components/expression/) in React.
import React, { type SyntheticEvent } from 'react';
import classNames from 'classnames';
import assign from 'lodash.assign';

import { EXPRESSION_CONDITION } from '../../utilities/constants';
import generateId from '../../utilities/generate-id';

import Combobox, { type ComboboxOption } from '../combobox';
import Input from '../input';
import Button from '../button';

export interface ExpressionConditionAssistiveText {
	/** Title for the condition fieldset. Defaults to 'Condition' */
	title?: string;
	/** Assistive text for the Delete Condition button's icon. Defaults to 'Delete Condition' */
	deleteIcon?: string;
}

export interface ExpressionConditionEvents {
	onChangeResource?: (event: SyntheticEvent, data: unknown) => void;
	onChangeOperator?: (event: SyntheticEvent, data: unknown) => void;
	onChangeValue?: (event: SyntheticEvent, data: unknown) => void;
	onDelete?: (event: React.MouseEvent) => void;
}

export interface ExpressionConditionLabels {
	/** Title for the delete condition button. Defaults to "Delete Condition". */
	deleteCondition?: string;
	/** Label for the condition, shown left-most in the row. Left empty on default. */
	label?: string;
	/** Label for the operator selection dropdown. Defaults to "Operator" */
	operator?: string;
	/** Label for the resource selection dropdown. Defaults to "Resource" */
	resource?: string;
	/** Label for the value input box. Defaults to "Value" */
	value?: string;
}

export interface ExpressionConditionProps {
	/**
	 *  **Assistive text for accessibility.**
	 * * `title`: For users of assistive technology, title for the condition fieldset. Defaults to 'Condition'
	 * * `deleteIcon`: For users of assistive technology, assistive text for the Delete Condition button's icon. Defaults to 'Delete Condition'
	 */
	assistiveText?: ExpressionConditionAssistiveText;
	/**
	 * HTML id for component.
	 */
	id?: string;
	/**
	 * CSS classes to be added to the element with class `.slds-expression__row`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className?: unknown[] | Record<string, unknown> | string;
	/**
	 * Callbacks for various expression condition events such as value change, delete etc
	 */
	events: ExpressionConditionEvents;
	/**
	 * If set to true, the component will focus on the first focusable input upon mounting. This is useful for accessibility when adding new conditions.
	 */
	focusOnMount?: boolean;
	/**
	 * **Text labels for internationalization**
	 * This object is merged with the default props object on every
	 * * `deleteCondition`: Title for the delete condition button. Defaults to "Delete Condition".
	 * * `label`: Label for the condition, shown left-most in the row. Left empty on default.
	 * * `operator`: Label for the operator selection dropdown. Defaults to "Operator"
	 * * `resource`: Label for the resource selection dropdown. Defaults to "Resource"
	 * * `value`: Label for the value input box. Defaults to "Value"
	 */
	labels?: ExpressionConditionLabels;
	/**
	 * Controls whether the condition is a sub-condition inside a ExpressionGroup
	 */
	isSubCondition?: boolean;
	/**
	 * **Array of item objects that are options in the resource selection dropdown menu.**
	 */
	resourcesList?: ComboboxOption[];
	/**
	 *  Accepts an object from the `resourcesList` which needs to be selected
	 *  for the resource dropdown menu,
	 */
	resourceSelected?: ComboboxOption;
	/**
	 * **Array of item objects that are options in the operator selection dropdown menu.**
	 */
	operatorsList?: ComboboxOption[];
	/**
	 *  Accepts an object from the `operatorSelected` which needs to be selected
	 *  for the operator dropdown menu,
	 */
	operatorSelected?: ComboboxOption;
	/**
	 *  Sets the input value for the Value input field.
	 */
	value?: string;
}

const defaultProps: Partial<ExpressionConditionProps> = {
	assistiveText: {
		title: 'Condition',
		deleteIcon: 'Delete Condition',
	},
	events: {},
	labels: {
		label: '',
		operator: 'Operator',
		resource: 'Resource',
		value: 'Value',
		deleteCondition: 'Delete Condition',
	},
	value: '',
};
/**
 * Expression Condition Component
 */
class ExpressionCondition extends React.Component<ExpressionConditionProps> {
	static displayName = EXPRESSION_CONDITION;

	static defaultProps = defaultProps;

	generatedId: string;

	rootNode: HTMLElement | null = null;

	constructor(props: ExpressionConditionProps) {
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
	 * Get the Expression Condition's HTML id. Generate a new one if no ID present.
	 */
	getId() {
		return this.props.id || this.generatedId;
	}

	render() {
		const assistiveText = assign(
			{},
			defaultProps.assistiveText,
			this.props.assistiveText
		);
		const labels = assign({}, defaultProps.labels, this.props.labels);
		return (
			<li
				className={classNames(
					`slds-expression__row`,
					{ 'slds-expression__row_group': this.props.isSubCondition },
					this.props.className as string
				)}
				id={this.getId()}
				ref={(rootNode) => {
					this.rootNode = rootNode;
				}}
			>
				<fieldset>
					<legend className="slds-expression__legend">
						<span>{labels.label}</span>
						<span className="slds-assistive-text">{assistiveText.title}</span>
					</legend>
					<div className="slds-grid slds-gutters_xx-small">
						<div className="slds-col">
							<Combobox
								events={{
									onSelect: this.props.events.onChangeResource,
								}}
								id={`${this.getId()}-resource-selector`}
								multiple={false}
								variant="readonly"
								labels={{ label: labels.resource }}
								options={this.props.resourcesList}
								selection={
									this.props.resourceSelected
										? [this.props.resourceSelected]
										: []
								}
							/>
						</div>
						<div className="slds-col slds-grow-none">
							<Combobox
								events={{
									onSelect: this.props.events.onChangeOperator,
								}}
								id={`${this.getId()}-operator-selector`}
								multiple={false}
								variant="readonly"
								labels={{ label: labels.operator }}
								options={this.props.operatorsList}
								selection={
									this.props.operatorSelected
										? [this.props.operatorSelected]
										: []
								}
								singleInputDisabled={!this.props.resourceSelected}
							/>
						</div>
						<div className="slds-col">
							<Input
								id={`${this.getId()}-input`}
								label={labels.value}
								value={this.props.value}
								onChange={this.props.events.onChangeValue}
								disabled={!this.props.resourceSelected}
							/>
						</div>
						<div className="slds-col slds-grow-none">
							<div className="slds-form-element">
								<span className="slds-form-element__label">&nbsp;</span>
								<div className="slds-form-element__control">
									<Button
										id={`${this.getId()}-delete-button`}
										variant="outline-brand"
										iconCategory="utility"
										iconName="delete"
										iconVariant="border-filled"
										onClick={this.props.events.onDelete}
										assistiveText={{
											icon: assistiveText.deleteIcon,
										}}
										title={labels.deleteCondition}
									/>
								</div>
							</div>
						</div>
					</div>
				</fieldset>
			</li>
		);
	}
}

export default ExpressionCondition;
