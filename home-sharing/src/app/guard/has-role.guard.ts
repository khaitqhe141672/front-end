import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs";


@Injectable({providedIn: 'root'})
export class HasRoleHostGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("guard host rol: " + this.authService.role)
    if (this.authService.role === 'ROLE_HOST'||this.authService.role==='ROLE_CUSTOMER') {
      return true
    } else {
      this.router.navigate(['/error'])
      return false
    }

  }

}
