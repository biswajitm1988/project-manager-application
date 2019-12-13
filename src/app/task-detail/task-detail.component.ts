import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { Task } from '../model/task';
import { Router } from '@angular/router';
import { TaskManagerService } from '../service/task-manager.service';
import { LogService } from '../service/log.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  @Input() task: Task;
  today: Date;
  tasks: Task[];
  @Output() taskUpdated = new EventEmitter<any>();

  constructor(private log: LogService, private taskManagerService: TaskManagerService, private router: Router) {
  }

  ngOnInit() {
    this.today = new Date();
  }

  isTaskEditable(task): boolean {
    if (task.isTaskDone === 'Y') {
      return false;
    }
    if (moment(task.startDate).isBefore(this.today, 'day')
              && (task.endDate !== 'undefined' && task.endDate != null && moment(task.endDate).isSameOrBefore(this.today, 'day'))) {
      return false;
    } else if (moment(task.startDate).isSameOrAfter(this.today, 'day')
              || (task.endDate == null || moment(task.endDate).isAfter(this.today, 'day'))) {
      return true;
    }
    return false;
  }

  isTaskEligibleToEnd(task): boolean {
    if (task.isTaskDone === 'Y') {
      return false;
    }
    if (moment(task.startDate).isBefore(this.today, 'day')
            && (task.endDate !== 'undefined' && task.endDate != null && moment(task.endDate).isBefore(this.today, 'day'))) {
      return false;
    } else if (moment(task.startDate).isAfter(this.today, 'day')
              && (task.endDate == null || moment(task.endDate).isAfter(this.today, 'day'))) {
      return false;
    }
    return true;
  }

  editTask(task: Task) {
    this.log.info('[ViewTaskComponent.editTask] Sending Data ' + task);
    this.router.navigate(['/addTask', task.taskId]);
  }

  endTask(task: Task) {
    task.endDate = this.today;
    task.isTaskDone = 'Y';
    this.log.info('[ViewTaskComponent.endTask] Sending Data ', task);
    this.taskManagerService.editTask(task).subscribe(() => {
      this.taskUpdated.emit();
    });
  }

}
