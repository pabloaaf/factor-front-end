import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './views/index/login/login.component';
import { LoginCallbackComponent } from './views/index/login-callback/login-callback.component';
import { MockDataComponent } from './views/user/mock-data/mock-data.component';
import { ProfessorComponent } from './views/user/professor/professor.component';
import { StudentComponent } from './views/user/student/student.component';
import { EditVideoComponent } from './views/video/edit-video/edit-video.component';
import { ShowVideoComponent } from './views/video/show-video/show-video.component';
import { AuthGuard } from './globals/helpers/auth.guard';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'callback', component: LoginCallbackComponent},
  {path: 'professor', redirectTo: 'prof/index', pathMatch: 'full'},
  {path: 'prof/index', canActivate: [AuthGuard], component: ProfessorComponent, data: {roles: [63]}},
  {path: 'prof/show/:id', canActivate: [AuthGuard], component: ShowVideoComponent, data: {roles: [63]}},
  {path: 'prof/video/edit/:id', canActivate: [AuthGuard], component: EditVideoComponent, data: {roles: [63]}},
  {path: 'student', redirectTo: 'std/index', pathMatch: 'full'},
  {path: 'std/index', canActivate: [AuthGuard], component: StudentComponent, data: {roles: [1]}},
  {path: 'std/show/:id', canActivate: [AuthGuard], component: ShowVideoComponent, data: {roles: [1]}},
  {path: 'mockcourses', canActivate: [AuthGuard], component: MockDataComponent, data: {roles: [127]}},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
