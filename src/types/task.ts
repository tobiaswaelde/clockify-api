import { CostRate, CostRateRequest } from './cost-rate';
import { HourlyRate, HourlyRateRequest } from './hourly-rate';
import { SortOrder } from './sort-order';

export type TaskStatus = 'ACTIVE' | 'DONE' | 'ALL';

export type Task = {
	assigneeIds: string[];
	billable: boolean;
	costRate: CostRate;
	duration: string;
	estimate: string;
	hourlyRate: HourlyRate;
	id: string;
	name: string;
	projectId: string;
	status: TaskStatus;
	userGroupIds: string[];
};

export type GetTasksParams = {
	name?: string;
	'strict-name-search'?: boolean;
	'is-active'?: boolean;
	/**
	 * @default 1
	 */
	page?: number;
	/**
	 * @default 50
	 */
	'page-size'?: number;
	/**
	 * @default 'ID'
	 */
	'sort-column'?: string;
	/**
	 * @default 'DESCENDING'
	 */
	'sort-order'?: SortOrder;
};

export type AddTaskParams = {
	/**
	 * @default true
	 */
	'contains-assignee': boolean;
};

export type Estimate = {
	nano: number;
	negative: boolean;
	seconds: number;
	units: {
		dateBased: boolean;
		duration: {
			nano: number;
			negative: boolean;
			seconds: number;
			zero: boolean;
		}[];
		durationEstimated: boolean;
		timeBased: boolean;
	}[];
	zero: boolean;
};
export type AddTaskRequestBody = {
	assigneeId?: string;
	assigneeIds?: string;
	estimate?: Estimate;
	id: string;
	status?: string;
	statusEnum?: 'ACTIVE' | 'DONE' | 'ALL';
	userGroupIds: string[];
};

export type UpdateTaskCostRateRequestBody = {
	/** `>= 0` */
	amount?: number;
	since?: string;
};

export type UpdateTaskBillableRateRequestBody = {
	/** `>= 0` */
	amount: number;
	since?: string;
};

export type UpdateTaskParams = {
	/**
	 * @default true
	 */
	'contains-assignee'?: boolean;
	'membership-status'?: string;
};
export type UpdateTaskRequestBody = {
	assigneeId?: string;
	assigneeIds?: string[];
	billable?: boolean;
	budgetEstimate?: number;
	estimate?: Estimate;
	name: string;
	status?: string;
	userGroupIds: string[];
};

export type TaskRequest = {
	assigneeId?: string;
	assigneeIds?: string[];
	billable?: boolean;
	/** `>= 0` */
	budgetEstimate?: number;
	costRate?: CostRateRequest;
	esimate?: string;
	hourlyRate?: HourlyRateRequest;
	id?: string;
	name: string;
	projectId?: string;
	status?: string;
	userGroupIds?: string[];
};
