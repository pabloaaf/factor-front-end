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
    this.pass = sessionStorage.getItem('pass');
    sessionStorage.removeItem('pass');
    // console.log(this.pass);
    this.route.queryParamMap.subscribe((p: any) => {
      // console.log(p.params);
      this.http.post(`${this.uri}/callback`, { code: p.params.code, pass: this.pass }).subscribe((token: any) => {
        sessionStorage.setItem('token', data.token); //JSON.parse(atob(data.token.split('.')[1]))
        
        let auth = Number(data.authlvl);
        if (auth >= 127) {
          this.router.navigate(['professor']);
        } else if (auth >= 63) {
          this.router.navigate(['professor']);
        } else if (auth >= 31) {
          this.router.navigate(['student']);
        } else if (auth >= 1) {
          this.router.navigate(['student']);
        }
        
      }, (error: any) => {console.log(error);});
    });
  }
}
