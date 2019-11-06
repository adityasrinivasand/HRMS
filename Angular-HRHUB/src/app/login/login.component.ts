import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../data/login';
import { DataService } from '../data/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;

  constructor(private router: Router, private dataservice: DataService) { }

  employeeLogin: Login = {
    userName: '',
    password: '',
    grantType: 'password',
    rememberme: false
  };
  postError = false;
  postErrorMessage = '';
    ngOnInit() {
    }

    onHttpError(error: any) {
      console.log('error:', error);
      this.postError = true;
      this.postErrorMessage = error.error.error;
    }
    onSubmit(form: NgForm) {
      console.log(form.value);
      if (form.valid) {
        console.log(' in onSubmit:', form.valid);
        this.dataservice.postLoginForm(this.employeeLogin).subscribe (
          result => localStorage.setItem('success', result.access_token),
          error => this.onHttpError(error)
        );
        
      } else {
        this.postError = true;
        this.postErrorMessage = 'Please Fix the above errors';
      }

    }
}

