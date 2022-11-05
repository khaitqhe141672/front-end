import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RateComponent} from "../rate/rate.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReportHsComponent} from "../report-hs/report-hs.component";
import {auto} from "@popperjs/core";

@Component({
  selector: 'app-history-booking',
  templateUrl: './history-booking.component.html',
  styleUrls: ['./history-booking.component.css']
})
export class HistoryBookingComponent implements OnInit {
  status: string = "Đang thuê...";
  homeStayName: string='Amazing good job e';
  startDate:string = '9-12-2022'
  endDate:string = '10-12-2022'
  totalDaysRent:number=12
  guestNumber: number=3;
  totalBill:number = 1000000000
  idBooking:number = 2
  postID = 3
  rateDialogRef:MatDialogRef<RateComponent>
  reportHsDialogRef:MatDialogRef<ReportHsComponent>

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  openRateDialog(){
    this.rateDialogRef = this.dialog.open(RateComponent,{
      hasBackdrop:true,
    data:{
      id:this.idBooking
    }
    })
  }
  openReportHsDialog(){
    this.reportHsDialogRef = this.dialog.open(ReportHsComponent,{
      hasBackdrop:true,
      data:{
        postID:this.postID
      }
    })
  }
}

