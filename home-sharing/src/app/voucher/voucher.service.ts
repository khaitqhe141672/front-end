import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {API_VOUCHER_BY_POST_ID} from "../constant/api.constant";

@Injectable({providedIn:'root'})
export class VoucherService{
  constructor(private http:HttpClient) {
  }
  getVouchers(id:number):Observable<any>{
    return this.http.get(API_VOUCHER_BY_POST_ID+id)
  }
}
