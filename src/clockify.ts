import axios from 'axios';
import * as qs from 'qs';
import {
	ApprovalRequest,
	ApprovalRequestResponse,
	GetApprovalRequestsParams,
	SubmitApprovalRequestData,
} from './types/approval';
import { AuthType } from './types/auth';
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
	//#endregion
}
