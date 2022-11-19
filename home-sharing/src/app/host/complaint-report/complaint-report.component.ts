import {Component, Inject, OnInit} from '@angular/core';
import {ComplaintReportServices} from "./complaint-report.services";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {content, Data, IResponseReportPost} from "../../shared/model/report-post.model";
import {map, switchMap} from "rxjs/operators";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PostDetail} from "../../shared/model/post-list-host.model";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-complaint-report',
  templateUrl: './complaint-report.component.html',
  styleUrls: ['./complaint-report.component.css']
})

export class ComplaintReportComponent implements OnInit {

  totalPaginator: number
  pageIndex: number = 1
  displayedColumns: string[] = ['avatar', 'username', 'description', 'function'];
  dataSource: MatTableDataSource<content>

  constructor(private complaintReportService: ComplaintReportServices,
              @Inject(MAT_DIALOG_DATA) public data: PostDetail) {
  }

  loadListReportPostObs: Observable<content[]>
  subLoadReportPost: Subscription
  refreshListReportPost = new BehaviorSubject<boolean>(true)

  listReportPostResponse: Data
  listReportPost: content[]

  ngOnInit(): void {
    this.onLoadListReportPost();
  }

  onLoadListReportPost() {
    this.loadListReportPostObs = this.refreshListReportPost.pipe(
      switchMap(_ => this.complaintReportService.getAllReportPostByPostID(this.pageIndex, this.data.postID).pipe(map(data => {
        console.log(JSON.stringify(data))
        return data.listReportPost.content
      }))))
    if (this.subLoadReportPost) this.subLoadReportPost.unsubscribe()
    this.subLoadReportPost = this.loadListReportPostObs.subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  detailReportPost:content

  onClickShow(detailReportPost){
    this.detailReportPost = detailReportPost
    console.log(this.detailReportPost);
  }
}
