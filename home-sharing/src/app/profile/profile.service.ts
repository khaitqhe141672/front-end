import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserInfoResponse} from "./profile.model";
import {API_PROFILE} from "../constant/api.constant";

@Injectable({providedIn:'root'})
export class ProfileService{
  constructor(private http:HttpClient) {
  }
  getUserInfo():Observable<UserInfoResponse>{
    return this.http.get<UserInfoResponse>(API_PROFILE)
  }
}
