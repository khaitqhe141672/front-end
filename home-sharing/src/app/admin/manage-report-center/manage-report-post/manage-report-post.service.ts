import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReportPostResponse} from "./manage-report-post.model";
import {
  API_ADMIN_MANAGE_POST_RATE,
  API_ADMIN_UPDATE_STATUS_POST_IN_MANAGE_REPORT,
  API_ADMIN_UPDATE_STATUS_REPORT_POST, API_HISTORY_HANDLE_REPORT_POST
} from "../../../constant/api.constant";
import {HistoryHandlePostResponse} from "../history-handle-report/history-handle-report-post.model";

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
    //3: admin an
    let paramsHttp = new HttpParams({fromString:'post-id='+postID+'&status='+status})
    return this.http.put(API_ADMIN_UPDATE_STATUS_POST_IN_MANAGE_REPORT,{},{params:paramsHttp})

  }
  updateStatusReportPost(listReportPostID:number[],postID:number,statusPost:number):Observable<any>{
    // post-id=6&status=1
    // post-id=6&complaint-post-id=1&status=1
    let paramsHttp = new HttpParams({fromString:'post-id='+postID+'&status='+statusPost})
    return this.http.put(API_ADMIN_UPDATE_STATUS_REPORT_POST,{
      listReportPostID:listReportPostID
    },{params:paramsHttp})
  }

  // updateStatusReportPostHistory(listReportID:number):Observable<any>{
  //     return this.http.put(API_ADMIN_UPDATE_STATUS_REPORT_HISTORY,{listReportPostID:listReportID})
  // }

  getHistoryReport(postID:number,pageIndex:number):Observable<HistoryHandlePostResponse>{
    // http://localhost:8080/api/report/all-history-report-post?post-id=41&index-page=1
    //post-id=41&index-page=1
    let httpParams = new HttpParams({fromString:'post-id='+postID+'&index-page='+pageIndex})
    return this.http.get<HistoryHandlePostResponse>(API_HISTORY_HANDLE_REPORT_POST+'post-id='+postID+'&index-page='+pageIndex)
  }

}
