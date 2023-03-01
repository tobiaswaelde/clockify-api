import { CostRate } from './cost-rate';
import { HourlyRate } from './hourly-rate';

export type MembershipStatus = 'PENDING' | 'ACTIVE' | 'DECLINED' | 'INACTIVE' | 'ALL';

export type Membership = {
	costRate: CostRate;
	hourlyRate: HourlyRate;
	membershipStatus: MembershipStatus;
	membershipType: string;
	targetId: string;
	userId: string;
};
