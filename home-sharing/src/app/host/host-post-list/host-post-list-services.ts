import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponsePost, ListPostData} from "../../shared/model/post-list-host.model";
import {API_HOST_MANAGE_POST, API_HOST_UPDATE_STATUS_POST} from "../../constant/api.constant";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class HostPostListServices {

  constructor(private http: HttpClient) {
  }

  getAllPostByHost(pageIndex: number): Observable<ListPostData> {
    return this.http.get<IResponsePost>(API_HOST_MANAGE_POST + pageIndex).pipe(map(res => res.data));
  }
  updateStatusPost(postID:number,status:number):Observable<any>{
    const httpParams =  new HttpParams({fromString:'post-id='+postID+'&status='+status})
    return this.http.put(API_HOST_UPDATE_STATUS_POST,{},{params:httpParams})
  }
}
