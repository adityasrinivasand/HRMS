import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = this.auth.getToken();
    console.log(idToken);
    if(idToken){
        const cloned = request.clone({
            headers: request.headers.set("Authorization",
            "Bearer " + idToken)
        });
        return next.handle(cloned);
    }else
    {
        return next.handle(request);
    }
  }
  
}