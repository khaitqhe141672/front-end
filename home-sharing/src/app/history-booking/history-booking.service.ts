import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_VIEW_HISTORY_BOOKING} from "../constant/api.constant";
import {Observable} from "rxjs";
import {ResponseHistory} from "./history_booking.model";

@Injectable({providedIn:'root'})
export class HistoryBookingService{
  constructor(private http:HttpClient) {
  }
  getHistoryBooking():Observable<ResponseHistory>{
    return this.http.get<ResponseHistory>(API_VIEW_HISTORY_BOOKING)
  }
}
