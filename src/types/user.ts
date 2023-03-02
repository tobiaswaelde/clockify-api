import { Membership } from './membership';
import { Role } from './role';
import { SortOrder } from './sort-order';
import { UserCustomFieldValue } from './user-custom-field-value';
import { Weekday } from './weekday';

export type AddUserPhotoResponse = {
	name: string;
	url: string;
};

export type UserStatus =
	| 'ACTIVE'
	| 'PENDING_EMAIL_VERIFICATION'
	| 'DELETED'
	| 'NOT_REGISTERED'
	| 'LIMITED'
	| 'LIMITED_DELETED';

export type UserRole = 'WORKSPACE_ADMIN' | 'OWNER' | 'TEAM_MANAGER' | 'PROJECT_MANAGER';

export type UserSettings = {
	alerts?: boolean;
	approval?: boolean;
	collapseAllProjectLists?: boolean;
	dashboardPinToTop?: boolean;
	dashboardSelection?: 'ME' | 'TEAM';
	dashboardViewType?: 'PROJECT' | 'BILLABILITY';
	dateFormat: string;
	groupSimilarEntriesDisabled?: boolean;
	isCompactViewOn?: boolean;
	lang?: string;
	longRunning?: boolean;
	multiFactorEnabled?: boolean;
	myStartOfDay?: string;
	onboarding?: boolean;
	projectListCollapse?: number;
	projectPickerTaskFilter?: boolean;
	pto?: boolean;
	reminders?: boolean;
	scheduledReports?: boolean;
	scheduling?: boolean;
	sendNewsletter?: boolean;
	showOnlyWorkingDays?: boolean;
	summaryReportSettings?: SummaryReportSettings;
	theme?: 'DARK' | 'DEFAULT';
	timeFormat: string;
	timeTrackingManual?: boolean;
	timeZone: string;
	weekStart?: Weekday;
	weeklyUpdates?: boolean;
};
export type SummaryReportSettings = {
	group: string;
	subgroup: string;
};

export type UserInfo = {
	activeWorkspace: string;
	customFields: UserCustomFieldValue[];
	defaultWorkspace: string;
	email: string;
	id: string;
	memberships: Membership[];
	name: string;
	profilePicture: string;
	settings: UserSettings;
	status: UserStatus;
};

export type GetCurrentUserInfoParams = {
	'include-memberships'?: boolean;
};

export type UpdateUserEmailParams = {
	'Sub-Domain-Name'?: string;
};
export type UpdateUserEmailRequestBody = {
	email: string;
	passwordConfirm?: string;
};

export type GetUsersParams = {
	/**
	 * If provided, you'll get a filtered list of users that contain the provided string in their email address.
	 */
	email?: string;

	/**
	 * If provided, you'll get a list of users that have access to the project.
	 */
	projectId?: string;

	/**
	 * If provided, you'll get a filtered list of users with the corresponding status.
	 *
	 * Possible values:
	 * - PENDING
	 * - ACTIVE
	 * - DECLINED
	 * - INACTIVE
	 */
	status?: 'PENDING' | 'ACTIVE' | 'DECLINED' | 'INACTIVE';

	/**
	 * If provided, you'll get a filtered list of users that contain the provided string in their name
	 */
	name?: string;

	/**
	 * @default 'EMAIL'
	 */
	'sort-column'?: 'ID' | 'EMAIL' | 'NAME' | 'ACCESS' | 'HOURLYRATE' | 'COSTRATE';

	/**
	 * @default 'ASCENDING'
	 */
	'sort-order'?: SortOrder;

	/**
	 * @default 1
	 */
	page?: number;

	/**
	 * max page-size 5000
	 * @default 50
	 */
	'page-size'?: number;

	/**
	 * If provided, you'll get all users along with what workspaces, groups, or projects they have access to.
	 *
	 * Possible values:
	 * - WORKSPACE
	 * - PROJECT
	 * - USERGROUP
	 * - NONE
	 * - ALL (only get basic data about users on the workpace)
	 *
	 * @default 'NONE'
	 */
	memberships?: 'WORKSPACE' | 'PROJECT' | 'USERGROUP' | 'NONE' | 'ALL';

	/**
	 * If you pass along includeRoles=true, you'll get each user's detailed manager role (including projects and members for whome they're managers)
	 * @default false
	 */
	includeRoles?: boolean;
};

export type FilterWorkspaceUsersRequestBody = {
	email?: string;
	includeRoles?: boolean;
	memberships: string;
	name?: string;
	page?: number;
	pageSize?: number;
	projectId?: string;
	roles?: UserRole[];
	sortColumn?: string;
	sortOrder?: string;
	status?: string;
	userGroups?: string[];
};

export type UpdateUserCustomFieldRequestBody = {
	value: any;
};

export type GetUserTeamManagerParams = {
	/**
	 * @default 'EMAIL'
	 */
	'sort-column'?: 'ID' | 'EMAIL' | 'NAME' | 'ACCESS' | 'HOURLYRATE' | 'COSTRATE';

	/**
	 * @default 'ASCENDING'
	 */
	'sort-order'?: SortOrder;

	/**
	 * @default 1
	 */
	page?: number;

	/**
	 * max page-size 5000
	 * @default 50
	 */
	'page-size'?: number;
};

export type RemoveUserManagerRequestBody = {
	entityId: string;
	role?: UserRole;
	sourceType?: 'USER_GROUP';
};

export type GiveUserManagerRoleRequestBody = {
	entityId: string;
	role?: UserRole;
	sourceType?: 'USER_GROUP';
};
export type GiveUserManagerRoleResponse = {
	role: Role;
	userId: string;
	workspaceId: string;
};
