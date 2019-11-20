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
  constructor(private http: HttpClient, ) { }

  public postLoginForm(login: Login): Observable<any> {
    console.log('inside post loginform');
    const body = `userName=${login.userName}&password=${login.password}&grant_type=${login.grantType}`;
    console.log(body); 
    console.log(login);
       return this.http.post('https://localhost:44357/token', login);

     // return of(login);
  }
  public postRegisterForm(user: User): Observable<any> {
    console.log('inside post registerform ');
    return this.http.post('https://localhost:44357/api/signup/addEmployee', user);
  }

  public postLeaveForm(leave: Leave): Observable<any> {
    console.log('inside post leave form');
    console.log(leave);
    return this.http.post( this.baseUrl + 'api/leave/1', leave);
  }

  

}
