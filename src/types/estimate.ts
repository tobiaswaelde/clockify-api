import { Duration } from './duration';

export type EstimateType = 'AUTO' | 'MANUAL';
export type EstimateResetOption = 'MONTHLY';

export type Estimate = {
	estimate: Duration;
	type: EstimateType;
};

export type EstimateWithOptions = {
	active: boolean;
	estimate: number;
	includeExpenses: boolean;
	resetOption: EstimateResetOption;
	type: EstimateType;
};

export type TimeEstimate = Estimate & {
	active: boolean;
	includeNonBillable: boolean;
	resetOption: EstimateResetOption;
};

export type EstimateWithOptionsRequest = {
	active: boolean;
	estimate: number;
	includeExpenses: boolean;
	includesBillableExpenses: boolean;
	resetOption: EstimateResetOption;
	type: EstimateType;
};

export type TimeEstimateRequest = {
	active: boolean;
	estimate: number;
	includesNonBillable: boolean;
	resetOption: EstimateResetOption;
	type: EstimateType;
};
