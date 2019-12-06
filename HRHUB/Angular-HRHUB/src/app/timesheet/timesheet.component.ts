import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { Attendance } from '../data/attendance';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  constructor(private httpService: HttpClient,public jwtHelper: JwtHelperService,private router: Router) { }
  displayedColumns: string[] = [ 'Date', 'Check In', 'Check Out','Status'];
  dataSource = new MatTableDataSource();
  empID: string;
  expire: Boolean;

  ngOnInit() {
    const token=localStorage.getItem('token');
    this.expire = this.jwtHelper.isTokenExpired(token);
    if(token==null || this.expire ){
      this.router.navigate(['/login']);
    }
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
