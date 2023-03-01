export type CostRate = {
	amount: number;
	currency: string;
};

export type CostRateRequest = {
	/** `>= 0` */
	amount: number;
	since: string;
};
