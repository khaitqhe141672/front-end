import {Injectable} from "@angular/core";
import {Post} from "../post.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RateResponse} from "../../shared/model/rate.model";
import {API_RATE, API_UTILITYS} from "../../constant/api.constant";
import {UtilitiesResponse} from "../../shared/model/utility.model";

@Injectable({providedIn:'root'})
export class PostDetailService{
  constructor(private http:HttpClient) {
  }
    postDetail:Post
  bindPostData(postDetail:Post){
      this.postDetail = postDetail
  }
  get ResponsePostData(){
      return this.postDetail
  }

  getRatesByPostID(id:number):Observable<RateResponse>
  {
      return this.http.get<RateResponse>(API_RATE+id)
  }
  // getUtilitysByPostID(id:number):Observable<any>{
  //
  // }

}
