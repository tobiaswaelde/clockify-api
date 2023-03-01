import { ProjectInfo } from './project';
import { CustomFieldValue } from './custom-fields';
import { CostRate } from './cost-rate';
import { HourlyRate } from './hourly-rate';
import { Tag } from './tag';
import { Task } from './task';
import { TimeInterval } from './time-interval';

export type TimeEntryInfo = {
	approvalRequestId: string;
	billable: boolean;
	costRate: CostRate;
	customFields: CustomFieldValue[];
	description: string;
	hourlyRate: HourlyRate;
	id: string;
	project: ProjectInfo;
	tags: Tag[];
	tasks: Task[];
	timeInterval: TimeInterval;
	type: 'REGULAR' | 'BREAK';
};
