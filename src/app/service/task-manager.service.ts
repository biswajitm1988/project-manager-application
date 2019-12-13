import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LogService } from './log.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TaskManagerService {

  task: Task;
  tasks: Task[];
  serviceURL: string = environment.REMOTE_SERVICE_HOST + ':' + environment.REMOTE_SERVICE_PORT; ;

  constructor(private log: LogService, private http: HttpClient) {
    this.getAllTasksFromService().subscribe((tasks) => {
      this.tasks = tasks;
      this.log.info('[TaskManagerService.constructor] Data >> ', this.tasks);
    });
  }

  getAllTasks(): Task[] {
    this.log.info('[TaskManagerService.getAllTasks] Data >> ', this.tasks);
    return this.tasks;
  }

  addTask(task: Task): Observable<Task> {
    this.log.info('[TaskManagerService.addTask] URL >> ', this.serviceURL + '/task/manager/addTask' + '  Task ', task);
    return this.http.post(this.serviceURL + '/task/manager/addTask', task)
      .pipe(map(result => {
        const task =  result as Task;
        task.startDate = new Date(task.startDate);
        task.endDate = task.endDate != null ? new Date(task.endDate) : task.endDate;
        return task;
      }));
  }

  editTask(task: Task): Observable<Task> {
    this.log.info('[TaskManagerService.editTask] URL >> ', this.serviceURL + '/task/manager/updateTask' + '  Task ', task);
    return this.http.put(this.serviceURL + '/task/manager/updateTask', task).pipe(map(result => {
      const task =  result as Task;
      task.startDate = new Date(task.startDate);
      task.endDate = task.endDate != null ? new Date(task.endDate) : task.endDate;
      return task;
    }));
  }

  getAllTasksFromService(): Observable<Task[]> {
    this.log.info('[TaskManagerService.getDataFromService] URL >> ', this.serviceURL + '/task/manager/getAllTasks');
    return this.http.get<Task[]>(this.serviceURL + '/task/manager/getAllTasks')
      .pipe(map(result => {
        const tasks =  result as Task[];
        tasks.forEach(task => {
          task.startDate = new Date(task.startDate);
          task.endDate = task.endDate != null ? new Date(task.endDate) : task.endDate;
        });
        return tasks;
      }));
  }

  getTaskByIdFromService(id: string): Observable<Task> {
    this.log.info('[TaskManagerService.getDataFromService] URL >> ', this.serviceURL + '/task/manager/getTaskById/' + id);
    return this.http.get<Task>(this.serviceURL + '/task/manager/getTaskById/' + id)
      .pipe(map(result => {
        const task =  result as Task;
        task.startDate = new Date(task.startDate);
        task.endDate = task.endDate != null ? new Date(task.endDate) : task.endDate;
        return task;
      }));
  }
}
