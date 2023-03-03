import { Project } from './project';
import { CustomFieldValue, UpdateCustomFieldRequest } from './custom-fields';
import { CostRate } from './cost-rate';
import { HourlyRate } from './hourly-rate';
import { Tag } from './tag';
import { Task } from './task';
import { TimeInterval } from './time-interval';
import { CreateCustomAttributeRequest } from './custom-attributes';

export type TimeEntryInfo = {
	approvalRequestId: string;
	billable: boolean;
	costRate: CostRate;
	customFields: CustomFieldValue[];
	description: string;
	hourlyRate: HourlyRate;
	id: string;
	project: Project;
	tags: Tag[];
	tasks: Task[];
	timeInterval: TimeInterval;
	type: 'REGULAR' | 'BREAK';
};

export type TimeEntry = {
	billable: boolean;
	customFieldValues: CustomFieldValue[];
	description: string;
	id: string;
	isLocked: boolean;
	kioskId: string;
	projectId: string;
	tagIds: string;
	taskId: string;
	timeInterval: TimeInterval;
	type: string;
	userId: string;
	workspaceId: string;
};
export type TimeEntryId = {
	id: string;
};

export type AddTimeEntryHeaders = {
	'App-Name'?: string;
	'Request-Id'?: string;
	Signature?: string;
};
export type AddTimeEntryRequestBody = {
	billable?: boolean;
	customAttributes?: CreateCustomAttributeRequest[];
	customFields?: UpdateCustomFieldRequest;
	description?: string;
	end?: string;
	projectId?: string;
	start?: string;
	tagIds?: string[];
	taskId?: string;
};

export type MarkTimeEntryInvoicedRequestBody = {
	invoiced: boolean;
	timeEntryIds: TimeEntryId[];
};

export type GetTimeEntryFilter = {
	/**
	 * @default false
	 */
	hydrated?: boolean;
};

export type UpdateTimeEntryHeaders = {
	'App-Name'?: string;
	'Request-Id'?: string;
	Signature?: string;
};
export type UpdateTimeEntryRequestBody = {
	billable?: boolean;
	/** [0..50] items */
	customFields?: UpdateCustomFieldRequest[];
	/** [0..3000] characters */
	description?: string;
	end?: string;
	id?: string;
	projectId?: string;
	start?: string;
	tagIds?: string[];
	taskId?: string;
};

export type GetTimeEntriesForUserFilter = {
	description?: string;
	start?: string;
	end?: string;
	project?: string;
	task?: string;
	tags?: string[];
	'project-required'?: boolean;
	'task-required'?: boolean;
	/**
	 * @default false
	 */
	hydrated?: boolean;
	/**
	 * @default 1
	 */
	page?: number;
	/**
	 * @default 50
	 */
	'page-size'?: number;
	'in-progress'?: boolean;
	'get-week-before'?: boolean;
};

export type StopCurrentRunningTimerRequestBody = {
	end: string;
};

export type BulkEditTimeEntriesFilter = {
	/**
	 * @default false
	 */
	hydrated?: boolean;
};
