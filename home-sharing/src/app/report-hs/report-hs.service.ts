import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {
  API_CUS_REPORT_RATE_TYPE,
  API_HOST_REPORT_RATE,
  API_HOST_REPORT_RATE_TYPE,
  API_REPORT_HS
} from "../constant/api.constant";
import {catchError, tap} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {RateTypeResponse} from "./report-hs-type.model";

@Injectable({providedIn:'root'})
export class ReportHsService{
  constructor(private http:HttpClient) {

  }
  pushReportHS(postID:number,bookingID:number,typeReportID:number,description:string,type:number){
    let api = API_HOST_REPORT_RATE+postID
    if(type == 1) {
      api = API_REPORT_HS+'post-id='+postID+'&booking-id='+bookingID
    }
    console.log('report: '+api)
    return this.http.post(api,{
      description:description,
      reportTypeID:typeReportID
    }).pipe(catchError(this.handleError),tap(res=>console.log(res)))
  }

  handleError(errorResponse: HttpErrorResponse){
    let errorMessage = 'An unknown error occurred!'
    if(errorResponse.error||errorResponse.error.status){
      return throwError(()=>new Error(errorMessage))
    }

    return throwError(()=>new Error(errorResponse.error.status))

  }
  getReportType(type:number):Observable<RateTypeResponse>{
    let api = API_HOST_REPORT_RATE_TYPE
    if(type==1) api = API_CUS_REPORT_RATE_TYPE
    return this.http.get<RateTypeResponse>(api)
  }
}
