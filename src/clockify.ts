import axios from 'axios';
import * as qs from 'qs';
import { AuthType } from './types/auth';

const BASE_URL = 'https://api.clockify.me/api/v1';

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
