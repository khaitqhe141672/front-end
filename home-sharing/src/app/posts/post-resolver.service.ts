import {ActivatedRoute, ActivatedRouteSnapshot, Params, Resolve, RouterStateSnapshot} from "@angular/router";
import {Post, ReponsePost} from "./post.model";
import {Observable} from "rxjs";
import {DataStorageService} from "../shared/data-storage.service";
import {map, tap} from "rxjs/operators";
import {PostDetailService} from "./post-detail/post-detail.service";
import {Injectable} from "@angular/core";
@Injectable({providedIn:'root'})
export class PostResolverService implements  Resolve<ReponsePost>{
  constructor(private dataStorage:DataStorageService,private postDetailService:PostDetailService,private route:ActivatedRoute) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.dataStorage.fetchPostDetailData(+route.params['id']).pipe(
      tap(reponsePost=>{
        this.postDetailService.bindPostData(reponsePost.object as Post);
      })
    )
  }

}
