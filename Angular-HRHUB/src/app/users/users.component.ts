import { Component, OnInit } from '@angular/core';


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
  constructor() { }

  ngOnInit() {
  }

}
