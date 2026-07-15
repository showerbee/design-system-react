import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import {
	dropdownCollection,
	propSets,
} from '../../../utilities/sample-data/global-navigation-bar';

import IconSettings from '../../icon-settings';
import GlobalNavigationBar from '../';
import GlobalNavigationBarRegion from '../region';
import GlobalNavigationBarDropdown from '../dropdown';
import GlobalNavigationBarDropdownTrigger from '../dropdown-trigger';
import GlobalNavigationBarLink from '../link';
import GlobalNavigationBarLabel from '../label';
import GlobalNavigationBarButton from '../button';

const COMPONENT_CSS_CLASSES = {
	base: 'slds-context-bar',
	themePrefix: 'slds-context-bar_theme-',
};

const REGION_CSS_CLASSES = {
	primary: 'slds-context-bar__primary',
	secondary: 'slds-context-bar__secondary',
	tertiary: 'slds-context-bar__tertiary',
	appName: 'slds-context-bar__app-name',
};

describe('Global Navigation Bar: ', () => {
	describe('Default Structure', () => {
		it('has wrapping div and one primary region', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<GlobalNavigationBar>
						<GlobalNavigationBarRegion region="primary" />
					</GlobalNavigationBar>
				</IconSettings>
			);

			expect(
				container.querySelector(`.${COMPONENT_CSS_CLASSES.base}`)
			).toBeInTheDocument();
			expect(
				container.querySelector(`.${REGION_CSS_CLASSES.primary}`)
			).toBeInTheDocument();
		});

		it('Primary region DOES NOT have divider on right', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<GlobalNavigationBar>
						<GlobalNavigationBarRegion region="primary" />
					</GlobalNavigationBar>
				</IconSettings>
			);

			const primary = container.querySelector(`.${REGION_CSS_CLASSES.primary}`);
			expect(primary).not.toHaveClass('slds-context-bar__item_divider-right');
		});
	});

	describe('Optional Properties', () => {
		const customCloudProps = propSets.customCloud.props;
		const customThemeProps = propSets.lightTheme.props;

		it('has custom cloud and theme CSS', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<GlobalNavigationBar {...customCloudProps} {...customThemeProps} />
				</IconSettings>
			);

			const component = container.querySelector(`.${COMPONENT_CSS_CLASSES.base}`);
			expect(component).toHaveClass(
				`${COMPONENT_CSS_CLASSES.themePrefix}${customCloudProps.cloud}`
			);
			expect(component).toHaveClass(
				`${COMPONENT_CSS_CLASSES.themePrefix}${customThemeProps.theme}`
			);
		});
	});

	describe('Optional Region Structure', () => {
		const { props } = propSets.base;

		const buttonClicked = () => {};
		const linkClicked = () => {};
		const dropdownItemClicked = () => {};

		it('has 1 primary, 1 secondary, and 1 tertiary region', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<GlobalNavigationBar {...props}>
						<GlobalNavigationBarRegion region="primary" />
						<GlobalNavigationBarRegion
							region="secondary"
							navigation
							dividerPosition="right"
						>
							<GlobalNavigationBarLink
								label="Home"
								id="home-link"
								onClick={linkClicked('Home link clicked')}
							/>
							<GlobalNavigationBarDropdown
								assistiveText={{ icon: 'Open Menu' }}
								id="primaryDropdown"
								label="Global Navigation Menu Item 1"
								onSelect={dropdownItemClicked('Dropdown Menu Item clicked')}
								options={dropdownCollection}
							/>
							<GlobalNavigationBarLink
								active
								id="menu-item-2"
								label="Global Navigation Menu Item 2"
								onClick={linkClicked('Link clicked')}
							/>
							<GlobalNavigationBarDropdown
								active
								assistiveText={{ icon: 'Open Menu' }}
								id="primaryDropdownActive"
								label="Global Navigation Menu Item 3"
								onSelect={dropdownItemClicked('Dropdown Menu Item clicked')}
								options={dropdownCollection}
							/>
						</GlobalNavigationBarRegion>
						<GlobalNavigationBarRegion region="tertiary">
							<GlobalNavigationBarLink
								label="Actions"
								onClick={linkClicked('Link clicked')}
							/>
							<GlobalNavigationBarButton
								active
								label="Button"
								id="global-nav__button"
								onClick={buttonClicked('Button clicked')}
							/>
							<GlobalNavigationBarLabel
								dividerPosition="left"
								label="Vandelay Enterprises"
							/>
						</GlobalNavigationBarRegion>
					</GlobalNavigationBar>
				</IconSettings>
			);

			expect(
				container.querySelector(`.${REGION_CSS_CLASSES.primary}`)
			).toBeInTheDocument();
			expect(
				container.querySelector(`.${REGION_CSS_CLASSES.secondary}`)
			).toBeInTheDocument();
			expect(
				container.querySelector(`.${REGION_CSS_CLASSES.tertiary}`)
			).toBeInTheDocument();
		});

		it('Secondary region application is a nav HTML element and has divider on right side', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<GlobalNavigationBar {...props}>
						<GlobalNavigationBarRegion region="primary" />
						<GlobalNavigationBarRegion
							region="secondary"
							navigation
							dividerPosition="right"
						>
							<GlobalNavigationBarLink
								label="Home"
								id="home-link"
								onClick={linkClicked('Home link clicked')}
							/>
						</GlobalNavigationBarRegion>
					</GlobalNavigationBar>
				</IconSettings>
			);

			const nav = container.querySelector(`.${REGION_CSS_CLASSES.secondary}`);
			expect(nav.tagName.toLowerCase()).toBe('nav');
			expect(nav).toHaveClass('slds-context-bar__item_divider-right');
		});

		it('displays active items as active', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<GlobalNavigationBar {...props}>
						<GlobalNavigationBarRegion region="primary" />
						<GlobalNavigationBarRegion
							region="secondary"
							navigation
							dividerPosition="right"
						>
							<GlobalNavigationBarLink
								label="Home"
								id="home-link"
								onClick={linkClicked('Home link clicked')}
							/>
							<GlobalNavigationBarDropdown
								assistiveText={{ icon: 'Open Menu' }}
								id="primaryDropdown"
								label="Global Navigation Menu Item 1"
								onSelect={dropdownItemClicked('Dropdown Menu Item clicked')}
								options={dropdownCollection}
							/>
							<GlobalNavigationBarLink
								active
								id="menu-item-2"
								label="Global Navigation Menu Item 2"
								onClick={linkClicked('Link clicked')}
							/>
							<GlobalNavigationBarDropdown
								active
								assistiveText={{ icon: 'Open Menu' }}
								id="primaryDropdownActive"
								label="Global Navigation Menu Item 3"
								onSelect={dropdownItemClicked('Dropdown Menu Item clicked')}
								options={dropdownCollection}
							/>
						</GlobalNavigationBarRegion>
						<GlobalNavigationBarRegion region="tertiary">
							<GlobalNavigationBarLink
								label="Actions"
								onClick={linkClicked('Link clicked')}
							/>
							<GlobalNavigationBarButton
								active
								label="Button"
								id="global-nav__button"
								onClick={buttonClicked('Button clicked')}
							/>
							<GlobalNavigationBarLabel
								dividerPosition="left"
								label="Vandelay Enterprises"
							/>
						</GlobalNavigationBarRegion>
					</GlobalNavigationBar>
				</IconSettings>
			);

			const activeItems = container.querySelectorAll('.slds-is-active');
			expect(activeItems).toHaveLength(3);
		});
	});

	describe('Secondary Region', () => {
		it('Secondary region application is div and not a nav', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<GlobalNavigationBarRegion region="secondary" />
				</IconSettings>
			);

			const nav = container.querySelector(`.${REGION_CSS_CLASSES.secondary}`);
			expect(nav.tagName.toLowerCase()).toBe('div');
		});
	});

	describe('GlobalNavigationDropdown child component', () => {
		it('calls onSelect handler properly', () => {
			let eventTest = null;

			const eventHandler = (option, moreData) => {
				eventTest = { option, moreData };
			};

			const { container } = render(
				<GlobalNavigationBarDropdown
					dividerPosition="left"
					label="Test"
					onSelect={eventHandler}
					options={dropdownCollection}
				/>
			);

			const dropdown = container.querySelector(
				'.slds-context-bar__dropdown-trigger'
			);
			const button = dropdown.querySelector('button.slds-context-bar__button');

			fireEvent.click(button);

			const firstLink = container
				.querySelector('.slds-dropdown ul.dropdown__list')
				.querySelector('li:first-child a');
			fireEvent.click(firstLink);

			expect(typeof eventTest.option).toBe('object');
			expect(typeof eventTest.moreData).toBe('object');
		});

		it('renders divider as expected', () => {
			const { container } = render(
				<GlobalNavigationBarDropdown
					dividerPosition="left"
					label="Test"
					onSelect={() => {}}
					options={dropdownCollection}
				/>
			);

			const dropdown = container.querySelector(
				'.slds-context-bar__dropdown-trigger'
			);
			expect(dropdown).toHaveClass('slds-context-bar__item_divider-left');
		});
	});

	describe('GlobalNavigationDropdownTrigger child component', () => {
		it('has appropriate attributes', () => {
			const { container } = render(
				<GlobalNavigationBarDropdownTrigger
					dividerPosition="left"
					label="Test"
					onBlur={() => {}}
					onClick={() => {}}
					onFocus={() => {}}
					onKeyDown={() => {}}
					onMouseDown={() => {}}
					onMouseEnter={() => {}}
					onMouseLeave={() => {}}
				/>
			);

			const dropdownTrigger = container.querySelector(
				'.slds-context-bar__dropdown-trigger'
			);
			expect(dropdownTrigger.textContent).toContain('Test');
			expect(dropdownTrigger.textContent).toContain('Open menu item submenu');
		});

		it('calls onClick handler properly', () => {
			let eventTest = null;

			const eventHandler = (event, data) => {
				eventTest = { event, data };
			};

			const { container } = render(
				<GlobalNavigationBarDropdownTrigger
					dividerPosition="left"
					label="Test"
					onClick={eventHandler}
				/>
			);

			const dropdownTrigger = container.querySelector(
				'.slds-context-bar__dropdown-trigger'
			);
			fireEvent.click(dropdownTrigger);

			expect(typeof eventTest.event).toBe('object');
		});

		it('calls onBlur handler properly', () => {
			let eventTest = null;

			const eventHandler = (event, data) => {
				eventTest = { event, data };
			};

			const { container } = render(
				<GlobalNavigationBarDropdownTrigger
					dividerPosition="left"
					label="Test"
					onBlur={eventHandler}
				/>
			);

			const dropdownTrigger = container.querySelector(
				'.slds-context-bar__dropdown-trigger'
			);
			fireEvent.blur(dropdownTrigger);

			expect(typeof eventTest.event).toBe('object');
		});

		it('calls onFocus handler properly', () => {
			let eventTest = null;

			const eventHandler = (event, data) => {
				eventTest = { event, data };
			};

			const { container } = render(
				<GlobalNavigationBarDropdownTrigger
					dividerPosition="left"
					label="Test"
					onFocus={eventHandler}
				/>
			);

			const dropdownTrigger = container.querySelector(
				'.slds-context-bar__dropdown-trigger'
			);
			fireEvent.focus(dropdownTrigger);

			expect(typeof eventTest.event).toBe('object');
		});

		it('calls onKeyDown handler properly', () => {
			let eventTest = null;

			const eventHandler = (event, data) => {
				eventTest = { event, data };
			};

			const { container } = render(
				<GlobalNavigationBarDropdownTrigger
					dividerPosition="left"
					label="Test"
					onKeyDown={eventHandler}
				/>
			);

			const dropdownTrigger = container.querySelector(
				'.slds-context-bar__dropdown-trigger'
			);
			fireEvent.keyDown(dropdownTrigger, { keyCode: 13 });

			expect(typeof eventTest.event).toBe('object');
		});

		it('calls onMouseDown handler properly', () => {
			let eventTest = null;

			const eventHandler = (event, data) => {
				eventTest = { event, data };
			};

			const { container } = render(
				<GlobalNavigationBarDropdownTrigger
					dividerPosition="left"
					label="Test"
					onMouseDown={eventHandler}
				/>
			);

			const dropdownTrigger = container.querySelector(
				'.slds-context-bar__dropdown-trigger'
			);
			fireEvent.mouseDown(dropdownTrigger);

			expect(typeof eventTest.event).toBe('object');
		});

		it('calls onMouseEnter handler properly', () => {
			let eventTest = null;

			const eventHandler = (event, data) => {
				eventTest = { event, data };
			};

			const { container } = render(
				<GlobalNavigationBarDropdownTrigger
					dividerPosition="left"
					label="Test"
					onMouseEnter={eventHandler}
				/>
			);

			const dropdownTrigger = container.querySelector(
				'.slds-context-bar__dropdown-trigger'
			);
			fireEvent.mouseEnter(dropdownTrigger);

			expect(typeof eventTest.event).toBe('object');
		});

		it('calls onMouseLeave handler properly', () => {
			let eventTest = null;

			const eventHandler = (event, data) => {
				eventTest = { event, data };
			};

			const { container } = render(
				<GlobalNavigationBarDropdownTrigger
					dividerPosition="left"
					label="Test"
					onMouseLeave={eventHandler}
				/>
			);

			const dropdownTrigger = container.querySelector(
				'.slds-context-bar__dropdown-trigger'
			);
			fireEvent.mouseLeave(dropdownTrigger);

			expect(typeof eventTest.event).toBe('object');
		});

		it('renders divider as expected', () => {
			const { container } = render(
				<GlobalNavigationBarDropdownTrigger
					dividerPosition="left"
					label="Test"
				/>
			);

			const dropdownTrigger = container.querySelector(
				'.slds-context-bar__dropdown-trigger'
			);
			expect(dropdownTrigger).toHaveClass('slds-context-bar__item_divider-left');
		});
	});

	describe('GlobalNavigationLink child component', () => {
		it('has appropriate attributes', () => {
			const { container } = render(
				<GlobalNavigationBarLink
					dividerPosition="left"
					href="http://google.com"
					label="Home"
					id="home-link"
					onBlur={() => {}}
					onClick={() => {}}
					onFocus={() => {}}
					onKeyDown={() => {}}
					onKeyPress={() => {}}
					onKeyUp={() => {}}
					onMouseEnter={() => {}}
					onMouseLeave={() => {}}
				/>
			);

			const link = container.querySelector('li#home-link');
			expect(link.textContent).toBe('Home');
		});

		it('calls onClick handler properly', () => {
			let eventTest = null;

			const eventHandler = (event, data) => {
				eventTest = { event, data };
			};

			const { container } = render(
				<GlobalNavigationBarLink
					dividerPosition="left"
					href="http://google.com"
					label="Home"
					id="home-link"
					onClick={eventHandler}
				/>
			);

			const link = container.querySelector('li#home-link');
			const aTag = link.querySelector('a');
			fireEvent.click(aTag);

			expect(typeof eventTest.event).toBe('object');
			expect(typeof eventTest.data.href).toBe('string');
		});

		it('calls onBlur handler properly', () => {
			let eventTest = null;

			const eventHandler = (event, data) => {
				eventTest = { event, data };
			};

			const { container } = render(
				<GlobalNavigationBarLink
					dividerPosition="left"
					href="http://google.com"
					label="Home"
					id="home-link"
					onBlur={eventHandler}
				/>
			);

			const link = container.querySelector('li#home-link');
			const aTag = link.querySelector('a');
			fireEvent.blur(aTag);

			expect(typeof eventTest.event).toBe('object');
		});

		it('calls onFocus handler properly', () => {
			let eventTest = null;

			const eventHandler = (event, data) => {
				eventTest = { event, data };
			};

			const { container } = render(
				<GlobalNavigationBarLink
					dividerPosition="left"
					href="http://google.com"
					label="Home"
					id="home-link"
					onFocus={eventHandler}
				/>
			);

			const link = container.querySelector('li#home-link');
			const aTag = link.querySelector('a');
			fireEvent.focus(aTag);

			expect(typeof eventTest.event).toBe('object');
		});

		it('calls onKeyDown handler properly', () => {
			let eventTest = null;

			const eventHandler = (event, data) => {
				eventTest = { event, data };
			};

			const { container } = render(
				<GlobalNavigationBarLink
					dividerPosition="left"
					href="http://google.com"
					label="Home"
					id="home-link"
					onKeyDown={eventHandler}
				/>
			);

			const link = container.querySelector('li#home-link');
			const aTag = link.querySelector('a');
			fireEvent.keyDown(aTag, { keyCode: 13 });

			expect(typeof eventTest.event).toBe('object');
		});

		it('calls onKeyPress handler properly', () => {
			let eventTest = null;

			const eventHandler = (event, data) => {
				eventTest = { event, data };
			};

			const { container } = render(
				<GlobalNavigationBarLink
					dividerPosition="left"
					href="http://google.com"
					label="Home"
					id="home-link"
					onKeyPress={eventHandler}
				/>
			);

			const link = container.querySelector('li#home-link');
			const aTag = link.querySelector('a');
			fireEvent.keyPress(aTag, { keyCode: 13 });

			expect(typeof eventTest.event).toBe('object');
		});

		it('calls onKeyUp handler properly', () => {
			let eventTest = null;

			const eventHandler = (event, data) => {
				eventTest = { event, data };
			};

			const { container } = render(
				<GlobalNavigationBarLink
					dividerPosition="left"
					href="http://google.com"
					label="Home"
					id="home-link"
					onKeyUp={eventHandler}
				/>
			);

			const link = container.querySelector('li#home-link');
			const aTag = link.querySelector('a');
			fireEvent.keyUp(aTag, { keyCode: 13 });

			expect(typeof eventTest.event).toBe('object');
		});

		it('calls onMouseEnter handler properly', () => {
			let eventTest = null;

			const eventHandler = (event, data) => {
				eventTest = { event, data };
			};

			const { container } = render(
				<GlobalNavigationBarLink
					dividerPosition="left"
					href="http://google.com"
					label="Home"
					id="home-link"
					onMouseEnter={eventHandler}
				/>
			);

			const link = container.querySelector('li#home-link');
			const aTag = link.querySelector('a');
			fireEvent.mouseEnter(aTag);

			expect(typeof eventTest.event).toBe('object');
		});

		it('calls onMouseLeave handler properly', () => {
			let eventTest = null;

			const eventHandler = (event, data) => {
				eventTest = { event, data };
			};

			const { container } = render(
				<GlobalNavigationBarLink
					dividerPosition="left"
					href="http://google.com"
					label="Home"
					id="home-link"
					onMouseLeave={eventHandler}
				/>
			);

			const link = container.querySelector('li#home-link');
			const aTag = link.querySelector('a');
			fireEvent.mouseLeave(aTag);

			expect(typeof eventTest.event).toBe('object');
		});

		it('renders href if passed', () => {
			const { container } = render(
				<GlobalNavigationBarLink
					dividerPosition="left"
					href="http://google.com"
					label="Home"
					id="home-link"
				/>
			);

			const link = container.querySelector('li#home-link');
			expect(link.querySelector('a')).toHaveAttribute('href', 'http://google.com');
		});

		it('renders divider as expected', () => {
			const { container } = render(
				<GlobalNavigationBarLink
					dividerPosition="left"
					href="http://google.com"
					label="Home"
					id="home-link"
				/>
			);

			const link = container.querySelector('li#home-link');
			expect(link).toHaveClass('slds-context-bar__item_divider-left');
		});
	});

	describe('GlobalNavigationButton child component', () => {
		it('GlobalNavigationBarButton has attributes and onClick runs callback', () => {
			const buttonClicked = vi.fn();

			const { container } = render(
				<GlobalNavigationBarButton
					label="Button"
					id="global-nav__button"
					onClick={buttonClicked}
				/>
			);

			const link = container.querySelector('button#global-nav__button');
			expect(link.textContent).toBe('Button');
			fireEvent.click(link);
			expect(buttonClicked).toHaveBeenCalledTimes(1);
		});
	});

	describe('GlobalNavigationLabel child component', () => {
		it('GlobalNavigationBarLabel has attributes and renders dividerPosition correctly', () => {
			const { container } = render(
				<GlobalNavigationBarLabel
					dividerPosition="right"
					label="Text"
					id="test-text"
				/>
			);

			const item = container.querySelector('span#test-text');

			expect(
				container.querySelector('span.slds-context-bar__label-action')
			).toHaveClass('slds-context-bar__item_divider-right');
			expect(item.textContent).toBe('Text');
		});
	});
});
