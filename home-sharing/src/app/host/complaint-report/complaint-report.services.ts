import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Data, IResponseReportPost, ListReportPost} from "../../shared/model/report-post.model";
import {API_CREATE_COMPLAIN, API_HOST_LIST_REPORT_POST} from "../../constant/api.constant";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class ComplaintReportServices{

  constructor(private http: HttpClient) {
  }

  getAllReportPostByPostID(pageIndex: number, postID: number): Observable<Data>{
    return this.http.get<IResponseReportPost>(API_HOST_LIST_REPORT_POST + postID + "&index-page=" + pageIndex).pipe(map(res => res.data));
  }
  createComplain(postID:number,description,historyID:number):Observable<any>
  {
    // post-id=3&history-id=1
    let httpParams = new HttpParams({fromString:'post-id='+postID+'&history-id='+historyID})
    return this.http.post(API_CREATE_COMPLAIN+postID,{description:description},{
      params:httpParams
    })
  }
}
