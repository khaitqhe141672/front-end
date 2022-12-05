import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserInfoResponse} from "./profile.model";
import {API_PROFILE, API_UPDATE_AVATAR, API_UPDATE_PROFILE} from "../constant/api.constant";

@Injectable({providedIn:'root'})
export class ProfileService{
  constructor(private http:HttpClient) {
  }
  getUserInfo():Observable<UserInfoResponse>{
    return this.http.get<UserInfoResponse>(API_PROFILE)
  }
  updateAvatar(imgData:FormData){
    let headers: any = new Headers({
      'Content-type': 'multipart/form-data',
    });
    return this.http.put(API_UPDATE_AVATAR,imgData,{
      headers
    })
  }
  updateProfile(name:string,phoneNumber:string,address:string){
    return this.http.put(API_UPDATE_PROFILE,{
      fullName:name,
      mobile:phoneNumber,
      address:address
    })
  }
}
