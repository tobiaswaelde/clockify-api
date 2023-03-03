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

export type ContainsUsersFilterRequest = {
	contains: 'CONTAINS' | 'DOES_NOT_CONTAIN' | 'CONTAINS_ONLY';
	ids: string[];
	sourceType: 'USER_GROUP';
	status: string;
	statuses: 'PENDING' | 'ACTIVE' | 'DECLINED' | 'INACTIVE' | 'ALL';
};
export type ContainsUserGroupFilter = {
	contains: 'CONTAINS' | 'DOES_NOT_CONTAIN' | 'CONTAINS_ONLY';
	ids: string[];
	status: string;
};

export type PublishAssignmentRequestBody = {
	end?: string;
	notifyUsers?: boolean;
	regularUserFilter?: ContainsUsersFilterRequest;
	regularUserGroupFilter?: ContainsUserGroupFilter;
	search?: string;
	start?: string;
	userFilter?: ContainsUsersFilterRequest;
	userGroupFilter?: ContainsUserGroupFilter;
	viewType?: 'PROJECTS' | 'TEAM' | 'ALL';
};

export type ContainsUserGroupFilterRequest = {
	contains: 'CONTAINS' | 'DOES_NOT_CONTAIN' | 'CONTAINS_ONLY';
	ids: string[];
	status: string;
};
