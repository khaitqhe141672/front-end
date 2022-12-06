import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AdminDashBoardRResponse} from "./admin-dashboard.model";
import {API_ADMIN_DASH_BOARD} from "../../constant/api.constant";
@Injectable({providedIn:'root'})
export class AdminDashboardService{
  constructor(private http:HttpClient) {
  }
  getDataDashBoard():Observable<AdminDashBoardRResponse>{
    return this.http.get<AdminDashBoardRResponse>(API_ADMIN_DASH_BOARD)
  }
}
