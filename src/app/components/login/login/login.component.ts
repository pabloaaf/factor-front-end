import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HTTPService } from '../../../services/http.service';
import {GlobalsComponent, User} from "../../../globals/globals.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  languages = [];

  constructor(private _httpService: HTTPService, private router: Router, private formBuilder: FormBuilder, @Inject(LOCALE_ID) public localeId: string) {
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
      this._httpService.login(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe((data: User) => {
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
              this._httpService.getOauth().subscribe((url:string)=> {
                sessionStorage.setItem('pass',this.loginForm.get('password').value);
                window.location.replace(url);
              }, (error: any) => {console.log(error);});
          } else if (auth <= -1) {
              // show error contraseña mal introducida
              console.log('review pass show alert');
          }
      }, (error: any) => {console.log(error);});
  }

  // Ask the API to change the password
  forgotPasswordForm() {
    // create new page
    // this.router.navigate(['student']);
    /*this.http.post(`${this.uri}/users`, {email})
      .subscribe((data: any) => {
        this.getAllUsers();
      }, (error: any) => {console.log(error);});*/
  }
}