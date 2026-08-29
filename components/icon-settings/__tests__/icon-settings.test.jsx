import { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import IconSettings, { IconSettingsContext } from '../index';

const ContextConsumer = () => {
	const settings = useContext(IconSettingsContext);
	return (
		<dl>
			<dt>iconPath</dt>
			<dd data-testid="iconPath">{String(settings.iconPath)}</dd>
			<dt>actionSprite</dt>
			<dd data-testid="actionSprite">{String(settings.actionSprite)}</dd>
			<dt>customSprite</dt>
			<dd data-testid="customSprite">{String(settings.customSprite)}</dd>
			<dt>doctypeSprite</dt>
			<dd data-testid="doctypeSprite">{String(settings.doctypeSprite)}</dd>
			<dt>standardSprite</dt>
			<dd data-testid="standardSprite">{String(settings.standardSprite)}</dd>
			<dt>utilitySprite</dt>
			<dd data-testid="utilitySprite">{String(settings.utilitySprite)}</dd>
			<dt>onRequestIconPath</dt>
			<dd data-testid="onRequestIconPath">
				{settings.onRequestIconPath
					? settings.onRequestIconPath({ category: 'utility', name: 'announcement' })
					: 'undefined'}
			</dd>
		</dl>
	);
};

describe('SLDSIconSettings', () => {
	it('renders children', () => {
		render(
			<IconSettings iconPath="/assets/icons">
				<div data-testid="child">child content</div>
			</IconSettings>
		);
		expect(screen.getByTestId('child')).toHaveTextContent('child content');
	});

	it('provides iconPath to descendants via context', () => {
		render(
			<IconSettings iconPath="/assets/icons">
				<ContextConsumer />
			</IconSettings>
		);
		expect(screen.getByTestId('iconPath')).toHaveTextContent('/assets/icons');
	});

	it('provides no iconPath (undefined) when not specified', () => {
		render(
			<IconSettings>
				<ContextConsumer />
			</IconSettings>
		);
		expect(screen.getByTestId('iconPath')).toHaveTextContent('undefined');
	});

	it('provides individual sprite paths to descendants', () => {
		render(
			<IconSettings
				actionSprite="/sprites/action.svg"
				customSprite="/sprites/custom.svg"
				doctypeSprite="/sprites/doctype.svg"
				standardSprite="/sprites/standard.svg"
				utilitySprite="/sprites/utility.svg"
			>
				<ContextConsumer />
			</IconSettings>
		);

		expect(screen.getByTestId('actionSprite')).toHaveTextContent('/sprites/action.svg');
		expect(screen.getByTestId('customSprite')).toHaveTextContent('/sprites/custom.svg');
		expect(screen.getByTestId('doctypeSprite')).toHaveTextContent('/sprites/doctype.svg');
		expect(screen.getByTestId('standardSprite')).toHaveTextContent('/sprites/standard.svg');
		expect(screen.getByTestId('utilitySprite')).toHaveTextContent('/sprites/utility.svg');
	});

	it('provides onRequestIconPath function to descendants', () => {
		render(
			<IconSettings onRequestIconPath={({ name }) => `#${name}`}>
				<ContextConsumer />
			</IconSettings>
		);
		expect(screen.getByTestId('onRequestIconPath')).toHaveTextContent('#announcement');
	});

	it('provides different context values to separately nested providers', () => {
		render(
			<div>
				<IconSettings iconPath="/outer/icons">
					<div data-testid="outer">
						<ContextConsumer />
					</div>
				</IconSettings>
				<IconSettings iconPath="/inner/icons">
					<div data-testid="inner">
						<ContextConsumer />
					</div>
				</IconSettings>
			</div>
		);

		const [outerPath, innerPath] = screen.getAllByTestId('iconPath');
		expect(outerPath).toHaveTextContent('/outer/icons');
		expect(innerPath).toHaveTextContent('/inner/icons');
	});
});
