export type CustomFieldStatus = 'INACTIVE' | 'VISIBLE' | 'INVISIBLE';
export type CustomFieldType =
	| 'TXT'
	| 'NUMBER'
	| 'DROPDOWN_SINGLE'
	| 'DROPDOWN_MULTIPLE'
	| 'CHECKBOX'
	| 'LINK';
export type SourceType = 'WORKSPACE' | 'PROJECT' | 'TIMEENTRY';

export type CustomFieldValue = {
	customFieldId: string;
	sourceType: string;
	timeEntryId: string;
	value: unknown;
};

export type CustomFieldDefaultValue = {
	projectId: string;
	status: string;
	value: unknown;
};

export type CustomField = {
	allowedValues: string[];
	description: string;
	entityType: string;
	id: string;
	name: string;
	onlyAdminCanEdit: boolean;
	placeholder: string;
	projectDefaultValues: CustomFieldDefaultValue[];
	required: boolean;
	status: string;
	type: string;
	workspaceDefaultValue: unknown;
	workspaceId: string;
};

export type GetWorkspaceCustomFieldsFilter = {
	name: string;
	status: string;
	entityType: string[];
};
export type GetProjectCustomFieldsFilter = {
	status: string;
	entityType?: string[];
};

export type SetCustomFieldRequiredRequestBody = {
	allowedValues?: string[];
	description?: string;
	name: string;
	onlyAdminCanEdit?: boolean;
	placeholder: boolean;
	required: boolean;
	status: CustomFieldStatus;
	type: CustomFieldType;
	workspaceDefaultValue: unknown;
};

export type UpdateCustomFieldRequestBody = {
	defaultValue: any;
	status: CustomFieldStatus;
};

export type UpdateCustomFieldRequest = {
	customFieldId: string;
	sourceType?: SourceType;
	value: any;
};
