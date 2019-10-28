import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private uri:string;
  public frase = 'one';
  users: any[] = [];

  constructor(private http: HttpClient, private router: Router) { 
    this.uri = 'http://localhost:3000';
  }

  ngOnInit() {
    console.log(this.frase);
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
    this.router.navigate(['professor']);
    /*this.http.post(`${this.uri}/login`, {email, pass})
      .subscribe((data: any) => {
        if (Number(data) >= 127) {
          this.router.navigate(['professor']);
        } else if (Number(data) >= 63) {
          this.router.navigate(['professor']);
        } else if (Number(data) >= 31) {
          this.router.navigate(['student']);
        } else if (Number(data) >= 1) {
          this.router.navigate(['student']);
        }
      }, (error: any) => {console.log(error);});*/
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