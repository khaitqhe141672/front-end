import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {API_ADMIN_GET_COMPLAIN, API_ADMIN_RESOLVE_COMPLAIN} from "../../../constant/api.constant";
import {Observable} from "rxjs";
import {ListComplainResponse} from "./complain.model";

@Injectable({providedIn:'root'})
export class ManageComplainService{
  constructor(private http:HttpClient) {

  }
  getListComplain(pageIndex:number):Observable<ListComplainResponse>{
    return this.http.get<ListComplainResponse>(API_ADMIN_GET_COMPLAIN+pageIndex)
  }
  resolveComplain(complainID:number,statusComplain:number,statusPost:number):Observable<any>{
    let params = new HttpParams({fromString:'complaintPost-id='+complainID+'&status='+statusComplain+'&status-post='+statusPost})
    return this.http.put(API_ADMIN_RESOLVE_COMPLAIN,{},{
      params:params
    })
  }
}
