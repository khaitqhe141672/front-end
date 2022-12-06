import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {HostDashBoardResponse} from "./host-dashboar.model";
import {Observable} from "rxjs";
import {API_HOST_DASH_BOARD} from "../../constant/api.constant";
@Injectable({providedIn:'root'})
export class HostDashboardService{
  constructor(private http:HttpClient) {
  }
  getHostDataDashBoard():Observable<HostDashBoardResponse>{
    return this.http.get<HostDashBoardResponse>(API_HOST_DASH_BOARD)
  }
}
