import {Injectable} from "@angular/core";
import {Post} from "../post.model";

@Injectable({providedIn:'root'})
export class PostDetailService{
    postDetail:Post
  bindPostData(postDetail:Post){
      this.postDetail = postDetail
  }
  get ResponsePostData(){
      return this.postDetail
  }
}
