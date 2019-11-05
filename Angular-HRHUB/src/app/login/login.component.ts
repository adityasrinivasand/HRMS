import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  constructor(private router: Router) { }
  username: string;
  password: string;
    ngOnInit() {
    }
    login(): void {
      if (this.username === 'admin' && this.password === 'admin') {
       this.router.navigate(['users']);
      } else {
        alert('Invalid credentials');
      }
    }
}

