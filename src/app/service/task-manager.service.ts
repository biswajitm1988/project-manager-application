import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LogService } from './log.service';
import { map } from 'rxjs/operators';
import { ParentTask } from '../model/parent-task';
import * as moment from 'moment';
import { Project } from '../model/project';

@Injectable({
  providedIn: 'root'
})

export class TaskManagerService {

  task: Task;
  tasks: Task[];
  today: Date;
  serviceURL: string = environment.TASK_MANAGER_SERVER_URL;

  constructor(private log: LogService, private http: HttpClient) {
    this.getAllTasksFromService().subscribe((tasks) => {
      this.tasks = tasks;
      this.log.info('[TaskManagerService.constructor] Data >> ', this.tasks);
    });
    this.today = new Date();
  }

  getAllTasks(): Task[] {
    this.log.info('[TaskManagerService.getAllTasks] Data >> ', this.tasks);
    return this.tasks;
  }

  addTask(task: Task): Observable<any> {
    this.log.info('[TaskManagerService.addTask] URL >> ', this.serviceURL + '/task/manager/addTask' + '  Task ', task);
    return this.http.post(this.serviceURL + '/task/manager/addTask', task, { observe: 'response' })
      .pipe(map(result => {
        const tempTask =  result.body as Task;
        tempTask.startDate  = tempTask.startDate != null ? new Date(tempTask.startDate) : tempTask.startDate;
        tempTask.endDate = tempTask.endDate != null ? new Date(tempTask.endDate) : tempTask.endDate;
        return result;
      }));
  }

  editTask(task: Task): Observable<any> {
    this.log.info('[TaskManagerService.editTask] URL >> ', this.serviceURL + '/task/manager/updateTask' + '  Task ', task);
    return this.http.put(this.serviceURL + '/task/manager/updateTask', task, { observe: 'response' }).pipe(map(result => {
      const tempTask =  result.body as Task;
      tempTask.startDate = tempTask.startDate != null ? new Date(tempTask.startDate) : tempTask.startDate;
      tempTask.endDate = tempTask.endDate != null ? new Date(tempTask.endDate) : tempTask.endDate;
      return result;
    }));
  }

  getAllTasksFromService(): Observable<any> {
    this.log.info('[TaskManagerService.getDataFromService] URL >> ', this.serviceURL + '/task/manager/getAllTasks');
    return this.http.get<Task[]>(this.serviceURL + '/task/manager/getAllTasks', { observe: 'response' })
      .pipe(map(result => {
        const tasks =  result.body as Task[];
        tasks.forEach(task => {
          task.startDate  = task.startDate != null ? new Date(task.startDate) : task.startDate;
          task.endDate = task.endDate != null ? new Date(task.endDate) : task.endDate;
          if (task.isTaskDone !== 'Y' && moment(task.endDate).isBefore(this.today, 'day')) {
            task.isTaskDone = 'Y';
          }
        });
        return result;
      }));
  }

  getTaskByIdFromService(id: string): Observable<any> {
    this.log.info('[TaskManagerService.getDataFromService] URL >> ', this.serviceURL + '/task/manager/getTaskById/' + id);
    return this.http.get<Task>(this.serviceURL + '/task/manager/getTaskById/' + id, { observe: 'response' })
      .pipe(map(result => {
        const task =  result.body as Task;
        task.startDate = task.startDate != null ? new Date(task.startDate) : task.startDate;
        task.endDate = task.endDate != null ? new Date(task.endDate) : task.endDate;
        return result;
      }));
  }

  getAllParentTasks(): Observable<any> {
    this.log.info('[TaskManagerService.getAllParentTasks] URL >> ', this.serviceURL + '/task/manager/getAllParentTasks');
    return this.http.get<ParentTask[]>(this.serviceURL + '/task/manager/getAllParentTasks', { observe: 'response' });
  }

  addParentTask(parentTask: ParentTask): Observable<any> {
    this.log.info('[TaskManagerService.addParentTask] URL >> ', this.serviceURL + '/task/manager/addParentTask' + 'ParentTask', parentTask);
    return this.http.post(this.serviceURL + '/task/manager/addParentTask', parentTask, { observe: 'response' });
  }

  searchTasksByProject(project: Project): Observable<any> {
    this.log.info('[TaskManagerService.getDataFromService] URL >> ',
                    this.serviceURL + '/task/manager/getTasksByProjectId/' + project.projectId);
    return this.http.get<Task[]>(this.serviceURL + '/task/manager/getTasksByProjectId/' + project.projectId, { observe: 'response' })
    .pipe(map(result => {
      const tasks =  result.body as Task[];
      tasks.forEach(task => {
        task.startDate  = task.startDate != null ? new Date(task.startDate) : task.startDate;
        task.endDate = task.endDate != null ? new Date(task.endDate) : task.endDate;
        if (task.isTaskDone !== 'Y' && moment(task.endDate).isBefore(this.today, 'day')) {
          task.isTaskDone = 'Y';
        }
      });
      return result;
    }));
  }
}
