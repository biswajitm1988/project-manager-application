import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import {MatNativeDateModule} from '@angular/material/core';
import {DateMaterialModule} from './material-module';
import {MatSliderModule} from '@angular/material/slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { FilterPipe } from './pipe/filter.pipe';
import { TaskManagerService } from './service/task-manager.service';
import { LogService } from './service/log.service';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { UserSearchPipe } from './pipe/user-search.pipe';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { FormatUserNamePipe } from './pipe/format-user-name.pipe';
import { UserListModalComponent } from './user-list-modal/user-list-modal.component';
import { UserManagerService } from './service/user-manager.service';
import { ProjectManagerService } from './service/project-manager.service';
import { ProjectSearchPipe } from './pipe/project-search.pipe';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { ParentTaskModalComponent } from './parent-task-modal/parent-task-modal.component';

const pathMappings: Routes = [
  {path: '', component: AddUserComponent },
  { path: 'addTask', component: TaskFormComponent },
  { path: 'updateTask', component: TaskFormComponent },
  { path: 'viewTasks', component: ViewTaskComponent },
  { path: 'addUser', component: AddUserComponent },
  { path: 'addProject', component: AddProjectComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ViewTaskComponent,
    HeaderComponent,
    FooterComponent,
    TaskFormComponent,
    FilterPipe,
    TaskDetailComponent,
    AddUserComponent,
    AddProjectComponent,
    UserDetailsComponent,
    ProjectDetailsComponent,
    UserSearchPipe,
    ConfirmModalComponent,
    FormatUserNamePipe,
    UserListModalComponent,
    ProjectSearchPipe,
    ProjectModalComponent,
    ParentTaskModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot(pathMappings),
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    DateMaterialModule,
    MatSliderModule,
    HttpClientModule
  ],
  providers: [TaskManagerService, LogService, NgbActiveModal, UserManagerService, ProjectManagerService],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmModalComponent, UserListModalComponent, ProjectModalComponent, ParentTaskModalComponent]
})
export class AppModule { }
