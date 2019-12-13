import { ParentTask } from './parent-task';

export class Task {
    public taskId: string;
    public taskSummary: string;
    public parentTask: ParentTask;
    public priority: number;
    public startDate: Date;
    public endDate: Date;
    public isTaskDone: string;
    public priorityLt: number;
    public priorityGt: number;
}
