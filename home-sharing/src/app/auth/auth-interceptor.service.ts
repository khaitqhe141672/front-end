import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {exhaustMap, take} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Authorization': `${this.authService.getToken()}`,
      },
    });
    console.log("auth interceptor token: "+this.authService.getToken())
    return next.handle(req);
  }
}
