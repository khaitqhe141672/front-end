import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {API_BOOKING, API_VOUCHER_BY_POST_ID} from "../constant/api.constant";
import {BookingBody} from "../shared/model/booking.model";
import {catchError, tap} from "rxjs/operators";

@Injectable({providedIn:'root'})
export class BookingService{
  constructor(private http:HttpClient) {
  }
  bookingRequest(booking:BookingBody,postID:number):Observable<any>{
    console.log('booking data: '+booking.startDate)
    return this.http.post(API_BOOKING+postID,
      {
        startDate:booking.startDate,
        endDate:booking.endDate,
        note: 'note',
        totalMoney:booking.totalMoney,
        totalPerson:booking.totalPerson,
        postServices :booking.postServices,
        postVoucherID:booking.postVoucherID,
        totalPriceRoom:booking.totalPriceRoom,
        totalPriceService:booking.totalPriceService,
        discount :booking.discount,
        fullName:booking.fullName,
        email :booking.email,
        mobile :booking.mobile,
        }
    )
      .pipe(catchError(this.handleError),tap(responseData=>{
        console.log(responseData)
      }))
  }

  convertDate(date:string){
    let rs:string[] = date.split('-')
    return new Date(+rs[2],+rs[1]-1,+rs[0])
  }
  handleError(errorResponse:HttpErrorResponse){
    let errorMessage = 'An unknown error occurred!'
    // errorMessage = errorResponse.error.message
    return throwError(()=>new Error(errorMessage))
  }

  checkVoucherExist(postID:number,code:number):Observable<any>{
    let params =  new HttpParams({fromString:'post-id='+postID+'&'+'code='+code})
    return this.http.get<any>(API_VOUCHER_BY_POST_ID,{params:params})
  }
}
