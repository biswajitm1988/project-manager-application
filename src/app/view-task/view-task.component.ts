import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../model/task';
import { FilterPipe } from '../pipe/filter.pipe';
import { Router } from '@angular/router';
import { TaskManagerService } from '../service/task-manager.service';
import { LogService } from '../service/log.service';
import { ParentTask } from '../model/parent-task';
import { ProjectModalComponent } from '../project-modal/project-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from '../model/project';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
  providers: [FilterPipe]
})
export class ViewTaskComponent implements OnInit {
  searchTask: Task = new Task();
  task: Task;
  errMsg: string;
  tasks: Task[];
  constructor(private log: LogService,
              private taskManagerService: TaskManagerService, private router: Router,
              private modalService: NgbModal) {
  }
  ngOnInit() {
    this.task = new Task();
    this.task.parentTask = new ParentTask();
    this.task.project = new Project();
    this.searchTask.project = new Project();
    this.getAllTasks();
  }

  openTaskProjectModal() {
    this.modalService.open(ProjectModalComponent, { size: 'lg', scrollable: true }).result.then((res) => {
      this.searchTask.project = res;
      this.searchTasksByProject();
    }, (reason) => {
    });
  }

  searchTasksByProject() {
    this.taskManagerService.searchTasksByProject(this.searchTask.project).subscribe((result) => {
      this.tasks = result.body as Task[];
      this.log.info('[ViewTaskComponent.searchTasksByProject] . Tasks', this.tasks);
    });
  }

  getAllTasks() {
    this.taskManagerService.getAllTasksFromService().subscribe((result) => {
      this.tasks = result.body as Task[];
      this.log.info('[ViewTaskComponent.getAllTasks] View On Init. Tasks', this.tasks);
    });
  }
  sortTasks(prop: any) {
    const sortedTasks = this.tasks.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
    return sortedTasks;
  }
}
