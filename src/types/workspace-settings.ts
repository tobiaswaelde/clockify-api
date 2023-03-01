import { AutomaticLock } from './automatic-lock';
import { Round } from './round';

export type AdminOnlyPages = 'PROJECT' | 'TEAM' | 'REPORTS';
export type TimeTrackingMode = 'DEFAULT' | 'STOPWATCH_ONLY';

export type WorkspaceSettings = {
	adminOnlyPages: AdminOnlyPages[];
	automaticLock: AutomaticLock;
	canSeeTimeSheet: boolean;
	canSeeTracker: boolean;
	defaultBillableProjects: boolean;
	forceDescription: boolean;
	forceProjects: boolean;
	forceTags: boolean;
	forceTasks: boolean;
	isProjectPublicByDefault: boolean;
	lockTimeEntries: string;
	onlyAdminsCreateProject: boolean;
	onlyAdminsCreateTag: boolean;
	onlyAdminsCreateTask: boolean;
	onlyAdminsSeeAllTimeEntries: boolean;
	onlyAdminsSeeBillableRates: boolean;
	onlyAdminsSeeDashboard: boolean;
	onlyAdminsSeePublicProjectsEntries: boolean;
	projectFavorites: boolean;
	projectGroupingLabel: string;
	projectPickerSpecialFilter: boolean;
	round: Round;
	timeRoundingInReports: boolean;
	timeTrackingMode: TimeTrackingMode;
	trackTimeDownToSecond: boolean;
};
