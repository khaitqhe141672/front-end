import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_PAYMENT_POST} from "../constant/api.constant";
import {PaymentResponse} from "./payment.component";

@Injectable({providedIn:'root'})
export class PaymentService{
  constructor(private http:HttpClient) {
  }
  doPayment(postID:number,packetPayment:number):Observable<PaymentResponse>{
    return this.http.post<PaymentResponse>(API_PAYMENT_POST,{
      postID: postID,
      paymentPackageID: packetPayment
    })
  }
}
