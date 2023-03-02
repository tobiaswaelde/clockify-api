import { CustomField } from './custom-fields';

export type UserCustomFieldValue = {
	customFieldId: string;
	customFieldName: string;
	customFieldType: string;
	userId: string;
	value: any;
};

export type UserCustomFieldValueFull = {
	customField: CustomField;
	customFieldId: string;
	name: string;
	sourceType: string;
	type: string;
	userId: string;
	value: string;
};

export type UpsertUserCustomFieldRequest = {
	customFieldId: string;
	value: any;
};
