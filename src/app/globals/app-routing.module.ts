import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { ProfIndexComponent } from '../components/professor/index/index.component';
import { StdIndexComponent } from '../components/student/index/index.component';
import { LoginCallbackComponent } from '../components/login/loginCallback/login-callback/login-callback.component';
import { AuthRedirectGuard } from './auth-redirect.guard';
import { AddCoursesComponent } from '../components/mockData/add-courses/add-courses.component';
import { ShowVideoComponent } from '../components/show-video/show-video.component';
import { EditVideoComponent } from '../components/edit-video/edit-video.component';

const routes: Routes = [
	{path: '', component: LoginComponent},
	{path: 'callback', component: LoginCallbackComponent},
	{path: 'professor', redirectTo: 'prof/index', pathMatch: 'full'},
	{path: 'prof/index', component: ProfIndexComponent},
	{path: 'prof/show/:id', component: ShowVideoComponent},
	{path: 'prof/video/edit/:id', component: EditVideoComponent},
	{path: 'student', redirectTo: 'std/index', pathMatch: 'full'},
	{path: 'std/index', component: StdIndexComponent},
	{path: 'std/show/:id', component: ShowVideoComponent},
	{path: 'mockcourses', component: AddCoursesComponent},
	{path: 'googleauth', canActivate: [AuthRedirectGuard], component: StdIndexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
