import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RateComponent} from "../rate/rate.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReportHsComponent} from "../report-hs/report-hs.component";
import {auto} from "@popperjs/core";
import {HistoryDetail, ResponseHistory} from "./history_booking.model";
import {HistoryBookingService} from "./history-booking.service";

@Component({
  selector: 'app-history-booking',
  templateUrl: './history-booking.component.html',
  styleUrls: ['./history-booking.component.css']
})
export class HistoryBookingComponent implements OnInit {
  homeStayName: string='Amazing good job e';
  rateDialogRef:MatDialogRef<RateComponent>
  reportHsDialogRef:MatDialogRef<ReportHsComponent>
  listHistory:HistoryDetail[] = []
  constructor(private historyBookingService:HistoryBookingService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.historyBookingService.getHistoryBooking().subscribe(response=>{
      let responseHistory = response as ResponseHistory
      this.listHistory = responseHistory.object as HistoryDetail[]
      console.log(responseHistory.object)
    })
  }

  openRateDialog(bookingDetailID:number){

    this.rateDialogRef = this.dialog.open(RateComponent,{
      hasBackdrop:true,
    data:{
      id:bookingDetailID
    }
    })

  }



  openReportHsDialog(postID:number){
    this.reportHsDialogRef = this.dialog.open(ReportHsComponent,{
      hasBackdrop:true,
      data:{
        id:postID,
        type:1
      }
    })
  }
}

