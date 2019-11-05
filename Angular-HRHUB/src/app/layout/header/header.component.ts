import { Component, OnInit } from '@angular/core';

export interface Person {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  person: Person[] = [
    {value: 'Account Settings', viewValue: 'Settings'},
    {value: 'Profile', viewValue: 'Profile'},
    {value: 'Logout', viewValue: 'Logout'},
  ];

  ngOnInit() {
  }

}
