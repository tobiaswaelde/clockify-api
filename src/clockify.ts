import axios from 'axios';
import * as qs from 'qs';
import {
	ApprovalRequest,
	ApprovalRequestResponse,
	GetApprovalRequestsParams,
	SubmitApprovalRequestData,
	UpdateApprovalRequestData,
} from './types/approval';
import { AuthType } from './types/auth';
import {
	AddClientRequestData,
	Client,
	GetClientsParams,
	UpdateClientParams,
	UpdateClientRequestData,
} from './types/client';
import {
	CustomField,
	GetProjectCustomFieldsParams,
	GetWorkspaceCustomFieldsParams,
	SetCustomFieldRequiredRequestData,
} from './types/custom-fields';
import { AddGroupRequestBody, GetGroupParams, Group, UpdateGroupRequestBody } from './types/group';
import { MemberProfile, UpdateMemberProfileRequestBody } from './types/member-profile';
import { AddTagRequestBody, GetTagsParams, Tag, UpdateTagRequestBody } from './types/tag';
import {
	AddTaskParams,
	AddTaskRequestBody,
	GetTasksParams,
	Task,
	UpdateTaskBillableRateRequestBody,
	UpdateTaskCostRateRequestBody,
	UpdateTaskParams,
	UpdateTaskRequestBody,
} from './types/task';
import {
	AddUserPhotoResponse,
	GetCurrentUserInfoParams,
	UserInfo,
	UpdateUserEmailRequestBody,
	UpdateUserEmailParams,
	GetUsersParams,
	FilterWorkspaceUsersRequestBody,
	UpdateUserCustomFieldRequestBody,
	GetUserTeamManagerParams,
	RemoveUserManagerRequestBody,
	GiveUserManagerRoleRequestBody,
	GiveUserManagerRoleResponse,
} from './types/user';
import { UserCustomFieldValue } from './types/user-custom-field-value';
import {
	GetWebhooksParams,
	Webhook,
	CreateWebhookRequestData,
	UpdateWebhookRequestData,
} from './types/webhook';
import {
	AddUserToWorkspaceParams,
	AddUserToWorkspaceRequest,
	AddWorkspaceRequest,
	UpdateUserCostRateRequest,
	UpdateUserHourlyRateRequest,
	UpdateUserStatusRequest,
	UpdateWorkspaceBillingRateRequest,
	UpdateWorkspaceCostRateRequest,
	Workspace,
} from './types/workspace';

const BASE_URL = 'https://api.clockify.me/api';

export class Clockify {
	private static http = axios.create({
		baseURL: BASE_URL,
	});

	/**
	 * Authenticate using API key
	 * @param {string} key The API key or Addon key, `undefined` to remove authentication
	 * @param {AuthType} authType The type of the authentication
	 */
	public static authenticate(apiKey: string | undefined, authType: AuthType = AuthType.ApiKey) {
		this.http.defaults.headers.common[authType] = apiKey;
	}

	//#region User
	public static async addUserPhoto(image: string | Blob): Promise<AddUserPhotoResponse> {
		const data = new FormData();
		data.append('file', image);

		const res = await this.http.post(`/v1/file/image`, data);
		return res.data satisfies AddUserPhotoResponse;
	}

	public static async getCurrentUserInfo(options?: GetCurrentUserInfoParams): Promise<UserInfo> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.get(`/v1/user?${q}`);
		return res.data satisfies UserInfo;
	}

	public static async getMembersProfile(
		workspaceId: string,
		userId: string
	): Promise<MemberProfile> {
		const res = await this.http.get(`/v1/workspaces/${workspaceId}/member-profile/${userId}`);
		return res.data satisfies MemberProfile;
	}

	public static async updateMembersProfile(
		workspaceId: string,
		userId: string,
		data: UpdateMemberProfileRequestBody
	): Promise<MemberProfile> {
		const res = await this.http.patch(
			`/v1/workspaces/${workspaceId}/member-profile/${userId}`,
			data
		);
		return res.data satisfies MemberProfile;
	}

	public static async updateUserEmail(
		workspaceId: string,
		userId: string,
		data: UpdateUserEmailRequestBody,
		options?: UpdateUserEmailParams
	): Promise<void> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.put(
			`/v1/workspaces/${workspaceId}/member-profile/${userId}/email?${q}`,
			data
		);
		return res.data;
	}

	public static async getUsers(workspaceId: string, options?: GetUsersParams): Promise<UserInfo[]> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.get(`/v1/workspaces/${workspaceId}/users?${q}`);
		return res.data satisfies UserInfo[];
	}

	public static async filterWorkspaceUsers(
		workspaceId: string,
		data: FilterWorkspaceUsersRequestBody
	): Promise<UserInfo> {
		const res = await this.http.post(`/v1/workspaces/${workspaceId}/users/info`, data);
		return res.data satisfies UserInfo;
	}

	public static async updateUserCustomField(
		workspaceId: string,
		userId: string,
		customFieldId: string,
		data: UpdateUserCustomFieldRequestBody
	): Promise<UserCustomFieldValue> {
		const res = await this.http.put(
			`/v1/workspaces/${workspaceId}/users/${userId}/custom-field/${customFieldId}/value`,
			data
		);
		return res.data satisfies UserCustomFieldValue;
	}

	public static async getUserTeamManager(
		workspaceId: string,
		userId: string,
		options?: GetUserTeamManagerParams
	): Promise<UserInfo> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.get(`/v1/workspaces/${workspaceId}/users/${userId}/managers?${q}`);
		return res.data satisfies UserInfo;
	}

	public static async removeUserManagerRole(
		workspaceId: string,
		userId: string,
		data: RemoveUserManagerRequestBody
	): Promise<void> {
		await this.http.delete(`/v1/workspaces/${workspaceId}/users/${userId}/roles`, {
			data,
		});
	}

	public static async giveUserManagerRole(
		workspaceId: string,
		userId: string,
		data: GiveUserManagerRoleRequestBody
	): Promise<GiveUserManagerRoleResponse> {
		const res = await this.http.post(`/v1/workspaces/${workspaceId}/users/${userId}/roles`, data);
		return res.data satisfies GiveUserManagerRoleResponse;
	}
	//#endregion
	//#region Workspaces
	public static async getAllMyWorkspaces(): Promise<Workspace[]> {
		const res = await this.http.get(`/v1/workspaces`);
		return res.data satisfies Workspace[];
	}

	public static async addWorkspace(workspace: AddWorkspaceRequest): Promise<Workspace> {
		const res = await this.http.post(`/v1/workspaces`, workspace);
		return res.data satisfies Workspace;
	}

	public static async updateWorkspaceCostRate(
		workspaceId: string,
		data: UpdateWorkspaceCostRateRequest
	): Promise<Workspace> {
		const res = await this.http.put(`/v1/workspaces/${workspaceId}/cost-rate`, data);
		return res.data satisfies Workspace;
	}

	public static async updateWorkspaceBillingRate(
		workspaceId: string,
		data: UpdateWorkspaceBillingRateRequest
	): Promise<Workspace> {
		const res = await this.http.put(`/v1/workspaces/${workspaceId}/hourly-rate`, data);
		return res.data satisfies Workspace;
	}

	public static async addUserToWorkspace(
		workspaceId: string,
		data: AddUserToWorkspaceRequest,
		options?: AddUserToWorkspaceParams
	): Promise<Workspace> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.post(`/v1/workspaces/${workspaceId}/users?${q}`, data);
		return res.data satisfies Workspace;
	}

	public static async removeUserFromWorkspace(
		workspaceId: string,
		userId: string
	): Promise<Workspace> {
		const res = await this.http.delete(`/v1/workspaces/${workspaceId}/users/${userId}`);
		return res.data satisfies Workspace;
	}

	public static async updateUserStatus(
		workspaceId: string,
		userId: string,
		data: UpdateUserStatusRequest
	): Promise<Workspace> {
		const res = await this.http.put(`/v1/workspaces/${workspaceId}/users/${userId}`, data);
		return res.data satisfies Workspace;
	}

	public static async updateUserCostRate(
		workspaceId: string,
		userId: string,
		data: UpdateUserCostRateRequest
	): Promise<Workspace> {
		const res = await this.http.put(
			`/v1/workspaces/${workspaceId}/users/${userId}/cost-rate`,
			data
		);
		return res.data satisfies Workspace;
	}

	public static async updateUserHourlyRate(
		workspaceId: string,
		userId: string,
		data: UpdateUserHourlyRateRequest
	): Promise<Workspace> {
		const res = await this.http.put(
			`/v1/workspaces/${workspaceId}/users/${userId}/hourly-rate`,
			data
		);
		return res.data satisfies Workspace;
	}
	//#endregion
	//#region Webhooks
	public static async getWebhooksAddon(workspaceId: string, addonId?: string): Promise<Webhook[]> {
		const res = await this.http.get(`/v1/workspaces/${workspaceId}/addons/${addonId}/webhooks`);
		return res.data satisfies Webhook[];
	}

	public static async getWebhooks(
		workspaceId: string,
		options?: GetWebhooksParams
	): Promise<Webhook[]> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.get(`/v1/workspaces/${workspaceId}/webhooks?${q}`);
		return res.data satisfies Webhook[];
	}

	/**
	 * Creating a webhook generates a new token which can be used to verify that the webhook being sent was sent by Clockify, as it will always be present in the header.
	 */
	public static async createWebhook(
		workspaceId: string,
		data: CreateWebhookRequestData
	): Promise<Webhook> {
		const res = await this.http.post(`/v1/workspaces/${workspaceId}/webhooks`, data);
		return res.data satisfies Webhook;
	}

	public static async deleteWebhook(workspaceId: string, webhookId: string): Promise<Webhook> {
		const res = await this.http.delete(`/v1/workspaces/${workspaceId}/webhooks/${webhookId}`);
		return res.data as Webhook;
	}

	public static async getWebhook(workspaceId: string, webhookId: string): Promise<Webhook> {
		const res = await this.http.get(`/v1/workspaces/${workspaceId}/webhooks/${webhookId}`);
		return res.data satisfies Webhook;
	}

	public static async updateWebhook(
		workspaceId: string,
		webhookId: string,
		data: UpdateWebhookRequestData
	): Promise<Webhook> {
		const res = await this.http.put(`/v1/workspaces/${workspaceId}/webhooks/${webhookId}`, data);
		return res.data satisfies Webhook;
	}

	public static async generateWebhookToken(
		workspaceId: string,
		webhookId: string
	): Promise<Webhook> {
		const res = await this.http.patch(`/v1/workspaces/${workspaceId}/webhooks/${webhookId}/token`);
		return res.data satisfies Webhook;
	}
	//#endregion
	//#region Approvals
	public static async getApprovalRequests(
		workspaceId: string,
		options?: GetApprovalRequestsParams
	): Promise<ApprovalRequestResponse[]> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.get(`/v1/workspaces/${workspaceId}/approval-requests?${q}`);
		return res.data satisfies ApprovalRequestResponse[];
	}

	public static async submitApprovalRequest(
		workspaceId: string,
		data: SubmitApprovalRequestData
	): Promise<ApprovalRequest> {
		const res = await this.http.post(`/v1/workspaces/${workspaceId}/approval-requests`, data);
		return res.data satisfies ApprovalRequest;
	}

	public static async submitApprovalRequestForUser(
		workspaceId: string,
		userId: string,
		data: SubmitApprovalRequestData
	): Promise<ApprovalRequest> {
		const res = await this.http.post(
			`/v1/workspaces/${workspaceId}/approval-requests/users/${userId}`,
			data
		);
		return res.data satisfies ApprovalRequest;
	}

	public static async updateApprovalRequest(
		workspaceId: string,
		approvalRequestId: string,
		data: UpdateApprovalRequestData
	): Promise<ApprovalRequest> {
		const res = await this.http.patch(
			`/v1/workspaces/${workspaceId}/approval-requests/${approvalRequestId}`,
			data
		);
		return res.data as ApprovalRequest;
	}
	//#endregion
	//#region Clients
	public static async getClients(
		workspaceId: string,
		options?: GetClientsParams
	): Promise<Client[]> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.get(`/v1/workspaces/${workspaceId}/clients?${q}`);
		return res.data satisfies Client[];
	}

	public static async addClient(workspaceId: string, data: AddClientRequestData): Promise<Client> {
		const res = await this.http.post(`/v1/workspaces/${workspaceId}/clients`, data);
		return res.data satisfies Client;
	}

	public static async deleteClient(workspaceId: string, clientId: string): Promise<Client> {
		const res = await this.http.delete(`/v1/workspaces/${workspaceId}/clients/${clientId}`);
		return res.data satisfies Client;
	}

	public static async getClient(workspaceId: string, clientId: string): Promise<Client> {
		const res = await this.http.get(`/v1/workspaces/${workspaceId}/clients/${clientId}`);
		return res.data satisfies Client;
	}

	public static async updateClient(
		workspaceId: string,
		clientId: string,
		data: UpdateClientRequestData,
		options?: UpdateClientParams
	): Promise<Client> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.put(`/v1/workspaces/${workspaceId}/clients/${clientId}?${q}`, data);
		return res.data satisfies Client;
	}
	//#endregion
	//#region Custom Fields
	public static async getWorkspceCustomFields(
		workspaceId: string,
		options?: GetWorkspaceCustomFieldsParams
	): Promise<CustomField[]> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.get(`/v1/workspaces/${workspaceId}/custom-fields?${q}`);
		return res.data satisfies CustomField[];
	}

	public static async setCustomFieldAsRequired(
		workspaceId: string,
		customFieldId: string,
		data: SetCustomFieldRequiredRequestData
	): Promise<CustomField> {
		const res = await this.http.put(
			`/v1/workspaces/${workspaceId}/custom-fields/${customFieldId}`,
			data
		);
		return res.data satisfies CustomField;
	}

	public static async getCustomFields(
		workspaceId: string,
		projectId: string,
		options?: GetProjectCustomFieldsParams
	): Promise<CustomField[]> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.get(
			`/v1/workspaces/${workspaceId}/projects/${projectId}/custom-fields?${q}`
		);
		return res.data satisfies CustomField[];
	}

	public static async removeCustomField(
		workspaceId: string,
		projectId: string,
		customFieldId: string
	): Promise<CustomField> {
		const res = await this.http.delete(
			`/v1/workspaces/${workspaceId}/projects/${projectId}/custom-fields`
		);
		return res.data satisfies CustomField;
	}

	public static async updateCustomField(
		workspaceId: string,
		projectId: string,
		customFieldId: string
	): Promise<CustomField> {
		const res = await this.http.patch(
			`/v1/workspace/${workspaceId}/projects/${projectId}/custom-fields/${customFieldId}`
		);
		return res.data satisfies CustomField;
	}
	//#endregion
	// Project
	//#region Tasks
	public static async getTasks(
		workspaceId: string,
		projectId: string,
		options?: GetTasksParams
	): Promise<Task[]> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.get(
			`/v1/workspaces/${workspaceId}/projects/${projectId}/tasks?${q}`
		);
		return res.data satisfies Task[];
	}

	public static async addTask(
		workspaceId: string,
		projectId: string,
		data: AddTaskRequestBody,
		options?: AddTaskParams
	): Promise<Task> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.post(
			`/v1/workspaces/${workspaceId}/projects/${projectId}/tasks?${q}`,
			data
		);
		return res.data satisfies Task;
	}

	public static async updateTaskCostRate(
		workspaceId: string,
		projectId: string,
		taskId: string,
		data: UpdateTaskCostRateRequestBody
	): Promise<Task> {
		const res = await this.http.put(
			`/v1/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}/cost-rate`,
			data
		);
		return res.data satisfies Task;
	}

	public static async updateTaskBillableRate(
		workspaceId: string,
		projectId: string,
		taskId: string,
		data: UpdateTaskBillableRateRequestBody
	): Promise<Task> {
		const res = await this.http.put(
			`/v1/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}/hourly-rate`,
			data
		);
		return res.data satisfies Task;
	}

	public static async deleteTask(
		workspaceId: string,
		projectId: string,
		taskId: string
	): Promise<Task> {
		const res = await this.http.delete(
			`/v1/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`
		);
		return res.data satisfies Task;
	}

	public static async getTask(
		workspaceId: string,
		projectId: string,
		taskId: string
	): Promise<Task> {
		const res = await this.http.get(
			`/v1/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`
		);
		return res.data satisfies Task;
	}

	public static async updateTask(
		workspaceId: string,
		projectId: string,
		taskId: string,
		data: UpdateTaskRequestBody,
		options?: UpdateTaskParams
	): Promise<Task> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.put(
			`/v1/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}?${q}`,
			data
		);
		return res.data satisfies Task;
	}
	//#endregion
	// Scheduling
	//#region Tags
	public static async getTags(workspaceId: string, options?: GetTagsParams): Promise<Tag[]> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.get(`/v1/workspaces/${workspaceId}/tags?${q}`);
		return res.data satisfies Tag[];
	}

	public static async addTag(workspaceId: string, data: AddTagRequestBody): Promise<Tag> {
		const res = await this.http.post(`/v1/workspaces/${workspaceId}/tags`, data);
		return res.data satisfies Tag;
	}

	public static async deleteTag(workspaceId: string, tagId: string): Promise<Tag> {
		const res = await this.http.post(`/v1/workspaces/${workspaceId}/tags/${tagId}`);
		return res.data satisfies Tag;
	}

	public static async getTag(workspaceId: string, tagId: string): Promise<Tag> {
		const res = await this.http.get(`/v1/workspaces/${workspaceId}/tags/${tagId}`);
		return res.data satisfies Tag;
	}

	public static async updateTag(
		workspaceId: string,
		tagId: string,
		data: UpdateTagRequestBody
	): Promise<Tag> {
		const res = await this.http.put(`/v1/workspaces/${workspaceId}/tags/${tagId}`, data);
		return res.data satisfies Tag;
	}
	//#endregion
	// Time Entries
	//#region Groups
	public static async getGroups(workspaceId: string, options?: GetGroupParams): Promise<Group[]> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.get(`/v1/workspaces/${workspaceId}/user-groups?${q}`);
		return res.data satisfies Group[];
	}

	public static async addGroup(workspaceId: string, data: AddGroupRequestBody): Promise<Group> {
		const res = await this.http.post(`/v1/workspaces/${workspaceId}/user-groups`, data);
		return res.data satisfies Group;
	}

	public static async deleteGroup(workspaceId: string, groupId: string): Promise<Group> {
		const res = await this.http.delete(`/v1/workspaces/${workspaceId}/user-groups/${groupId}`);
		return res.data satisfies Group;
	}

	public static async updateGroup(
		workspaceId: string,
		groupId: string,
		data: UpdateGroupRequestBody
	): Promise<Group> {
		const res = await this.http.put(`/v1/workspaces/${workspaceId}/user-groups/${groupId}`, data);
		return res.data satisfies Group;
	}

	public static async addUserToGroup(
		workspaceId: string,
		groupId: string,
		userId: string
	): Promise<Group> {
		const res = await this.http.post(`/v1/workspaces/${workspaceId}/user-groups/${groupId}/users`, {
			userId,
		});
		return res.data satisfies Group;
	}

	public static async removeUserFromGroup(
		workspaceId: string,
		groupId: string,
		userId: string
	): Promise<Group> {
		const res = await this.http.delete(
			`/v1/workspaces/${workspaceId}/user-groups/${groupId}/users/${userId}`
		);
		return res.data satisfies Group;
	}
	//#endregion
}
