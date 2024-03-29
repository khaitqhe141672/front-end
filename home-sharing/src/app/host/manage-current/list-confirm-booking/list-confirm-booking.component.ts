import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {BookingPostVoucherDto, BookingServiceDto, ListBooking} from "./list-confirm-booking.model";
import {ListConfirmBookingService} from "./list-confirm-booking.service";
import {map, switchMap} from "rxjs/operators";
import Swal from "sweetalert2";
import {PageEvent} from "@angular/material/paginator";
import {BookingDetailComponent} from "../../booking-detail/booking-detail.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-list-confirm-booking',
  templateUrl: './list-confirm-booking.component.html',
  styleUrls: ['./list-confirm-booking.component.css']
})
export class ListConfirmBookingComponent implements OnInit {
  bookingDetail: MatDialogRef<BookingDetailComponent>
  displayedColumns: string[] = ['id', 'title', 'userBooking', 'startDate', 'endDate', 'totalPerson', 'totalMoney', 'totalService', 'note', 'action'];
  dataSource: MatTableDataSource<ListBooking>
  pageIndex = 1
  totalPagePagination: number = 1
  /*
  * 1:pending confirm
  * 2:confirmed booking
  * 3:coming date booking
  * 4:return hs
  * 5:cancel booking
  * */


  loadListPendingObs: Observable<ListBooking[]>
  subLoadListPending: Subscription
  refreshListPending = new BehaviorSubject<boolean>(true)
  isLoading = false;

  constructor(private dialog: MatDialog,private listConfirmBookingService: ListConfirmBookingService) {
  }

  ngOnInit(): void {
    this.onLoadListBookingPending()
  }

  onLoadListBookingPending() {
    this.loadListPendingObs = this.refreshListPending.pipe(switchMap(_ =>
      this.listConfirmBookingService.getListPostPending(1, this.pageIndex).pipe(map(response => {
        this.totalPagePagination = response.data.sizePage
        console.log('total size: '+this.totalPagePagination)
        return response.data.listBooking
      }))
    ))
    if (this.subLoadListPending) this.subLoadListPending.unsubscribe()
    this.subLoadListPending = this.loadListPendingObs.subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = ++e.pageIndex
    this.onLoadListBookingPending()
  }


  handleBooking(bookingID: number, type: number) {
    if (this.isLoading) return
    this.isLoading = true
    this.listConfirmBookingService.confirmBooking(bookingID, type).subscribe(response => {
      this.isLoading = false
      console.log(response)
      this.refreshListPending.next(true)
    }, () => {
      this.isLoading = false
      Swal.fire({
        icon:'error',
        title:'Quá thời gian xử lý',
        text:'Vui lòng kiểm tra lại kết nối mạng!'
      })
    }, () => {
      this.isLoading = false
      Swal.fire({
        icon: 'success',
        title: type==1?'Đã xác nhận đặt phòng':'Đã từ chối đặt phòng'
      })
    })
  }

  openDetailBooking(bookingServiceDtos: BookingServiceDto[],note:string,bookingPostVoucherDto:BookingPostVoucherDto) {
    console.log('note: '+note)
    this.bookingDetail = this.dialog.open(BookingDetailComponent,{
      data:{
        bookingServiceDtos:bookingServiceDtos,
        bookingPostVoucherDto:bookingPostVoucherDto,
        note:note
      },
      hasBackdrop:true
    })
  }
}
