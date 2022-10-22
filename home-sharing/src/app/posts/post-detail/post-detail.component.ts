import { Component, OnInit } from '@angular/core';
import {PostService} from "../post.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Post, ReponsePost} from "../post.model";
import {Subscription} from "rxjs";
import {DataStorageService} from "../../shared/data-storage.service";
import {PostDetailService} from "./post-detail.service";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  id
  postDetail:Post
  postDetailResponse:ReponsePost
  constructor(private postService:PostService,private router:Router,private route:ActivatedRoute, private dataStorage:DataStorageService,private postDetailService:PostDetailService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id']
      this.postDetail = this.postDetailService.postDetail
    })
  }
}
