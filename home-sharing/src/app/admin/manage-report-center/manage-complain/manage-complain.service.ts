import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_ADMIN_GET_COMPLAIN} from "../../../constant/api.constant";
import {Observable} from "rxjs";
import {ListComplainResponse} from "./complain.model";

@Injectable({providedIn:'root'})
export class ManageComplainService{
  constructor(private http:HttpClient) {

  }
  getListComplain(pageIndex:number):Observable<ListComplainResponse>{
    return this.http.get<ListComplainResponse>(API_ADMIN_GET_COMPLAIN+pageIndex)
  }
}
