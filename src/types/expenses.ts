import { Duration } from './duration';
import { Project } from './project';

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
