import { CostRate } from './cost-rate';
import { HourlyRate, HourlyRateRequest } from './hourly-rate';

export type MembershipStatus = 'PENDING' | 'ACTIVE' | 'DECLINED' | 'INACTIVE' | 'ALL';

export type Membership = {
	costRate: CostRate;
	hourlyRate: HourlyRate;
	membershipStatus: MembershipStatus;
	membershipType: string;
	targetId: string;
	userId: string;
};

export type MembershipRequest = {
	hourlyRate: HourlyRateRequest;
	membershipStatus: MembershipStatus;
	membershipType: string;
	targetId: string;
	userId: string;
};
