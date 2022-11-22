import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ComplaintReportComponent} from "../complaint-report/complaint-report.component";
import {MatTableDataSource} from "@angular/material/table";
import {CustomerDetail} from "../../shared/model/account-customer.model";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {PostDetail} from "../../shared/model/post-list-host.model";
import {map, switchMap} from "rxjs/operators";
import {HostPostListServices} from "./host-post-list-services";
import {ListReportPost} from "../../shared/model/report-post.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-host-post-list',
  templateUrl: './host-post-list.component.html',
  styleUrls: ['./host-post-list.component.css']
})
export class HostPostListComponent implements OnInit {

  complaintReportPickerDialogRef: MatDialogRef<ComplaintReportComponent>
  displayedColumns: string[] = ['id', 'titleHomestay', 'status', 'date', 'report', 'function'];
  dataSource: MatTableDataSource<PostDetail>

  totalPaginator: number
  pageIndex: number = 1

  constructor(private dialog: MatDialog,private router:Router,
              private hostPostListService: HostPostListServices) {
  }

  loadListPostObs: Observable<PostDetail[]>
  subLoadPost: Subscription
  refreshListPost = new BehaviorSubject<boolean>(true)

  ngOnInit(): void {
    this.onLoadData();
  }

  onOpenComplaintReport(data) {

    let reportPostDetail: PostDetail = data

    this.complaintReportPickerDialogRef = this.dialog.open(ComplaintReportComponent, {
      data: reportPostDetail,
      hasBackdrop: true
    })
    this.complaintReportPickerDialogRef.afterClosed().subscribe(res => {
      this.refreshListPost.next(true)
    })
  }

  onLoadData() {
    this.loadListPostObs = this.refreshListPost.pipe(
      switchMap(_ => this.hostPostListService.getAllPostByHost(this.pageIndex).pipe(map(data => {
        // this.totalPaginator = data
        console.log(JSON.stringify(data))
        return data.listPost
      }))))
    if (this.subLoadPost) this.subLoadPost.unsubscribe()
    this.subLoadPost = this.loadListPostObs.subscribe(data => {
      this.dataSource = new MatTableDataSource(data)

    })
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /*chua phan page*/

  onEditPost(postID: number) {
    this.router.navigate(['../posts/post-edit/'+postID])
  }
}
