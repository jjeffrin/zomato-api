import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Intercepted");
    const modifiedReq = req.clone({
      headers: req.headers.set('user-key', 'cc7bcf1aa0a74dbe28337c240180a60d')
    });
    return next.handle(modifiedReq);
  }
}
