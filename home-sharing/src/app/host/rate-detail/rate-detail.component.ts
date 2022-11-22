import {Component, OnInit} from '@angular/core';
import {RateDetailService} from "./rate-detail.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {DetailRateDtoList, PostDetailOfRate} from "./rate-detail.model";
import {map, switchMap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-rate-detail',
  templateUrl: './rate-detail.component.html',
  styleUrls: ['./rate-detail.component.css']
})
export class RateDetailComponent implements OnInit {
  totalPage = 1
  pageIndex = 1
  postID: number
  postDetail:PostDetailOfRate
  loadListRateDetailObj: Observable<PostDetailOfRate>
  listRateDetail:DetailRateDtoList[]
  subLoadListDetail: Subscription
  refreshListRateDetail = new BehaviorSubject<boolean>(true)

  constructor(private rateDetailService: RateDetailService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        this.postID = +params.get('id')
        this.onLoadListRateDetail(this.pageIndex, this.postID)

        console.log('onInit id = ' + this.postID)
      }, error => {
      console.log('some error occurs')
      },
      () => {

      }
    )
  }

  onLoadListRateDetail(pageIndex: number, postId: number) {
    this.loadListRateDetailObj = this.refreshListRateDetail
      .pipe(switchMap(_ => this.rateDetailService.getListRate(pageIndex, postId)
        .pipe(map(data => {
          let rateDetailData = data.data
          this.totalPage = rateDetailData.sizePage
          this.listRateDetail = rateDetailData.listDetailRate.detailRateDtoList
          return rateDetailData.listDetailRate
        }))
      ))
    if(this.subLoadListDetail) this.subLoadListDetail.unsubscribe()
    this.subLoadListDetail = this.loadListRateDetailObj.subscribe(data=>{
      this.postDetail = data
    })
    // this.rateDetailService.getListRate(pageIndex,postId).subscribe(response=>{
    //   console.log(JSON.stringify(response.data.listDetailRate))
    // })
  }

  counter(i: number) {
    return new Array(i);
  }
}
