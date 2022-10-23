import { Component, OnInit } from '@angular/core';
import {PostService} from "../post.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Post, ReponsePost} from "../post.model";
import {Subscription} from "rxjs";
import {DataStorageService} from "../../shared/data-storage.service";
import {PostDetailService} from "./post-detail.service";
import {Rate, RateResponse} from "../../shared/model/rate.model";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  id:number;
  postDetail:Post;
  postDetailResponse:ReponsePost;
  rateResponse:RateResponse
  rates:Rate[] = []
  constructor(private postService:PostService,private router:Router,private route:ActivatedRoute, private dataStorage:DataStorageService,private postDetailService:PostDetailService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id']
      this.postDetail = this.postDetailService.postDetail
    })
    this.getRate()
  }
  getRate(){
    this.postDetailService.getRatesByPostID(this.id).subscribe(
      responseRate =>{
        this.rateResponse = responseRate
        this.rates = responseRate.object
        console.log(this.rates[0])

      },
      error => console.log(error)
    )
  }
}
