import {Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {ReportPostDetail, ReportPostResponse} from "./manage-report-post.model";
import {map, switchMap} from "rxjs/operators";
import {ManageReportPostService} from "./manage-report-post.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ReportPostDetailDialogComponent} from "./report-post-detail-dialog/report-post-detail-dialog.component";

@Component({
  selector: 'app-manage-report-post',
  templateUrl: './manage-report-post.component.html',
  styleUrls: ['./manage-report-post.component.css']
})
export class ManageReportPostComponent implements OnInit {
  displayedColumns: string[] = ['postID', 'title','description','numbersOfReport','status' ];
  dataSource:MatTableDataSource<ReportPostDetail>
  pageIndex:number = 1
  totalPaginator = 1
  loadReportPostObs:Observable<ReportPostDetail[]>
  subLoadReportPost:Subscription
  refreshReportPost = new BehaviorSubject<boolean>(true)
  dataSourceL:MatTableDataSource<ReportPostDetail>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  reasonReportDetailDialog:MatDialogRef<ReportPostDetailDialogComponent>

  constructor(private manageReportPostService:ManageReportPostService,
  private dialog:MatDialog) { }

  ngOnInit(): void {
    this.onLoadingReportPost()
  }

  onLoadingReportPost(){
    this.loadReportPostObs = this.refreshReportPost.pipe(switchMap(_=>
      this.manageReportPostService.getReportPost(this.pageIndex).pipe(map(responseData=>{
        let responseReportPost = responseData as ReportPostResponse
        this.totalPaginator = responseData.data.sizePage
        return responseReportPost.data.reportPostList
      }))
    ))
    if(this.subLoadReportPost) this.subLoadReportPost.unsubscribe()
    this.loadReportPostObs.subscribe(data=>{
      this.dataSource = new MatTableDataSource<ReportPostDetail>(data)
    })
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showMore(data) {
    let reportPostDetail = data as ReportPostDetail
      console.log(data)
    this.reasonReportDetailDialog = this.dialog.open(ReportPostDetailDialogComponent,{
      data:reportPostDetail.postID,hasBackdrop:true,
    })

  }

  handlePageEvent($event: PageEvent) {
      this.pageIndex = $event.pageIndex
    this.onLoadingReportPost()
  }
}
