import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {CustomersData, ICustomersResponse} from "../../shared/model/account-customer.model";
import {API_ACCOUNTS_CUSTOMER} from "../../constant/api.constant";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class ManagerAccountCustomerServices {
  constructor(private http: HttpClient) {
  }

  getListCustomerAccount(pageIndex: number): Observable<CustomersData> {
    return this.http.get<ICustomersResponse>(API_ACCOUNTS_CUSTOMER + pageIndex).pipe(map(res => res.data))
  }
}
