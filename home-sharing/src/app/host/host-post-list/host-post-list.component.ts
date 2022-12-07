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
import {ConfirmDialogComponent} from "../../shared/dialog/confirm-dialog/confirm-dialog.component";
import {PostVoucherDialogComponent} from "./post-voucher-dialog/post-voucher-dialog.component";
import {VoucherComponent} from "../../voucher/voucher.component";
import {Voucher} from "../../shared/model/voucher.model";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-host-post-list',
  templateUrl: './host-post-list.component.html',
  styleUrls: ['./host-post-list.component.css']
})
export class HostPostListComponent implements OnInit {

  complaintReportPickerDialogRef: MatDialogRef<ComplaintReportComponent>
  displayedColumns: string[] = ['id', 'titleHomestay', 'status', 'date', 'report','rate', 'function'];
  dataSource: MatTableDataSource<PostDetail>
  updateStatusPostDiaLog:MatDialogRef<boolean>
  voucherDialogRef:MatDialogRef<PostVoucherDialogComponent>
  totalPaginator: number = 0
  pageIndex: number = 1

  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>

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
        this.totalPaginator = data.SizePage
        // console.log(JSON.stringify(data))
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

  convertTo2Decimal(data:number){
    return Math.round((data+Number.EPSILON)*10)/10
  }

  updateStatusPost(postID: number,status:number) {
    this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent,{hasBackdrop:true})
    this.confirmDialogRef.afterClosed().subscribe(response=>{
      if(response as boolean){
        this.hostPostListService.updateStatusPost(postID,status).subscribe(
          response =>{this.refreshListPost.next(true)}
        )}}
    )
  }

  onPayment(postID: number) {
    this.router.navigate(['../payment/'+postID])
  }

  openVoucher(postID: number) {
    this.voucherDialogRef = this.dialog.open(PostVoucherDialogComponent,{
      data:postID,
      hasBackdrop:true})
    this.voucherDialogRef.afterClosed().subscribe(response=>{
      let voucher:Voucher[] = response
      let listVoucherID:number[] = voucher.map(voucher=>voucher.idVoucher)
      console.log(listVoucherID)
      this.hostPostListService.updateVoucher(postID,listVoucherID).subscribe(response=>{
        console.log(response)
      })
    })
  }

  openPostDetail(postID: number) {
    this.router.navigate(['../posts/post-detail/'+postID])
  }

  handlePageEvent(e: PageEvent) {
      console.log('page index: '+e.pageIndex)
    this.pageIndex = ++e.pageIndex
    this.onLoadData()
  }
}
