import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './globals/app-routing.module';
import { AppComponent } from './globals/app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material';
import { ProfIndexComponent } from './components/professor/index/index.component';
import { StdIndexComponent } from './components/student/index/index.component';
import { LoginCallbackComponent } from './components/login/loginCallback/login-callback/login-callback.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfIndexComponent,
    StdIndexComponent,
    LoginCallbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
