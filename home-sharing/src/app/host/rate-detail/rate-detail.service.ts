import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {API_HOST_MANAGE_LIST_RATE_DETAIL} from "../../constant/api.constant";
import {Observable} from "rxjs";
import {RateDetailResponse} from "./rate-detail.model";

@Injectable({providedIn:'root'})
export class RateDetailService{
  constructor(private http:HttpClient) {
  }
  getListRate(pageIndex:number,postId:number):Observable<RateDetailResponse>{
    const httpParams = new HttpParams({fromString:'post-id='+postId+'&index-page='+pageIndex})
    return this.http.get<RateDetailResponse>(API_HOST_MANAGE_LIST_RATE_DETAIL)
  }
}
