import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  forgotPasswordForm: any;

  constructor(private form: FormBuilder,private http: HttpClient,private dataservice: DataService) { }

  ngOnInit() {
    this.forgotPasswordForm = this.form.group({
      userNAme: ['', Validators.required,Validators.email],
    });
  }
  onSubmit() {
    if (this.forgotPasswordForm.valid) {
    console.log(this.forgotPasswordForm.value);
    this.dataservice.postForgotForm(this.forgotPasswordForm.get('userNAme').value).subscribe (
      result => console.log('success', result),
      error => console.log('error', error)
    );
    } else {
      this.validateAllFormFields(this.forgotPasswordForm); //{7}
    }
  }
  validateAllFormFields(formGroup: FormGroup) {         //{1}
  Object.keys(formGroup.controls).forEach(field => {  //{2}
    const control = formGroup.get(field);             //{3}
    if (control instanceof FormControl) {             //{4}
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {        //{5}
      this.validateAllFormFields(control);            //{6}
    }
  });
  }
  isFieldValid(field: string) {
    return !this.forgotPasswordForm.get(field).valid && (this.forgotPasswordForm.get(field).touched);
  }
  displayFieldCss(field: string) {
    return {  
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

}
