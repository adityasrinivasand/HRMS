import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcomecard',
  templateUrl: './welcomecard.component.html',
  styleUrls: ['./welcomecard.component.css']
})
export class WelcomecardComponent implements OnInit {
  username = localStorage.getItem('isUserName');
  isAdmin = localStorage.getItem('isAdmin');
  constructor() { }

  ngOnInit() {
  }

}
