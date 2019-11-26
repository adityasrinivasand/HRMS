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
    this.value = this.getGreetingTime(this.time);   
  }
  getGreetingTime = (currentTime) => {
 
    const splitAfternoon = 12; // 24hr time to split the afternoon
    const splitEvening = 17; // 24hr time to split the evening
    const currentHour = moment(currentTime, "h:mm:ss A").format("HH:mm:ss");

  
    if (currentHour >= 'splitAfternoon' && currentHour <= 'splitEvening') {
      // Between 12 PM and 5PM
      return 'Good afternoon';
    } else if (currentHour >= 'splitEvening') {
      // Between 5PM and Midnight
      return 'Good evening';
    }
    // Between dawn and noon
    return 'Good morning';
  }

}
