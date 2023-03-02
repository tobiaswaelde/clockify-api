import { TaskRequest } from './task';
import { Duration } from './duration';
import { EstimateRequest } from './expenses';
import { HourlyRate, HourlyRateRequest } from './hourly-rate';
import { Membership, MembershipRequest } from './membership';
import { SortOrder } from './sort-order';
import {
	Estimate,
	EstimateWithOptions,
	EstimateWithOptionsRequest,
	TimeEstimate,
	TimeEstimateRequest,
} from './estimate';
import { CostRate, CostRateRequest } from './cost-rate';

export type Project = {
	color: string;
	duration: Duration;
	id: string;
	memberships: Membership[];
	name: string;
	note: string;
	public: boolean;
	workspaceId: string;
};
export type ProjectInfo = Project & {
	archived: boolean;
	billable: boolean;
	budgetEstimate: EstimateWithOptions;
	clientId: string;
	clientName: string;
	costRate: CostRate;
	estimate: Estimate;
	hourlyRate: HourlyRate;
	template: boolean;
	timeEstimate: TimeEstimate;
};

export type GetProjectsFilter = {
	name?: string;
	'strict-name-search'?: boolean;
	archived?: boolean;
	billable?: boolean;
	clients?: string[];

	/**
	 * @default true
	 */
	'contains-client'?: boolean;

	/**
	 * @default 'ALL'
	 */
	'client-status'?: string;
	users?: string[];

	/**
	 * @default true
	 */
	'contains-user'?: boolean;
	'user-status'?: string;
	'is-template'?: boolean;

	/**
	 * @default 'NAME'
	 */
	'sort-column'?: string;

	/**
	 * @default 'ASCENDING'
	 */
	'sort-order'?: SortOrder;

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
	access?: string[];
};

export type AddProjectRequestBody = {
	billable?: boolean;
	clientId?: string;
	/**
	 * ^#(?:[0-9a-fA-F]{6}){1}$
	 */
	color?: string;
	estimate?: EstimateRequest;
	hourlyRate?: HourlyRateRequest;
	isPublic?: boolean;
	memberships?: MembershipRequest[];
	name: string;
	note?: string;
	public?: boolean;
	tasks: TaskRequest[];
};

export type GetProjectFilter = {
	/**
	 * @default false
	 */
	hydrated?: boolean;

	/**
	 * @default 'TIMEENTRY'
	 */
	customFieldEntityType?: string;
};

export type UpdateProjectRequestBody = {
	archived?: boolean;
	billable?: boolean;
	clientId?: string;
	/** `^#(?:[0-9a-fA-F]{6}){1}$` */
	color?: string;
	costRate?: CostRateRequest;
	hourlyRate?: HourlyRateRequest;
	isPublic?: boolean;
	name?: string;
	note?: string;
};

export type UpdateProjectEstimateRequestBody = {
	budgetEstimate?: EstimateWithOptionsRequest;
	timeEstimate?: TimeEstimateRequest;
};

type UserIdWithHourlyRate = {
	hourlyRate?: HourlyRateRequest;
	userId: string;
};
export type UpdateProjectMembershipsRequestBody = {
	memberships: UserIdWithHourlyRate[];
};

export type UpdateProjectTemplateRequestBody = {
	isTemplate?: boolean;
	template?: boolean;
};
