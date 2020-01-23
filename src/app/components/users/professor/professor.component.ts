import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { pipe } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfIndexComponent implements OnInit {
  userInfo:any;
  coursesInfo:any;
  private uri:string;
  uploadVideoForm: FormGroup;
  submitted = false;
  progress = 0;
  file: File | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.file = file;
  }

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private host: ElementRef<HTMLInputElement>) {
    this.uri = 'http://192.168.1.125:3000'; //localhost
  }

  ngOnInit() {
    let token = sessionStorage.getItem('token');
    this.userInfo = JSON.parse(atob(token.split('.')[1]));
    this.uploadVideoForm = this.formBuilder.group({
      course: ['', Validators.required],
      video: ['', [Validators.required, this.requiredFileType('mp4')]]
    });
    this.getUserInfo();
  }

  public requiredFileType(type:string) {
    return function (control: FormControl) {
      let file = control.value;
      if (file) {
          let extension = file.split('.')[1].toLowerCase();
        if (type.toLowerCase() !== extension.toLowerCase()) {
          return {
            requiredFileType: true
          };
        }
        return null;
      }
    }
  }

  get f() { return this.uploadVideoForm.controls; }

  public saveVideo() {
      this.submitted = true;

      // stop the process here if form is invalid
      if (this.uploadVideoForm.invalid) {
        return;
      }
      //console.log(this.file);
      //console.log('SUCCESS!!');
      //console.log(this.uploadVideoForm.get('course').value);
      this.http.post(`${this.uri}/videos`, this.toFormData(this.uploadVideoForm.value),
          {reportProgress: true, observe: 'events'}
      ).pipe(
          this.uploadProgress(progress => (this.progress = progress)),
          this.toResponseBody()
      ).subscribe((data: any) => {
          this.progress = 0;
          //this.uploadVideoForm.reset();
          this.coursesInfo = data;
          console.log(this.coursesInfo);
          // do something with the response
      }, (error: any) => {
          console.log(error);
      });
  }

  public toFormData<T>( formValue: T ) {
    const formData = new FormData();

    for ( const key of Object.keys(formValue) ) {
      const value = formValue[key];
      formData.append(key, value);
    }
    formData.append('video', this.file, this.file.name);
    return formData;
  }

  public toResponseBody<T>() {
      return pipe(
          filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
          map((res: HttpResponse<T>) => res.body)
      );
  }

  public uploadProgress<T>( cb: ( progress: number ) => void ) {
    return tap(( event: HttpEvent<T> ) => {
      if ( event.type === HttpEventType.UploadProgress ) {
        cb(Math.round((100 * event.loaded) / event.total));
      }
    });
  }

  getUserInfo(){
    this.http.get(`${this.uri}/users/` + this.userInfo._id).subscribe((data: any) => {
      this.userInfo = data;
      console.log(this.userInfo);
      this.getCoursesInfo();
    }, (error: any) => {console.log(error);});
  }

  getCoursesInfo(){
    this.http.post(`${this.uri}/courses/id`,{id:this.userInfo.courses}).subscribe((data: any) => {
      this.coursesInfo = data;
      console.log(this.coursesInfo);
    }, (error: any) => {console.log(error);});
  }
}
