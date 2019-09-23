import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private uri:String;
  private frase:String;

  constructor(private http: HttpClient) { 
    uri = 'http://factorb/';
  	frase = this.http.get(uri);
  	console.log(frase);
  }

  ngOnInit() {
  }

}
