import { Component, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-welcomecard',
  templateUrl: './welcomecard.component.html',
  styleUrls: ['./welcomecard.component.css']
})
export class WelcomecardComponent implements OnInit {
  username = localStorage.getItem('isUserName');
  isAdmin = localStorage.getItem('isAdmin');
  value:string;
  time=Date.now();
  greeting: string;
  constructor() { }

  ngOnInit() {
    this.value = this.greetingText();
    console.log(this.value);   
  }
  greetingText = () => {
    const now = moment()
    const currentHour = now.hour()
      if (currentHour >= 12 && currentHour <=17) return "Good Afternoon "
      else if (currentHour >= 18) return "Good Evening "
      else return "Good Morning "
  }
}
