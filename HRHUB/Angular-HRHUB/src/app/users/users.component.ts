import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { User } from '../data/user';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Blood {
  value: string;
  viewValue: string;
}
export interface Marital {
  value: string;
  viewValue: string;
}
export interface Gender {
  value: string;
  viewValue: string;
}
export interface Department {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

  bloods: Blood[] = [
    {value: 'A+ve', viewValue: 'A+ve'},
    {value: 'A-ve', viewValue: 'A-ve'},
    {value: 'B+ve', viewValue: 'B+ve'},
    {value: 'B-ve', viewValue: 'B-ve'},
    {value: 'O+ve', viewValue: 'O+ve'},
    {value: 'O-ve', viewValue: 'O-ve'},
    {value: 'AB+ve', viewValue: 'AB+ve'},
    {value: 'AB-ve', viewValue: 'AB-ve'},
  ];

  marital: Marital[] = [
    {value: 'Single', viewValue: 'Single'},
    {value: 'Married', viewValue: 'Married'},
    {value: 'Divocred', viewValue: 'Divocred'},
  ];

  gender: Gender[] = [
    {value: 'Male', viewValue: 'Male'},
    {value: 'Female', viewValue: 'Female'},
    {value: 'Others', viewValue: 'Others'},
  ];
  department: Department[] = [
    {value: 'BD', viewValue: 'Business Development'},
    {value: 'BT', viewValue: 'Business Technology'},
    {value: 'HR', viewValue: 'Human Resources'},
    {value: 'QA', viewValue: 'Quality Assurance'},
    {value: 'IT', viewValue: 'IT'},
  ];
  userClaims: any;
  userForm: FormGroup;
  user: User = new User();
  postError = false;
  postErrorMessage = '';

  constructor(private dataservice: DataService, private form: FormBuilder,private _snackBar: MatSnackBar) { }


  ngOnInit() {
    this.userForm = this.form.group({
      Name: ['', Validators.required],
      DOB: [null, Validators.required],
      UserName: [null, Validators.required],
      DOJ: [null, Validators.required],
      PhoneNumber: [null, Validators.required],
      Email_ID: ['', Validators.required,Validators.email],
      BloodType: ['', Validators.required],
      MaritalStatus: ['', Validators.required],
      Nationality: ['', Validators.required],
      Gender: ['', Validators.required],
      Department: ['', Validators.required],
    });
  }
  isFieldValid(field: string) {
    return !this.userForm.get(field).valid && (this.userForm.get(field).touched);
  }
  displayFieldCss(field: string) {
    return {  
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.updateUserValues();
      console.log(this.updateUserValues());
      // tslint:disable-next-line:prefer-const
      this.dataservice.postRegisterForm(this.user).subscribe (
          result => console.log('success', this.openSnackBar(result,'Close')),
          error => console.log('error', this.openSnackBar(error,'Close'))
    );
    } else {
      this.validateAllFormFields(this.userForm); //{7}
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
openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 2000,
  });
  this.reset();
}
reset(){
  this.userForm.reset();
}
updateUserValues() {
  this.user.Name = this.userForm.get('Name').value;
  this.user.DOB = this.userForm.get('DOB').value;
  this.user.UserName = this.userForm.get('UserName').value;
  this.user.DOJ = this.userForm.get('DOJ').value.value;
  this.user.PhoneNumber = this.userForm.get('PhoneNumber').value.value;
  this.user.Email_ID = this.userForm.get('Email_ID').value;
  this.user.BloodType = this.userForm.get('BloodType').value;
  this.user.MaritalStatus = this.userForm.get('MaritalStatus').value;
  this.user.Nationality = this.userForm.get('Nationality').value;
  this.user.Gender = this.userForm.get('Gender').value;
  this.user.Department = this.userForm.get('Department').value;
}


}
