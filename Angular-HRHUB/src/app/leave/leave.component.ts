import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { LeaveType } from '../data/leaveType';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

  arrLeaveType: string [];
  errorMessage = '';
  constructor(private dataservice: DataService, private httpService: HttpClient) { }

  ngOnInit() {

  }

  
}

