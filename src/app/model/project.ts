import { User } from './user';
import { Task } from './task';

export class Project {
    public projectId: number;
    public projectName: string;
    public priority: number;
    public startDate: Date;
    public endDate: Date;
    public isProjectDone: string;
    public user: User;
    public tasks: Task[];
    public numberOfTasks: number;
    public numberOfCompleted: number;

}
