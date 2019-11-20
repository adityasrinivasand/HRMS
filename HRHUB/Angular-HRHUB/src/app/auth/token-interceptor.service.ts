import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

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
