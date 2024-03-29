import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RateComponent} from "../rate/rate.component";
import {ReportHsComponent} from "../report-hs/report-hs.component";
import {HistoryBooking, ReportPostCustomer, ResponseHistory, ViewRateCustomerDto} from "./history_booking.model";
import {HistoryBookingService} from "./history-booking.service";
import {PageEvent} from "@angular/material/paginator";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import Swal from "sweetalert2";
import {DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-history-booking',
  templateUrl: './history-booking.component.html',
  styleUrls: ['./history-booking.component.css']
})
export class HistoryBookingComponent implements OnInit {
  homeStayName: string = 'Amazing good job e';
  pageIndex = 1
  totalPageIndex = 1
  rateDialogRef: MatDialogRef<RateComponent>
  reportHsDialogRef: MatDialogRef<ReportHsComponent>
  listHistory: HistoryBooking[] = []


  loadHistoryObs:Observable<HistoryBooking[]>
  subLoadHistory:Subscription
  refreshListHistoryBehaviorSub = new BehaviorSubject<boolean>(true)

  constructor( private router:Router,private datePipe:DatePipe,private historyBookingService: HistoryBookingService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.onLoadData()
  }

  onLoadData() {
    this.loadHistoryObs = this.refreshListHistoryBehaviorSub.pipe(
      switchMap(_=>this.historyBookingService.getHistoryBooking(this.pageIndex).pipe(map(response=>{
        this.totalPageIndex = response.data.sizePage
        return response.data.historyBooking
      })))
    )
    if(this.subLoadHistory) this.subLoadHistory.unsubscribe()
    this.subLoadHistory = this.loadHistoryObs.subscribe(data=>{
      this.listHistory = data
    })
    // this.historyBookingService.getHistoryBooking(this.pageIndex).subscribe(response => {
    //   let responseHistory = response as ResponseHistory
    //   this.listHistory = responseHistory.data.historyBooking
    //   this.totalPageIndex = response.data.sizePage
    // })
  }

  openRateDialog(bookingDetailID: number, statusRate: number,rateDetail:ViewRateCustomerDto) {

    this.rateDialogRef = this.dialog.open(RateComponent, {
      hasBackdrop: true,
      data: {
        id: bookingDetailID,
        statusRate:statusRate,
        rateDetail:rateDetail
      },
      width:'700px'
    })
    this.rateDialogRef.afterClosed().subscribe(_=>{
      this.onLoadData()
    })

  }


  openReportHsDialog(postID: number, bookingID: number,statusReportPost:number,reportPostCustomer:ReportPostCustomer[]) {
    this.reportHsDialogRef = this.dialog.open(ReportHsComponent, {
      hasBackdrop: true,
      data: {
        id: postID,
        type: 1,
        bookingID: bookingID,
        statusReportPost:statusReportPost,
        reportPostCustomer:reportPostCustomer
      }
    })
    this.reportHsDialogRef.afterClosed().subscribe(_=>{
      this.onLoadData()
    })
  }

  handlePageEvent(e: PageEvent) {
    console.log('page index: ' + e.pageIndex)
    this.pageIndex = ++e.pageIndex
    this.onLoadData()
  }

  onCancelBooking(postID: number) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn huỷ đặt phòng?',
      icon:'question',
      showCancelButton: true,
      confirmButtonText: 'Huỷ đặt phòng',
    }).then((result) => {
      if (result.isConfirmed) {
        this.historyBookingService.cancelBooking(postID).subscribe(
          (response)=>{
              if(response.status == 113){
                Swal.fire({
                  icon:'error',
                  title:'Huỷ phòng không thành công',
                  text:'Đã quá hạn huỷ phòng cho phép'
                })
              }else{
                Swal.fire({
                  icon:'success',
                  title:'Huỷ phòng thành công',
                })
                this.refreshListHistoryBehaviorSub.next(true)
              }
          },()=>{
            Swal.fire({
              icon:'error',
              title:'Huỷ phòng không thành công',
              text:'Vui lòng thử lại sau giây lát'
            })
          },()=>{

          }
        )
      }
    })

  }

  goToLink(number: string){
    let url = 'https://zalo.me/'+number
    window.open(url, "_blank");
  }

  goToPostDetail(postID: number) {
    this.router.navigate(['/posts/post-detail/'+postID])
  }
}

