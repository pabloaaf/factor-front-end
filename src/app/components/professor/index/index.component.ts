import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class ProfIndexComponent implements OnInit {
  private userInfo:any;
  uploadVideoForm: FormGroup;
  submitted = false;
  private url:SafeResourceUrl;


  constructor(private formBuilder: FormBuilder, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    let token = sessionStorage.getItem('token');
    this.userInfo = JSON.parse(atob(token.split('.')[1]));
    this.uploadVideoForm = this.formBuilder.group({
      course: ['', Validators.required],
      video: ['', Validators.required]
    });
  }

  get f() { return this.uploadVideoForm.controls; }

  public saveVideo(){
    this.submitted = true;

    // stop the process here if form is invalid
    if (this.uploadVideoForm.invalid) {
      return;
    }

    console.log('SUCCESS!!');
    console.log(this.uploadVideoForm.get('course').value);
  }

  public onSelectFile(event) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(<string>(<FileReader>event.target).result);
      }
    }
  }
}
