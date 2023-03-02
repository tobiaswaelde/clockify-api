export type Tag = {
	archived: boolean;
	id: string;
	name: string;
	workspaceId: string;
};

export type GetTagsFilter = {
	name?: string;
	'strict-name-search'?: boolean;
	excludeIds?: string[];
	/**
	 * @default 'NAME'
	 */
	'sort-column'?: string;
	/**
	 * @default 'ASCENDING'
	 */
	'sort-order'?: string;
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

export type AddTagRequestBody = {
	/**
	 * [0..100] characters
	 */
	name: string;
};

export type UpdateTagRequestBody = {
	archived?: boolean;
	/**
	 * [0..100] characters
	 */
	name: string;
};
