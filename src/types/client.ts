import { SortOrder } from './sort-order';

export type Client = {
	address: string;
	archived: boolean;
	email: string;
	id: string;
	name: string;
	note: string;
	workspaceId: string;
};

export type GetClientsParams = {
	name?: string;

	/**
	 * @default 'NAME'
	 */
	'sort-column'?: 'NAME';

	/**
	 * @default 'ASCENDING'
	 */
	'sort-order'?: SortOrder;

	/**
	 * @default 1
	 */
	page?: number;

	/**
	 * @default 50
	 */
	'page-size'?: number;

	archived?: boolean;
};

export type AddClientRequestData = {
	/** [0..3000] characters */
	address?: string;
	email?: string;
	/** [0..100] characters */
	name: string;
	/** [0..3000] characters */
	note?: string;
};

export type UpdateClientParams = {
	'archive-projects'?: boolean;
};

export type UpdateClientRequestData = {
	/** [0..3000] characters */
	address?: string;
	archived?: string;
	email?: string;
	/** [0..100] characters */
	name: string;
	/** [0..3000] characters */
	note?: string;
};
