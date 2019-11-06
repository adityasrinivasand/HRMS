import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { User } from '../data/user';
import { NgForm } from '@angular/forms';


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
  styleUrls: ['./users.component.css']
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
  constructor(private dataservice: DataService) { }

  user: User = {
    Name: '',
    DOB:   new Date() ,
    UserName: '',
    DOJ: new Date() ,
    PhoneNumber: 1234567890,
    Email_ID: '',
    BloodType: '',
    MaritalStatus: '',
    Nationality: '',
    Gender: '',
    Department: '',
  };
  postError = false;
  postErrorMessage = '';

  ngOnInit() {
  }
  onHttpError(error: any) {
    console.log('error:', error);
    this.postError = true;
    this.postErrorMessage = error.error.status;
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    if (form.valid) {
      console.log(' in onSubmit:', form.valid);
      this.dataservice.postRegisterForm(this.user).subscribe (
        result => console.log('success', result),
        error => this.onHttpError(error)
      );
    }

  }

}
