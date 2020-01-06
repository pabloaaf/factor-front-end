import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.css']
})
export class LoginCallbackComponent implements OnInit {
  private email:string;
  private pass:string;

  private uri:string;

  constructor(private http: HttpClient, private route: ActivatedRoute) { 
    this.uri = 'http://192.168.1.125:3000'; //localhost
  	this.email = sessionStorage.getItem('email');
  	this.pass = sessionStorage.getItem('pass');
    console.log(this.email);
    /*this.http.post(`${this.uri}/callback`, {this.route.snapshot.params.code})
      .subscribe((data: any) => {
        this.getAllUsers();
      }, (error: any) => {console.log(error);});*/
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params);
    });

  }

}
