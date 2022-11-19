import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Data, IResponseReportPost, ListReportPost} from "../../shared/model/report-post.model";
import {API_HOST_LIST_REPORT_POST} from "../../constant/api.constant";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class ComplaintReportServices{

  constructor(private http: HttpClient) {
  }

  getAllReportPostByPostID(pageIndex: number, postID: number): Observable<Data>{
    return this.http.get<IResponseReportPost>(API_HOST_LIST_REPORT_POST + postID + "&index-page=" + pageIndex).pipe(map(res => res.data));
  }
}
