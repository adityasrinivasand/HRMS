import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { User } from '../data/user';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Blood {
  value: string;
  key: string;
}
export interface Marital {
  value: string;
  key: string;
}
export interface Gender {
  value: string;
  key: string;
}
export interface Department {
  value: string;
  key: string;
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

  bloods: Blood[] = [
    {key: 'A+ve', value: 'A+ve'},
    {key: 'A-ve', value: 'A-ve'},
    {key: 'B+ve', value: 'B+ve'},
    {key: 'B-ve', value: 'B-ve'},
    {key: 'O+ve', value: 'O+ve'},
    {key: 'O-ve', value: 'O-ve'},
    {key: 'AB+ve', value: 'AB+ve'},
    {key: 'AB-ve', value: 'AB-ve'},
  ];

  marital: Marital[] = [
    {key: 'Single', value: 'Single'},
    {key: 'Married', value: 'Married'},
    {key: 'Divocred', value: 'Divocred'},
  ];

  gender: Gender[] = [
    {key: 'Male', value: 'Male'},
    {key: 'Female', value: 'Female'},
    {key: 'Others', value: 'Others'},
  ];
  department: Department[] = [
    {key: 'BD', value: 'Business Development'},
    {key: 'BT', value: 'Business Technology'},
    {key: 'HR', value: 'Human Resources'},
    {key: 'QA', value: 'Quality Assurance'},
    {key: 'IT', value: 'IT'},
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
      Email_ID: ['', Validators.required],
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
      console.log(this.user);
      // tslint:disable-next-line:prefer-const
      this.dataservice.postRegisterForm(this.user).subscribe (
          result => console.log('success', this.openSnackBar(result,'Close')),
          error => console.log('error', this.openSnackBar(error,'Close'))
    );
    } else {
      this.validateAllFormFields(this.userForm); 
    }
  }
  validateAllFormFields(formGroup: FormGroup) {         
  Object.keys(formGroup.controls).forEach(field => {  
    const control = formGroup.get(field);             
    if (control instanceof FormControl) {             
      control.markAsTouched({ onlySelf: true });
      }else if (control instanceof FormGroup) {        
      this.validateAllFormFields(control);           
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
    this.user.DOJ = this.userForm.get('DOJ').value;
    this.user.PhoneNumber = this.userForm.get('PhoneNumber').value;
    this.user.Email_ID = this.userForm.get('Email_ID').value;
    this.user.BloodType = this.userForm.get('BloodType').value.value;
    this.user.MaritalStatus = this.userForm.get('MaritalStatus').value.value;
    this.user.Nationality = this.userForm.get('Nationality').value;
    this.user.Gender = this.userForm.get('Gender').value.value;
    this.user.Department = this.userForm.get('Department').value.value;
  }


}
