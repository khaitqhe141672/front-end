import {HttpClient} from "@angular/common/http";
import {API_ADMIN_MANAGE_POST} from "../../constant/api.constant";
import {ManagePostResponse, PostTableDetail} from "./manage-post.model";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
@Injectable({providedIn:'root'})
export class ManagePostService{
  constructor(private http:HttpClient) {

  }

  getAllPost(index:number):Observable<ManagePostResponse>{
    return this.http.get<ManagePostResponse>(API_ADMIN_MANAGE_POST+index)
  }
}
