export type HourlyRate = {
	amount: number;
	currency: string;
};

export type HourlyRateRequest = {
	/** `>= 0` */
	amount: number;
	since?: string;
};
