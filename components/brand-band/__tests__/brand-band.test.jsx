import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BrandBand from '../index';

describe('SLDSBrandBand', () => {
	const renderBrandBand = (props) => {
		return render(
			<BrandBand {...props}>
				<p>Content inside the brand band</p>
			</BrandBand>
		);
	};

	describe('Basic Render', () => {
		it('renders children with base slds-brand-band class and medium size by default', () => {
			renderBrandBand({ id: 'brand-band-1' });
			const content = screen.getByText('Content inside the brand band');
			expect(content).toBeInTheDocument();

			const band = document.getElementById('brand-band-1');
			expect(band).toBeInTheDocument();
			expect(band).toHaveClass('slds-brand-band');
			expect(band).toHaveClass('slds-brand-band_medium');
			expect(band).toContainElement(content);
		});
	});

	describe('Size Variant Render', () => {
		it('renders small size class', () => {
			renderBrandBand({ id: 'small-band', size: 'small' });
			const band = document.getElementById('small-band');
			expect(band).toHaveClass('slds-brand-band_small');
			expect(band).not.toHaveClass('slds-brand-band_medium');
		});

		it('renders large size class', () => {
			renderBrandBand({ id: 'large-band', size: 'large' });
			const band = document.getElementById('large-band');
			expect(band).toHaveClass('slds-brand-band_large');
			expect(band).not.toHaveClass('slds-brand-band_medium');
		});
	});

	describe('Image Variant Render', () => {
		it('renders no image class', () => {
			renderBrandBand({ id: 'none-band', image: 'none' });
			const band = document.getElementById('none-band');
			expect(band).toHaveClass('slds-brand-band_none');
		});

		it('renders group image class', () => {
			renderBrandBand({ id: 'group-band', image: 'group' });
			const band = document.getElementById('group-band');
			expect(band).toHaveClass('slds-brand-band_group');
		});

		it('renders user image class', () => {
			renderBrandBand({ id: 'user-band', image: 'user' });
			const band = document.getElementById('user-band');
			expect(band).toHaveClass('slds-brand-band_user');
		});

		it('does not add an image modifier class for default image', () => {
			renderBrandBand({ id: 'default-band' });
			const band = document.getElementById('default-band');
			expect(band).not.toHaveClass('slds-brand-band_none');
			expect(band).not.toHaveClass('slds-brand-band_group');
			expect(band).not.toHaveClass('slds-brand-band_user');
		});
	});

	describe('Background Size Render', () => {
		it('renders cover background size class', () => {
			renderBrandBand({ id: 'cover-band', backgroundSize: 'cover' });
			const band = document.getElementById('cover-band');
			expect(band).toHaveClass('slds-brand-band_cover');
		});

		it('does not add cover class for contain (default) background size', () => {
			renderBrandBand({ id: 'contain-band' });
			const band = document.getElementById('contain-band');
			expect(band).not.toHaveClass('slds-brand-band_cover');
		});
	});

	describe('Custom className and style', () => {
		it('merges custom className and applies inline style', () => {
			renderBrandBand({
				id: 'styled-band',
				className: 'my-custom-band',
				style: { height: '300px' },
			});
			const band = document.getElementById('styled-band');
			expect(band).toHaveClass('slds-brand-band');
			expect(band).toHaveClass('my-custom-band');
			expect(band).toHaveStyle({ height: '300px' });
		});
	});
});
