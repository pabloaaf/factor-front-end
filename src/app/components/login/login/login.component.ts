import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalsComponent } from '../../../globals/globals.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private uri:string;
  loginForm: FormGroup;
  submitted = false;
  languages = [];

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder, @Inject(LOCALE_ID) public localeId: string) {
      this.uri = 'http://192.168.1.125:3000';
      for (let i = 0; i < GlobalsComponent.languages.length; i++) {
          this.languages[i] = GlobalsComponent.languages[i];
      }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], //pattern('')
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  get f() { return this.loginForm.controls; }

  verifyUser() {
      this.submitted = true;

      // stop the process here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      console.log('SUCCESS!!');
    //email = "palvarezfernandez@hawk.iit.edu";
    //pass = "pablo";
    this.http.post(`${this.uri}/login`, {email:this.loginForm.get('email').value, pass:this.loginForm.get('password').value}).subscribe((data: any) => {
        //console.log(data);
        let auth = Number(data.authlvl);
        if(auth > 0) {
          sessionStorage.setItem('token', data.token); //JSON.parse(atob(data.token.split('.')[1]))
        }
        if (auth >= 127) {
          this.router.navigate(['professor']);
        } else if (auth >= 63) {
          this.router.navigate(['professor']);
        } else if (auth >= 31) {
          this.router.navigate(['student']);
        } else if (auth >= 1) {
          this.router.navigate(['student']);
        } else if (auth >= 0) {
          this.getOauth().subscribe((url:string)=> {
            //console.log(url);
            sessionStorage.setItem('pass',this.loginForm.get('password').value);
            window.location.replace(url);
            //this.router.navigate(['AuthRedirectGuard'],{ queryParams: { nurl:url } });
          }, (error: any) => {console.log(error);});
        } else if (auth <= -1) {
          // show error contraseña mal introducida
          console.log('review pass show alert');
        }
      }, (error: any) => {console.log(error);});
  }

  // Get oauth url from the API
  getOauth(): Observable<any> {
    return this.http.get(`${this.uri}/oauth`);
  }

  // Ask the API to change the password
  forgotPasswordForm() {
    // create new page
    this.router.navigate(['student']);
    /*this.http.post(`${this.uri}/users`, {email})
      .subscribe((data: any) => {
        this.getAllUsers();
      }, (error: any) => {console.log(error);});*/
  }

  logout() {
    sessionStorage.removeItem('token');
  }

  langChange(lang) {
      console.log(this.router.url);
     window.location.replace(this.router.url + lang);
  }
}