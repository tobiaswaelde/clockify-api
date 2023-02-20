import { Membership } from './membership';
import { AutomaticLock } from './automatic-lock';

export type FeatureSubscriptionType =
	| 'FREE'
	| 'TRIAL'
	| 'BASIC_2021'
	| 'BASIC_YEAR_2021'
	| 'STANDARD_2021'
	| 'STANDARD_YEAR_2021'
	| 'PRO_2021'
	| 'PRO_YEAR_2021'
	| 'ENTERPRISE_2021'
	| 'ENTERPRISE_YEAR_2021';

export type Round = {
	minutes: string;
	round: string;
};

export type WorkspaceSettings = {
	timeRoundingInReports: boolean;
	onlyAdminsSeeBillableRates: boolean;
	onlyAdminsCreateProject: boolean;
	onlyAdminsSeeDashboard: boolean;
	defaultBillableProjects: boolean;
	lockTimeEntries: null;
	round: Round;
	projectFavorites: boolean;
	canSeeTimeSheet: boolean;
	canSeeTracker: boolean;
	projectPickerSpecialFilter: boolean;
	forceProjects: boolean;
	forceTasks: boolean;
	forceTags: boolean;
	forceDescription: boolean;
	onlyAdminsSeeAllTimeEntries: boolean;
	onlyAdminsSeePublicProjectsEntries: boolean;
	trackTimeDownToSecond: boolean;
	projectGroupingLabel: 'client';
	adminOnlyPages: [];
	automaticLock: AutomaticLock;
	onlyAdminsCreateTag: boolean;
	onlyAdminsCreateTask: boolean;
	timeTrackingMode: 'DEFAULT';
	isProjectPublicByDefault: boolean;
};

export type Workspace = {
	id: string;
	name: string;
	hourlyRate: {
		amount: number;
		currency: string;
	};
	costRate: any;
	memberships: Membership[];
	workspaceSettings: WorkspaceSettings;
	imageUrl: string;
	featureSubscriptionType: FeatureSubscriptionType;
};
