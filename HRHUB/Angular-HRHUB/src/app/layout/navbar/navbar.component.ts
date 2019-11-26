import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ThemeService } from '../../theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username = localStorage.getItem('isUserName');
  isAdmin = localStorage.getItem('isAdmin');
  darkTheme =  new FormControl(false);
  
  @ViewChild(MatMenuTrigger, {static: true}) trigger: MatMenuTrigger;

  logout(){
    localStorage.clear();
    this.cookieService.delete('Token');
  }
  someMethod() {
    this.trigger.openMenu();
  }

  constructor(private router: Router,private cookieService: CookieService,private themeService: ThemeService) { 
    this.darkTheme.valueChanges.subscribe(value => {
      if (value) {
        console.log(this.darkTheme.value);
        this.themeService.toggleDark();
      } else {
        this.themeService.toggleLight();
      }
    });
  }
  ngOnInit() {
  }
}
