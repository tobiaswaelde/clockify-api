export type Contains = {
	contains: 'CONTAINS' | 'DOES_NOT_CONTAIN' | 'CONTAINS_ONLY';
	ids: string[];
	status: string;
};
