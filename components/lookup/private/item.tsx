/* eslint-disable prefer-destructuring */
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/role-has-required-aria-props */

import React, { type ComponentType, type ReactNode } from 'react';
import cx from 'classnames';
import Icon from '../../icon';
import EventUtil from '../../../utilities/event';
import { type IconCategory } from '../../../types/common';

const displayName = 'Lookup-Menu-Item';

interface LookupItemData {
	label?: ReactNode;
	data?: { subTitle?: ReactNode } & Record<string, unknown>;
}

export interface LookupMenuItemProps {
	// Despite the name, `children` is a data object holding the item's label
	// and metadata, not React children.
	children?: LookupItemData;
	data?: Record<string, unknown>;
	handleItemFocus?: (index: number, height: number) => void;
	href?: string;
	iconCategory?: IconCategory;
	iconInverse?: boolean;
	iconName?: string;
	id?: string;
	index?: number;
	isActive?: boolean;
	isDisabled?: boolean;
	listItemLabelRenderer?: ComponentType<LookupMenuItemProps>;
	onSelect?: (id: string | undefined, data: Record<string, unknown> | undefined) => void;
	searchTerm?: string;
	setFocus?: (id: string | undefined) => void;
}

class Item extends React.Component<LookupMenuItemProps> {
	static displayName = displayName;

	itemRef: HTMLLIElement | null = null;

	// eslint-disable-next-line camelcase, react/sort-comp
	UNSAFE_componentWillReceiveProps(nextProps: LookupMenuItemProps) {
		if (
			nextProps.isActive !== this.props.isActive &&
			nextProps.isActive === true
		) {
			this.scrollFocus();
			this.props.setFocus?.(this.props.id);
		}
	}

	getCustomLabel() {
		const ListItemLabel = this.props.listItemLabelRenderer;
		if (!ListItemLabel) {
			return null;
		}
		return <ListItemLabel {...this.props} />;
	}

	getIcon() {
		if (this.props.iconName && !this.props.listItemLabelRenderer) {
			return (
				<span className="slds-media__figure">
					<Icon
						category={this.props.iconCategory}
						inverse={this.props.iconInverse}
						key={this.props.iconName}
						name={this.props.iconName}
						size="small"
					/>
				</span>
			);
		}
		return null;
	}

	getLabel() {
		let label;
		const item = this.props.children;
		if (item?.data?.subTitle) {
			label = (
				<div className="slds-media__body">
					<div className="slds-lookup__result-text">{item.label}</div>
					<span className="slds-lookup__result-meta slds-text-body_small">
						{item.data.subTitle}
					</span>
				</div>
			);
		} else {
			const labelClassName = cx('slds-lookup__result-text', {
				'slds-m-left_x-small': !this.props.iconName,
			});

			label = (
				<div className="slds-media__body">
					<div className={labelClassName}>{item?.label}</div>
				</div>
			);
		}
		return label;
	}

	handleClick = () => this.props.onSelect?.(this.props.id, this.props.data);

	// Scroll menu item based on up/down mouse keys (assumes all items are the same height)
	scrollFocus() {
		const height = this.itemRef?.offsetHeight;
		if (height && this.props.handleItemFocus) {
			this.props.handleItemFocus(this.props.index ?? 0, height);
		}
	}

	render() {
		let itemClassName = 'js-slds-lookup__item';
		const id = this.props.id;
		if (this.props.isActive) itemClassName += ' slds-theme_shade';

		return (
			// IMPORTANT: anchor id is used to set lookup's input's aria-activedescendant
			<li
				className={itemClassName}
				ref={(li) => {
					this.itemRef = li;
				}}
			>
				<a
					aria-disabled={this.props.isDisabled}
					className="slds-lookup__item-action slds-media slds-media_center"
					href={this.props.href}
					id={id}
					onClick={this.handleClick}
					onMouseDown={EventUtil.trapImmediate}
					role="option"
					tabIndex={-1}
				>
					{this.getIcon()}
					{this.props.listItemLabelRenderer
						? this.getCustomLabel()
						: this.getLabel()}
				</a>
			</li>
		);
	}
}

export default Item;
