import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReportPostResponse} from "./manage-report-post.model";
import {
  API_ADMIN_MANAGE_POST_RATE,
  API_ADMIN_UPDATE_STATUS_POST_IN_MANAGE_REPORT,
  API_ADMIN_UPDATE_STATUS_REPORT_POST
} from "../../../constant/api.constant";

@Injectable({providedIn:'root'})
export class ManageReportPostService{
  constructor(private http:HttpClient) {
  }
  getReportPost(pageIndex:number):Observable<ReportPostResponse>{
    return this.http.get<ReportPostResponse>(API_ADMIN_MANAGE_POST_RATE+pageIndex)
  }
  updatePostStatus(postID:number,status:number):Observable<any>
  {
    // post-id=1&status=1
    //1: Hien thi
    //2: An
    let paramsHttp = new HttpParams({fromString:'post-id='+postID+'&status='+status})
    return this.http.put(API_ADMIN_UPDATE_STATUS_POST_IN_MANAGE_REPORT,{},{params:paramsHttp})

  }
  updateStatusReportPost(listReportPostID:number[],status:number):Observable<any>{
    let paramsHttp = new HttpParams({fromString:'status='+status})
    return this.http.put(API_ADMIN_UPDATE_STATUS_REPORT_POST,{
      listReportPostID:listReportPostID
    },{params:paramsHttp})
  }
}
