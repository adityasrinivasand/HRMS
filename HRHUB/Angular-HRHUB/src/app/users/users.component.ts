import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { User } from '../data/user';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

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
declare var require: any;
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
    {key: 'Delivery', value: 'Delivery'},
    {key: 'IT', value: 'IT'},
  ];
  userClaims: any;
  userForm: FormGroup;
  user: User = new User();
  postError = false;
  postErrorMessage = '';
  expire: Boolean;
  verticalPosition: MatSnackBarVerticalPosition
  errorMsgNumber: string;
  currentDate: Date = new Date();
  errorMsgDOB: string;
  moment = require('moment-business-days'); 
  errorMsgDOJ: string;
 

  constructor(private dataservice: DataService, private form: FormBuilder,private _snackBar: MatSnackBar,public jwtHelper: JwtHelperService,private router: Router) { }


  ngOnInit() {
    const token=localStorage.getItem('token');
    this.expire = this.jwtHelper.isTokenExpired(token);
    if(token==null || this.expire ){
      this.router.navigate(['/login']);
    }
    this.userForm = this.form.group({
      Name: ['', Validators.required],
      DOB: [null, Validators.required],
      UserName: [null, Validators.required],
      DOJ: [null, Validators.required],
      PhoneNumber: [null, [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      Email_ID: ['', [Validators.required,Validators.email]],
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
  isFieldValidDOB(field: string) {
    if(this.userForm.get(field).valid){
      const diff= this.calculateYears();
      if(diff){
        this.errorMsgDOB="Employee Age must be greater than 21";
        return true;
      }
    }
    else{
      this.errorMsgDOB="Please Enter DOB";
      return !this.userForm.get(field).valid && (this.userForm.get(field).touched);
    }  
  }
  isFieldValidDOJ(field: string) {
    if(this.userForm.get(field).valid){
      const diff= this.calculateYearsDOJ();
      if(diff==false){
        this.errorMsgDOJ="DOJ Must be after Jan 1 2015";
        return true;
      }
    }
    else{
      this.errorMsgDOJ="Please Enter DOJ";
      return !this.userForm.get(field).valid && (this.userForm.get(field).touched);
    }  
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
      // tslint:disable-next-line:prefer-const
      this.dataservice.postRegisterForm(this.user).subscribe (
          result =>  {this.openSnackBar(result,'Close'); },
          error =>  this.openSnackBar(error.error.Message,'Close')
    );
    this.userForm.reset(this.userForm.value);
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
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });

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
  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();

    }
}
calculateYears(){

  return this.moment(this.userForm.get('DOB').value).isAfter('1998-05-01');
}
calculateYearsDOJ(){
  return this.moment(this.userForm.get('DOJ').value).isAfter('2015-01-01');
}
canDeactivate(){
  if(!this.userForm.valid){
    return window.confirm('Discard Changes?');
  }
  return true;
}


}
