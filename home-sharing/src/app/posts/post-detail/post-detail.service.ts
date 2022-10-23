import {Injectable} from "@angular/core";
import {Post} from "../post.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RateResponse} from "../../shared/model/rate.model";
import {API_RATE} from "../../constant/api.constant";

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
}
