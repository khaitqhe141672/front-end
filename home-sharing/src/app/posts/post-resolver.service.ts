import {ActivatedRoute, ActivatedRouteSnapshot, Params, Resolve, RouterStateSnapshot} from "@angular/router";
import {Post, ResponsePost} from "./post.model";
import {Observable} from "rxjs";
import {DataStorageService} from "../shared/data-storage.service";
import {map, tap} from "rxjs/operators";
import {PostDetailService} from "./post-detail/post-detail.service";
import {Injectable} from "@angular/core";
import {PostDetail, ResponsePostDetail} from "./post-detail/post-detail.model";
@Injectable({providedIn:'root'})
export class PostResolverService implements  Resolve<ResponsePostDetail>{
  constructor(private dataStorage:DataStorageService,private postDetailService:PostDetailService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.dataStorage.fetchPostDetailData(+route.params['id']).pipe(
      tap(reponsePost=>{
        this.postDetailService.bindPostData(reponsePost.object as PostDetail);
      })
    )
  }

}
