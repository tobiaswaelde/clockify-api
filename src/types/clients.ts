import { SortOrder } from '.';

export type Client = {
	id: string;
	name: string;
	workspaceId: string;
	note?: string;
	archived?: string;
};

export type GetClientsFilter = {
	/** If `true`, you'll get only archived clients. If `false`, you'll get only active clients. */
	archived?: boolean;

	/** If provided, clients will be filtered by name */
	name?: string;

	/**
	 * page
	 * @default 1
	 */
	page?: number;

	/**
	 * max page-size 5000
	 * @default 50
	 */
	pageSize?: number;

	sortColumn?: 'NAME';

	sortOrder?: SortOrder;
};
