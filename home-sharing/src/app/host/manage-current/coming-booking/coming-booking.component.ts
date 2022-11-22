import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CustomerDetail} from "../../../shared/model/account-customer.model";
import {ListBooking} from "../list-confirm-booking/list-confirm-booking.model";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {ListConfirmBookingService} from "../list-confirm-booking/list-confirm-booking.service";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-coming-booking',
  templateUrl: './coming-booking.component.html',
  styleUrls: ['./coming-booking.component.css']
})
export class ComingBookingComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title','userBooking','startDate','endDate','totalPerson','totalMoney','totalService','note'];
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


  loadListBookComing:Observable<ListBooking[]>
  subLoadListBookComing:Subscription
  refreshListBookComing = new BehaviorSubject<boolean>(true)

  constructor(private listConfirmBookingService:ListConfirmBookingService) { }

  ngOnInit(): void {
    this.onLoadListBookingConfirmed()
  }

  onLoadListBookingConfirmed(){
    this.loadListBookComing = this.refreshListBookComing.pipe(switchMap(_=>
      this.listConfirmBookingService.getListPostPending(2,this.pageIndex).pipe(map(response=>{
        this.totalPagePagination = response.data.sizePage
        return response.data.listBooking
      }))
    ))
    if(this.subLoadListBookComing) this.subLoadListBookComing.unsubscribe()
    this.subLoadListBookComing = this.loadListBookComing.subscribe(data=>{
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

}
