/* eslint-disable react/no-array-index-key */
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';

class Svg extends React.Component {
	static displayName = 'Svg';

	getPaths = (paths) => {
		if (paths instanceof Array) {
			return paths.map((item, index) => <path key={index} {...item} />);
		}
		return <path key="pathSVG" {...paths} />;
	};

	getCircles = (circles) => {
		if (circles instanceof Array) {
			return circles.map((item, index) => <circle key={index} {...item} />);
		}
		return <circle key="circleSVG" {...circles} />;
	};

	getEllipses = (ellipses) => {
		if (ellipses instanceof Array) {
			return ellipses.map((item, index) => (
				<ellipse key={index} {...item} />
			));
		}
		return <ellipse key="ellipseSVG" {...ellipses} />;
	};

	getGroups = (groups) => {
		if (groups instanceof Array) {
			return groups.map((item, index) => (
				<g key={index}>{this.getShapes(item)}</g>
			));
		}

		return <g key="groupsSVG">{this.getShapes(groups)}</g>;
	};

	getShapes = (data) => {
		const shapes = [];

		if (data) {
			if (data.g) {
				shapes.push(this.getGroups(data.g));
			}

			if (data.ellipse) {
				shapes.push(this.getEllipses(data.ellipse));
			}

			if (data.circle) {
				shapes.push(this.getCircles(data.circle));
			}

			if (data.path) {
				shapes.push(this.getPaths(data.path));
			}
		}
		return shapes;
	};

	getSVG = ({ viewBox, ...rest }, props) => (
		<svg
			aria-hidden={props['aria-hidden']}
			className={props.className}
			viewBox={viewBox}
			name={props.name}
			style={props.style}
		>
			{this.getShapes(rest)}
		</svg>
	);

	render() {
		const { data, ...props } = this.props;

		return data ? this.getSVG(data, props) : null;
	}
}

export default Svg;
