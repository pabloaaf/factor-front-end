import {Component} from '@angular/core';

@Component({
  selector: 'app-globals',
  template: ''
})

export class GlobalsComponent {
  static version = 'v1/';
  static api = 'https://192.168.1.125/';
  static staticsURL = 'assets/';
}

export class User {
  _id: number;
  email: string;
  family_name: string;
  given_name: string;
  locale: string;
  picture: string;
  verified_email: boolean;
  coursesID: string[];
  courses: Course[];
  authlvl:number;


  constructor() {
    this._id = 0;
    this.courses = [];
  }
}

export class Course {
  _id: string;
  name: string;
  number: number;
  professorID: string;
  professor: User;

  constructor() {
    this.professor = new User();
  }
}

export class Video {
  _id: string;
  name: string;
  url: string;
  duration: string;
  class: number;
  thumbnail: string;
  courseID: string;
  course: Course;

  constructor() {
    this.course = new Course();
  }
}
