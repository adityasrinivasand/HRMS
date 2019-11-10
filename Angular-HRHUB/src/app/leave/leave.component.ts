import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl, NumberValueAccessor } from '@angular/forms';
import { Leave } from '../data/leave';
import { formatDate } from '@angular/common';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import {ActivatedRoute} from '@angular/router';




@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})


export class LeaveComponent implements OnInit {

  leaveForm: FormGroup;
  leave: Leave = new Leave();


  errorMessage = '';

  leaveTypelist: string[] = ['Sick Leave', 'Casual Leave', 'Privileged Leave'];



  // tslint:disable-next-line:max-line-length
  constructor(private dataservice: DataService, private httpService: HttpClient, private form: FormBuilder, private route: ActivatedRoute) {
    this.route.paramMap.subscribe( params => {const empId = params.get('id'); });
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
  noOfDays: {value: 'n/a' , disabled: true},
  balance: {value: 'n/a' , disabled: true}
});

this.leaveForm.get('leaveType').valueChanges.subscribe(
  value => {
    console.log(value);
  }
);

  }

save() {
    console.log(JSON.stringify(this.leaveForm));
    // tslint:disable-next-line:prefer-const
    /*
    this.dataservice.postLeaveForm(this.leaveForm).subscribe (
        result => console.log('success', result),
        error => console.log('error', (error))
      );
*/
  }

  updateBalance() {
    console.log('i have ');
    console.log(this.leaveForm.get('leaveType').value);
  }



  }




