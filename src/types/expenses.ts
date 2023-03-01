import { ProjectInfo } from './project';

export type ExpenseCategory = {
	archived: boolean;
	hasUnitPrice: boolean;
	id: string;
	name: string;
	priceInCents: number;
	unit: string;
	workspaceId: string;
};

export type ExpenseHydrated = {
	approvalRequestId: string;
	bollable: boolean;
	category: ExpenseCategory;
	date: string;
	fileId: string;
	fileName: string;
	id: string;
	locked: boolean;
	notes: string;
	project: ProjectInfo;
	quantity: number;
	total: number;
	userId: string;
	workspaceId: string;
};
