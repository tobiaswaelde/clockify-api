import { HourlyRate, HourlyRateRequest } from './hourly-rate';

export type MembershipStatus = 'PENDING' | 'ACTIVE' | 'DECLINED' | 'INACTIVE';

export type Membership = {
	userId: string;
	hourlyRate: HourlyRate;
	costRate: any;
	targetId: string;
	membershipType: string;
	membershipStatus: MembershipStatus;
};
export type MembershipRequest = {
	userId: string;
	hourlyRate: HourlyRateRequest;
	costRate: any;
	targetId: string;
	membershipType: string;
	membershipStatus: string;
};
