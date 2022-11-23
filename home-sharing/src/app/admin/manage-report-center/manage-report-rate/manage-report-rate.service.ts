import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReportRateResponse} from "./manage-report-rate.model";
import {API_ADMIN_MANAGE_REPORT_RATE, API_ADMIN_UPDATE_STATUS_REPORT_RATE} from "../../../constant/api.constant";
import {Injectable} from "@angular/core";
@Injectable({providedIn:'root'})
export class ManageReportRateService{
  constructor(private http:HttpClient) {

  }
  getListReportRate(indexPage:number):Observable<ReportRateResponse>{
      return this.http.get<ReportRateResponse>(API_ADMIN_MANAGE_REPORT_RATE+indexPage)
  }
  updateStatusReportRate(reportRateId:number,status:number):Observable<any>{
    // http://localhost:8080/api/report/update-status-report-rate?report-rate-id=1&status=2
    const httpParams = new HttpParams({fromString:'report-rate-id='+reportRateId+'&status='+status})
    return this.http.put(API_ADMIN_UPDATE_STATUS_REPORT_RATE,{},{params:httpParams})
  }
}
