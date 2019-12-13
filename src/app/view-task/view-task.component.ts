import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../model/task';
import { FilterPipe } from '../pipe/filter.pipe';
import { Router } from '@angular/router';
import { TaskManagerService } from '../service/task-manager.service';
import { LogService } from '../service/log.service';
import { ParentTask } from '../model/parent-task';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],
  providers: [FilterPipe]
})
export class ViewTaskComponent implements OnInit {
  searchTask: Task = new Task();
  task: Task;
  errMsg: string;
  tasks: Task[];
  constructor(private log: LogService, private taskManagerService: TaskManagerService, private router: Router) {
  }
  ngOnInit() {
    this.task = new Task();
    this.task.parentTask = new ParentTask();
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskManagerService.getAllTasksFromService().subscribe((tasks) => {
      this.tasks = tasks;
      this.log.info('[ViewTaskComponent.getAllTasks] View On Init. Tasks', this.tasks);
    });
  }
}
