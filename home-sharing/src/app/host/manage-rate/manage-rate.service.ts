import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ManageRateResponse} from "./manage-rate.model";
import {API_HOST_MANAGE_LIST_RATE} from "../../constant/api.constant";

@Injectable({providedIn:'root'})
export class ManageRateService{
  constructor(private http:HttpClient) {
  }
  getListRateManager(indexPage:number):Observable<ManageRateResponse>{
    return this.http.get<ManageRateResponse>(API_HOST_MANAGE_LIST_RATE+indexPage)
  }
}
