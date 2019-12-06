import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data/data.service';
import { Password } from '../data/password';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrls: ['./setpassword.component.css']
})
export class SetpasswordComponent implements OnInit {
  forgotPasswordForm: any;
  errorMsg: string;
  pass: Password = new Password();
  id: any;
  expire: Boolean;
  constructor(private form: FormBuilder,private http: HttpClient,private dataservice: DataService,private route: ActivatedRoute,private router: Router,public jwtHelper: JwtHelperService,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    const token=localStorage.getItem('token');
    this.expire = this.jwtHelper.isTokenExpired(token);
    if(token!=null && !this.expire ){
      this.router.navigate(['/contacts']);
    }
    this.forgotPasswordForm = this.form.group({
      password: ['', Validators.required],
      confirmPassword:['',Validators.required]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
    console.log(this.forgotPasswordForm.value);
    if(this.isFieldEqual()!=1){
      this.updateValues();
      this.id =  this.route.snapshot.params.id;
      this.dataservice.postSetForm(this.pass,this.id).subscribe (
        result =>  this.openSnackBar(result,'Close'),
        error =>  this.openSnackBar(error.error.message,'Close')
      );
    }
    else{
      this.errorMsg="Passwords Dont Match";
    }
    
    } else {
      this.validateAllFormFields(this.forgotPasswordForm); //{7}
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
    this.router.navigate(['/login']);
  }
  validateAllFormFields(formGroup: FormGroup) {         //{1}
  Object.keys(formGroup.controls).forEach(field => {  //{2}
    const control = formGroup.get(field);             //{3}
    if (control instanceof FormControl) {             //{4}
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {        //{5}
      this.validateAllFormFields(control);            //{6}
    }
  });
  }
  isFieldValid(field: string) {
    return !this.forgotPasswordForm.get(field).valid && (this.forgotPasswordForm.get(field).touched);
  }
  isFieldEqual(){
    if(this.forgotPasswordForm.get('confirmPassword').valid){
      if(this.forgotPasswordForm.get('confirmPassword').valid != this.forgotPasswordForm.get('password').valid){

        return 1;
      }
    }  
  }
  
  displayFieldCss(field: string) {
    return {  
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }
  updateValues(){
    this.pass.Password = this.forgotPasswordForm.get('password').value;
    this.pass.confirmPassword = this.forgotPasswordForm.get('confirmPassword').value;
  }

}
