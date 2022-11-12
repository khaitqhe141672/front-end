import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AccountHost, IResponseAccount, ListAccountHost} from "../../shared/model/account-host.model";
import {API_ACCOUNT_HOST} from "../../constant/api.constant";
import {map} from "rxjs/operators";
@Injectable({providedIn:'root'})
export class ManagerAccountHostServices {
  constructor(private http:HttpClient) {
  }
  getListHostAccount(pageIndex:number):Observable<ListAccountHost>{
    return this.http.get<IResponseAccount>(API_ACCOUNT_HOST+pageIndex).pipe(
      map(res=>{
        return res.data
      })
    )
  }

}
