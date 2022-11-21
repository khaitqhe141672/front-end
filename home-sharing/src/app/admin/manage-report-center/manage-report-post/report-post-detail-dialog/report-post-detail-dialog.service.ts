import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {DetailReportResponse} from "./report-post-detail.model";
import {API_ADMIN_LIST_REPORT_BY_POST} from "../../../../constant/api.constant";

@Injectable({providedIn:'root'})
export class ReportPostDetailDialogService{
  constructor(private http:HttpClient) {
  }
  getListReport(pageIndex:number,postID:number):Observable<DetailReportResponse>{
    let httpParams = new HttpParams({fromString:'post-id='+postID+'&index-page='+pageIndex})
    return this.http.get<DetailReportResponse>(API_ADMIN_LIST_REPORT_BY_POST,{params:httpParams})
  }
}
