import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, NumberValueAccessor } from '@angular/forms';
import { Leave } from '../data/leave';

import {ActivatedRoute} from '@angular/router';
import * as publicHolidays from '../data/publicholidays.json';

interface LeaveType {
  key: string;
  value: number;
}
interface SessionType {
  key: string;
  value: number;
}


@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})


export class LeaveComponent implements OnInit {

  leaveForm: FormGroup;
  leave: Leave = new Leave();
  options: FormGroup;

  errorMessage = '';
  empId = '';
  balance = 0;
  value = '';
  leaveTypelist: Array<LeaveType> = [
    { key: 'Sick Leave', value: 1 },
    { key: 'Casual Leave', value: 2 },
    { key: 'Privileged Leave', value: 3 }
  ];
  sessionlist: Array<SessionType> = [
    { key: 'Session 1', value: 1 },
    { key: 'Session 2', value: 2 },
  ];



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
  fromDate: ['', Validators.required],
  toDate: ['', Validators.required],
  fromSession: ['', Validators.required],
  toSession: ['', Validators.required],
  applyTo: ['', Validators.required],
  reason: ['', Validators.required],
  remaining: {value: '0' , disabled: true},
  days: {value: '0' , disabled: true}
});

this.leaveForm.get('leaveType').valueChanges.subscribe(
  value => { this.balanceDays(value);
}
);


}


balanceDays(value) {
  console.log(this.empId);
  console.log(value);
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
    this.leave.Employee_ID = +this.empId;
    this.leave.Leave_Type_ID = this.leaveForm.get('leaveType').value.value;
    this.leave.Leave_StartDate = this.leaveForm.get('fromDate').value;
    this.leave.Leave_EndDate = this.leaveForm.get('toDate').value;
    this.leave.From_Session = this.leaveForm.get('fromSession').value.value;
    this.leave.To_Session = this.leaveForm.get('toSession').value.value;
    this.leave.Reason = this.leaveForm.get('reason').value;
    this.leave.Apply_To = this.leaveForm.get('applyTo').value;
  }




}




