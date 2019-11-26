import { Injectable } from '@angular/core';
import { Login } from './login';
import { Observable, of } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { User } from './user';
import { LeaveType } from './leaveType';
import { environment } from 'src/environments/environment';
import { Leave } from './leave';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = environment.baseUrl;
  empID: string;
  constructor(private http: HttpClient, ) { }

  public postLoginForm(login: Login): Observable<any> {
    console.log(login);
    return this.http.post('https://localhost:44357/token', login);
  }
  
  public postRegisterForm(user: User): Observable<any> {
    return this.http.post('https://localhost:44357/api/signup/addEmployee', user);
  }

  public postLeaveForm(leave: Leave): Observable<any> {
    this.empID = localStorage.getItem('isUserName');
    return this.http.post( this.baseUrl + 'api/leave/'+this.empID, leave);
  }

  public postForgotForm(userNAme:string): Observable<any> {
    return this.http.post( this.baseUrl + 'api/forgot',userNAme);
  }
}
