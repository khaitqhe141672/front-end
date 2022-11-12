import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_UPDATE_HOST_STATUS} from "../../../constant/api.constant";

@Injectable({providedIn:'root'})
export class AccountDetailServices{
  constructor(private http:HttpClient) {
  }
  updateStatus(userID:number,status:number):Observable<any>
  {
    let params = new HttpParams({fromString:'user-id='+userID+'&status='+status})
     return  this.http.put(API_UPDATE_HOST_STATUS,null,{params:params})
  }
}
