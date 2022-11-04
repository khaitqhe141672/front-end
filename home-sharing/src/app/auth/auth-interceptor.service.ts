import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpParams, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {exhaustMap, take} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptorService {
  constructor(private authService: AuthService) {
  }

  // intercept(req: HttpRequest<any>, next: HttpHandler) {
  //   return this.authService.user.pipe(
  //     take(1),
  //     exhaustMap(user => {
  //       if (!user) return next.handle(req)
  //
  //       const modifiedReq = req.clone(
  //         {params: new HttpParams().set('auth', user.token)})
  //       return next.handle(modifiedReq)
  //     }))
  // }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        // 'Content-Type' : 'application/json; charset=utf-8',
        // 'Accept'       : 'application/json',
        'Authorization': `${this.authService.getToken()}`,
      },
    });

    return next.handle(req);
  }
}
