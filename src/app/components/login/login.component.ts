import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private uri:string;
  public frase:string;

  constructor(private http: HttpClient) { 
    this.uri = 'http://factorb/';
  	this.http.get(this.uri).subscribe(exp => {
          this.frase = <string>exp;
	}, err => console.log('Fallo en la peticion del sistema'));
  	console.log(this.frase);
  }

  ngOnInit() {
    console.log(this.frase);
  }

}
