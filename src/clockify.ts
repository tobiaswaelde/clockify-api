import axios from 'axios';
import * as qs from 'qs';
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
		params?: AddUserToWorkspaceParams
	): Promise<Workspace> {
		const q = qs.stringify(params, { encodeValuesOnly: true });
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
			`/v1/workspaces/${workspaceId}/users/${userId}/cost-rate`,
			data
		);
		return res.data satisfies Workspace;
	}
	//#endregion
	//#region Clients
	/**
	 * Find clients on workspace
	 */
	// public static async getAllClients(workspaceId: string, filter: GetClientsFilter): Promise<any[]> {
	// 	const;
	// 	const res = await this.http.get(``);
	// }
	//#endregion
	//#region Projects

	//#endregion
	//#region Tags

	//#endregion
	//#region Tasks

	//#endregion
	//#region Time entries

	//#endregion
	//#region Expenses

	//#endregion
	//#region Users

	//#endregion
	//#region Groups

	//#endregion
}
