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

	// User
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
			`/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`
		);
		return res.data satisfies Task;
	}

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
		const res = await this.http.get(`/workspaces/${workspaceId}/tags`);
		return res.data satisfies Tag[];
	}

	public static async addTag(workspaceId: string, data: AddTagRequestBody): Promise<Tag> {
		const res = await this.http.post(`/workspaces/${workspaceId}/tags`, data);
		return res.data satisfies Tag;
	}

	public static async deleteTag(workspaceId: string, tagId: string): Promise<Tag> {
		const res = await this.http.post(`/workspaces/${workspaceId}/tags/${tagId}`);
		return res.data satisfies Tag;
	}

	public static async getTag(workspaceId: string, tagId: string): Promise<Tag> {
		const res = await this.http.get(`/workspaces/${workspaceId}/tags/${tagId}`);
		return res.data satisfies Tag;
	}

	public static async updateTag(
		workspaceId: string,
		tagId: string,
		data: UpdateTagRequestBody
	): Promise<Tag> {
		const res = await this.http.put(`/workspaces/${workspaceId}/tags/${tagId}`, data);
		return res.data satisfies Tag;
	}
	//#endregion
	// Time Entries
	//#region Groups

	//#endregion
}
