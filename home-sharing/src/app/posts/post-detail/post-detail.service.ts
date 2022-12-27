import {Injectable} from "@angular/core";
import {Post} from "../post.model";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {RateResponse} from "../../shared/model/rate.model";
import {
  API_FAVORITE_POST,
  API_FOLLOW_HOST, API_LIKE_RATE,
  API_POST_DETAIL,
  API_RATE,
  API_RATE_BY_POST_ID,
  API_UTILITYS
} from "../../constant/api.constant";
import {UtilitiesResponse} from "../../shared/model/utility.model";
import {PostDetail, ResponsePostDetail} from "./post-detail.model";
import {ResponseFollow} from "../../shared/model/follow-host.model";
import {catchError, tap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class PostDetailService {
  constructor(private http: HttpClient) {
  }

  postDetail: PostDetail

  bindPostData(postDetail: PostDetail) {
    this.postDetail = postDetail
  }

  get ResponsePostData() {
    return this.postDetail
  }

  getRatesByPostID(id: number,indexPage:number): Observable<RateResponse> {
    const httpParams =new HttpParams({fromString:'post_id='+id+'&index-page='+indexPage})
    return this.http.get<RateResponse>(API_RATE_BY_POST_ID ,{
      params:httpParams
    })
  }

  getPostDetail(id:number):Observable<ResponsePostDetail>{
    return this.http.get<ResponsePostDetail>(API_POST_DETAIL+id)
  }

  followHost(hostID:number):Observable<ResponseFollow>{
    return this.http.post<ResponseFollow>(API_FOLLOW_HOST+hostID,null).pipe(
      catchError(this.handleError),tap(responseData=>{
        console.log(responseData)
      })
    )
  }
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', errorResponse.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${errorResponse.status}, body was: `, errorResponse.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  likeRate(rateID:number,postID:number,type:number):Observable<any>{
    // type=2&rate-id=1
    let params = new HttpParams({fromString:'rate-id='+rateID+'&post-id='+postID+'&type='+type});
    // params.append('type',type+"")
    // params.append('rate-id',rateID+"")


    return this.http.post<any>(API_LIKE_RATE,null,{
      params:params
    }).pipe(
      catchError(this.handleError)
    );
  }

  favoritePost(postID:number):Observable<any>{
    let params = new HttpParams({fromString:'post-id='+postID})
    return this.http.post(API_FAVORITE_POST,null,{params:params}).pipe(catchError(this.handleError))
  }
}
