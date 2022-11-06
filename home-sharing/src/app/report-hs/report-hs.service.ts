import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {API_REPORT_HS} from "../constant/api.constant";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({providedIn:'root'})
export class ReportHsService{
  constructor(private http:HttpClient) {

  }
  pushReportHS(postID:number,typeReportID:number,description:string){
    return this.http.post(API_REPORT_HS+postID,{
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
}
