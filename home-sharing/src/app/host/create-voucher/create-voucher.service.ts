import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_HOST_CREATE_VOUCHER} from "../../constant/api.constant";
import {Observable} from "rxjs";

@Injectable({providedIn:'root'})
export class CreateVoucherService{
  constructor(private http:HttpClient) {
  }
  createVoucher(name:string,des:string,pct:number,dueDay:number):Observable<any>{
    return this.http.post(API_HOST_CREATE_VOUCHER,[{
      name: name,
      description: des,
      percent: pct,
      dueDate: dueDay
    }])
  }
}
