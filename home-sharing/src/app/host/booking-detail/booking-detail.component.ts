import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {
  BookingPostVoucherDto,
  BookingServiceDto
} from "../manage-current/list-confirm-booking/list-confirm-booking.model";

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css']
})
export class BookingDetailComponent implements OnInit {

  listBookingService: BookingServiceDto[]
  bookingPostVoucherDto:BookingPostVoucherDto
  note:string= ''
  constructor(@Inject(MAT_DIALOG_DATA) public  data:{
    bookingServiceDtos:BookingServiceDto[],
    bookingPostVoucherDto:BookingPostVoucherDto,
    note:string
  }) { }

  ngOnInit(): void {
    this.listBookingService = this.data.bookingServiceDtos as BookingServiceDto[]
    // this.bookingPostVoucherDto = this.data.bookingPostVoucherDto
    // this.note = this.data.note
    console.log('this.listBookingService:'+JSON.stringify(this.listBookingService))
  }

}
