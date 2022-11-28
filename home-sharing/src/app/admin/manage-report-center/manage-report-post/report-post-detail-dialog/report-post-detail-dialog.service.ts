import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {DetailReportResponse} from "./report-post-detail.model";
import {
  API_ADMIN_LIST_REPORT_BY_POST,
  API_HISTORY_DETAIL_REPORT,
  API_HISTORY_HANDLE_REPORT_POST
} from "../../../../constant/api.constant";
import {DetailHistoryReportResponse} from "./history-report-detail.model";

@Injectable({providedIn:'root'})
export class ReportPostDetailDialogService{
  constructor(private http:HttpClient) {
  }
  getListReport(pageIndex:number,postID:number):Observable<DetailReportResponse>{
    let httpParams = new HttpParams({fromString:'post-id='+postID+'&index-page='+pageIndex})
    return this.http.get<DetailReportResponse>(API_ADMIN_LIST_REPORT_BY_POST,{params:httpParams})
  }
  getDetailListReport(historyHandleReportPostID:number,pageIndex:number):Observable<DetailHistoryReportResponse>{
    // http://localhost:8080/api/report/all-detail-history-report-post?history-id=13&index-page=1
    let httpParams = new HttpParams({fromString:'history-id='+historyHandleReportPostID+'&index-page='+pageIndex})
    return this.http.get<DetailHistoryReportResponse>(API_HISTORY_DETAIL_REPORT,{params:httpParams})
  }
}
