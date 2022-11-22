import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CustomerDetail} from "../../../shared/model/account-customer.model";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {ListBooking, ListConfirmBookingData, ListConfirmBookingResponse} from "./list-confirm-booking.model";
import {ListConfirmBookingService} from "./list-confirm-booking.service";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-list-confirm-booking',
  templateUrl: './list-confirm-booking.component.html',
  styleUrls: ['./list-confirm-booking.component.css']
})
export class ListConfirmBookingComponent implements OnInit {

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


  loadListPendingObs:Observable<ListBooking[]>
  subLoadListPending:Subscription
  refreshListPending = new BehaviorSubject<boolean>(true)

  constructor(private listConfirmBookingService:ListConfirmBookingService) { }

  ngOnInit(): void {
    this.onLoadListBookingPending()
  }

  onLoadListBookingPending(){
    this.loadListPendingObs = this.refreshListPending.pipe(switchMap(_=>
    this.listConfirmBookingService.getListPostPending(1,this.pageIndex).pipe(map(response=>{
      this.totalPagePagination = response.data.sizePage
      return response.data.listBooking
    }))
    ))
    if(this.subLoadListPending) this.subLoadListPending.unsubscribe()
    this.subLoadListPending = this.loadListPendingObs.subscribe(data=>{
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


  handleBooking(bookingID: number, type: number) {
      this.listConfirmBookingService.confirmBooking(bookingID,type).subscribe(response=>{
        console.log(response)
        this.refreshListPending.next(true)
      })
  }
}
