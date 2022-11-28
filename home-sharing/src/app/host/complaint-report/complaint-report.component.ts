import {Component, Inject, OnInit} from '@angular/core';
import {ComplaintReportServices} from "./complaint-report.services";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {content, Data, IResponseReportPost} from "../../shared/model/report-post.model";
import {map, switchMap} from "rxjs/operators";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PostDetail} from "../../shared/model/post-list-host.model";
import {MatTableDataSource} from "@angular/material/table";
import {ManageReportPostService} from "../../admin/manage-report-center/manage-report-post/manage-report-post.service";
import {
  ListHistoryReportPost
} from "../../admin/manage-report-center/history-handle-report/history-handle-report-post.model";
import {
  DetailReportPost
} from "../../admin/manage-report-center/manage-report-post/report-post-detail-dialog/report-post-detail.model";
import {
  ReportPostDetailDialogService
} from "../../admin/manage-report-center/manage-report-post/report-post-detail-dialog/report-post-detail-dialog.service";
import {
  ListDetailHistoryReportPost
} from "../../admin/manage-report-center/manage-report-post/report-post-detail-dialog/history-report-detail.model";
import {CreateComplaintReportComponent} from "./create-complaint-report/create-complaint-report.component";

@Component({
  selector: 'app-complaint-report',
  templateUrl: './complaint-report.component.html',
  styleUrls: ['./complaint-report.component.css']
})

export class ComplaintReportComponent implements OnInit {
  postID:number = 0
  historyHandleReportPostID:number = 0

  totalPaginator: number
  pageIndex: number = 1
  pageIndexDetail:number = 1
  displayedColumns: string[] = ['postID', 'title', 'statusPost', 'totalReportPost','function'];
  displayedColumnsDetail: string[] = [ 'username', 'reportTypeName', 'description','function'];

  dataSource: MatTableDataSource<ListHistoryReportPost>
  dataSourceDetail:MatTableDataSource<ListDetailHistoryReportPost>
  appealComplainRef:MatDialogRef<CreateComplaintReportComponent>

  constructor(private complaintReportService: ComplaintReportServices,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: PostDetail,private manageReportPostService:ManageReportPostService,private reportPostDetailService:ReportPostDetailDialogService) {
  }

  loadListHistoryReportObs:Observable<ListHistoryReportPost[]>
  subLoadListHistoryReport:Subscription
  refreshListHistoryReport = new BehaviorSubject<boolean>(true)

  loadListDetailReportObs:Observable<ListDetailHistoryReportPost[]>
  subListDetailReportReport:Subscription
  refreshListDetailReport = new BehaviorSubject<boolean>(true)


  listDetailReport:DetailReportPost[] = []

  ngOnInit(): void {
    this.onLoadHistoryBeReported()
  }


  onLoadHistoryBeReported(){
    this.loadListHistoryReportObs = this.refreshListHistoryReport.pipe(
      switchMap(_=>this.manageReportPostService.getHistoryReport(this.data.postID,this.pageIndex).pipe(
        map(data=>{
          return data.data.listHistoryReportPost
        }))))
    if(this.subLoadListHistoryReport) this.subLoadListHistoryReport.unsubscribe()
    this.subLoadListHistoryReport = this.loadListHistoryReportObs.subscribe(data=>{
      this.dataSource =new MatTableDataSource(data)
    })
  }

  detailReportPost:content

  onClickShow(historyHandleReportPostID:number,postID:number){
    this.postID = postID
    console.log('historyHandleReportPostID: '+historyHandleReportPostID)
    this.historyHandleReportPostID = historyHandleReportPostID
    this.loadListDetailReportObs = this.refreshListDetailReport.pipe(
      switchMap(_=>this.reportPostDetailService.getDetailListReport(historyHandleReportPostID,this.pageIndexDetail).pipe(
          map(data=>{
            console.log(data.data.listDetailHistoryReportPost)
            return data.data.listDetailHistoryReportPost
          })
        )
      )
    )
    if(this.subListDetailReportReport) this.subListDetailReportReport.unsubscribe()
    this.subListDetailReportReport = this.loadListDetailReportObs.subscribe(data=>{
      this.dataSourceDetail = new MatTableDataSource(data)
    })
  }

  onComplainHandling(){
    console.log('post id: '+this.postID)
    console.log('history: '+this.historyHandleReportPostID)
    if(this.postID==0) {
      console.log('onComplainHandling postID: '+this.postID )
    }
    this.appealComplainRef = this.dialog.open(CreateComplaintReportComponent,{
      hasBackdrop:true,
      data:{postID:this.postID,historyHandleReportPostID:this.historyHandleReportPostID}
    })
  }
}
