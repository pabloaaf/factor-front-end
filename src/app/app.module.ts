import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './globals/app-routing.module';
import { AppComponent } from './globals/app.component';
import { LoginComponent } from './components/login/login/login.component';
import { ProfIndexComponent } from './components/users/professor/professor.component';
import { StdIndexComponent } from './components/users/student/student.component';
import { LoginCallbackComponent } from './components/login/login-callback/login-callback.component';
import { AuthRedirectGuard } from './globals/auth-redirect.guard';
import { AddCoursesComponent } from './components/mockData/add-courses/add-courses.component';
import { ShowVideoComponent } from './components/video/show-video/show-video.component';
import { EditVideoComponent } from './components/video/edit-video/edit-video.component';
import { HeaderComponent } from './components/navbar/header/header.component';
import { FooterComponent } from './components/navbar/footer/footer.component';
import { GlobalsComponent } from './globals/globals.component';
import { VideoPhrasePipe } from './globals/video-phrase.pipe';

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
    FooterComponent,
    GlobalsComponent,
    VideoPhrasePipe
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
