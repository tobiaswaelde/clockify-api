import { SortOrder } from './sort-order';

export type ExpenseCategoriesResponse = {
	categories: ExpenseCategory[];
	count: number;
};

export type ExpenseCategory = {
	archived: boolean;
	hasUnitPrice: boolean;
	id: string;
	name: string;
	priceInCents: number;
	unit: string;
	workspaceId: string;
};

export type GetExpenseCategoriesFilter = {
	/**
	 * @default 'NAME'
	 */
	'sort-column'?: string;

	/**
	 * @default 'ASCENDING'
	 */
	'sort-order'?: SortOrder;

	/**
	 * `>= 1`
	 * @default 1
	 */
	page?: number;

	/**
	 * `>= 1`
	 * @default 50
	 */
	'page-size'?: number;

	archived?: boolean;
	name?: string;
};
