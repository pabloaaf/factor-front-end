import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HTTPService } from '../../../services/http.service';
import {User} from "../../../globals/globals.component";

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.css']
})
export class LoginCallbackComponent implements OnInit {
  private uri:string;

  constructor(private _httpService: HTTPService, private route: ActivatedRoute, private router: Router) {
    this.uri = 'http://192.168.1.125:3000'; //localhost
  }

  ngOnInit() {
    let password = sessionStorage.getItem('pass');
    sessionStorage.removeItem('pass');
    console.log(this.route.snapshot.params.code);
    //this.route.snapshot.params.code
    //this.route.queryParamMap.subscribe((p: any) => {
      // console.log(p.params);
    this._httpService.callback(this.route.snapshot.params.code, password).subscribe((data: User) => { // p.params.code
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
    //});
  }
}
