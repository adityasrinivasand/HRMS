import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../data/user';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  employees: Observable<User[]>; 
  displayedColumns: string[] = ['User Name', 'Name', 'DOB', 'Gender','Email ID','Phone Number','Blood Type','Marital Status','Nationality','DOJ','Department'];
  dataSource = new MatTableDataSource();

  constructor(private httpService: HttpClient) { }
   
  ngOnInit() {  
    this.httpService.get<User[]>('https://localhost:44357/api/GetEmployees').subscribe(  
      data => {  this.dataSource=new  MatTableDataSource(data) as any ;console.log(this.employees);
      console.log(this.dataSource);}  
      ,err=>{  
        console.log(err);  
      }  
    )
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

} 
