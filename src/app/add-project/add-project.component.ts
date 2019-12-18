import { Component, OnInit } from '@angular/core';
import { Messages } from '../const/messages';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LogService } from '../service/log.service';
import { Project } from '../model/project';
import { ProjectManagerService } from '../service/project-manager.service';
import { Subscription, Observable, timer } from 'rxjs';
import { UserListModalComponent } from '../user-list-modal/user-list-modal.component';
import { User } from '../model/user';
import { ProjectSearchPipe } from '../pipe/project-search.pipe';
import { isUndefined } from 'util';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers: [ProjectSearchPipe]
})
export class AddProjectComponent implements OnInit {
  project: Project;
  projects: Project[];
  minStartDate = new Date();
  showModal: boolean;
  isNew: boolean;
  searchText: string;
  message: string;
  showMessage: boolean;
  messages = new Messages();
  private subscription: Subscription;
  private timer: Observable<any>;
  isError: boolean;
  toggleDates: boolean;

  constructor(private log: LogService,
              private modalService: NgbModal,
              private router: Router,
              private projectManagerService: ProjectManagerService) {
  }

  ngOnInit() {
    this.toggleDates = true;
    this.isNew = true;
    this.project = new Project();
    this.project.user = new User();
    this.getAllProjects();
  }

  openUserModal() {
    this.modalService.open(UserListModalComponent, { size: 'lg', scrollable: true }).result.then((res) => {
      this.project.user = res;
    }, (reason) => {
    });
  }

  saveProject() {
    this.log.info('[AddProjectComponent.saveProject] Save >> ', this.project, this.isNew);
    if (this.toggleDates) {
      this.project.startDate = null;
      this.project.endDate = null;
    } else if ((isUndefined(this.project.endDate) || !this.project.endDate)
      && (!this.project.startDate && !isUndefined(this.project.startDate))) {
      const endDate = new Date();
      endDate.setDate(this.project.startDate.getDate() + 1);
      this.project.endDate = endDate;
    }
    if (this.isNew) {
      this.projectManagerService.addProject(this.project).subscribe((res) => {
        if (res.status === 201) {
          console.log(res);
          this.showAlertMessage(this.messages.addProjectsuccessMessgae, false);
          this.getAllProjects();
        }
      }
        , (err) => {
          this.showAlertMessage(this.messages.errorMessage, true);
        });
    } else {
      this.projectManagerService.updateProject(this.project).subscribe((res) => {
        if (res.status === 201) {
          console.log(res);
          this.showAlertMessage(this.messages.editProjectsuccessMessgae, false);
          this.getAllProjects();
        }
      }
        , (err) => {
          this.showAlertMessage(this.messages.errorMessage, true);
        });
    }
    this.project = new Project();
    this.isNew = true;
    this.toggleDates = true;
  }

  setEditProject(project: Project) {
    this.isNew = false;
    if (project.startDate !== null) {
      this.toggleDates = false;
      project.startDate = new Date(project.startDate);
    }
    if (project.endDate !== null) {
      project.endDate = new Date(project.endDate);
    }
    this.project = project;
  }

  getAllProjects() {
    this.projectManagerService.getAllProjectsFromService().subscribe((projects) => {
      this.projects = projects;
      this.log.info('[AddProjectComponent.getAllProjects] View On Init. Projects', this.projects);
    });
  }

  public showAlertMessage(message: string, isError: boolean) {
    this.showMessage = true;
    this.message = message;
    this.isError = isError;
    this.timer = timer(10000);
    this.subscription = this.timer.subscribe(() => {
      this.showMessage = false;
    });
  }

  sortProjects(prop: string) {
    const sortedProjects = this.projects.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
    return sortedProjects;
  }

  suspendProject(project: Project) {
    project.endDate = new Date();
    project.isProjectDone = 'Y';
    this.projectManagerService.updateProject(project).subscribe((res) => {
      if (res.status === 201) {
        console.log(res);
        this.showAlertMessage(this.messages.editProjectsuccessMessgae, false);
        this.getAllProjects();
      }
    }
      , (err) => {
        this.showAlertMessage(this.messages.errorMessage, true);
      });
    this.project = new Project();
    this.isNew = true;
  }

}
