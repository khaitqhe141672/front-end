import {AuthService} from "../auth/auth.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({providedIn:'root'})
export class HasRoleHostGuard{
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("guard host rol: " + this.authService.role)
    if (this.authService.role === 'ROLE_HOST') {
      return true
    } else {
      this.router.navigate(['/error'])
      return false
    }

  }
}
