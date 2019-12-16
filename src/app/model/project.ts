import { User } from './user';

export class Project {
    public projectId: number;
    public projectName: string;
    public priority: number;
    public startDate: Date;
    public endDate: Date;
    public isProjectDone: string;
    public user: User;
}
