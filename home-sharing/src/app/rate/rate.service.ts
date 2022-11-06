import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {API_RATE} from "../constant/api.constant";
import {catchError, tap} from "rxjs/operators";

@Injectable({providedIn:'root'})
export class RateService{
  constructor(private http:HttpClient) {
  }
  pushRate(bookingDetailID:number,comment:string,pointRate:number):Observable<any>{
    return this.http.post(API_RATE+bookingDetailID,{
      comment:comment,
      point:pointRate
    }).pipe(catchError(this.handleError),tap(response => console.log(response)))
  }
  handleError(errorResponse: HttpErrorResponse){
    let errorMessage = 'An unknown error occurred!'
    if(errorResponse.error||errorResponse.error.status){
      return throwError(()=>new Error(errorMessage))
    }
    switch (errorResponse.error.status){
      case 'NOT_FOUND':
       errorMessage= 'bookingDetail_id khong ton tai trong rate'
        break
      default:
        errorMessage = 'An unknown error occurred!'
        break
    }
     return throwError(()=>new Error(errorMessage))

  }
}
