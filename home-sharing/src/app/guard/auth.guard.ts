import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {map, take} from "rxjs/operators";
import {Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {ReportPostDetail} from "../admin/manage-report-center/manage-report-post/manage-report-post.model";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  displayedColumns: string[] = ['postID', 'title','numbersOfReport','statusPost','statusReportPost','history' ];
  dataSource:MatTableDataSource<ReportPostDetail>
  pageIndex:number = 1
  totalPaginator = 1

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean|UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user
        if(isAuth) return true
        return this.router.createUrlTree(['/auth'])
      })
    )
  }
}
