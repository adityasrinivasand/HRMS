import { Injectable } from '@angular/core';
import { Login } from './login';
import { Observable, of } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';

import { User } from './user';
import { LeaveType } from './leaveType';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public postLoginForm(login: Login): Observable<any> {
    console.log('inside post loginform');
    let body = `username=${login.userName}&password=${login.password}&grant_type=${login.grantType}`;
    return this.http.post('https://localhost:44357/token', body);

     // return of(login);
  }
  public postRegisterForm(user: User): Observable<any> {
    console.log('inside post registerform ');
    return this.http.post('https://localhost:44357/api/signup/addEmployee', user);
  }

  


}
