import axios from 'axios';
import * as qs from 'qs';
import {
	GetExpenseCategoriesFilter,
	ExpenseCategoriesResponse,
	AddExpenseCategoryRequestBody,
	ExpenseCategory,
	UpdateExpenseCategoryRequestBody,
	ArchiveExpenseCategoryRequestBody,
} from './types/expense-category';
import {
	ApprovalRequest,
	ApprovalRequestResponse,
	GetApprovalRequestsFilter,
	SubmitApprovalRequestBody,
	UpdateApprovalRequestBody,
} from './types/approval';
import {
	Assignment,
	GetAssignmentsFilter,
	GetProjectScheduledAssignmentsFilter,
	GetScheduledAssignmentsFilter,
	PublishAssignmentRequestBody,
	ScheduledAssignment,
} from './types/assignment';
import { AuthType } from './types/auth';
import {
	AddClientRequestBody,
	Client,
	GetClientsFilter,
	UpdateClientFilter,
	UpdateClientRequestBody,
} from './types/client';
import { CostRateRequest } from './types/cost-rate';
import {
	CustomField,
	GetProjectCustomFieldsFilter,
	GetWorkspaceCustomFieldsFilter,
	SetCustomFieldRequiredRequestBody,
	UpdateCustomFieldRequestBody,
} from './types/custom-fields';
import {
	CreateExpenseRequestBody,
	Expense,
	ExpensesResponse,
	GetExpensesFilter,
	UpdateExpenseRequestBody,
} from './types/expenses';
import { AddGroupRequestBody, GetGroupFilter, Group, UpdateGroupRequestBody } from './types/group';
import { HourlyRateRequest } from './types/hourly-rate';
import { MemberProfile, UpdateMemberProfileRequestBody } from './types/member-profile';
import {
	AddProjectRequestBody,
	GetProjectFilter,
	GetProjectsFilter,
	Project,
	ProjectInfo,
	UpdateProjectEstimateRequestBody,
	UpdateProjectMembershipsRequestBody,
	UpdateProjectRequestBody,
	UpdateProjectTemplateRequestBody,
} from './types/project';
import {
	ChangeRecurringAssignmentPeriodRequestBody,
	CreateRecurringAssignmentRequestBody,
	DeleteRecurringAssignmentRequestBody,
	GetTotalUserCapacityRequestBody,
	GetUserTotalCapacityFilter,
	RecurringAssignment,
	UserCapacity,
	UpdateRecurringAssignmentRequestBody,
	CopyScheduledAssignmentRequestBody,
} from './types/recurring-assignment';
import { AddTagRequestBody, GetTagsFilter, Tag, UpdateTagRequestBody } from './types/tag';
import {
	AddTaskParams,
	AddTaskRequestBody,
	GetTasksFilter,
	Task,
	UpdateTaskBillableRateRequestBody,
	UpdateTaskCostRateRequestBody,
	UpdateTaskParams,
	UpdateTaskRequestBody,
} from './types/task';
import {
	AddUserPhotoResponse,
	GetCurrentUserInfoFilter,
	UserInfo,
	UpdateUserEmailRequestBody,
	UpdateUserEmailFilter,
	GetUsersFilter,
	FilterWorkspaceUsersRequestBody,
	UpdateUserCustomFieldRequestBody,
	GetUserTeamManagerParams,
	RemoveUserManagerRequestBody,
	GiveUserManagerRoleRequestBody,
	GiveUserManagerRoleResponse,
} from './types/user';
import { UserCustomFieldValue } from './types/user-custom-field-value';
import {
	GetWebhooksFilter,
	Webhook,
	CreateWebhookRequestBody,
	UpdateWebhookRequestBody,
} from './types/webhook';
import {
	AddUserToWorkspaceFilter,
	AddUserToWorkspaceRequest,
	AddWorkspaceRequest,
	UpdateUserCostRateRequest,
	UpdateUserHourlyRateRequest,
	UpdateUserStatusRequest,
	UpdateWorkspaceBillingRateRequest,
	UpdateWorkspaceCostRateRequest,
	Workspace,
} from './types/workspace';
import {
	AddInvoiceRequestBody,
	AddInvoiceResponse,
	ChangeInvoiceLanguageRequestData,
	ChangeInvoiceStatusRequestBody,
	FilterInvoiceResponse,
	FilterInvoicesRequestBody,
	GetInvoicesFilter,
	Invoice,
	InvoiceOtherLanguageResponse,
	InvoicesResponse,
	SendInvoiceRequestBody,
} from './types/invoice';
import {
	AddTimeEntryHeaders,
	AddTimeEntryRequestBody,
	BulkEditTimeEntriesFilter,
	GetTimeEntriesForUserFilter,
	GetTimeEntryFilter,
	MarkTimeEntryInvoicedRequestBody,
	StopCurrentRunningTimerRequestBody,
	TimeEntry,
	UpdateTimeEntryHeaders,
	UpdateTimeEntryRequestBody,
} from './types/time-entry';

const BASE_URL = 'https://api.clockify.me/api/v1';

/**
 * Our REST API has a specific rate limit of 50 requests per second (by addon on one workspace) when accessed using X-Addon-Token. Exceeding this limit will result in an error message with the description "Too many requests"
 */
export class Clockify {
	private static http = axios.create({
		baseURL: BASE_URL,
	});

	//#region Authentication
	/**
	 * Authenticate using API key
	 * @link https://docs.clockify.me/#section/Authentication
	 * @param {string} key The API key or Addon key, `undefined` to remove authentication
	 * @param {AuthType} authType The type of the authentication
	 */
	public static authenticate(apiKey: string | undefined, authType: AuthType = AuthType.ApiKey) {
		this.http.defaults.headers.common[authType] = apiKey;
	}
	//#endregion

	//#region User
	/**
	 * Add photo
	 * @link https://docs.clockify.me/#tag/User/operation/uploadImage
	 * @param image The user image as binary string
	 * @returns The user image name and url
	 */
	public static async addUserPhoto(image: string | Blob): Promise<AddUserPhotoResponse> {
		const data = new FormData();
		data.append('file', image);

		const res = await this.http.post(`/file/image`, data);
		return res.data satisfies AddUserPhotoResponse;
	}

	/**
	 * Get currently logged-in user's info
	 * @link https://docs.clockify.me/#tag/User/operation/getLoggedUser
	 * @param filters The filters
	 * @returns The user info
	 */
	public static async getCurrentUserInfo(filters?: GetCurrentUserInfoFilter): Promise<UserInfo> {
		const q = qs.stringify(filters, { encodeValuesOnly: true });
		const res = await this.http.get(`/user?${q}`);
		return res.data satisfies UserInfo;
	}

	/**
	 * Get member's profile
	 * @link https://docs.clockify.me/#tag/User/operation/getMemberProfile
	 * @param workspaceId The ID of the workspace
	 * @param userId The ID of the user
	 * @returns The member profile
	 */
	public static async getMembersProfile(
		workspaceId: string,
		userId: string
	): Promise<MemberProfile> {
		const res = await this.http.get(`/workspaces/${workspaceId}/member-profile/${userId}`);
		return res.data satisfies MemberProfile;
	}

	/**
	 * Update member's profile
	 * @link https://docs.clockify.me/#tag/User/operation/updateMemberProfileWithAdditionalData
	 * @param workspaceId The ID of the workspace
	 * @param userId
	 * @param data The data to update
	 * @returns The updated member profile
	 */
	public static async updateMembersProfile(
		workspaceId: string,
		userId: string,
		data: UpdateMemberProfileRequestBody
	): Promise<MemberProfile> {
		const res = await this.http.patch(`/workspaces/${workspaceId}/member-profile/${userId}`, data);
		return res.data satisfies MemberProfile;
	}

	/**
	 * Update user's email
	 * @link https://docs.clockify.me/#tag/User/operation/changeUserMemberEmail
	 * @param workspaceId The ID of the workspace
	 * @param userId
	 * @param data The data to update
	 * @param options The options
	 */
	public static async updateUserEmail(
		workspaceId: string,
		userId: string,
		data: UpdateUserEmailRequestBody,
		options?: UpdateUserEmailFilter
	): Promise<void> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.put(
			`/workspaces/${workspaceId}/member-profile/${userId}/email?${q}`,
			data
		);
		return res.data;
	}

	/**
	 * Find all users on workspace
	 * @link https://docs.clockify.me/#tag/User/operation/getUsersOfWorkspace
	 * @param workspaceId The ID of the workspace
	 * @param filters The filters
	 * @returns The users found for the given filter
	 */
	public static async getUsers(workspaceId: string, filters?: GetUsersFilter): Promise<UserInfo[]> {
		const q = qs.stringify(filters, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/users?${q}`);
		return res.data satisfies UserInfo[];
	}

	/**
	 * Filter workspace users
	 * @link https://docs.clockify.me/#tag/User/operation/filterUsersOfWorkspace
	 * @param workspaceId The ID of the workspace
	 * @param data The data to filter
	 * @returns The users found for the given filter
	 */
	public static async filterWorkspaceUsers(
		workspaceId: string,
		data: FilterWorkspaceUsersRequestBody
	): Promise<UserInfo> {
		const res = await this.http.post(`/workspaces/${workspaceId}/users/info`, data);
		return res.data satisfies UserInfo;
	}

	/**
	 * Update user's custom field
	 * @link https://docs.clockify.me/#tag/User/operation/upsertUserCustomFieldValue
	 * @param workspaceId The ID of the workspace
	 * @param userId
	 * @param customFieldId The ID of the custom field
	 * @param data The data to update
	 * @returns The updated custom field
	 */
	public static async updateUserCustomField(
		workspaceId: string,
		userId: string,
		customFieldId: string,
		data: UpdateUserCustomFieldRequestBody
	): Promise<UserCustomFieldValue> {
		const res = await this.http.put(
			`/workspaces/${workspaceId}/users/${userId}/custom-field/${customFieldId}/value`,
			data
		);
		return res.data satisfies UserCustomFieldValue;
	}

	/**
	 * Find user's team managers
	 * @link https://docs.clockify.me/#tag/User/operation/getManagersOfUser
	 * @param workspaceId The ID of the workspace
	 * @param userId
	 * @param filters The filters
	 * @returns The user infos for the found managers
	 */
	public static async getUserTeamManagers(
		workspaceId: string,
		userId: string,
		filters?: GetUserTeamManagerParams
	): Promise<UserInfo[]> {
		const q = qs.stringify(filters, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/users/${userId}/managers?${q}`);
		return res.data satisfies UserInfo[];
	}

	/**
	 * Remove user's manager role
	 * @link https://docs.clockify.me/#tag/User/operation/delete_1
	 * @param workspaceId The ID of the workspace
	 * @param userId
	 * @param data The data what to remove
	 */
	public static async removeUserManagerRole(
		workspaceId: string,
		userId: string,
		data: RemoveUserManagerRequestBody
	): Promise<void> {
		await this.http.delete(`/workspaces/${workspaceId}/users/${userId}/roles`, {
			data,
		});
	}

	/**
	 * Give user manager role
	 * @link https://docs.clockify.me/#tag/User/operation/create_2
	 * @param workspaceId The ID of the workspace
	 * @param userId
	 * @param data The data what role to add
	 * @returns The updated roles of the manager
	 */
	public static async giveUserManagerRole(
		workspaceId: string,
		userId: string,
		data: GiveUserManagerRoleRequestBody
	): Promise<GiveUserManagerRoleResponse> {
		const res = await this.http.post(`/workspaces/${workspaceId}/users/${userId}/roles`, data);
		return res.data satisfies GiveUserManagerRoleResponse;
	}
	//#endregion
	//#region Workspaces
	/**
	 * Get all my workspaces
	 * @link https://docs.clockify.me/#tag/Workspace/operation/getWorkspacesOfUser
	 * @returns The workspaces
	 */
	public static async getAllMyWorkspaces(): Promise<Workspace[]> {
		const res = await this.http.get(`/workspaces`);
		return res.data satisfies Workspace[];
	}

	/**
	 * Add workspace
	 * @link https://docs.clockify.me/#tag/Workspace/operation/create
	 * @param workspace The data to add
	 * @returns The added workspace
	 */
	public static async addWorkspace(workspace: AddWorkspaceRequest): Promise<Workspace> {
		const res = await this.http.post(`/workspaces`, workspace);
		return res.data satisfies Workspace;
	}

	/**
	 * Update workspace cost rate
	 * @link https://docs.clockify.me/#tag/Workspace/operation/setCostRate_1
	 * @param workspaceId The ID of the workspace
	 * @param data The data to update
	 * @returns The updated workspace
	 */
	public static async updateWorkspaceCostRate(
		workspaceId: string,
		data: UpdateWorkspaceCostRateRequest
	): Promise<Workspace> {
		const res = await this.http.put(`/workspaces/${workspaceId}/cost-rate`, data);
		return res.data satisfies Workspace;
	}

	/**
	 * Update workspace billable rate
	 * @link https://docs.clockify.me/#tag/Workspace/operation/setHourlyRate_1
	 * @param workspaceId The ID of the workspace
	 * @param data The data to update
	 * @returns The updated workspace
	 */
	public static async updateWorkspaceBillingRate(
		workspaceId: string,
		data: UpdateWorkspaceBillingRateRequest
	): Promise<Workspace> {
		const res = await this.http.put(`/workspaces/${workspaceId}/hourly-rate`, data);
		return res.data satisfies Workspace;
	}

	/**
	 * Add user
	 *
	 * You can add users to a workspace via API only if that workspace has a paid subscription. If the workspace has a paid subscription, you can add as many users as you want but you are limited by the number of paid user seats on that workspace.
	 * @link https://docs.clockify.me/#tag/Workspace/operation/addUsers
	 * @param workspaceId The ID of the workspace
	 * @param data The data
	 * @param options The options
	 * @returns The updated workspace
	 */
	public static async addUserToWorkspace(
		workspaceId: string,
		data: AddUserToWorkspaceRequest,
		options?: AddUserToWorkspaceFilter
	): Promise<Workspace> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.post(`/workspaces/${workspaceId}/users?${q}`, data);
		return res.data satisfies Workspace;
	}

	/**
	 * Remove user from workspace
	 * @link https://docs.clockify.me/#tag/Workspace/operation/removeMember
	 * @param workspaceId The ID of the workspace
	 * @param userId
	 * @returns The updated workspace
	 */
	public static async removeUserFromWorkspace(
		workspaceId: string,
		userId: string
	): Promise<Workspace> {
		const res = await this.http.delete(`/workspaces/${workspaceId}/users/${userId}`);
		return res.data satisfies Workspace;
	}

	/**
	 * Update user's status
	 * @link https://docs.clockify.me/#tag/Workspace/operation/updateUserStatus
	 * @param workspaceId The ID of the workspace
	 * @param userId
	 * @param data The data to update
	 * @returns The updated workspace
	 */
	public static async updateUserStatus(
		workspaceId: string,
		userId: string,
		data: UpdateUserStatusRequest
	): Promise<Workspace> {
		const res = await this.http.put(`/workspaces/${workspaceId}/users/${userId}`, data);
		return res.data satisfies Workspace;
	}

	/**
	 * Update user's cost rate
	 * @link https://docs.clockify.me/#tag/Workspace/operation/setCostRateForUser
	 * @param workspaceId The ID of the workspace
	 * @param userId
	 * @param data The data to update
	 * @returns The updated workspace
	 */
	public static async updateUserCostRate(
		workspaceId: string,
		userId: string,
		data: UpdateUserCostRateRequest
	): Promise<Workspace> {
		const res = await this.http.put(`/workspaces/${workspaceId}/users/${userId}/cost-rate`, data);
		return res.data satisfies Workspace;
	}

	/**
	 * Update user's cost rate
	 * @link https://docs.clockify.me/#tag/Workspace/operation/setHourlyRateForUser
	 * @param workspaceId The ID of the workspace
	 * @param userId
	 * @param data The data to update
	 * @returns The updated workspace
	 */
	public static async updateUserHourlyRate(
		workspaceId: string,
		userId: string,
		data: UpdateUserHourlyRateRequest
	): Promise<Workspace> {
		const res = await this.http.put(`/workspaces/${workspaceId}/users/${userId}/hourly-rate`, data);
		return res.data satisfies Workspace;
	}
	//#endregion
	//#region Webhooks
	/**
	 * Get all webhooks for addon on workspace
	 * @link https://docs.clockify.me/#tag/Webhooks/operation/getAddonWebhooks
	 * @param workspaceId The ID of the workspace
	 * @param addonId The ID of the addon
	 * @returns The webhooks for the addon
	 */
	public static async getWebhooksAddon(workspaceId: string, addonId?: string): Promise<Webhook[]> {
		const res = await this.http.get(`/workspaces/${workspaceId}/addons/${addonId}/webhooks`);
		return res.data satisfies Webhook[];
	}

	/**
	 * Get all webhooks on workspace
	 * @link https://docs.clockify.me/#tag/Webhooks/operation/getWebhooks
	 * @param workspaceId The ID of the workspace
	 * @param filters The filters
	 * @returns The webhooks found with the given filters
	 */
	public static async getWebhooks(
		workspaceId: string,
		filters?: GetWebhooksFilter
	): Promise<Webhook[]> {
		const q = qs.stringify(filters, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/webhooks?${q}`);
		return res.data satisfies Webhook[];
	}

	/**
	 * Create webhooks
	 *
	 * Creating a webhook generates a new token which can be used to verify that the webhook being sent was sent by Clockify, as it will always be present in the header.
	 * @link https://docs.clockify.me/#tag/Webhooks/operation/create_1
	 * @param workspaceId The ID of the workspace
	 * @param data The data
	 * @returns The created webhook
	 */
	public static async createWebhook(
		workspaceId: string,
		data: CreateWebhookRequestBody
	): Promise<Webhook> {
		const res = await this.http.post(`/workspaces/${workspaceId}/webhooks`, data);
		return res.data satisfies Webhook;
	}

	/**
	 * Delete webhook
	 * @link https://docs.clockify.me/#tag/Webhooks/operation/delete
	 * @param workspaceId The ID of the workspace
	 * @param webhookId The ID of the webhook
	 */
	public static async deleteWebhook(workspaceId: string, webhookId: string): Promise<void> {
		await this.http.delete(`/workspaces/${workspaceId}/webhooks/${webhookId}`);
	}

	/**
	 * Get a specific webhook by id
	 * @link https://docs.clockify.me/#tag/Webhooks/operation/getWebhook
	 * @param workspaceId The ID of the workspace
	 * @param webhookId The ID of the webhook
	 * @returns The webhook
	 */
	public static async getWebhook(workspaceId: string, webhookId: string): Promise<Webhook> {
		const res = await this.http.get(`/workspaces/${workspaceId}/webhooks/${webhookId}`);
		return res.data satisfies Webhook;
	}

	/**
	 * Update a webhook
	 * @link https://docs.clockify.me/#tag/Webhooks/operation/update
	 * @param workspaceId The ID of the workspace
	 * @param webhookId The ID of the webhhok
	 * @param data The data to update
	 * @returns The updated webhook
	 */
	public static async updateWebhook(
		workspaceId: string,
		webhookId: string,
		data: UpdateWebhookRequestBody
	): Promise<Webhook> {
		const res = await this.http.put(`/workspaces/${workspaceId}/webhooks/${webhookId}`, data);
		return res.data satisfies Webhook;
	}

	/**
	 * Generate new token
	 *
	 * Generates a new webhook token and invalidates previous one
	 * @link https://docs.clockify.me/#tag/Webhooks/operation/generateNewToken
	 * @param workspaceId The ID of the workspace
	 * @param webhookId The ID of the webhook
	 * @returns The updated webhook
	 */
	public static async generateWebhookToken(
		workspaceId: string,
		webhookId: string
	): Promise<Webhook> {
		const res = await this.http.patch(`/workspaces/${workspaceId}/webhooks/${webhookId}/token`);
		return res.data satisfies Webhook;
	}
	//#endregion
	//#region Approvals
	/**
	 * Get approval requests
	 * @link https://docs.clockify.me/#tag/Approval/operation/getApprovalGroups
	 * @param workspaceId The ID of the workspace
	 * @param filters The filters
	 * @returns The approval requests
	 */
	public static async getApprovalRequests(
		workspaceId: string,
		filters?: GetApprovalRequestsFilter
	): Promise<ApprovalRequestResponse[]> {
		const q = qs.stringify(filters, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/approval-requests?${q}`);
		return res.data satisfies ApprovalRequestResponse[];
	}

	/**
	 * Submit approval request
	 * @link https://docs.clockify.me/#tag/Approval/operation/create_10
	 * @param workspaceId The ID of the workspace
	 * @param data The data to submit
	 * @returns The updated approval request
	 */
	public static async submitApprovalRequest(
		workspaceId: string,
		data: SubmitApprovalRequestBody
	): Promise<ApprovalRequest> {
		const res = await this.http.post(`/workspaces/${workspaceId}/approval-requests`, data);
		return res.data satisfies ApprovalRequest;
	}

	/**
	 * Submit approval request for user
	 * @link https://docs.clockify.me/#tag/Approval/operation/createApprovalForOther
	 * @param workspaceId The ID of the workspace
	 * @param userId
	 * @param data The data to submit
	 * @returns The updated approval request
	 */
	public static async submitApprovalRequestForUser(
		workspaceId: string,
		userId: string,
		data: SubmitApprovalRequestBody
	): Promise<ApprovalRequest> {
		const res = await this.http.post(
			`/workspaces/${workspaceId}/approval-requests/users/${userId}`,
			data
		);
		return res.data satisfies ApprovalRequest;
	}

	/**
	 * Update approval request
	 * @link https://docs.clockify.me/#tag/Approval/operation/updateStatus_1
	 * @param workspaceId The ID of the workspace
	 * @param approvalRequestId The ID of the approval request
	 * @param data The data to update
	 * @returns The updated approval request
	 */
	public static async updateApprovalRequest(
		workspaceId: string,
		approvalRequestId: string,
		data: UpdateApprovalRequestBody
	): Promise<ApprovalRequest> {
		const res = await this.http.patch(
			`/workspaces/${workspaceId}/approval-requests/${approvalRequestId}`,
			data
		);
		return res.data as ApprovalRequest;
	}
	//#endregion
	//#region Clients
	/**
	 * Find clients on workspace
	 * @link https://docs.clockify.me/#tag/Client/operation/getClients
	 * @param workspaceId The ID of the workspace
	 * @param filters The filters
	 * @returns The clients found with the given filters
	 */
	public static async getClients(
		workspaceId: string,
		filters?: GetClientsFilter
	): Promise<Client[]> {
		const q = qs.stringify(filters, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/clients?${q}`);
		return res.data satisfies Client[];
	}

	/**
	 * Add a new client
	 * @link https://docs.clockify.me/#tag/Client/operation/create_9
	 * @param workspaceId The ID of the workspace
	 * @param data The data to add
	 * @returns The added client
	 */
	public static async addClient(workspaceId: string, data: AddClientRequestBody): Promise<Client> {
		const res = await this.http.post(`/workspaces/${workspaceId}/clients`, data);
		return res.data satisfies Client;
	}

	/**
	 * Delete client
	 * @link https://docs.clockify.me/#tag/Client/operation/delete_8
	 * @param workspaceId The ID of the workspace
	 * @param clientId The ID of the client
	 * @returns The deleted client
	 */
	public static async deleteClient(workspaceId: string, clientId: string): Promise<Client> {
		const res = await this.http.delete(`/workspaces/${workspaceId}/clients/${clientId}`);
		return res.data satisfies Client;
	}

	/**
	 * Get client by ID
	 * @link https://docs.clockify.me/#tag/Client/operation/getClient
	 * @param workspaceId The ID of the workspace
	 * @param clientId The ID of the client
	 * @returns The client
	 */
	public static async getClient(workspaceId: string, clientId: string): Promise<Client> {
		const res = await this.http.get(`/workspaces/${workspaceId}/clients/${clientId}`);
		return res.data satisfies Client;
	}

	/**
	 * Update client
	 * @link https://docs.clockify.me/#tag/Client/operation/update_6
	 * @param workspaceId The ID of the workspace
	 * @param clientId The ID of the client
	 * @param data The data to update
	 * @param options The options
	 * @returns The updated client
	 */
	public static async updateClient(
		workspaceId: string,
		clientId: string,
		data: UpdateClientRequestBody,
		options?: UpdateClientFilter
	): Promise<Client> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.put(`/workspaces/${workspaceId}/clients/${clientId}?${q}`, data);
		return res.data satisfies Client;
	}
	//#endregion
	//#region Custom Fields
	/**
	 * Get custom fields on workspace
	 * @link https://docs.clockify.me/#tag/Custom-fields/operation/ofWorkspace
	 * @param workspaceId The ID of the workspace
	 * @param filters The filters
	 * @returns The custom fields found with the given filters
	 */
	public static async getWorkspceCustomFields(
		workspaceId: string,
		filters?: GetWorkspaceCustomFieldsFilter
	): Promise<CustomField[]> {
		const q = qs.stringify(filters, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/custom-fields?${q}`);
		return res.data satisfies CustomField[];
	}

	/**
	 * Set custom field as required
	 * @link https://docs.clockify.me/#tag/Custom-fields/operation/edit
	 * @param workspaceId The ID of the workspace
	 * @param customFieldId The ID of the custom field
	 * @param data The data to update
	 * @returns The updated custom field
	 */
	public static async setCustomFieldAsRequired(
		workspaceId: string,
		customFieldId: string,
		data: SetCustomFieldRequiredRequestBody
	): Promise<CustomField> {
		const res = await this.http.put(
			`/workspaces/${workspaceId}/custom-fields/${customFieldId}`,
			data
		);
		return res.data satisfies CustomField;
	}

	/**
	 * Get custom fields on project
	 * @link https://docs.clockify.me/#tag/Custom-fields/operation/getCustomFieldsOfProject
	 * @param workspaceId The ID of the workspace
	 * @param projectId The ID of the project
	 * @param filters The filters
	 * @returns The custom fields found with the given filters
	 */
	public static async getCustomFields(
		workspaceId: string,
		projectId: string,
		filters?: GetProjectCustomFieldsFilter
	): Promise<CustomField[]> {
		const q = qs.stringify(filters, { encodeValuesOnly: true });
		const res = await this.http.get(
			`/workspaces/${workspaceId}/projects/${projectId}/custom-fields?${q}`
		);
		return res.data satisfies CustomField[];
	}

	/**
	 * Remove custom field from project
	 * @link https://docs.clockify.me/#tag/Custom-fields/operation/removeDefaultValueOfProject
	 * @param workspaceId The ID of the workspace
	 * @param projectId The ID of the project
	 * @param customFieldId The ID of the custom field
	 * @returns The removed custom field
	 */
	public static async removeCustomField(
		workspaceId: string,
		projectId: string,
		customFieldId: string
	): Promise<CustomField> {
		const res = await this.http.delete(
			`/workspaces/${workspaceId}/projects/${projectId}/custom-fields/${customFieldId}`
		);
		return res.data satisfies CustomField;
	}

	/**
	 * Update custom field on project
	 * @link https://docs.clockify.me/#tag/Custom-fields/operation/editProjectCustomFieldDefaultValue
	 * @param workspaceId The ID of the workspace
	 * @param projectId The ID of the project
	 * @param customFieldId The ID of the custom field
	 * @param data The data to update
	 * @returns The updated custom field
	 */
	public static async updateCustomField(
		workspaceId: string,
		projectId: string,
		customFieldId: string,
		data: UpdateCustomFieldRequestBody
	): Promise<CustomField> {
		const res = await this.http.patch(
			`/workspace/${workspaceId}/projects/${projectId}/custom-fields/${customFieldId}`,
			data
		);
		return res.data satisfies CustomField;
	}
	//#endregion
	//#region Expenses
	/**
	 * Get all expenses on workspace
	 * @link https://docs.clockify.me/#tag/Expense/operation/getExpenses
	 * @param workspaceId The ID of the workspace
	 * @param filters The filters
	 * @returns The expenses found with the given filters
	 */
	public static async getExpenses(
		workspaceId: string,
		filters?: GetExpensesFilter
	): Promise<ExpensesResponse> {
		const q = qs.stringify(filters, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/expenses?${q}`);
		return res.data satisfies ExpensesResponse;
	}

	/**
	 * Create expense
	 * @link https://docs.clockify.me/#tag/Expense/operation/createExpense
	 * @param workspaceId The ID of the workspace
	 * @param data The data to add
	 * @returns The added expense
	 */
	public static async createExpense(
		workspaceId: string,
		data: CreateExpenseRequestBody
	): Promise<Expense> {
		const res = await this.http.post(`/workspaces/${workspaceId}/expenses`, data);
		return res.data satisfies Expense;
	}

	/**
	 * Get all expense categories
	 * @link https://docs.clockify.me/#tag/Expense/operation/getCategories
	 * @param workspaceId The ID of the workspace
	 * @param filters The filters
	 * @returns The expense categories found with the given filters
	 */
	public static async getExpenseCategories(
		workspaceId: string,
		filters?: GetExpenseCategoriesFilter
	): Promise<ExpenseCategoriesResponse> {
		const q = qs.stringify(filters, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/expenses/categories?${q}`);
		return res.data satisfies ExpenseCategoriesResponse;
	}

	/**
	 * Add expense category
	 * @link https://docs.clockify.me/#tag/Expense/operation/create_8
	 * @param workspaceId The ID of the workspace
	 * @param data The data to add
	 * @returns The added expense category
	 */
	public static async addExpenseCategory(
		workspaceId: string,
		data: AddExpenseCategoryRequestBody
	): Promise<ExpenseCategory> {
		const res = await this.http.post(`/workspaces/${workspaceId}/expenses/categories`, data);
		return res.data satisfies ExpenseCategory;
	}

	/**
	 * Delete expense category
	 * @link https://docs.clockify.me/#tag/Expense/operation/deleteCategory
	 * @param workspaceId The ID of the workspace
	 * @param categoryId The ID of the expense category
	 */
	public static async deleteExpenseCategory(
		workspaceId: string,
		categoryId: string
	): Promise<void> {
		await this.http.delete(`/workspaces/${workspaceId}/expenses/categories/${categoryId}`);
	}

	/**
	 * Update expense category
	 * @link https://docs.clockify.me/#tag/Expense/operation/updateCategory
	 * @param workspaceId The ID of the workspace
	 * @param categoryId The ID of the expense category
	 * @param data The data to update
	 * @returns The updated expense category
	 */
	public static async updateExpenseCategory(
		workspaceId: string,
		categoryId: string,
		data: UpdateExpenseCategoryRequestBody
	): Promise<ExpenseCategory> {
		const res = await this.http.put(
			`/workspaces/${workspaceId}/expenses/categories/${categoryId}`,
			data
		);
		return res.data satisfies ExpenseCategory;
	}

	/**
	 * Archive expense category
	 * @link https://docs.clockify.me/#tag/Expense/operation/updateStatus
	 * @param workspaceId The ID of the workspace
	 * @param categoryId The ID of the expense category
	 * @param data The data
	 * @returns The updated expense category
	 */
	public static async archiveExpenseCategory(
		workspaceId: string,
		categoryId: string,
		data: ArchiveExpenseCategoryRequestBody
	): Promise<ExpenseCategory> {
		const res = await this.http.patch(
			`/workspaces/${workspaceId}/expenses/categories/${categoryId}`,
			data
		);
		return res.data satisfies ExpenseCategory;
	}

	/**
	 * Delete expense
	 * @link https://docs.clockify.me/#tag/Expense/operation/deleteExpense
	 * @param workspaceId The ID of the workspace
	 * @param expenseId The ID of the expense
	 */
	public static async deleteExpense(workspaceId: string, expenseId: string): Promise<void> {
		await this.http.delete(`/workspaces/${workspaceId}/expenses/${expenseId}`);
	}

	/**
	 * Get expense by ID
	 * @link https://docs.clockify.me/#tag/Expense/operation/getExpense
	 * @param workspaceId The ID of the workspace
	 * @param expenseId The ID of the expense
	 * @returns The expense
	 */
	public static async getExpense(workspaceId: string, expenseId: string): Promise<Expense> {
		const res = await this.http.get(`/workspaces/${workspaceId}/expenses/${expenseId}`);
		return res.data satisfies Expense;
	}

	/**
	 * Update expense
	 * @link https://docs.clockify.me/#tag/Expense/operation/updateExpense
	 * @param workspaceId The ID of the workspace
	 * @param expenseId The ID of the expense
	 * @param data The data to update
	 * @returns The updated expense
	 */
	public static async updateExpense(
		workspaceId: string,
		expenseId: string,
		data: UpdateExpenseRequestBody
	): Promise<Expense> {
		const res = await this.http.put(`/workspaces/${workspaceId}/expenses/${expenseId}`, data);
		return res.data satisfies Expense;
	}

	/**
	 * Download receipt
	 * @link https://docs.clockify.me/#tag/Expense/operation/downloadFile
	 * @param workspaceId The ID of the workspace
	 * @param expenseId The ID of the expense
	 * @param fileId The ID of the file
	 * @returns The file as byte array
	 */
	public static async downloadReceipt(
		workspaceId: string,
		expenseId: string,
		fileId: string
	): Promise<string[]> {
		const res = await this.http.get(
			`/workspaces/${workspaceId}/expenses/${expenseId}/files/${fileId}`
		);
		return res.data satisfies string[];
	}
	//#endregion
	//#region Invoices
	/**
	 * Get all invoices on workspace
	 * @link https://docs.clockify.me/#tag/Invoice/operation/getInvoices
	 * @param workspaceId The ID of the workspace
	 * @param filters The filters
	 * @returns The invoices found with the given filters
	 */
	public static async getInvoices(
		workspaceId: string,
		filters?: GetInvoicesFilter
	): Promise<InvoicesResponse> {
		const q = qs.stringify(filters, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/invoices?${q}`);
		return res.data satisfies InvoicesResponse;
	}

	/**
	 * Add invoice
	 * @link https://docs.clockify.me/#tag/Invoice/operation/createInvoice
	 * @param workspaceId The ID of the workspace
	 * @param data The data to add
	 * @returns The added invoice
	 */
	public static async addInvoice(
		workspaceId: string,
		data: AddInvoiceRequestBody
	): Promise<AddInvoiceResponse> {
		const res = await this.http.post(`/workspaces/${workspaceId}/invoices`, data);
		return res.data satisfies AddInvoiceResponse;
	}

	/**
	 * Filter out invoices
	 * @link https://docs.clockify.me/#tag/Invoice/operation/getInvoicesInfo
	 * @param workspaceId The ID of the workspace
	 * @param data The data to filter
	 * @returns The invoices found
	 */
	public static async filterInvoices(
		workspaceId: string,
		data: FilterInvoicesRequestBody
	): Promise<FilterInvoiceResponse> {
		const res = await this.http.post(`/workspaces/${workspaceId}/invoices/info`, data);
		return res.data satisfies FilterInvoiceResponse;
	}

	/**
	 * Get invoice in another language
	 * @link https://docs.clockify.me/#tag/Invoice/operation/getInvoiceSettings
	 * @param workspaceId The ID of the workspace
	 * @returns The invoice settings
	 */
	public static async getInvoiceInOtherLanguage(
		workspaceId: string
	): Promise<InvoiceOtherLanguageResponse> {
		const res = await this.http.get(`/workspaces/${workspaceId}/invoices/settings`);
		return res.data satisfies InvoiceOtherLanguageResponse;
	}

	/**
	 * Change invoice language
	 * @link https://docs.clockify.me/#tag/Invoice/operation/updateInvoiceSettings
	 * @param workspaceId The ID of the workspace
	 * @param data The data to update
	 */
	public static async updateInvoiceLanguage(
		workspaceId: string,
		data: ChangeInvoiceLanguageRequestData
	): Promise<void> {
		await this.http.put(`/workspaces/${workspaceId}/invoices/settings`, data);
	}

	/**
	 * Delete invoice
	 * @link https://docs.clockify.me/#tag/Invoice/operation/deleteInvoice
	 * @param workspaceId The ID of the workspace
	 * @param invoiceId The ID of the invoice
	 */
	public static async deleteInvoice(workspaceId: string, invoiceId: string): Promise<void> {
		await this.http.delete(`/workspaces/${workspaceId}/invoices/${invoiceId}`);
	}

	/**
	 * Get invoice by ID
	 * @link https://docs.clockify.me/#tag/Invoice/operation/getInvoice
	 * @param workspaceId The ID of the workspace
	 * @param invoiceId The ID of the invoice
	 * @returns The invoice
	 */
	public static async getInvoice(workspaceId: string, invoiceId: string): Promise<Invoice> {
		const res = await this.http.get(`/workspaces/${workspaceId}/invoices/${invoiceId}`);
		return res.data satisfies Invoice;
	}

	/**
	 * Send invoice
	 * @link https://docs.clockify.me/#tag/Invoice/operation/updateInvoice
	 * @param workspaceId The ID of the workspace
	 * @param invoiceId The ID of the invoice
	 * @param data The data to update
	 * @returns The updated invoice
	 */
	public static async sendInvoice(
		workspaceId: string,
		invoiceId: string,
		data: SendInvoiceRequestBody
	): Promise<Invoice> {
		const res = await this.http.put(`/workspaces/${workspaceId}/invoices/${invoiceId}`, data);
		return res.data satisfies Invoice;
	}

	/**
	 * Duplicate invoice
	 * @link https://docs.clockify.me/#tag/Invoice/operation/duplicateInvoice
	 * @param workspaceId The ID of the workspace
	 * @param invoiceId The ID of the invoice
	 * @returns The duplicated invoice
	 */
	public static async duplicateInvoice(workspaceId: string, invoiceId: string): Promise<Invoice> {
		const res = await this.http.post(`/workspace/${workspaceId}/invoices/${invoiceId}`);
		return res.data satisfies Invoice;
	}

	/**
	 * Export invoice
	 * @link https://docs.clockify.me/#tag/Invoice/operation/exportInvoice
	 * @param workspaceId The ID of the workspace
	 * @param invoiceId The ID of the invoice
	 * @param userLocale The user's language
	 * @returns The invoice as byte array
	 */
	public static async exportInvoice(
		workspaceId: string,
		invoiceId: string,
		userLocale: string
	): Promise<string[]> {
		const q = qs.stringify({ userLocale }, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/invoices/${invoiceId}/export?${q}`);
		return res.data satisfies string[];
	}

	/**
	 * Change invoice status
	 * @link https://docs.clockify.me/#tag/Invoice/operation/changeInvoiceStatus
	 * @param workspaceId The ID of the workspace
	 * @param invoiceId The ID of the invoice
	 * @param data The data to update
	 */
	public static async changeInvoiceStatus(
		workspaceId: string,
		invoiceId: string,
		data: ChangeInvoiceStatusRequestBody
	): Promise<void> {
		await this.http.patch(`/workspaces/${workspaceId}/invoices/${invoiceId}/status`, data);
	}
	//#endregion
	//#region Projects
	/**
	 * Get all projects on workspace
	 * @link https://docs.clockify.me/#tag/Project/operation/getProjects
	 * @param workspaceId The ID of the workspace
	 * @param filters The filters
	 * @returns The projects found with the given filters
	 */
	public static async getProjects(
		workspaceId: string,
		filters?: GetProjectsFilter
	): Promise<Project[]> {
		const q = qs.stringify(filters, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/projects?${q}`);
		return res.data satisfies Project[];
	}

	/**
	 * Add a new project
	 * @link https://docs.clockify.me/#tag/Project/operation/create_6
	 * @param workspaceId The ID of the workspace
	 * @param data The data to add
	 * @returns The added project
	 */
	public static async addProject(
		workspaceId: string,
		data: AddProjectRequestBody
	): Promise<ProjectInfo> {
		const res = await this.http.post(`/workspaces/${workspaceId}/projects`, data);
		return res.data satisfies ProjectInfo;
	}

	/**
	 * Delete project from workspace
	 * @link https://docs.clockify.me/#tag/Project/operation/delete_6
	 * @param workspaceId The ID of the workspace
	 * @param projectId The ID of the project
	 * @returns The deleted project
	 */
	public static async deleteProject(workspaceId: string, projectId: string): Promise<ProjectInfo> {
		const res = await this.http.delete(`/workspaces/${workspaceId}/projects/${projectId}`);
		return res.data satisfies ProjectInfo;
	}

	/**
	 * Find project by ID
	 * @link https://docs.clockify.me/#tag/Project/operation/getProject
	 * @param workspaceId The ID of the workspace
	 * @param projectId The ID of the project
	 * @param options The options
	 * @returns The project
	 */
	public static async getProject(
		workspaceId: string,
		projectId: string,
		options?: GetProjectFilter
	): Promise<Project> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/projects/${projectId}?${q}`);
		return res.data satisfies Project;
	}

	/**
	 * Update project on workspace
	 * @link https://docs.clockify.me/#tag/Project/operation/update_4
	 * @param workspaceId The ID of the workspace
	 * @param projectId The ID of the project
	 * @param data The data to update
	 * @returns The updated project info
	 */
	public static async updateProject(
		workspaceId: string,
		projectId: string,
		data: UpdateProjectRequestBody
	): Promise<ProjectInfo> {
		const res = await this.http.put(`/workspaces/${workspaceId}/projects/${projectId}`, data);
		return res.data satisfies ProjectInfo;
	}

	/**
	 * Update project estimate
	 * @link https://docs.clockify.me/#tag/Project/operation/updateEstimate
	 * @param workspaceId The ID of the workspace
	 * @param projectId The ID of the project
	 * @param data The data to update
	 * @returns The updated project info
	 */
	public static async updateProjectEstimate(
		workspaceId: string,
		projectId: string,
		data: UpdateProjectEstimateRequestBody
	): Promise<ProjectInfo> {
		const res = await this.http.patch(
			`/workspaces/${workspaceId}/projects/${projectId}/estimate`,
			data
		);
		return res.data satisfies ProjectInfo;
	}

	/**
	 * Update project memberships
	 * @link https://docs.clockify.me/#tag/Project/operation/updateMemberships
	 * @param workspaceId The ID of the workspace
	 * @param projectId The ID of the project
	 * @param data The data to update
	 * @returns The updated project info
	 */
	public static async updateProjectMemberships(
		workspaceId: string,
		projectId: string,
		data: UpdateProjectMembershipsRequestBody
	): Promise<ProjectInfo> {
		const res = await this.http.patch(
			`/workspaces/${workspaceId}/projects/${projectId}/memberships`,
			data
		);
		return res.data satisfies ProjectInfo;
	}

	/**
	 * Update project template
	 * @link https://docs.clockify.me/#tag/Project/operation/updateIsProjectTemplate
	 * @param workspaceId The ID of the workspace
	 * @param projectId The ID of the project
	 * @param data The data to update
	 * @returns The updated project info
	 */
	public static async updateProjectTemplate(
		workspaceId: string,
		projectId: string,
		data: UpdateProjectTemplateRequestBody
	): Promise<ProjectInfo> {
		const res = await this.http.patch(
			`/workspaces/${workspaceId}/projects/${projectId}/template`,
			data
		);
		return res.data satisfies ProjectInfo;
	}

	/**
	 * Update project user cost rate
	 * @link https://docs.clockify.me/#tag/Project/operation/addUsersCostRate
	 * @param workspaceId The ID of the workspace
	 * @param projectId The ID of the project
	 * @param userId The ID of the user
	 * @param data The data to update
	 * @returns The updated project info
	 */
	public static async updateProjectUserCostRate(
		workspaceId: string,
		projectId: string,
		userId: string,
		data: CostRateRequest
	): Promise<ProjectInfo> {
		const res = await this.http.put(
			`/workspaces/${workspaceId}/projects/${projectId}/users/${userId}/cost-rate`,
			data
		);
		return res.data satisfies ProjectInfo;
	}

	/**
	 * Update project user billable rate
	 * @link https://docs.clockify.me/#tag/Project/operation/addUsersHourlyRate
	 * @param workspaceId The ID of the workspace
	 * @param projectId The ID of the project
	 * @param userId The ID of the user
	 * @param data The data to update
	 * @returns The updated project info
	 */
	public static async updateProjectUserBillableRate(
		workspaceId: string,
		projectId: string,
		userId: string,
		data: HourlyRateRequest
	): Promise<ProjectInfo> {
		const res = await this.http.put(
			`/workspaces/${workspaceId}/projects/${projectId}/users/${userId}/hourly-rate`,
			data
		);
		return res.data satisfies ProjectInfo;
	}
	//#endregion
	//#region Tasks
	/**
	 * Find tasks on project
	 * @link https://docs.clockify.me/#tag/Task/operation/getTasks
	 * @param workspaceId The ID of the workspace
	 * @param projectId The ID of the project
	 * @param filters The filters
	 * @returns The tasks found with the given filters
	 */
	public static async getTasks(
		workspaceId: string,
		projectId: string,
		filters?: GetTasksFilter
	): Promise<Task[]> {
		const q = qs.stringify(filters, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/projects/${projectId}/tasks?${q}`);
		return res.data satisfies Task[];
	}

	/**
	 * Add a new task on project
	 * @link https://docs.clockify.me/#tag/Task/operation/create_7
	 * @param workspaceId The ID of the workspace
	 * @param projectId The ID of the project
	 * @param data The data to add
	 * @param options The options
	 * @returns The added task
	 */
	public static async addTask(
		workspaceId: string,
		projectId: string,
		data: AddTaskRequestBody,
		options?: AddTaskParams
	): Promise<Task> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.post(
			`/workspaces/${workspaceId}/projects/${projectId}/tasks?${q}`,
			data
		);
		return res.data satisfies Task;
	}

	/**
	 * Update task cost rate
	 * @link https://docs.clockify.me/#tag/Task/operation/setCostRate
	 * @param workspaceId The ID of the workspace
	 * @param projectId The ID of the project
	 * @param taskId The ID of the task
	 * @param data The data to update
	 * @returns The updated task
	 */
	public static async updateTaskCostRate(
		workspaceId: string,
		projectId: string,
		taskId: string,
		data: UpdateTaskCostRateRequestBody
	): Promise<Task> {
		const res = await this.http.put(
			`/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}/cost-rate`,
			data
		);
		return res.data satisfies Task;
	}

	/**
	 * Update task billable rate
	 * @link https://docs.clockify.me/#tag/Task/operation/setHourlyRate
	 * @param workspaceId The ID of the workspace
	 * @param projectId The ID of the project
	 * @param taskId The ID of the task
	 * @param data The data to update
	 * @returns The updated task
	 */
	public static async updateTaskBillableRate(
		workspaceId: string,
		projectId: string,
		taskId: string,
		data: UpdateTaskBillableRateRequestBody
	): Promise<Task> {
		const res = await this.http.put(
			`/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}/hourly-rate`,
			data
		);
		return res.data satisfies Task;
	}

	/**
	 * Delete task from project
	 * @link https://docs.clockify.me/#tag/Task/operation/delete_7
	 * @param workspaceId The ID of the workspace
	 * @param projectId The ID of the project
	 * @param taskId The ID of the task
	 * @returns The deleted taska
	 */
	public static async deleteTask(
		workspaceId: string,
		projectId: string,
		taskId: string
	): Promise<Task> {
		const res = await this.http.delete(
			`/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`
		);
		return res.data satisfies Task;
	}

	/**
	 * Get task by id
	 * @link https://docs.clockify.me/#tag/Task/operation/getTask
	 * @param workspaceId The ID of the workspace
	 * @param projectId The ID of the project
	 * @param taskId The ID of the task
	 * @returns The task
	 */
	public static async getTask(
		workspaceId: string,
		projectId: string,
		taskId: string
	): Promise<Task> {
		const res = await this.http.get(
			`/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`
		);
		return res.data satisfies Task;
	}

	/**
	 * Update task on project
	 * @link https://docs.clockify.me/#tag/Task/operation/update_5
	 * @param workspaceId The ID of the workspace
	 * @param projectId The ID of the project
	 * @param taskId The ID of the task
	 * @param data The data to update
	 * @param options The options
	 * @returns The updated task
	 */
	public static async updateTask(
		workspaceId: string,
		projectId: string,
		taskId: string,
		data: UpdateTaskRequestBody,
		options?: UpdateTaskParams
	): Promise<Task> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.put(
			`/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}?${q}`,
			data
		);
		return res.data satisfies Task;
	}
	//#endregion
	//#region Scheduling
	/**
	 * Get all assignments
	 * @link https://docs.clockify.me/#tag/Scheduling/operation/getAllAssignments
	 * @param workspaceId The ID of the workspace
	 * @param filters The filters
	 * @returns The assignments found with the given filters
	 */
	public static async getAssignments(
		workspaceId: string,
		filters?: GetAssignmentsFilter
	): Promise<Assignment[]> {
		const q = qs.stringify(filters, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/scheduling/assignments/all?${q}`);
		return res.data satisfies Assignment[];
	}

	/**
	 * Get all scheduled assignments per project
	 * @link https://docs.clockify.me/#tag/Scheduling/operation/getProjectTotals
	 * @param workspaceId The ID of the workspace
	 * @param filters The filters
	 * @returns The scheduled assignments found with the given filters
	 */
	public static async getScheduledAssignments(
		workspaceId: string,
		filters?: GetScheduledAssignmentsFilter
	): Promise<ScheduledAssignment[]> {
		const q = qs.stringify(filters, { encodeValuesOnly: true });
		const res = await this.http.get(
			`/workspaces/${workspaceId}/scheduling/assignments/projects/totals?${q}`
		);
		return res.data satisfies ScheduledAssignment[];
	}

	/**
	 * Get all scheduled assignments on project
	 * @link https://docs.clockify.me/#tag/Scheduling/operation/getProjectTotalsForSingleProject
	 * @param workspaceId The ID of the workspace
	 * @param projectId The ID of the project
	 * @param filters The filters
	 * @returns The scheduled assignments found with the given filters
	 */
	public static async getProjectScheduledAssignments(
		workspaceId: string,
		projectId: string,
		filters?: GetProjectScheduledAssignmentsFilter
	): Promise<ScheduledAssignment[]> {
		const q = qs.stringify(filters, { encodeValuesOnly: true });
		const res = await this.http.get(
			`/workspaces/${workspaceId}/scheduling/assignments/projects/totals/${projectId}?${q}`
		);
		return res.data satisfies ScheduledAssignment[];
	}

	/**
	 * Publish assignments
	 * @link https://docs.clockify.me/#tag/Scheduling/operation/publishAssignments
	 * @param workspaceId The ID of the workspace
	 * @param data The data to publish
	 */
	public static async publishAssignment(
		workspaceId: string,
		data: PublishAssignmentRequestBody
	): Promise<void> {
		await this.http.put(`/workspaces/${workspaceId}/scheduling/assignments/publish`, data);
	}

	/**
	 * Create recurring assignment
	 * @link https://docs.clockify.me/#tag/Scheduling/operation/createRecurring
	 * @param workspaceId The ID of the workspace
	 * @param data The data to add
	 * @returns The added assignment
	 */
	public static async createRecurringAssignment(
		workspaceId: string,
		data: CreateRecurringAssignmentRequestBody
	): Promise<RecurringAssignment> {
		const res = await this.http.post(
			`/workspaces/${workspaceId}/scheduling/assignments/recurring`,
			data
		);
		return res.data satisfies RecurringAssignment;
	}

	/**
	 * Delete recurring assignment
	 * @link https://docs.clockify.me/#tag/Scheduling/operation/delete_5
	 * @param workspaceId The ID of the workspace
	 * @param assignmentId The ID of the assignment
	 * @param data The data to delete
	 * @returns The deleted assignments
	 */
	public static async deleteRecurringAssignment(
		workspaceId: string,
		assignmentId: string,
		data: DeleteRecurringAssignmentRequestBody
	): Promise<RecurringAssignment[]> {
		const res = await this.http.delete(
			`/workspaces/${workspaceId}/scheduling/assignments/recurring/${assignmentId}`,
			{ data }
		);
		return res.data satisfies RecurringAssignment[];
	}

	/**
	 * Update recurring assignment
	 * @link https://docs.clockify.me/#tag/Scheduling/operation/editRecurring
	 * @param workspaceId The ID of the workspace
	 * @param assignmentId The ID of the assignment
	 * @param data The data to update
	 * @returns The updated assignments
	 */
	public static async updateRecurringAssignemnt(
		workspaceId: string,
		assignmentId: string,
		data: UpdateRecurringAssignmentRequestBody
	): Promise<RecurringAssignment> {
		const res = await this.http.patch(
			`/workspaces/${workspaceId}/scheduling/assignments/recurring/${assignmentId}`,
			data
		);
		return res.data satisfies RecurringAssignment;
	}

	/**
	 * Change recurring period
	 * @link https://docs.clockify.me/#tag/Scheduling/operation/editRecurringPeriod
	 * @param workspaceId The ID of the workspace
	 * @param assignmentId The ID of the assignment
	 * @param data The data to update
	 * @returns The updated assignments
	 */
	public static async changeRecurringPeriod(
		workspaceId: string,
		assignmentId: string,
		data: ChangeRecurringAssignmentPeriodRequestBody
	): Promise<RecurringAssignment> {
		const res = await this.http.put(
			`/workspaces/${workspaceId}/scheduling/assignments/series/${assignmentId}`,
			data
		);
		return res.data satisfies RecurringAssignment;
	}

	/**
	 * Get total of users' capacity on workspace
	 * @link https://docs.clockify.me/#tag/Scheduling/operation/getUserTotals
	 * @param workspaceId The ID of the workspace
	 * @param data The data to filter
	 * @returns The assignments
	 */
	public static async getUsersTotalCapacity(
		workspaceId: string,
		data: GetTotalUserCapacityRequestBody
	): Promise<UserCapacity> {
		const res = await this.http.post(
			`/workspaces/${workspaceId}/scheduling/assignments/user-filter/totals`,
			data
		);
		return res.data satisfies UserCapacity;
	}

	/**
	 * Get total capacity of a user
	 * @link https://docs.clockify.me/#tag/Scheduling/operation/getUserTotalsForSingleUser
	 * @param workspaceId The ID of the workspace
	 * @param userId The ID of the user
	 * @param filter The filters
	 * @returns The total capacity
	 */
	public static async getUserTotalCapacity(
		workspaceId: string,
		userId: string,
		filter: GetUserTotalCapacityFilter
	): Promise<UserCapacity> {
		const q = qs.stringify(filter, { encodeValuesOnly: true });
		const res = await this.http.get(
			`/workspaces/${workspaceId}/scheduling/assignment/users/${userId}/totals?${q}`
		);
		return res.data satisfies UserCapacity;
	}

	/**
	 * Copy scheduled assignment
	 * @link https://docs.clockify.me/#tag/Scheduling/operation/copyAssignment
	 * @param workspaceId The ID of the workspace
	 * @param assignmentId The ID of the assignment
	 * @param data The options
	 * @returns The copied assignments
	 */
	public static async copyScheduledAssignment(
		workspaceId: string,
		assignmentId: string,
		data: CopyScheduledAssignmentRequestBody
	): Promise<RecurringAssignment> {
		const res = await this.http.post(
			`/workspaces/${workspaceId}/scheduling/assignments/${assignmentId}/copy`,
			data
		);
		return res.data satisfies RecurringAssignment;
	}
	//#endregion
	//#region Tags
	/**
	 * Find tags on workspace
	 * @link https://docs.clockify.me/#tag/Tag/operation/getTags
	 * @param workspaceId The ID of the workspace
	 * @param filters The filters
	 * @returns The tags found with the given filters
	 */
	public static async getTags(workspaceId: string, filters?: GetTagsFilter): Promise<Tag[]> {
		const q = qs.stringify(filters, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/tags?${q}`);
		return res.data satisfies Tag[];
	}

	/**
	 * Add a new tag
	 * @link https://docs.clockify.me/#tag/Tag/operation/create_5
	 * @param workspaceId The ID of the workspace
	 * @param data The data to add
	 * @returns The added tag
	 */
	public static async addTag(workspaceId: string, data: AddTagRequestBody): Promise<Tag> {
		const res = await this.http.post(`/workspaces/${workspaceId}/tags`, data);
		return res.data satisfies Tag;
	}

	/**
	 * Delete tag
	 * @link https://docs.clockify.me/#tag/Tag/operation/delete_4
	 * @param workspaceId The ID of the workspace
	 * @param tagId The ID of the tag
	 * @returns The deleted tag
	 */
	public static async deleteTag(workspaceId: string, tagId: string): Promise<Tag> {
		const res = await this.http.post(`/workspaces/${workspaceId}/tags/${tagId}`);
		return res.data satisfies Tag;
	}

	/**
	 * Get tag by ID
	 * @link https://docs.clockify.me/#tag/Tag/operation/getTag
	 * @param workspaceId The ID of the workspace
	 * @param tagId The ID of the tag
	 * @returns The tag
	 */
	public static async getTag(workspaceId: string, tagId: string): Promise<Tag> {
		const res = await this.http.get(`/workspaces/${workspaceId}/tags/${tagId}`);
		return res.data satisfies Tag;
	}

	/**
	 * Update tag
	 * @link https://docs.clockify.me/#tag/Tag/operation/update_3
	 * @param workspaceId The ID of the workspace
	 * @param tagId The ID of the tag
	 * @param data The data to update
	 * @returns The updated tag
	 */
	public static async updateTag(
		workspaceId: string,
		tagId: string,
		data: UpdateTagRequestBody
	): Promise<Tag> {
		const res = await this.http.put(`/workspaces/${workspaceId}/tags/${tagId}`, data);
		return res.data satisfies Tag;
	}
	//#endregion
	//#region Time Entries
	/**
	 * Add a new time entry
	 * @link https://docs.clockify.me/#tag/Time-entry/operation/create_4
	 * @param workspaceId The ID of the workspace
	 * @param data The data to add
	 * @param headers The headers
	 * @returns The added time entry
	 */
	public static async addTimeEntry(
		workspaceId: string,
		data: AddTimeEntryRequestBody,
		headers?: AddTimeEntryHeaders
	): Promise<TimeEntry> {
		const res = await this.http.post(`/workspaces/${workspaceId}/time-entries`, data, { headers });
		return res.data satisfies TimeEntry;
	}

	/**
	 * Mark time entries as invoiced
	 * @link https://docs.clockify.me/#tag/Time-entry/operation/updateInvoicedStatus
	 * @param workspaceId The ID of the workspace
	 * @param data The data to update
	 */
	public static async markTimeEntryInvoiced(
		workspaceId: string,
		data: MarkTimeEntryInvoicedRequestBody
	): Promise<void> {
		await this.http.patch(`/workspaces/${workspaceId}/time-entries/invoiced`, data);
	}

	/**
	 * Delete time entry from workspace
	 * @link https://docs.clockify.me/#tag/Time-entry/operation/delete_3
	 * @param workspaceId The ID of the workspace
	 * @param timeEntryId The ID of the time entry
	 */
	public static async deleteTimeEntry(workspaceId: string, timeEntryId: string): Promise<void> {
		await this.http.delete(`/workspaces/${workspaceId}/time-entries/${timeEntryId}`);
	}

	/**
	 * Get a specific time entry on workspace
	 * @link https://docs.clockify.me/#tag/Time-entry/operation/getTimeEntry
	 * @param workspaceId The ID of the workspace
	 * @param timeEntryId The ID of the time entry
	 * @param filters The filters
	 * @returns The time entries found with the given filters
	 */
	public static async getTimeEntry(
		workspaceId: string,
		timeEntryId: string,
		filters?: GetTimeEntryFilter
	): Promise<Partial<TimeEntry>> {
		const q = qs.stringify(filters, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/time-entries/${timeEntryId}?${q}`);
		return res.data satisfies Partial<TimeEntry>;
	}

	/**
	 * Update time entry on workspace
	 * @link https://docs.clockify.me/#tag/Time-entry/operation/update_2
	 * @param workspaceId The ID of the workspace
	 * @param timeEntryId The ID of the time entry
	 * @param data The data to update
	 * @param headers The headers
	 * @returns The updated time entry
	 */
	public static async updateTimeEntry(
		workspaceId: string,
		timeEntryId: string,
		data: UpdateTimeEntryRequestBody,
		headers?: UpdateTimeEntryHeaders
	): Promise<TimeEntry> {
		const res = await this.http.put(
			`/workspaces/${workspaceId}/time-entries/${timeEntryId}`,
			data,
			{ headers }
		);
		return res.data satisfies TimeEntry;
	}

	/**
	 * Delete all time entries for user on workspace
	 * @link https://docs.clockify.me/#tag/Time-entry/operation/deleteMany
	 * @param workspaceId The ID of the workspace
	 * @param userId The ID of the user
	 * @param timeEntryIds The IDs of the time entries
	 * @returns The deleted time entries
	 */
	public static async deleteTimeEntriesForUser(
		workspaceId: string,
		userId: string,
		timeEntryIds: string[]
	): Promise<TimeEntry[]> {
		const q = qs.stringify({ 'time-entry-ids': timeEntryIds }, { encodeValuesOnly: true });
		const res = await this.http.delete(
			`/workspaces/${workspaceId}/user/${userId}/time-entries?${q}`
		);
		return res.data satisfies TimeEntry[];
	}

	/**
	 * Get time entries for a user on workspace
	 * @link https://docs.clockify.me/#tag/Time-entry/operation/getTimeEntries
	 * @param workspaceId The ID of the workspace
	 * @param userId The ID of the user
	 * @param filters The filters
	 * @returns The time entries found with the given filters
	 */
	public static async getTimeEntriesForUser(
		workspaceId: string,
		userId: string,
		filters?: GetTimeEntriesForUserFilter
	): Promise<Partial<TimeEntry[]>> {
		const q = qs.stringify(filters, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/user/${userId}/time-entries?${q}`);
		return res.data satisfies Partial<TimeEntry[]>;
	}

	/**
	 * Stop currently running timer on workspace for user
	 * @link https://docs.clockify.me/#tag/Time-entry/operation/stopRunningTimeEntry
	 * @param workspaceId The ID of the workspace
	 * @param userId The ID of the user
	 * @param data The data to stop
	 * @returns The stopped time entry
	 */
	public static async stopCurrentRunningTimer(
		workspaceId: string,
		userId: string,
		data: StopCurrentRunningTimerRequestBody
	): Promise<TimeEntry> {
		const res = await this.http.patch(
			`/workspaces/${workspaceId}/user/${userId}/time-entries`,
			data
		);
		return res.data satisfies TimeEntry;
	}

	/**
	 * Add a new time entry for another user on workspace
	 * @link https://docs.clockify.me/#tag/Time-entry/operation/createForOthers
	 * @param workspaceId The ID of the workspace
	 * @param userId The ID of the user
	 * @param data The data to add
	 * @param headers The headers
	 * @returns The added time entry
	 */
	public static async addTimeEntryForUser(
		workspaceId: string,
		userId: string,
		data: AddTimeEntryRequestBody,
		headers?: AddTimeEntryHeaders
	): Promise<TimeEntry> {
		const res = await this.http.post(
			`/workspaces/${workspaceId}/user/${userId}/time-entries`,
			data,
			{ headers }
		);
		return res.data satisfies TimeEntry;
	}

	/**
	 * Bulk edit time entries
	 * @link https://docs.clockify.me/#tag/Time-entry/operation/replaceMany
	 * @param workspaceId The ID of the workspace
	 * @param userId The ID of the user
	 * @param data The data to update
	 * @param filters The filters
	 * @returns The updated time entries
	 */
	public static async bulkEditTimeEntries(
		workspaceId: string,
		userId: string,
		data: UpdateTimeEntryRequestBody[],
		filters?: BulkEditTimeEntriesFilter
	): Promise<Partial<TimeEntry>[]> {
		const q = qs.stringify(filters, { encodeValuesOnly: true });
		const res = await this.http.put(
			`/workspaces/${workspaceId}/user/${userId}/time-entries?${q}`,
			data
		);
		return res.data satisfies Partial<TimeEntry>[];
	}

	/**
	 * Duplicate time entry
	 * @link https://docs.clockify.me/#tag/Time-entry/operation/duplicateTimeEntry
	 * @param workspaceId The ID of the workspace
	 * @param userId The ID of the user
	 * @param timeEntryId The ID of the time entry
	 * @returns The duplicated time entry
	 */
	public static async duplicateTimeEntry(
		workspaceId: string,
		userId: string,
		timeEntryId: string
	): Promise<TimeEntry> {
		const res = await this.http.post(
			`/workspaces/${workspaceId}/user/${userId}/time-entries/${timeEntryId}/dusplicate`
		);
		return res.data satisfies TimeEntry;
	}
	//#endregion
	//#region Groups
	/**
	 * Find all groups on workspace
	 * @link https://docs.clockify.me/#tag/Group/operation/getUserGroups
	 * @param workspaceId The ID of the workspace
	 * @param filters The filters
	 * @returns The groups found with the given filters
	 */
	public static async getGroups(workspaceId: string, filters?: GetGroupFilter): Promise<Group[]> {
		const q = qs.stringify(filters, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/user-groups?${q}`);
		return res.data satisfies Group[];
	}

	/**
	 * Add a new group
	 * @link https://docs.clockify.me/#tag/Group/operation/create_3
	 * @param workspaceId The ID of the workspace
	 * @param data The data to add
	 * @returns The added group
	 */
	public static async addGroup(workspaceId: string, data: AddGroupRequestBody): Promise<Group> {
		const res = await this.http.post(`/workspaces/${workspaceId}/user-groups`, data);
		return res.data satisfies Group;
	}

	/**
	 * Delete group
	 * @link https://docs.clockify.me/#tag/Group/operation/delete_2
	 * @param workspaceId The ID of the workspace
	 * @param groupId The ID of the group
	 * @returns The deleted group
	 */
	public static async deleteGroup(workspaceId: string, groupId: string): Promise<Group> {
		const res = await this.http.delete(`/workspaces/${workspaceId}/user-groups/${groupId}`);
		return res.data satisfies Group;
	}

	/**
	 * Update group
	 * @link https://docs.clockify.me/#tag/Group/operation/update_1
	 * @param workspaceId The ID of the workspace
	 * @param groupId The ID of the group
	 * @param data The data to update
	 * @returns The updated group
	 */
	public static async updateGroup(
		workspaceId: string,
		groupId: string,
		data: UpdateGroupRequestBody
	): Promise<Group> {
		const res = await this.http.put(`/workspaces/${workspaceId}/user-groups/${groupId}`, data);
		return res.data satisfies Group;
	}

	/**
	 * Add users to group
	 * @link https://docs.clockify.me/#tag/Group/operation/addUser
	 * @param workspaceId The ID of the workspace
	 * @param groupId The ID of the group
	 * @param userId The ID of the user
	 * @returns The updated group
	 */
	public static async addUserToGroup(
		workspaceId: string,
		groupId: string,
		userId: string
	): Promise<Group> {
		const res = await this.http.post(`/workspaces/${workspaceId}/user-groups/${groupId}/users`, {
			userId,
		});
		return res.data satisfies Group;
	}

	/**
	 * Remove user from group
	 * @link https://docs.clockify.me/#tag/Group/operation/deleteUser
	 * @param workspaceId The ID of the workspace
	 * @param groupId The ID of the group
	 * @param userId The ID of the user
	 * @returns The updated group
	 */
	public static async removeUserFromGroup(
		workspaceId: string,
		groupId: string,
		userId: string
	): Promise<Group> {
		const res = await this.http.delete(
			`/workspaces/${workspaceId}/user-groups/${groupId}/users/${userId}`
		);
		return res.data satisfies Group;
	}
	//#endregion
}
