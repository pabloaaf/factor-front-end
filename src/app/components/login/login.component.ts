import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private uri:string;
  private oauth:string;
  users: any[] = [];

  constructor(private http: HttpClient, private router: Router) { 
    this.uri = 'http://192.168.1.125:3000'; //localhost
  }

  ngOnInit() {
    this.getAllUsers();
  }

  // Add one user to the API
  addUser(email, pass) {
    this.http.post(`${this.uri}/users`, {email, pass})
      .subscribe((data: any) => {
        this.getAllUsers();
      }, (error: any) => {console.log(error);});
  }

  verifyUser(email, pass) {
    //this.router.navigate(['professor']);
    email = "palvarezfernandez@hawk.iit.edu";
    pass = "pablo";
    this.http.post(`${this.uri}/login`, {email, pass}).subscribe((data: any) => {
        console.log(data);
        var auth = Number(data.authlvl);
        if (auth >= 127) {
          this.router.navigate(['professor']);
        } else if (auth >= 63) {
          this.router.navigate(['professor']);
        } else if (auth >= 31) {
          this.router.navigate(['student']);
        } else if (auth >= 1) {
          this.router.navigate(['student']);
        } else if (auth >= 0) {
          //this.router.navigate(['AuthRedirectGuard'],{ queryParams: { nurl:url } });
          this.getOauth().subscribe((url:string)=> {
            console.log(url);
            //sessionStorage.setItem(email,'email');
            sessionStorage.setItem('pass',pass);
            window.location.replace(url);
            //this.oauth = url;
            //window.open(url, '_self'); //  
            //this.router.navigate(['googleauth'],{queryParams:{nurl:url}});
            //window.location.href = url; // toDo change to external router guard
          }, (error: any) => {console.log(error);});
        } else if (auth <= -1) {
          // show error contraseña mal introducida
        }
      }, (error: any) => {console.log(error);});
  }

  // Get oauth url from the API
  getOauth(): Observable<any> {
    return this.http.get(`${this.uri}/oauth`);
  }

  // Get all users from the API
  getAllUsers() {
    this.http.get(`${this.uri}/users`)
      .subscribe((users : any )=> {
        console.log(users);
        this.users = users;
      }, (error: any) => {console.log(error);});
  }

  // Ask the API to change the password
  forgotPasswordForm(email) {
    this.router.navigate(['student']);
    /*this.http.post(`${this.uri}/users`, {email})
      .subscribe((data: any) => {
        this.getAllUsers();
      }, (error: any) => {console.log(error);});*/
  }
}