import { Component, OnInit} from '@angular/core';
import { DataService } from '../data/data.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Leave } from '../data/leave';
import {ActivatedRoute, Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';

interface LeaveType {
  key: string;
  value: number;
}
interface SessionType {
  key: string;
  value: number;
}
declare var require: any;

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})

export class LeaveComponent implements OnInit {
  errorMsgToDate:string;
  errorMsgFromDate:string;
  leaveForm: FormGroup;
  leave: Leave = new Leave();
  options: FormGroup;
  varFromDate: any = null;
  varToDate: any= null;
  varFromSession: any= null;
  varToSession: any= null;
  errorMessage = '';
  empId = '';
  balance = 0;
  value = '';
  diff = 0;
  currentDate = new Date();
  leaveTypelist: Array<LeaveType> = [
    { key: 'Sick Leave', value: 1 },
    { key: 'Casual Leave', value: 2 },
    { key: 'Privileged Leave', value: 3 }
  ];
  sessionlist: Array<SessionType> = [
    { key: 'Session 1', value: 1 },
    { key: 'Session 2', value: 2 },
  ];
  expire: Boolean;
  moment = require('moment-business-days');
  // tslint:disable-next-line:max-line-length
  constructor(private dataservice: DataService, private httpService: HttpClient, private form: FormBuilder, private route: ActivatedRoute,private _snackBar: MatSnackBar,public jwtHelper: JwtHelperService,private router: Router ) {
    this.route.paramMap.subscribe( params => { this.empId = params.get('id');  });
    this.options = form.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }
  ngOnInit() {
    const token=localStorage.getItem('token');
    this.expire = this.jwtHelper.isTokenExpired(token);
    if(token==null || this.expire ){
      this.router.navigate(['/login']);
    }
  this.leaveForm = this.form.group({
    leaveType: ['', Validators.required],
    fromDate: [null, Validators.required],
    toDate: [null, Validators.required],
    fromSession: [null, Validators.required],
    toSession: [null, Validators.required],
    applyTo: ['', Validators.required],
    reason: ['', Validators.required],
    remaining: {value: '0' , disabled: true},
    days: {value: '0' , disabled: true}
  });
  this.leaveForm.get('leaveType').valueChanges.subscribe(
    value => { this.balanceDays(value);
  }
  );
  this.doMonitoring();
  this.publicholidays();

  this.leaveForm.get('fromDate').valueChanges.subscribe(
    value => { this.varFromDate = value;});
  this.leaveForm.get('toDate').valueChanges.subscribe(
    value => { this.varToDate = value;});
  this.leaveForm.get('fromSession').valueChanges.subscribe(
    value => { this.varFromSession = value;});
  this.leaveForm.get('toSession').valueChanges.subscribe(
    value => { this.varToSession = value;});
}
  isFieldValid(field: string) {
    return !this.leaveForm.get(field).valid && (this.leaveForm.get(field).touched && !this.leaveForm.valid);
  }
  isFieldValidFromDate(field: string) {
    if(this.leaveForm.get(field).valid){
      if(this.leaveForm.get('leaveType').value.value == 1 ){
        if(this.leaveForm.get(field).value > this.currentDate){
          this.errorMsgFromDate="Sick Leave Can't be applied in advance";
          return true;
        }
      }
    }
    else{
      this.errorMsgFromDate="Please Enter From Date";
      return !this.leaveForm.get(field).valid && (this.leaveForm.get(field).touched);
    }  
  }
  isFieldValidToDate(field: string) {
    if(this.leaveForm.get(field).valid){
      if(this.leaveForm.get('fromDate').value > this.leaveForm.get(field).value ){
        this.errorMsgToDate="To Date cannot be before From Date";
        return true;
      }
    }
    else{
      this.errorMsgToDate="Please Enter To Date";
      return !this.leaveForm.get(field).valid && (this.leaveForm.get(field).touched);
    }  
  }

  displayFieldCss(field: string) {
    return {  
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }


  balanceDays(value) {
    this.empId = localStorage.getItem('isUserName');
    this.httpService.get<any>('https://localhost:44357/api/leave/' + this.empId + '/' + value.value).subscribe(data => {
      this.leaveForm.patchValue({
        remaining: data,
        });
    });
  }
  calculateDays() {
  console.log(this.leaveForm.get('toDate').value);
  }
  onSubmit() {
    if (this.leaveForm.valid) {
      this.updateLeaveValues();
      // tslint:disable-next-line:prefer-const
      this.dataservice.postLeaveForm(this.leave).subscribe (
          result =>  this.openSnackBar(result,'Close'),
          error =>  this.openSnackBar(error.error.message,'Close')
    );
    } else {
      this.validateAllFormFields(this.leaveForm); 
    }
  }
  validateAllFormFields(formGroup: FormGroup) {         
    Object.keys(formGroup.controls).forEach(field => {  
      const control = formGroup.get(field);             
      if (control instanceof FormControl) {            
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        
        this.validateAllFormFields(control);            
      }
    });
  }
    openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });

  }
  updateLeaveValues() {
    this.leave.Employee_ID = 1;
    this.leave.Leave_Type_ID = this.leaveForm.get('leaveType').value.value;
    this.leave.Leave_StartDate = this.leaveForm.get('fromDate').value;
    this.leave.Leave_EndDate = this.leaveForm.get('toDate').value;
    this.leave.From_Session = this.leaveForm.get('fromSession').value.value;
    this.leave.To_Session = this.leaveForm.get('toSession').value.value;
    this.leave.Reason = this.leaveForm.get('reason').value;
    this.leave.Apply_To = this.leaveForm.get('applyTo').value;
  }
  publicholidays(){
    var gandhiJayanthi = '02-10';
    var newYear ='01-01';
    var republicDay ='26-01';
    var tamilNewYear ='14-04';
    var mayDay ='01-05';
    var independanceDay ='15-08';
    var christmas ='25-12';
    this.moment.updateLocale('us', {
      holidays: [gandhiJayanthi, newYear,republicDay,tamilNewYear,mayDay,independanceDay,christmas],
      holidayFormat: 'DD-MM'
    });
  }
  doMonitoring() {
    setTimeout(() => {
     if(((this.varFromDate) &&(this.varFromSession) && (this.varToDate)&& (this.varToSession))  != null)
     {this.daysCalculation();}
     //better to have one if here for exiting loop!
     this.doMonitoring();
    }, 1000);
  }
  daysCalculation(){
    this.diff = this.moment(this.leaveForm.get('toDate').value, 'MM-DD-YYYY').businessDiff(this.moment(this.leaveForm.get('fromDate').value,'MM-DD-YYYY'));
    if(this.varFromSession == this.varToSession){
      this.diff += 0.5;
    }else if (this.varFromSession != this.varToSession){
      this.diff += 1;
    }
    this.leaveForm.patchValue({
      days: this.diff
    });
  }
  reset(){
    this.leaveForm.reset();
  }
  canDeactivate(){
    if(!this.leaveForm.valid){
      return window.confirm('Discard Changes?');
    }
    return true;
  }


}




