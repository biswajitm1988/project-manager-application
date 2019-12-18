import { ParentTask } from './parent-task';
import { Project } from './project';
import { User } from './user';

export class Task {
    public taskId: number;
    public taskSummary: string;
    public parentTask: ParentTask;
    public priority: number;
    public startDate: Date;
    public endDate: Date;
    public isTaskDone: string;
    public priorityLt: number;
    public priorityGt: number;
    public project: Project;
    public user: User;
}
