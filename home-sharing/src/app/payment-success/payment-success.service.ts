import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_PAYMENT_POST_SUCCESS} from "../constant/api.constant";

@Injectable({providedIn:'root'})
export class PaymentSuccessService{
  constructor(private http:HttpClient) {
  }
  pushPaymentSuccess(packetPaymentID,postID):Observable<any>{
    let httpParams = new HttpParams({fromString:'post-id='+postID+'&payment-package-id='+packetPaymentID})
    return this.http.post(API_PAYMENT_POST_SUCCESS,{},{params:httpParams})
  }
}
