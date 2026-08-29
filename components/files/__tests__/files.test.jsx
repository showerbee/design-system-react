import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Files from '../index';
import File from '../file';
import MoreFiles from '../more-files';
import Icon from '../../icon';
import IconSettings from '../../icon-settings';

describe('SLDSFiles', () => {
	const renderWithIcons = (children) =>
		render(<IconSettings iconPath="/assets/icons">{children}</IconSettings>);

	describe('Files container', () => {
		it('wraps each File child in a li with grid classes', () => {
			const { container } = renderWithIcons(
				<Files id="files-list">
					<File
						labels={{ title: 'Proposal.pdf' }}
						image="/assets/images/placeholder.jpg"
					/>
					<File
						labels={{ title: 'Invoice.pdf' }}
						image="/assets/images/placeholder2.jpg"
					/>
				</Files>
			);

			const list = container.querySelector('ul#files-list');
			expect(list).toBeInTheDocument();
			expect(list).toHaveClass('slds-grid', 'slds-grid_pull-padded');

			const items = container.querySelectorAll('ul#files-list > li');
			expect(items).toHaveLength(2);
			items.forEach((item) => {
				expect(item).toHaveClass(
					'slds-p-horizontal_xx-small',
					'slds-size_1-of-3',
					'slds-medium-size_1-of-4'
				);
			});
		});

		it('applies the default crop to children that do not specify one', () => {
			const { container } = renderWithIcons(
				<Files crop="1-by-1">
					<File labels={{ title: 'Default crop' }} />
				</Files>
			);

			const crop = container.querySelector('.slds-file__crop');
			expect(crop).toHaveClass('slds-file__crop_1-by-1');
		});

		it("preserves a child's own crop over the Files default", () => {
			const { container } = renderWithIcons(
				<Files crop="1-by-1">
					<File crop="16-by-9" labels={{ title: 'Overridden crop' }} />
				</Files>
			);

			const crop = container.querySelector('.slds-file__crop');
			expect(crop).toHaveClass('slds-file__crop_16-by-9');
			expect(crop).not.toHaveClass('slds-file__crop_1-by-1');
		});

		it('adds a custom columnClassName to each li wrapper', () => {
			const { container } = renderWithIcons(
				<Files columnClassName="my-custom-column">
					<File labels={{ title: 'File' }} />
				</Files>
			);

			const item = container.querySelector('li');
			expect(item).toHaveClass('my-custom-column');
		});

		it('generates an id when none is provided', () => {
			const { container } = renderWithIcons(
				<Files>
					<File labels={{ title: 'File' }} />
				</Files>
			);

			const list = container.querySelector('ul');
			expect(list).toHaveAttribute('id');
			expect(list.getAttribute('id')).not.toBe('');
		});
	});

	describe('File', () => {
		it('renders the title, image, and icon', () => {
			renderWithIcons(
				<File
					labels={{ title: 'Proposal.pdf' }}
					image="/assets/images/placeholder.jpg"
					icon={<Icon category="doctype" name="pdf" />}
				/>
			);

			expect(screen.getByText('Proposal.pdf')).toBeInTheDocument();
			expect(screen.getByRole('img')).toHaveAttribute(
				'src',
				'/assets/images/placeholder.jpg'
			);
		});

		it('hides the title when hasNoVisibleTitle is set', () => {
			const { container } = renderWithIcons(
				<File labels={{ title: 'Hidden title' }} hasNoVisibleTitle />
			);

			expect(screen.queryByText('Hidden title')).not.toBeInTheDocument();
			expect(container.querySelector('.slds-has-title')).not.toBeInTheDocument();
		});

		it('calls onClickDownload when the download button is clicked', () => {
			const onClickDownload = vi.fn();
			renderWithIcons(
				<File
					labels={{ title: 'Download me' }}
					onClickDownload={onClickDownload}
				/>
			);

			const downloadButton = screen.getByRole('button', { name: /download/i });
			fireEvent.click(downloadButton);
			expect(onClickDownload).toHaveBeenCalledTimes(1);
		});

		it('does not render a download button when onClickDownload is absent', () => {
			renderWithIcons(<File labels={{ title: 'No actions' }} />);
			expect(
				screen.queryByRole('button', { name: /download/i })
			).not.toBeInTheDocument();
		});

		it('calls onClickImage when the file image link is clicked', () => {
			const onClickImage = vi.fn();
			const { container } = renderWithIcons(
				<File labels={{ title: 'Clickable' }} onClickImage={onClickImage} />
			);

			fireEvent.click(container.querySelector('a.slds-file__crop'));
			expect(onClickImage).toHaveBeenCalledTimes(1);
		});

		it('renders a loading spinner when isLoading is true', () => {
			const { container } = renderWithIcons(
				<File labels={{ title: 'Loading file' }} isLoading />
			);

			expect(container.querySelector('.slds-spinner')).toBeInTheDocument();
		});

		it('generates an id when none is provided', () => {
			const { container } = renderWithIcons(
				<File labels={{ title: 'No id' }} />
			);
			const fileDiv = container.querySelector('.slds-file');
			expect(fileDiv).toHaveAttribute('id');
			expect(fileDiv.getAttribute('id')).not.toBe('');
		});
	});

	describe('MoreFiles', () => {
		it('renders the count and assistive text inside a Files list', () => {
			const { container } = renderWithIcons(
				<Files>
					<MoreFiles count="+3" image="/assets/images/placeholder.jpg" />
				</Files>
			);

			expect(screen.getByText('+3')).toBeInTheDocument();
			expect(screen.getByText('more files')).toBeInTheDocument();
			expect(container.querySelector('.slds-file_card')).toBeInTheDocument();
		});
	});
});
