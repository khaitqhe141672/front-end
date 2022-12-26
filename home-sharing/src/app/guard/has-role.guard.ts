import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs";


@Injectable({providedIn: 'root'})
export class HasRoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("guard host rol: " + this.authService.role)
    if (this.authService.getRole().indexOf('HOST')>0||this.authService.getRole().indexOf('CUSTOMER')>0) {
      return true
    } else {
      this.router.navigate(['/error'])
      return false
    }

  }

}
