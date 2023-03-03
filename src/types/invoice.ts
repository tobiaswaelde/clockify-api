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

export type InvoiceDefaultSettings = {
	companyId: string;
	defaultImportExpenseItemTypeId: string;
	defaultImportTimeItemTypeId: string;
	dueDays: number;
	itemTypeId: string;
	notes: string;
	subject: string;
	/**
	 * @deprecated
	 */
	tax: number;
	/**
	 * @deprecated
	 */
	tax2: number;
	taxPercent: number;
	tax2Percent: number;
	taxType: string;
};
export type InvoiceDefaultSettingsRequest = {
	companyId?: string;
	dueDays?: number;
	itemTypeId?: string;
	notes: string;
	subject: string;
	tax2Percent?: number;
	taxPercent?: number;
	taxType?: 'COMPOUND' | 'SIMPLE' | 'NONE';
};
export type InvoiceExportFields = {
	itemType: boolean;
	quantity: boolean;
	rtl: boolean;
	unitPrice: boolean;
};
export type InvoiceExportFieldsRequest = {
	RTL?: boolean;
	itemType?: boolean;
	quantity?: boolean;
	rtl?: boolean;
	unitPrice?: boolean;
};
export type LabelsCustomization = {
	amount: string;
	billFrom: string;
	billTo: string;
	description: string;
	discounts: string;
	dueDate: string;
	issueDate: string;
	itemType: string;
	notes: string;
	quantity: string;
	subtotal: string;
	tax: string;
	tax2: string;
	totalAmount: string;
	unitPrice: string;
};
export type LabelsCustomizationRequest = {
	/** [0..20] characters */
	amount?: string;
	/** [0..20] characters */
	billFrom?: string;
	/** [0..20] characters */
	billTo?: string;
	/** [0..20] characters */
	description?: string;
	/** [0..20] characters */
	discounts?: string;
	/** [0..20] characters */
	dueDate?: string;
	/** [0..20] characters */
	issueDate?: string;
	/** [0..20] characters */
	itemType?: string;
	/** [0..20] characters */
	notes?: string;
	/** [0..20] characters */
	quantity?: string;
	/** [0..20] characters */
	subtotal?: string;
	/** [0..20] characters */
	tax?: string;
	/** [0..20] characters */
	tax2?: string;
	/** [0..20] characters */
	totalAmount?: string;
	/** [0..20] characters */
	unitPrice?: string;
};

export type InvoiceOtherLanguageResponse = {
	defaults: InvoiceDefaultSettings;
	exportFields: InvoiceExportFields;
	labels: LabelsCustomization;
};

export type ChangeInvoiceLanguageRequestData = {
	defaults: InvoiceDefaultSettingsRequest;
	exportFields?: InvoiceExportFieldsRequest;
	labels: LabelsCustomizationRequest;
};
