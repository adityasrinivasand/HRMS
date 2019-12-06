import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../data/user';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  employees: Observable<User[]>; 
  displayedColumns: string[] = ['User Name', 'Name', 'DOB', 'Gender','Email ID','Phone Number','Blood Type','Marital Status','Nationality','DOJ','Department'];
  dataSource = new MatTableDataSource();
  expire: Boolean;

  constructor(private httpService: HttpClient,public jwtHelper: JwtHelperService,private router: Router) { }
   
  ngOnInit() {  
    const token=localStorage.getItem('token');
    this.expire = this.jwtHelper.isTokenExpired(token);
    if(token==null || this.expire ){
      this.router.navigate(['/login']);
    }
    else{
      this.httpService.get<User[]>('https://localhost:44357/api/GetEmployees').subscribe(  
        data => {  this.dataSource=new  MatTableDataSource(data) as any ;console.log(this.employees);
        console.log(this.dataSource);}  
        ,err=>{  
          console.log(err);  
        }  
      )
    }
    
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

} 
