import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CustomerDetail} from "../../../shared/model/account-customer.model";
import {ListBooking} from "../list-confirm-booking/list-confirm-booking.model";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {ListConfirmBookingService} from "../list-confirm-booking/list-confirm-booking.service";
import {map, switchMap} from "rxjs/operators";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-current-booking',
  templateUrl: './current-booking.component.html',
  styleUrls: ['./current-booking.component.css']
})
export class CurrentBookingComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title','userBooking','startDate','endDate','totalPerson','totalMoney','totalService','note','action'];
  dataSource: MatTableDataSource<ListBooking>
  pageIndex = 1
  totalPagePagination:number = 1
  /*
  * 1:pending confirm
  * 2:confirmed booking
  * 3:coming date booking
  * 4:return hs
  * 5:cancel booking
  * */


  loadListBookConfirmedObs:Observable<ListBooking[]>
  subLoadListBookingConfirmed:Subscription
  refreshListBookingConfirmed = new BehaviorSubject<boolean>(true)

  constructor(private listConfirmBookingService:ListConfirmBookingService) { }

  ngOnInit(): void {
    this.onLoadListBookingConfirmed()
  }

  onLoadListBookingConfirmed(){
    this.loadListBookConfirmedObs = this.refreshListBookingConfirmed.pipe(switchMap(_=>
      this.listConfirmBookingService.getListPostPending(3,this.pageIndex).pipe(map(response=>{
        this.totalPagePagination = response.data.sizePage
        return response.data.listBooking
      }))
    ))
    if(this.subLoadListBookingConfirmed) this.subLoadListBookingConfirmed.unsubscribe()
    this.subLoadListBookingConfirmed = this.loadListBookConfirmedObs.subscribe(data=>{
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
    this.onLoadListBookingConfirmed()
  }

  confirmReturnHS(bookingID: number) {
      this.listConfirmBookingService.confirmedReturnHS(bookingID).subscribe(response=>{
        console.log('confirmedReturnHS: '+response)
        this.refreshListBookingConfirmed.next(true)
      })
  }
}
