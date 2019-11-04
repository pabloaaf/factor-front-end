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
    this.uri = 'http://localhost:3000';
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
    this.http.post(`${this.uri}/login`, {email, pass})
      .subscribe((data: any) => {
        if (Number(data) >= 127) {
          this.router.navigate(['professor']);
        } else if (Number(data) >= 63) {
          this.router.navigate(['professor']);
        } else if (Number(data) >= 31) {
          this.router.navigate(['student']);
        } else if (Number(data) >= 1) {
          this.router.navigate(['student']);
        } else if (Number(data) <= 0) {
          this.getOauth().subscribe((url:string)=> {
            console.log(url);
            this.oauth = url;
            this.router.navigate([this.oauth]);
          }, (error: any) => {console.log(error);});
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