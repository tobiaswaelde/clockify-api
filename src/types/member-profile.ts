import { UpsertUserCustomFieldRequest, UserCustomFieldValueFull } from './user-custom-field-value';
import { Weekday } from './weekday';

export type MemberProfile = {
	email: string;
	hasPassword: boolean;
	hasPendingApprovalRequest: boolean;
	imageUrl: string;
	name: string;
	userCustomFieldValues: UserCustomFieldValueFull[];
	weekStart: string;
	workCapacity: string;
	workingDays: string[];
	workspaceNumber: number;
};

export type UpdateMemberProfileRequestBody = {
	imageUrl?: string;
	name?: string;
	removeProfileImage?: boolean;
	userCustomFields?: UpsertUserCustomFieldRequest[];
	weekStart?: Weekday;
	workCapacity?: string;
	workingDays: Weekday[];
};
