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
	FilterInvoiceResponse,
	FilterInvoicesRequestBody,
	GetInvoicesFilter,
	InvoiceOtherLanguageResponse,
	InvoicesResponse,
} from './types/invoice';

const BASE_URL = 'https://api.clockify.me/api/v1';

export class Clockify {
	private static http = axios.create({
		baseURL: BASE_URL,
	});

	//#region Authentication
	/**
	 * Authenticate using API key
	 * @param {string} key The API key or Addon key, `undefined` to remove authentication
	 * @param {AuthType} authType The type of the authentication
	 */
	public static authenticate(apiKey: string | undefined, authType: AuthType = AuthType.ApiKey) {
		this.http.defaults.headers.common[authType] = apiKey;
	}
	//#endregion

	//#region User
	public static async addUserPhoto(image: string | Blob): Promise<AddUserPhotoResponse> {
		const data = new FormData();
		data.append('file', image);

		const res = await this.http.post(`/file/image`, data);
		return res.data satisfies AddUserPhotoResponse;
	}

	public static async getCurrentUserInfo(options?: GetCurrentUserInfoFilter): Promise<UserInfo> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.get(`/user?${q}`);
		return res.data satisfies UserInfo;
	}

	public static async getMembersProfile(
		workspaceId: string,
		userId: string
	): Promise<MemberProfile> {
		const res = await this.http.get(`/workspaces/${workspaceId}/member-profile/${userId}`);
		return res.data satisfies MemberProfile;
	}

	public static async updateMembersProfile(
		workspaceId: string,
		userId: string,
		data: UpdateMemberProfileRequestBody
	): Promise<MemberProfile> {
		const res = await this.http.patch(`/workspaces/${workspaceId}/member-profile/${userId}`, data);
		return res.data satisfies MemberProfile;
	}

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

	public static async getUsers(workspaceId: string, options?: GetUsersFilter): Promise<UserInfo[]> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/users?${q}`);
		return res.data satisfies UserInfo[];
	}

	public static async filterWorkspaceUsers(
		workspaceId: string,
		data: FilterWorkspaceUsersRequestBody
	): Promise<UserInfo> {
		const res = await this.http.post(`/workspaces/${workspaceId}/users/info`, data);
		return res.data satisfies UserInfo;
	}

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

	public static async getUserTeamManager(
		workspaceId: string,
		userId: string,
		options?: GetUserTeamManagerParams
	): Promise<UserInfo> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/users/${userId}/managers?${q}`);
		return res.data satisfies UserInfo;
	}

	public static async removeUserManagerRole(
		workspaceId: string,
		userId: string,
		data: RemoveUserManagerRequestBody
	): Promise<void> {
		await this.http.delete(`/workspaces/${workspaceId}/users/${userId}/roles`, {
			data,
		});
	}

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
	public static async getAllMyWorkspaces(): Promise<Workspace[]> {
		const res = await this.http.get(`/workspaces`);
		return res.data satisfies Workspace[];
	}

	public static async addWorkspace(workspace: AddWorkspaceRequest): Promise<Workspace> {
		const res = await this.http.post(`/workspaces`, workspace);
		return res.data satisfies Workspace;
	}

	public static async updateWorkspaceCostRate(
		workspaceId: string,
		data: UpdateWorkspaceCostRateRequest
	): Promise<Workspace> {
		const res = await this.http.put(`/workspaces/${workspaceId}/cost-rate`, data);
		return res.data satisfies Workspace;
	}

	public static async updateWorkspaceBillingRate(
		workspaceId: string,
		data: UpdateWorkspaceBillingRateRequest
	): Promise<Workspace> {
		const res = await this.http.put(`/workspaces/${workspaceId}/hourly-rate`, data);
		return res.data satisfies Workspace;
	}

	public static async addUserToWorkspace(
		workspaceId: string,
		data: AddUserToWorkspaceRequest,
		options?: AddUserToWorkspaceFilter
	): Promise<Workspace> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.post(`/workspaces/${workspaceId}/users?${q}`, data);
		return res.data satisfies Workspace;
	}

	public static async removeUserFromWorkspace(
		workspaceId: string,
		userId: string
	): Promise<Workspace> {
		const res = await this.http.delete(`/workspaces/${workspaceId}/users/${userId}`);
		return res.data satisfies Workspace;
	}

	public static async updateUserStatus(
		workspaceId: string,
		userId: string,
		data: UpdateUserStatusRequest
	): Promise<Workspace> {
		const res = await this.http.put(`/workspaces/${workspaceId}/users/${userId}`, data);
		return res.data satisfies Workspace;
	}

	public static async updateUserCostRate(
		workspaceId: string,
		userId: string,
		data: UpdateUserCostRateRequest
	): Promise<Workspace> {
		const res = await this.http.put(`/workspaces/${workspaceId}/users/${userId}/cost-rate`, data);
		return res.data satisfies Workspace;
	}

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
	public static async getWebhooksAddon(workspaceId: string, addonId?: string): Promise<Webhook[]> {
		const res = await this.http.get(`/workspaces/${workspaceId}/addons/${addonId}/webhooks`);
		return res.data satisfies Webhook[];
	}

	public static async getWebhooks(
		workspaceId: string,
		options?: GetWebhooksFilter
	): Promise<Webhook[]> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/webhooks?${q}`);
		return res.data satisfies Webhook[];
	}

	/**
	 * Creating a webhook generates a new token which can be used to verify that the webhook being sent was sent by Clockify, as it will always be present in the header.
	 */
	public static async createWebhook(
		workspaceId: string,
		data: CreateWebhookRequestBody
	): Promise<Webhook> {
		const res = await this.http.post(`/workspaces/${workspaceId}/webhooks`, data);
		return res.data satisfies Webhook;
	}

	public static async deleteWebhook(workspaceId: string, webhookId: string): Promise<Webhook> {
		const res = await this.http.delete(`/workspaces/${workspaceId}/webhooks/${webhookId}`);
		return res.data as Webhook;
	}

	public static async getWebhook(workspaceId: string, webhookId: string): Promise<Webhook> {
		const res = await this.http.get(`/workspaces/${workspaceId}/webhooks/${webhookId}`);
		return res.data satisfies Webhook;
	}

	public static async updateWebhook(
		workspaceId: string,
		webhookId: string,
		data: UpdateWebhookRequestBody
	): Promise<Webhook> {
		const res = await this.http.put(`/workspaces/${workspaceId}/webhooks/${webhookId}`, data);
		return res.data satisfies Webhook;
	}

	public static async generateWebhookToken(
		workspaceId: string,
		webhookId: string
	): Promise<Webhook> {
		const res = await this.http.patch(`/workspaces/${workspaceId}/webhooks/${webhookId}/token`);
		return res.data satisfies Webhook;
	}
	//#endregion
	//#region Approvals
	public static async getApprovalRequests(
		workspaceId: string,
		options?: GetApprovalRequestsFilter
	): Promise<ApprovalRequestResponse[]> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/approval-requests?${q}`);
		return res.data satisfies ApprovalRequestResponse[];
	}

	public static async submitApprovalRequest(
		workspaceId: string,
		data: SubmitApprovalRequestBody
	): Promise<ApprovalRequest> {
		const res = await this.http.post(`/workspaces/${workspaceId}/approval-requests`, data);
		return res.data satisfies ApprovalRequest;
	}

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
	public static async getClients(
		workspaceId: string,
		options?: GetClientsFilter
	): Promise<Client[]> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/clients?${q}`);
		return res.data satisfies Client[];
	}

	public static async addClient(workspaceId: string, data: AddClientRequestBody): Promise<Client> {
		const res = await this.http.post(`/workspaces/${workspaceId}/clients`, data);
		return res.data satisfies Client;
	}

	public static async deleteClient(workspaceId: string, clientId: string): Promise<Client> {
		const res = await this.http.delete(`/workspaces/${workspaceId}/clients/${clientId}`);
		return res.data satisfies Client;
	}

	public static async getClient(workspaceId: string, clientId: string): Promise<Client> {
		const res = await this.http.get(`/workspaces/${workspaceId}/clients/${clientId}`);
		return res.data satisfies Client;
	}

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
	public static async getWorkspceCustomFields(
		workspaceId: string,
		options?: GetWorkspaceCustomFieldsFilter
	): Promise<CustomField[]> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/custom-fields?${q}`);
		return res.data satisfies CustomField[];
	}

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

	public static async getCustomFields(
		workspaceId: string,
		projectId: string,
		options?: GetProjectCustomFieldsFilter
	): Promise<CustomField[]> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.get(
			`/workspaces/${workspaceId}/projects/${projectId}/custom-fields?${q}`
		);
		return res.data satisfies CustomField[];
	}

	public static async removeCustomField(
		workspaceId: string,
		projectId: string,
		customFieldId: string
	): Promise<CustomField> {
		const res = await this.http.delete(
			`/workspaces/${workspaceId}/projects/${projectId}/custom-fields`
		);
		return res.data satisfies CustomField;
	}

	public static async updateCustomField(
		workspaceId: string,
		projectId: string,
		customFieldId: string
	): Promise<CustomField> {
		const res = await this.http.patch(
			`/workspace/${workspaceId}/projects/${projectId}/custom-fields/${customFieldId}`
		);
		return res.data satisfies CustomField;
	}
	//#endregion
	//#region Expenses
	public static async getExpenses(
		workspaceId: string,
		filter?: GetExpensesFilter
	): Promise<ExpensesResponse> {
		const q = qs.stringify(filter, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/expenses?${q}`);
		return res.data satisfies ExpensesResponse;
	}

	public static async createExpense(
		workspaceId: string,
		data: CreateExpenseRequestBody
	): Promise<Expense> {
		const res = await this.http.post(`/workspaces/${workspaceId}/expenses`, data);
		return res.data satisfies Expense;
	}

	public static async getExpenseCategories(
		workspaceId: string,
		filter?: GetExpenseCategoriesFilter
	): Promise<ExpenseCategoriesResponse> {
		const q = qs.stringify(filter, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/expenses/categories?${q}`);
		return res.data satisfies ExpenseCategoriesResponse;
	}

	public static async addExpenseCategory(
		workspaceId: string,
		data: AddExpenseCategoryRequestBody
	): Promise<ExpenseCategory> {
		const res = await this.http.post(`/workspaces/${workspaceId}/expenses/categories`, data);
		return res.data satisfies ExpenseCategory;
	}

	public static async deleteExpenseCategory(
		workspaceId: string,
		categoryId: string
	): Promise<void> {
		await this.http.delete(`/workspaces/${workspaceId}/expenses/categories/${categoryId}`);
	}

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

	public static async deleteExpense(workspaceId: string, expenseId: string): Promise<void> {
		await this.http.delete(`/workspaces/${workspaceId}/expenses/${expenseId}`);
	}

	public static async getExpense(workspaceId: string, expenseId: string): Promise<Expense> {
		const res = await this.http.get(`/workspaces/${workspaceId}/expenses/${expenseId}`);
		return res.data satisfies Expense;
	}

	public static async updateExpense(
		workspaceId: string,
		expenseId: string,
		data: UpdateExpenseRequestBody
	): Promise<Expense> {
		const res = await this.http.put(`/workspaces/${workspaceId}/expenses/${expenseId}`, data);
		return res.data satisfies Expense;
	}

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
	public static async getInvoices(
		workspaceId: string,
		filter?: GetInvoicesFilter
	): Promise<InvoicesResponse> {
		const q = qs.stringify(filter, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/invoices?${q}`);
		return res.data satisfies InvoicesResponse;
	}

	public static async addInvoice(
		workspaceId: string,
		data: AddInvoiceRequestBody
	): Promise<AddInvoiceResponse> {
		const res = await this.http.post(`/workspaces/${workspaceId}/invoices`, data);
		return res.data satisfies AddInvoiceResponse;
	}

	public static async filterInvoices(
		workspaceId: string,
		data: FilterInvoicesRequestBody
	): Promise<FilterInvoiceResponse> {
		const res = await this.http.post(`/workspaces/${workspaceId}/invoices/info`, data);
		return res.data satisfies FilterInvoiceResponse;
	}

	public static async getInvoiceInOtherLanguage(
		workspaceId: string
	): Promise<InvoiceOtherLanguageResponse> {
		const res = await this.http.get(`/workspaces/${workspaceId}/invoices/settings`);
		return res.data satisfies InvoiceOtherLanguageResponse;
	}

	public static async updateInvoiceLanguage(
		workspaceId: string,
		data: ChangeInvoiceLanguageRequestData
	): Promise<void> {
		await this.http.put(`/workspaces/${workspaceId}/invoices/settings`, data);
	}
	//#endregion
	//#region Projects
	public static async getProjects(
		workspaceId: string,
		options?: GetProjectsFilter
	): Promise<Project[]> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/projects?${q}`);
		return res.data satisfies Project[];
	}

	public static async addProject(
		workspaceId: string,
		data: AddProjectRequestBody
	): Promise<ProjectInfo> {
		const res = await this.http.post(`/workspaces/${workspaceId}/projects`, data);
		return res.data satisfies ProjectInfo;
	}

	public static async deleteProject(workspaceId: string, projectId: string): Promise<ProjectInfo> {
		const res = await this.http.delete(`/workspaces/${workspaceId}/projects/${projectId}`);
		return res.data satisfies ProjectInfo;
	}

	public static async getProject(
		workspaceId: string,
		projectId: string,
		options?: GetProjectFilter
	): Promise<Project> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/projects/${projectId}?${q}`);
		return res.data satisfies Project;
	}

	public static async updateProject(
		workspaceId: string,
		projectId: string,
		data: UpdateProjectRequestBody
	): Promise<ProjectInfo> {
		const res = await this.http.put(`/workspaces/${workspaceId}/projects/${projectId}`, data);
		return res.data satisfies ProjectInfo;
	}

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
	public static async getTasks(
		workspaceId: string,
		projectId: string,
		options?: GetTasksFilter
	): Promise<Task[]> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/projects/${projectId}/tasks?${q}`);
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
			`/workspaces/${workspaceId}/projects/${projectId}/tasks?${q}`,
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
			`/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}/cost-rate`,
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
			`/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}/hourly-rate`,
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
			`/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}?${q}`,
			data
		);
		return res.data satisfies Task;
	}
	//#endregion
	//#region Scheduling
	public static async getAssignments(
		workspaceId: string,
		filter?: GetAssignmentsFilter
	): Promise<Assignment[]> {
		const q = qs.stringify(filter, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/scheduling/assignments/all?${q}`);
		return res.data satisfies Assignment[];
	}

	public static async getScheduledAssignments(
		workspaceId: string,
		filter?: GetScheduledAssignmentsFilter
	): Promise<ScheduledAssignment[]> {
		const q = qs.stringify(filter, { encodeValuesOnly: true });
		const res = await this.http.get(
			`/workspaces/${workspaceId}/scheduling/assignments/projects/totals?${q}`
		);
		return res.data satisfies ScheduledAssignment[];
	}

	public static async getProjectScheduledAssignments(
		workspaceId: string,
		projectId: string,
		filter?: GetProjectScheduledAssignmentsFilter
	): Promise<ScheduledAssignment[]> {
		const q = qs.stringify(filter, { encodeValuesOnly: true });
		const res = await this.http.get(
			`/workspaces/${workspaceId}/scheduling/assignments/projects/totals/${projectId}?${q}`
		);
		return res.data satisfies ScheduledAssignment[];
	}

	public static async publishAssignment(
		workspaceId: string,
		data: PublishAssignmentRequestBody
	): Promise<void> {
		await this.http.put(`/workspaces/${workspaceId}/scheduling/assignments/publish`, data);
	}

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
	public static async getTags(workspaceId: string, options?: GetTagsFilter): Promise<Tag[]> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/tags?${q}`);
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
	//TODO Time Entries
	//#region Groups
	public static async getGroups(workspaceId: string, options?: GetGroupFilter): Promise<Group[]> {
		const q = qs.stringify(options, { encodeValuesOnly: true });
		const res = await this.http.get(`/workspaces/${workspaceId}/user-groups?${q}`);
		return res.data satisfies Group[];
	}

	public static async addGroup(workspaceId: string, data: AddGroupRequestBody): Promise<Group> {
		const res = await this.http.post(`/workspaces/${workspaceId}/user-groups`, data);
		return res.data satisfies Group;
	}

	public static async deleteGroup(workspaceId: string, groupId: string): Promise<Group> {
		const res = await this.http.delete(`/workspaces/${workspaceId}/user-groups/${groupId}`);
		return res.data satisfies Group;
	}

	public static async updateGroup(
		workspaceId: string,
		groupId: string,
		data: UpdateGroupRequestBody
	): Promise<Group> {
		const res = await this.http.put(`/workspaces/${workspaceId}/user-groups/${groupId}`, data);
		return res.data satisfies Group;
	}

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
