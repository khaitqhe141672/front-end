import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CheckOutBookingComponent} from "./check-out-booking/check-out-booking.component";
import {CurrentBookingDetailComponent} from "./current-booking-detail/current-booking-detail.component";
import {ComingBookingDetailComponent} from "./coming-booking-detail/coming-booking-detail.component";
import {ConfirmBookingComponent} from "./confirm-booking/confirm-booking.component";
import {WaitBookingDetailComponent} from "./wait-booking-detail/wait-booking-detail.component";

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {

  checkOutPickerDialogRef: MatDialogRef<CheckOutBookingComponent>
  currentBookingDetailPickerDialogRef: MatDialogRef<CurrentBookingDetailComponent>
  comingBookingDetailPickerDialogRef: MatDialogRef<ComingBookingDetailComponent>
  confirmBookingDetailPickerDialogRef: MatDialogRef<ConfirmBookingComponent>
  waitBookingDetailPickerDialogRef: MatDialogRef<WaitBookingDetailComponent>

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
  }

  onOpenCheckOut() {
    this.checkOutPickerDialogRef = this.dialog.open(CheckOutBookingComponent, {
      hasBackdrop: true
    })
  }

  onOpenCurrentBookingDetail() {
    this.currentBookingDetailPickerDialogRef = this.dialog.open(CurrentBookingDetailComponent, {
      hasBackdrop: true
    })
  }

  onOpenComingBookingDetail() {
    this.comingBookingDetailPickerDialogRef = this.dialog.open(ComingBookingDetailComponent, {
      hasBackdrop: true
    })
  }

  onOpenConfirmBooking() {
    this.confirmBookingDetailPickerDialogRef = this.dialog.open(ConfirmBookingComponent, {
      hasBackdrop: true
    })
  }

  onOpenWaitBookingDetail() {
    this.waitBookingDetailPickerDialogRef = this.dialog.open(WaitBookingDetailComponent, {
      hasBackdrop: true
    })
  }
}
