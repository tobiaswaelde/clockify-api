import { Membership } from './membership';
import { WorkspaceSettings } from './workspace-settings';
import { FeatureSubscriptionType } from './feature-subscription-type';
import { CostRate, CostRateRequest } from './cost-rate';
import { HourlyRate, HourlyRateRequest } from './hourly-rate';

export type Workspace = {
	costRate: CostRate;
	featureSubscriptionType: FeatureSubscriptionType;
	hourlyRate: HourlyRate;
	id: string;
	imageUrl: string;
	memberships: Membership[];
	name: string;
	workspaceSettings: WorkspaceSettings;
};

export type AddWorkspaceRequest = {
	name: string;
};

export type UpdateWorkspaceCostRateRequest = {
	/** `>= 0` */
	amount: number;
	currency: string;
	since: string;
};

export type UpdateWorkspaceBillingRateRequest = {
	/** `>= 0` */
	amount: number;
	currency: string;
	since: string;
};

export type AddUserToWorkspaceRequest = {
	email: string;
};
export type AddUserToWorkspaceFilter = {
	/**
	 * @default true
	 */
	sendEmail?: boolean;
};

export type UpdateUserStatusRequest = {
	membershipStatus: 'ACTIVE' | 'INACTIVE';
	status?: string;
};

export type UpdateUserCostRateRequest = CostRateRequest;
export type UpdateUserHourlyRateRequest = HourlyRateRequest;
