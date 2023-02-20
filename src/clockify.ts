import axios from 'axios';
import * as qs from 'qs';
import { GetClientsFilter } from './types/clients';

const BASE_URL = 'https://api.clockify.me/api/v1';

export class Clockify {
	private static http = axios.create({
		baseURL: BASE_URL,
	});

	/**
	 * Authenticate using API key
	 * @param {string} apiKey The API key, `undefined` to remove authentication
	 */
	public static authenticate(apiKey: string | undefined) {
		this.http.defaults.headers.common['X-Api-Key'] = apiKey;
	}

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
	//#region Workspaces

	//#endregion
}
