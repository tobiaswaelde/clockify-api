import { Duration } from './duration';
import { ExpenseCategory } from './expense-category';
import { Project } from './project';

export type GetExpensesFilter = {
	/**
	 * @default 1
	 */
	page?: number;

	/**
	 * [1..200]
	 * @default 50
	 */
	'page-size'?: number;

	userId?: string;
};

export type ExpensesResponse = {
	dailyTotals: ExpenseDailyTotals[];
	expenses: ExpensesWithCount;
	weeklyTotals: ExpenseWeeklyTotals[];
};

export type ExpenseDailyTotals = {
	date: string;
	dateAsInstant: string;
	total: number;
};
export type ExpensesWithCount = {
	count: number;
	expenses: ExpenseHydrated[];
};
export type ExpenseWeeklyTotals = {
	date: string;
	total: number;
};

export type Expense = {
	billable: boolean;
	categoryId: string;
	date: string;
	fileId: string;
	id: string;
	locked: boolean;
	notes: string;
	projectId: string;
	quantity: number;
	total: number;
	userId: string;
	workspaceId: string;
};

export type ExpenseHydrated = {
	approvalRequestId: string;
	billable: boolean;
	category: ExpenseCategory;
	date: string;
	fileId: string;
	fileName: string;
	id: string;
	locked: boolean;
	notes: string;
	project: Project;
	quantity: number;
	total: number;
	userId: string;
	workspaceId: string;
};

export type EstimateRequest = {
	estimate: Duration;
	type: 'AUTO' | 'MANUAL';
};

export type CreateExpenseRequestBody = {
	amount?: number;
	billable?: boolean;
	categoryId?: string;
	date?: string;
	file?: string;
	/** [0..3000] */
	notes?: string;
	projectId?: string;
	userId?: string;
};

export type ExpenseChangeField =
	| 'USER'
	| 'DATE'
	| 'PROJECT'
	| 'CATEGORY'
	| 'NOTES'
	| 'AMOUNT'
	| 'BILLABLE'
	| 'FILE';
export type UpdateExpenseRequestBody = {
	amount?: number;
	billable?: boolean;
	categoryId?: string;
	changeFields?: ExpenseChangeField[];
	date?: string;
	file?: string;
	/** [0..3000] characters */
	notes?: string;
	projectId?: string;
	userId?: string;
};
