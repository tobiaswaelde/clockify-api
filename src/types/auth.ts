/**
 * To authenticate your requests to your API, make sure to include either the ‘X-Api-Key’ or the ‘X-Addon-Token’ in the request header, containing your API or Addon key. If your workspace is on a subdomain (e.g. subdomain.clockify.me), you’ll need to generate a new API key in your Profile Settings that will work specifically for that workspace. This ensures that you’re accessing data from the correct workspace and helps maintain the security of your data.
 */
export enum AuthType {
	ApiKey = 'x-api-key',
	AddonKey = 'x-addon-key',
}
