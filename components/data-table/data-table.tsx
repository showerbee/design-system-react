/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/**
 * DataTable TypeScript wrapper and exports
 *
 * The main DataTable component remains in index.jsx for now due to its
 * complexity. This file provides TypeScript type exports and will be
 * the future home of the fully converted component.
 */

// Re-export the main component from JSX
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Main component is still JSX
export { default } from './index.jsx';

// Export TypeScript-converted subcomponents. The corresponding `*Props` types
// are re-exported once via `export * from './types'` below (their canonical
// home) to avoid duplicate-export conflicts.
export { default as DataTableCell } from './cell';
export { default as DataTableColumn } from './column';
export { default as DataTableRowActions } from './row-actions';
export { default as DataTableHighlightCell } from './highlight-cell';
export { default as DataTableInteractiveElement } from './interactive-element';
export { default as DataTableInteractiveLink } from './interactive-link';

// Export types
export * from './types';
