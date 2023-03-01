import { DateRange } from './date-range';
import { ExpenseHydrated } from './expenses';
import { SortOrder } from './sort-order';
import { TimeEntryInfo } from './time-entry';

export type ApprovalRequestResponse = {
	approvalRequest: ApprovalRequest;
	approvedTime: string;
	billableAmount: number;
	billableTime: string;
	breakTime: string;
	costAmount: number;
	entries: TimeEntryInfo[];
	expenseTotal: number;
	expenses: ExpenseHydrated[];
	pendingTime: string;
	trackedTime: string;
};
export type ApprovalRequest = {
	creator: ApprovalRequestCreator;
	dateRange: DateRange;
	id: string;
	owner: ApprovalRequestOwner;
	status: ApprovalRequestStatus;
	workspaceId: string;
};

export type ApprovalRequestCreator = {
	userEmail: string;
	userId: string;
	userName: string;
};
export type ApprovalRequestOwner = {
	startOfWeek: string;
	timeZone: string;
	userId: string;
	userName: string;
};
export type ApprovalRequestStatus = {
	note: string;
	state: string;
	updatedAt: string;
	updatedBy: string;
	updatedByUserId: string;
};

export type GetApprovalRequestsParams = {
	/**
	 * @default 'PENDING'
	 */
	status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'WITHDRAWN_APPROVAL' | 'WITHDRAWN_SUBMISSION';

	/**
	 * `START` (to sort by week), `USER_ID` (to sort by people)
	 * @default 'START'
	 */
	sortColumn?: 'START' | 'USER_ID';

	/**
	 * @default 'DESCENDING'
	 */
	sortOrder?: SortOrder;

	/**
	 * Current page number
	 * @default 1
	 */
	page?: number;

	/**
	 * `>= 1`; max page-size 200
	 * @default 50
	 */
	'page-size'?: number;
};

export type SubmitApprovalRequestData = {
	period: string;
	weekTime: string;
	weeksAgo: number;
};
