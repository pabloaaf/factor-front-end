import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {
  form: FormGroup;
  form2: FormGroup;
  users: any[];
  courses: any[];
  private uri:string;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.uri = 'http://192.168.1.125:3000'; //localhost
    this.users = [];
    console.log(this.users);
    this.getAllUsers();
    console.log(this.users);
    this.getAllCourses();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      cname: ['', Validators.required],
      cnumber: ['', Validators.required],
      profID: ['', Validators.required]
    });
    this.form2 = this.formBuilder.group({
      user: ['', Validators.required],
      course: ['', Validators.required]
    });
  }

  addCourse(cname, cnumber, profID){
    // just mock proposes, omitted error verification
    if (this.form.invalid) {
      return;
    }
    this.http.post(`${this.uri}/courses`, {name:cname,number:Number(cnumber),professor:Number(profID)}).subscribe((data: any) => {
      let message = data.message;
      console.log(message);
      this.addCourseToUser(Number(profID), data.token._id);
      this.getAllCourses();
    }, (error: any) => {console.log(error);});
  }

  addCourseToUser(user, course){
    // just mock proposes, omitted error verification
    if (this.form2.invalid) {
      return;
    }
    this.http.post(`${this.uri}/users`, {user:user, course:course}).subscribe((data: any) => {
      let message = data.message;
      console.log(message);
      this.getAllUsers();
    }, (error: any) => {console.log(error);});

  }

  // Get all users from the API
  getAllUsers() {
    this.http.get(`${this.uri}/users`).subscribe((users : any[] )=> {
      console.log(users);
      this.users = users;
    }, (error: any) => {console.log(error);});
  }

  // Get all users from the API
  getAllCourses() {
    this.http.get(`${this.uri}/courses`).subscribe((courses : any[] )=> {
      console.log(courses);
      this.courses = courses;
    }, (error: any) => {console.log(error);});
  }
}
