import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../data/login';
import { DataService } from '../data/data.service';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  cookieValue = 'UNKNOWN';
  constructor(private router: Router, private dataservice: DataService, private form: FormBuilder, private cookieService: CookieService) { }

  loginForm: FormGroup;
  employeeLogin: Login = new Login();
  postError = false;
  postErrorMessage = '';
  ngOnInit() {
    this.loginForm = this.form.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onHttpError(error: any) {
    console.log('error:', error);
    this.postError = true;
    this.postErrorMessage = error.error.Message;
    console.log(this.postErrorMessage);
  }
  onSubmit() {
    this.updateLoginValues();
    
    if (this.loginForm.valid) {
      console.log(' in onSubmit:', this.loginForm.valid);
      this.dataservice.postLoginForm(this.employeeLogin).subscribe (
        result => {
          localStorage.setItem('token', result);
          this.setValues(result);
          this.router.navigate(['/contacts']);
          this.cookieService.set( 'Token', result );
          this.cookieValue = this.cookieService.get('Token');

        },
        error=>this.onHttpError(error));
    } else {
      this.postError = true;
      this.postErrorMessage = 'Please Fix the above errors';      
    }
  }
  setValues(result){
    console.log("loggedddd dawwwww");
    var decoded = jwt_decode(result);
    console.log(decoded);
    localStorage.setItem('isUserName',decoded['unique_name']);
    if(decoded['role'] == "admin"){
      localStorage.setItem('isAdmin','1');       
    }
    else{
      localStorage.setItem('isAdmin','0');
    }

  }
  updateLoginValues(){
    this.employeeLogin.userName = this.loginForm.get('userName').value;
    this.employeeLogin.password = this.loginForm.get('password').value;
    console.log(this.employeeLogin);
  }  
}

