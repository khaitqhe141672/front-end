import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {
  API_HOST_CHECKOUT,
  API_HOST_CONFIRM_BOOKING, API_HOST_LIST_CURRENT_BOOKING,
  API_HOST_LIST_PENDING_CONFIRM_BOOKING
} from "../../../constant/api.constant";
import {Observable} from "rxjs";
import {ListConfirmBookingResponse} from "./list-confirm-booking.model";

@Injectable({providedIn: 'root'})
export class ListConfirmBookingService {
  constructor(private http: HttpClient) {
  }

  getListPostPending(status: number, indexPage: number): Observable<ListConfirmBookingResponse> {
    //1:list confirm booking
    //2:list coming booking
    let params = new HttpParams({fromString: 'index-page=' + indexPage + '&status=' + status})
    let api = API_HOST_LIST_PENDING_CONFIRM_BOOKING
    if(status===3){
      params = new HttpParams({fromString: 'index-page=' + indexPage})
      api = API_HOST_LIST_CURRENT_BOOKING
    }
    return this.http.get<ListConfirmBookingResponse>(api, {params: params})
  }

  confirmBooking(bookingId: number, type: number): Observable<any> {
    //1:confirm
    //2:denied
    const httpParams = new HttpParams({fromString: 'booking-id=' + bookingId + '&type=' + type})
    return this.http.put(API_HOST_CONFIRM_BOOKING, {}, {
      params:httpParams
    })
  }

  confirmedReturnHS(bookingID:number):Observable<any>
  {
    return  this.http.put(API_HOST_CHECKOUT+bookingID,{})
  }
}
