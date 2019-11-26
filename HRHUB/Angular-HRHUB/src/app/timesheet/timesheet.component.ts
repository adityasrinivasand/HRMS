import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { Attendance } from '../data/attendance';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  constructor(private httpService: HttpClient) { }
  displayedColumns: string[] = ['ID', 'Date', 'Check In', 'Check Out','Status'];
  dataSource = new MatTableDataSource();
  empID: string;

  ngOnInit() {
    this.empID = localStorage.getItem('isUserName');
    this.httpService.get<Attendance[]>('https://localhost:44357/api/Attendances/'+ this.empID).subscribe(  
      data => {  this.dataSource=new  MatTableDataSource(data) as any ;
      console.log(this.dataSource);}  
      ,err=>{  
        console.log(err);  
      }  
    )
  }
}
