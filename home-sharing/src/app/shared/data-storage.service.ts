import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PostService} from "../posts/post.service";
import { ReponsePost} from "../posts/post.model";
import {API_POST_DETAIL} from "../constant/api.constant";
import {take, tap} from "rxjs/operators";
import {PostDetailService} from "../posts/post-detail/post-detail.service";

@Injectable({providedIn:'root'})
export class DataStorageService{
  constructor(private http: HttpClient,private postService:PostService,private postDetailService:PostDetailService) {
  }

  fetchPostDetailData(id:number){
      return this.http.get<ReponsePost>(API_POST_DETAIL+id)
  }
}
