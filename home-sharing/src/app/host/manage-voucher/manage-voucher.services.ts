import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponseVoucher, ListVoucherData} from "../../shared/model/voucher-host.model";
import {API_HOST_MANAGE_VOUCHER, API_HOST_VOUCHER_STATUS_UPDATE} from "../../constant/api.constant";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class ManageVoucherServices {

  constructor(private http: HttpClient) {
  }

  getAllVoucherByHost(pageIndex: number): Observable<ListVoucherData> {
    return this.http.get<IResponseVoucher>(API_HOST_MANAGE_VOUCHER + pageIndex).pipe(map(res => res.data))
  }
  changeStatusVoucher(status:number,voucherID:number):Observable<any>{
    const httpParams = new HttpParams({fromString:'status='+status+'&voucher-id='+voucherID})
    return this.http.put(API_HOST_VOUCHER_STATUS_UPDATE,{},{params:httpParams})
  }
}
