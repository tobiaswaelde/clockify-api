import { Milestone } from './milestone';
import { Period } from './period';
import { SortOrder } from './sort-order';

export type Assignment = {
	billable: boolean;
	clientName: string;
	hoursPerDay: number;
	id: string;
	note: string;
	period: Period;
	projectArchived: boolean;
	projectBillable: boolean;
	projectColor: string;
	projectId: string;
	projectName: string;
	startTime: string;
	userId: string;
	userName: string;
	workspaceId: string;
};

export type AssignmentPerDay = {
	date: string;
	hasAssignment: boolean;
};
export type ScheduledAssignment = {
	assignments: AssignmentPerDay[];
	clientName: string;
	milestones: Milestone[];
	projectArchived: boolean;
	projectBillable: boolean;
	projectColor: string;
	projectId: string;
	projectName: string;
	totalHours: number;
	workspaceId: string;
};

export type GetAssignmentsFilter = {
	/**
	 * If provided, assignments will be filtered by name
	 * @default ''
	 */
	name?: string;

	/** start date */
	start?: string;

	/** end date */
	end?: string;

	/**
	 * @default 'USER'
	 */
	'sort-column'?: 'PROJECT' | 'USER';

	/**
	 * @default 'ASCENDING'
	 */
	'sort-order'?: SortOrder;

	/**
	 * @default 1
	 */
	page?: number;

	/**
	 * max page-size 5000
	 * @default 50
	 */
	'page-size'?: number;
};

export type GetScheduledAssignmentsFilter = {
	/**
	 * @default ''
	 */
	search?: string;

	/** start date */
	start: string;

	/** end date */
	end: string;

	/**
	 * page
	 * @default 1
	 */
	page?: number;

	/**
	 * max page-size 200
	 * @default 50
	 */
	'page-size'?: number;
};

export type GetProjectScheduledAssignmentsFilter = {
	/** start date */
	start: string;

	/** end date */
	end: string;
};
