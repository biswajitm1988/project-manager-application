import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../model/project';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  @Input() project: Project;
  @Output() editProjectDetails = new EventEmitter<Project>();
  @Output() suspendProjectDetails = new EventEmitter<Project>();

  constructor() { }

  ngOnInit() {
    this.populateTaskDetailsInProject();
  }
  populateTaskDetailsInProject() {
    let numberOfTasks = 0;
    let numberOfCompleted = 0;
    if (!isNullOrUndefined(this.project.tasks)) {
      numberOfTasks = this.project.tasks.length;
      this.project.tasks.forEach((task) => {
        if (task.isTaskDone === 'Y') {
          numberOfCompleted++;
        }
      });
    }
    this.project.numberOfTasks = numberOfTasks;
    this.project.numberOfCompleted = numberOfCompleted;
  }

  editProject(project: Project) {
    this.editProjectDetails.emit(project);
  }
  suspendProject(project: Project) {
    this.suspendProjectDetails.emit(project);
  }

}
