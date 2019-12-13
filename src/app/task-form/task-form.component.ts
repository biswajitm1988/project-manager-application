import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Task } from '../model/task';
import { TaskManagerService } from '../service/task-manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ParentTask } from '../model/parent-task';
import { LogService } from '../service/log.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  isNew: boolean;
  task: Task;
  errMsg: string;
  minStartDate: Date = new Date();
  @Output() taskAdded = new EventEmitter<any>();

  constructor(private log: LogService,
              private taskManagerService: TaskManagerService,
              private router: Router, private route: ActivatedRoute,
              private location: Location) {

  }

  ngOnInit() {
    this.initializeTask();
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== '' && id != null) {
      this.isNew = false;
      this.log.info('[TaskFormComponent.ngOnInit] Id >> ', id);
      this.taskManagerService.getTaskByIdFromService(id).subscribe(task => {
        this.task = task;
        this.log.info('[TaskFormComponent.ngOnInit] Data fetched >> ', this.task);
        this.initializeTask();
      });
    }
  }

  initializeTask() {
    if (this.task == null) {
      this.task = new Task();
      this.task.parentTask = new ParentTask();
      this.isNew = true;
    }
  }

  saveTask() {
    this.log.info('[TaskFormComponent.saveTask] Save >> ', this.task, this.isNew);
    if (this.isNew) {
      this.taskManagerService.addTask(this.task).subscribe(() => {
        this.router.navigate(['/viewTasks']);
        this.taskAdded.emit();
      });
    } else {
      this.taskManagerService.editTask(this.task).subscribe(() => {
        this.router.navigate(['/viewTasks']);
        this.taskAdded.emit();
      });
    }
  }

  /* navigateToViewComponent(task: any) {
    this.task = task;
    this.taskManagerService.getAllTasksFromService().subscribe(tasks => {
      this.taskManagerService.tasks = tasks;
      this.router.navigate(['/viewTasks']);
    });
  } */
}
