import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private uri:string;
  public frase = 'one';
  users: any[] = [];

  constructor(private http: HttpClient) { 
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
    this.http.post(`${this.uri}/users`, {email})
      .subscribe((data: any) => {
        this.getAllUsers();
      }, (error: any) => {console.log(error);});
  }
}