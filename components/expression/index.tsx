/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useId, type ReactNode } from 'react';
import classNames from 'classnames';
import { EXPRESSION } from '../../utilities/constants';
import ExpressionGroup from './group';

/**
 * Trigger types for expression evaluation
 */
export type ExpressionTriggerType = 'all' | 'any' | 'custom' | 'always' | 'formula';

/**
 * Event handlers for Expression
 */
export interface ExpressionEvents {
	/** Called when trigger type changes */
	onChangeTrigger?: (event: React.SyntheticEvent, data: { triggerType: ExpressionTriggerType }) => void;
	/** Called when add group is clicked */
	onAddGroup?: (event: React.MouseEvent) => void;
	/** Called when add condition is clicked */
	onAddCondition?: (event: React.MouseEvent) => void;
	/** Called when custom logic value changes */
	onChangeCustomLogicValue?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Labels for Expression
 */
export interface ExpressionLabels {
	/** Label for add condition button */
	addCondition?: string;
	/** Label for add group button */
	addGroup?: string;
	/** Label for custom logic input */
	customLogic?: string;
	/** Label for take action selector */
	takeAction?: string;
	/** Title for the expression */
	title?: string;
	/** Label for "all" trigger option */
	triggerAll?: string;
	/** Label for "always" trigger option */
	triggerAlways?: string;
	/** Label for "any" trigger option */
	triggerAny?: string;
	/** Label for "custom" trigger option */
	triggerCustom?: string;
	/** Label for "formula" trigger option */
	triggerFormula?: string;
}

/**
 * Props for the Expression component
 */
export interface ExpressionProps {
	/** ExpressionCondition and ExpressionGroup children */
	children?: ReactNode;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** Custom logic value for custom trigger type */
	customLogicValue?: string;
	/** Event handlers */
	events?: ExpressionEvents;
	/** HTML id */
	id?: string;
	/** Text labels */
	labels?: ExpressionLabels;
	/** Current trigger type */
	triggerType?: ExpressionTriggerType;
}

const defaultLabels: ExpressionLabels = {
	title: 'Conditions',
};

/**
 * Expression builders help users declaratively construct logical expressions.
 * These expressions can be used when querying for a filtered set of records,
 * creating rules to control when something executes, or any other conditional logic.
 */
const Expression = ({
	children,
	className,
	customLogicValue,
	events,
	id: propId,
	labels: propLabels,
	triggerType,
}: ExpressionProps): React.ReactElement => {
	const generatedId = useId();
	const id = propId || generatedId;
	const labels = { ...defaultLabels, ...propLabels };

	return (
		<div
			className={classNames('slds-expression', className as string)}
			id={id}
		>
			<h2 className="slds-expression__title">{labels.title}</h2>
			<ExpressionGroup
				isRoot
				id={`${id}-group`}
				events={events}
				labels={labels}
				customLogicValue={customLogicValue}
				triggerType={triggerType}
			>
				{children}
			</ExpressionGroup>
		</div>
	);
};

Expression.displayName = EXPRESSION;

export default Expression;














