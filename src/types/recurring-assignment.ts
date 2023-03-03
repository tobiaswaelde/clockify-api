import { ContainsUserGroupFilterRequest, ContainsUsersFilterRequest } from './assignment';
import { DateRange } from './date-range';
import { Period } from './period';
import { Weekday } from './weekday';

export type RecurringAssignmentRequest = {
	reoeat: boolean;
	/** [1..99] */
	weeks: number;
};
export type CreateRecurringAssignmentRequestBody = {
	billable?: boolean;
	end?: string;
	hoursPerDay?: number;
	includeNonWorkingDays?: boolean;
	/** [0..100] characters */
	note?: string;
	period?: Period;
	projectId: string;
	recurring?: RecurringAssignmentRequest;
	recurringAssignment?: RecurringAssignmentRequest;
	regurlarRecurringAssignment?: RecurringAssignmentRequest;
	start?: string;
	startTime?: string;
	userId: string;
};

export type SchedulingExcludeDay = {
	date: string;
	type: 'WEEKEND' | 'HOLIDAY' | 'TIME_OFF';
};
export type RecurringAssignment = {
	billable: boolean;
	excludeDays: SchedulingExcludeDay[];
	hoursPerDay: number;
	id: string;
	includeNonWorkingDays: boolean;
	note: string;
	period: DateRange;
	projectId: string;
	published: boolean;
	recurring: RecurringAssignment;
	startTime: string;
	userId: string;
	workspaceId: string;
};

export type DeleteRecurringAssignmentRequestBody = {
	seriesUpdateOption: 'THIS_ONE';
};

export type UpdateRecurringAssignmentRequestBody = {
	billable?: boolean;
	end?: string;
	hoursPerDay?: number;
	includeNonWorkingDays?: boolean;
	/** [0..100] characters */
	note?: string;
	period?: DateRange;
	seriesUpdateOption?: 'THIS_ONE' | 'THIS_AND_FOLLOWING' | 'ALL';
	start?: string;
	startTime?: string;
};

export type ChangeRecurringAssignmentPeriodRequestBody = {
	repeat: boolean;
	/** [1..99] */
	weeks: number;
};

export type GetTotalUserCapacityRequestBody = {
	end?: string;
	page?: number;
	'page-size'?: number;
	regularUserFilter?: ContainsUsersFilterRequest;
	regularUserGroupFilter?: ContainsUserGroupFilterRequest;
	search?: string;
	start?: string;
	userFilter?: ContainsUsersFilterRequest;
	userGroupFilter?: ContainsUserGroupFilterRequest;
};

export type TotalHoursPerDay = {
	date: string;
	totalHours: number;
};
export type UserCapacity = {
	capacityPerDay: number;
	totalHoursPerDay: TotalHoursPerDay[];
	userId: string;
	userImage: string;
	userName: string;
	userStatus: string;
	workingDays: Weekday[];
	workspaceId: string;
};

export type GetUserTotalCapacityFilter = {
	/**
	 * @default 1
	 */
	page?: number;

	/**
	 * `<= 200`
	 * @default 50
	 */
	'page-size'?: number;

	start: string;
	end: string;
};

export type CopyScheduledAssignmentRequestBody = {
	seriesUpdateOption?: 'THIS_ONE' | 'THIS_AND_FOLLOWING' | 'ALL';
	userId: string;
};
