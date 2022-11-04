import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {exhaustMap, take} from "rxjs/operators";
import {Injectable} from "@angular/core";
@Injectable()
export class TokenInterceptor implements HttpInterceptor{
  constructor(private authService:AuthService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token:string = this.authService.getToken()
    console.log('this is token interceptor got: '+token)
    let jwtToken = req.clone({
      setHeaders:{
        // Authorization: token
        'Authorization': `${this.authService.getToken()}`,
      }
    })
    console.log("token intercepter: "+this.authService.getToken().substring(7))

    return next.handle(jwtToken);
  }

}
