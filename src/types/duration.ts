export type DurationBase = {
	nano: number;
	negative: boolean;
	seconds: number;
	zero: boolean;
};

export type DurationUnit = {
	dateBased: boolean;
	duration: DurationBase;
	durationEstimated: boolean;
	timeBased: boolean;
};

export type Duration = DurationBase & {
	units: DurationUnit[];
};
