import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponseVoucher, ListVoucherData} from "../../shared/model/voucher-host.model";
import {API_HOST_MANAGE_VOUCHER} from "../../constant/api.constant";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class ManageVoucherServices {

  constructor(private http: HttpClient) {
  }

  getAllVoucherByHost(pageIndex: number): Observable<ListVoucherData> {
    return this.http.get<IResponseVoucher>(API_HOST_MANAGE_VOUCHER + pageIndex).pipe(map(res => res.data))
  }
}
