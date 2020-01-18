import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './globals/app-routing.module';
import { AppComponent } from './globals/app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfIndexComponent } from './components/professor/index/index.component';
import { StdIndexComponent } from './components/student/index/index.component';
import { LoginCallbackComponent } from './components/login/loginCallback/login-callback/login-callback.component';
import { AuthRedirectGuard } from './globals/auth-redirect.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCoursesComponent } from './components/mockData/add-courses/add-courses.component';
import { ShowVideoComponent } from './components/show-video/show-video.component';
import { EditVideoComponent } from './components/edit-video/edit-video.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfIndexComponent,
    StdIndexComponent,
    LoginCallbackComponent,
    AddCoursesComponent,
    ShowVideoComponent,
    EditVideoComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [AuthRedirectGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
