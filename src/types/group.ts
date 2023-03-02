export type Group = {
	id: string;
	name: string;
	userIds: string[];
	workspaceId: string;
};

export type GetGroupFilter = {
	projectId?: string;
	name?: string;
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
};

export type AddGroupRequestBody = {
	/**
	 * [0..100] characters
	 */
	name: string;
};

export type UpdateGroupRequestBody = {
	/**
	 * [0..100] characters
	 */
	name: string;
};
