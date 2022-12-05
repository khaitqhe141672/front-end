import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],

})
export class DatePickerComponent implements OnInit {

  @Output() selectedStartDate = new EventEmitter<Date>()
  @Output() selectedEndDate = new EventEmitter<Date>()
  todayDate:Date = new Date();
  listBookingDate:string[] = []
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb:FormBuilder,
    public datePickerDialogRef:MatDialogRef<DatePickerComponent>,
    public dialog: MatDialog,
    private datePipe:DatePipe
  ) { }
  formDatePicker:FormGroup
  ngOnInit(): void {
    this.formDatePicker = this.fb.group(
      {
        startDate:[''],
        endDate:['']
      }
    )
    this.listBookingDate = this.data
    this.bookedDateFilter = (d: Date): boolean => {
      const time=d.getTime();
      return !this.listBookingDate.find(x=>new Date(x).getTime()==time);
    }
  }
  datePicked: {startDate:Date,endDate:Date}
  addStartDate(date:Date){
    this.selectedStartDate.emit(date)
  }
  addEndDate(date:Date){
    this.selectedEndDate.emit(date)
  }
  myHolidayDates = [
    new Date("12/21/2022"),
    new Date("12/16/2022"),
    new Date("12/13/2022"),
    new Date("12/17/2022"),
  ];

  myHolidayFilter = (d: Date): boolean => {
    const time=d.getTime();
    return !this.myHolidayDates.find(x=>x.getTime()==time);
  }
  bookedDateFilter = (d: Date): boolean => true
  // bookedDateFilter = (d: Date): boolean => {
  //   const time=d.getTime();
  //
  //   return !this.listBookingDate.find(x=>new Date(x).getTime()==time);
  // }


  onSelectedDate() {
    console.log('Selected Date')
    // console.log(this.formDatePicker.controls.startDate.value);
    let sDate = new Date(this.formDatePicker.controls.startDate.value)
    let eDate = new Date(this.formDatePicker.controls.endDate.value)
    this.addStartDate (sDate)
    this.addEndDate (eDate)
    this.datePicked = {startDate:sDate,endDate:eDate}

    console.log('this is D: '+ this.selectedStartDate)
    console.log('this is D: '+ this.selectedEndDate)
    this.datePickerDialogRef.close(this.datePicked)
    // console.log(this.formDatePicker.controls.endDate.value)

  }
}

