import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor{

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token;
    if(localStorage.getItem("jwtToken")) {
      token = localStorage.getItem("jwtToken");
    } else {
      token = "";
    }
    req = req.clone(
      {
        setHeaders: {
          Authorization : token
        }
      }
    );
    return next.handle(req).pipe( tap(
      () => {},
      (err: any) => {
        this.handleError(err)
      }));
  }

  private handleError(err) {
    if (err instanceof HttpErrorResponse) {
      switch (err.status) {
        case 401:
          localStorage.clear();
          sessionStorage.clear();
          sessionStorage.setItem("error-401", err.error.message);
          this.router.navigate(['auth']);
          break;
        case 403:
          localStorage.clear();
          sessionStorage.clear();
          sessionStorage.setItem("error-403", err.error.message);
          break;
        case 406:
          localStorage.clear();
          sessionStorage.clear();
          sessionStorage.setItem("error-406", "Le format .jpg, .png ");
          break;
        default:
          return;
      }
    }
  }
}
