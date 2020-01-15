import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class ProfIndexComponent implements OnInit {
  private userInfo:any;
  constructor() { }

  ngOnInit() {
    let token = sessionStorage.getItem('token');
    this.userInfo = JSON.parse(atob(token.split('.')[1]));
  }

}
