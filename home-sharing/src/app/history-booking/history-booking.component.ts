import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

  onReportHS() {

  }

  onRateHS() {

  }
}
