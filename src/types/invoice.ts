import { ContainsClientsFilterRequest } from './client';
import { ContainsCompaniesFilterRequest } from './company';
import { SortOrder } from './sort-order';
import { TimeRangeRequest } from './time-range';

export type InvoiceStatus = 'UNSENT' | 'SENT' | 'PAID' | 'VOID' | 'OVERDUE';
export type GetInvoicesFilter = {
	/**
	 * @default 1
	 */
	page?: number;

	/**
	 * @default 50
	 */
	'page-size'?: number;

	/**
	 * @default ['PAID', 'SENT', 'UNSENT', 'VOID', 'OVERDUE']
	 */
	statuses?: InvoiceStatus[];

	/**
	 * @default 'ID'
	 */
	'sort-column'?: string;

	/**
	 * @default 'ASCENDING'
	 */
	'sort-order'?: SortOrder;
};

export type InvoicesResponse = {
	invoices: BaseInvoice[];
	total: number;
};

export type BaseInvoice = {
	amount: number;
	clientId: string;
	clientName: string;
	currency: string;
	dueDate: string;
	id: string;
	issuedDate: string;
	number: string;
	status: InvoiceStatus;
};
export type InvoiceInfo = BaseInvoice & {
	billFrom: string;
	daysOverdue: number;
	visibleZeroFields: ('TAX' | 'TAX_2' | 'DISCOUNT')[];
};

export type InvoiceItem = {
	amount: number;
	description: string;
	itemType: string;
	order: number;
	quantity: number;
	timeEntryIds: string[];
	unitPrice: number;
};

export type Invoice = BaseInvoice & {
	billFrom: string;
	clientAddress: string;
	companyId: string;
	containsImportedExpenses: boolean;
	containsImportedTimes: boolean;
	discount: number;
	discountAmount: number;
	items: InvoiceItem[];
	note: string;
	subject: string;
	subtotal: number;
	tax: number;
	tax2: number;
	tax2Amount: number;
	taxAmount: number;
	userId: string;
	visibleZeroFields: ('TAX' | 'TAX_2' | 'DISCOUNT')[];
};

export type AddInvoiceRequestBody = {
	clientId: string;
	currency: string;
	dueDate?: string;
	issuedDate?: string;
	number: string;
};
export type AddInvoiceResponse = {
	billFrom: string;
	clientId: string;
	currency: string;
	dueDate: string;
	id: string;
	issuedDate: string;
	number: string;
};

export type FilterInvoicesRequestBody = {
	clients?: ContainsClientsFilterRequest;
	companies?: ContainsCompaniesFilterRequest;
	'exact-amount'?: number;
	'greater-than-amount'?: number;
	'invoice-number'?: string;
	'issue-date'?: TimeRangeRequest;
	'less-than-amount'?: number;
	page: number;
	'page-size'?: number;
	'sort-column'?: string;
	'sort-order'?: SortOrder;
	statuses?: InvoiceStatus[];
	'strict-id-search'?: boolean;
};
export type FilterInvoiceResponse = {
	invoices: InvoiceInfo[];
	total: number;
};
