import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { ProfIndexComponent } from '../components/professor/index/index.component';
import { StdIndexComponent } from '../components/student/index/index.component';
import { LoginCallbackComponent } from '../components/login/loginCallback/login-callback/login-callback.component';

const routes: Routes = [
	{path: '', component: LoginComponent},
	{path: 'callback', component: LoginCallbackComponent},
	{path: 'professor', redirectTo: 'prof/index', pathMatch: 'full'},
	{path: 'prof/index', component: ProfIndexComponent},
	{path: 'student', redirectTo: 'std/index', pathMatch: 'full'},
	{path: 'std/index', component: StdIndexComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
