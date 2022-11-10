import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {IResponseAccount} from "../../shared/model/account-host.model";
import {API_ACCOUNT_HOST} from "../../constant/api.constant";
@Injectable({providedIn:'root'})
export class ManagerAccountServices{
  constructor(private http:HttpClient) {
  }
  getListHostAccount(pageIndex:number):Observable<IResponseAccount>{
    return this.http.get<IResponseAccount>(API_ACCOUNT_HOST+pageIndex)
  }

}
