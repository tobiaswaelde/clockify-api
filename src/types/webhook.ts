type WebhooksResponse = {
	webhooks: Webhook[];
	workspaceWebhookCount: number;
};

export type TriggerSourceType =
	| 'PROJECT_ID'
	| 'USER_ID'
	| 'TAG_ID'
	| 'TASK_ID'
	| 'WORKSPACE_ID'
	| 'USER_GROUP_ID'
	| 'INVOICE_ID';

export type WebhookEvent =
	| 'NEW_PROJECT'
	| 'NEW_TASK'
	| 'NEW_CLIENT'
	| 'NEW_TIMER_STARTED'
	| 'TIMER_STOPPED'
	| 'TIME_ENTRY_UPDATED'
	| 'TIME_ENTRY_DELETED'
	| 'NEW_TIME_ENTRY'
	| 'TIME_ENTRY_MOVED_FROM'
	| 'NEW_TAG'
	| 'USER_DELETED_FROM_WORKSPACE'
	| 'WORKSPACE_DELETED'
	| 'WORKSPACE_TEST_DATA_DELETED'
	| 'WORKSPACE_UNDERPAYMENT'
	| 'WORKSPACE_UNDERPAYMENT_RESOLVED'
	| 'NEW_DOMAIN'
	| 'EXTEND_TRIAL'
	| 'USER_JOINED_WORKSPACE'
	| 'USERS_INVITED_TO_WORKSPACE'
	| 'LIMITED_USERS_ADDED_TO_WORKSPACE'
	| 'USER_DEACTIVATED_ON_WORKSPACE'
	| 'USER_ACTIVATED_ON_WORKSPACE'
	| 'USER_EMAIL_CHANGED'
	| 'USER_UPDATED'
	| 'TEST'
	| 'RESEND'
	| 'USER_GROUP_CREATED'
	| 'USER_GROUP_UPDATED'
	| 'USER_GROUP_DELETED'
	| 'FILE_IMPORT_COMPLETED'
	| 'NEW_INVOICE'
	| 'INVOICE_UPDATED'
	| 'NEW_APPROVAL_REQUEST'
	| 'APPROVAL_REQUEST_STATUS_UPDATED'
	| 'TIME_OFF_REQUESTED'
	| 'TIME_OFF_REQUEST_APPROVED'
	| 'TIME_OFF_REQUEST_REJECTED'
	| 'TIME_OFF_REQUEST_WITHDRAWN'
	| 'BALANCE_UPDATED'
	| 'ASSIGNMENT_PUBLISHED';

export type Webhook = {
	authToken: string;
	enabled: boolean;
	id: string;
	name: string;
	triggerSource: string[];
	triggerSourceType: TriggerSourceType;
	url: string;
	userId: string;
	webhookEvent: WebhookEvent;
	workspaceId: string;
};

export type GetWebhooksFilter = {
	type: 'USER_CREATED' | 'SYSTEM' | 'ADDON';
};

export type CreateWebhookRequestBody = {
	name?: string;
	triggerSource: string[];
	triggerSourceType?: TriggerSourceType;
	url: string;
	webhookEvent?: WebhookEvent;
};

export type UpdateWebhookRequestBody = {
	name?: string;
	triggerSource: string[];
	triggerSourceType?: TriggerSourceType;
	url: string;
	webhookEvent?: WebhookEvent;
};
