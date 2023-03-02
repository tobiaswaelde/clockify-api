import { AuthorizationSource } from './authorization-source';

export type Role = {
	id: string;
	name: string;
	source: AuthorizationSource;
};
