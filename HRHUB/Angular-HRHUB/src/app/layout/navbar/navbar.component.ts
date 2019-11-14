import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username = localStorage.getItem('isUserName');
  isAdmin = localStorage.getItem('isAdmin');
  
  @ViewChild(MatMenuTrigger, {static: true}) trigger: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }

  constructor() { }

  ngOnInit() {
  }

}
