import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.css']
})
export class LoginCallbackComponent implements OnInit {
  //private email:string;
  private pass:string;

  private uri:string;

  constructor(private http: HttpClient, private route: ActivatedRoute) { 
    this.uri = 'http://192.168.1.125:3000'; //localhost
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((p: any) => {
      console.log(p.params);
      this.http.post(`${this.uri}/callback`, { code: p.params.code }).subscribe((data: any) => {
        console.log(data);
      }, (error: any) => {console.log(error);});
    });
    this.pass = sessionStorage.getItem('pass');
    //sessionStorage.removeItem('email');
    sessionStorage.removeItem('pass');
    console.log(this.pass);
  }
}
