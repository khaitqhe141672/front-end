import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReportPostResponse} from "./manage-report-post.model";
import {API_ADMIN_MANAGE_POST_RATE} from "../../../constant/api.constant";

@Injectable({providedIn:'root'})
export class ManageReportPostService{
  constructor(private http:HttpClient) {
  }
  getReportPost(pageIndex:number):Observable<ReportPostResponse>{
    return this.http.get<ReportPostResponse>(API_ADMIN_MANAGE_POST_RATE+pageIndex)
  }
}
