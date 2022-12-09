import {AfterViewInit, Component, OnInit} from '@angular/core';
import {RateDetailService} from "./rate-detail.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {DetailRateDtoList, PostDetailOfRate, RateDetailResponseData} from "./rate-detail.model";
import {map, switchMap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ReportHsComponent} from "../../report-hs/report-hs.component";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-rate-detail',
  templateUrl: './rate-detail.component.html',
  styleUrls: ['./rate-detail.component.css']
})
export class RateDetailComponent implements OnInit {
  totalPage = 1
  pageIndex = 1
  postID: number
  postDetail:PostDetailOfRate  = {postID:null,detailRateDtoList:[],avgRate:null,statusPost:null,title:''}
  loadListRateDetailObj: Observable<PostDetailOfRate>
  listRateDetail:DetailRateDtoList[]
  subLoadListDetail: Subscription
  refreshListRateDetail = new BehaviorSubject<boolean>(true)

  reportRateDialogRef:MatDialogRef<ReportHsComponent>
  constructor(private dialog:MatDialog,private rateDetailService: RateDetailService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        this.postID = +params.get('id')
        this.onLoadListRateDetail( this.postID)

        // console.log('onInit id = ' + this.postID)
      }, error => {
      console.log('some error occurs')
      },
      () => {

      }
    )
  }
   rateDetailData:RateDetailResponseData
  onLoadListRateDetail( postId: number) {
    this.loadListRateDetailObj = this.refreshListRateDetail
      .pipe(switchMap(_ => this.rateDetailService.getListRate(this.pageIndex, postId)
        .pipe(map(data => {
          this.rateDetailData = data.data
          this.totalPage = this.rateDetailData.sizePage
          this.listRateDetail = this.rateDetailData.listDetailRate.detailRateDtoList
          return this.rateDetailData.listDetailRate
        }))
      ))
    if(this.subLoadListDetail) this.subLoadListDetail.unsubscribe()
    this.subLoadListDetail = this.loadListRateDetailObj.subscribe(data=>{
      this.postDetail = data
      this.postDetail.avgRate =Math.round(this.postDetail.avgRate * 10) / 10
    })
    // this.rateDetailService.getListRate(pageIndex,postId).subscribe(response=>{
    //   console.log(JSON.stringify(response.data.listDetailRate))
    // })
  }

  counter(i: number) {
    return new Array(i);
  }

  onReportRate(rateID: number) {
    this.reportRateDialogRef = this.dialog.open(ReportHsComponent,{
      hasBackdrop:true,
      data:{
        id:rateID,
        type:2
      }
    })
  }

  handlePageEvent(e: PageEvent) {
    console.log('page index: '+e.pageIndex)
    this.pageIndex = ++e.pageIndex
    this.onLoadListRateDetail(this.postID)
  }
}
