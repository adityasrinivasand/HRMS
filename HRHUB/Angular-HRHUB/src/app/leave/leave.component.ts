import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, NumberValueAccessor, FormControl } from '@angular/forms';
import { Leave } from '../data/leave';
import {ActivatedRoute} from '@angular/router';


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
  leaveTypelist: Array<LeaveType> = [
    { key: 'Sick Leave', value: 1 },
    { key: 'Casual Leave', value: 2 },
    { key: 'Privileged Leave', value: 3 }
  ];
  sessionlist: Array<SessionType> = [
    { key: 'Session 1', value: 1 },
    { key: 'Session 2', value: 2 },
  ];

   moment = require('moment-business-days');
  


  // tslint:disable-next-line:max-line-length
  constructor(private dataservice: DataService, private httpService: HttpClient, private form: FormBuilder, private route: ActivatedRoute) {
    this.route.paramMap.subscribe( params => { this.empId = params.get('id');  });
    this.options = form.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }

  ngOnInit() {
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
save() {

    this.updateLeaveValues();
    // tslint:disable-next-line:prefer-const

    this.dataservice.postLeaveForm(this.leave).subscribe (
        result => console.log('success', result),
        error => console.log('error', (error))
      );

  }

  updateBalance() {
    console.log('i have ');
    console.log(this.leaveForm.get('leaveType').value);
  }
  updateLeaveValues() {
    this.leave.Employee_ID = +localStorage.getItem('isUserName');
    console.log(this.leave.Employee_ID);
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
    console.log(this.moment('02-10-2019', 'DD-MM-YYYY').isBusinessDay() );

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
    // var diff = this.moment('05-15-2017', 'MM-DD-YYYY').businessDiff(this.moment('05-08-2017','MM-DD-YYYY'));
    if(this.varFromSession == this.varToSession){
      this.diff += 0.5;
    }else if (this.varFromSession != this.varToSession){
      this.diff += 1;
    }
    this.leaveForm.patchValue({
      days: this.diff
    });
  }

}




