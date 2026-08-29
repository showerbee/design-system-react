import { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PortalSettings, { PortalSettingsContext } from '../index';

const ContextConsumer = () => {
	const settings = useContext(PortalSettingsContext);
	return <div data-testid="renderTo">{String(settings.renderTo)}</div>;
};

describe('SLDSPortalSettings', () => {
	it('renders children', () => {
		render(
			<PortalSettings renderTo="#portal-destination">
				<div data-testid="child">child content</div>
			</PortalSettings>
		);
		expect(screen.getByTestId('child')).toHaveTextContent('child content');
	});

	it('renders without children', () => {
		const { container } = render(<PortalSettings renderTo="#portal-destination" />);
		expect(container).toBeInTheDocument();
	});

	it('provides renderTo to descendants via context', () => {
		render(
			<PortalSettings renderTo="#portal-destination">
				<ContextConsumer />
			</PortalSettings>
		);
		expect(screen.getByTestId('renderTo')).toHaveTextContent('#portal-destination');
	});

	it('provides undefined renderTo when not specified', () => {
		render(
			<PortalSettings>
				<ContextConsumer />
			</PortalSettings>
		);
		expect(screen.getByTestId('renderTo')).toHaveTextContent('undefined');
	});

	it('provides different context values to separately nested providers', () => {
		render(
			<div>
				<PortalSettings renderTo="#div1">
					<div data-testid="outer">
						<ContextConsumer />
					</div>
				</PortalSettings>
				<PortalSettings renderTo="#div2">
					<div data-testid="inner">
						<ContextConsumer />
					</div>
				</PortalSettings>
			</div>
		);

		const [outerRenderTo, innerRenderTo] = screen.getAllByTestId('renderTo');
		expect(outerRenderTo).toHaveTextContent('#div1');
		expect(innerRenderTo).toHaveTextContent('#div2');
	});
});
