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
  minDate:Date = new Date();
  listBookingDate:string[] = []
  dates = []
  maxDate

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
    this.listBookingDate = this.data.map(data=>{
      this.dates.push(new Date(data))
      return this.datePipe.transform(new Date(data),'MM/dd/yyyy')
    })
    console.log(this.listBookingDate)
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

  bookedDateFilter = (d: Date): boolean => true

  onSelectedDate() {
    console.log('Selected Date')
    // console.log(this.formDatePicker.controls.startDate.value);
    let sDate = new Date(this.formDatePicker.controls.startDate.value)
    let eDate = new Date(this.formDatePicker.controls.endDate.value)
    this.addStartDate (sDate)
    this.addEndDate (eDate)
    this.datePicked = {
      startDate:sDate,
      endDate:eDate
    }

    console.log('this is D: '+ this.selectedStartDate)
    console.log('this is D: '+ this.selectedEndDate)
    this.datePickerDialogRef.close(this.datePicked)
    // console.log(this.formDatePicker.controls.endDate.value)
  }

  limitDateRange(dateRangeStart: HTMLInputElement) {
    const dateRangeStartValue = dateRangeStart.value
    console.log('dateRangeStart: '+dateRangeStart.value)
    console.log(new Date(this.convertDate(dateRangeStartValue)))
    this.minDate = new Date(this.convertDate(dateRangeStartValue))
    const tempValue = 0
    let arrMinDateFit = this.dates.filter(date=>{
      console.log('-------------------------')
      // console.log(this.datePipe.transform(new Date(date),'dd/MM/yyyy'))
      // console.log(dateRangeStartValue)
      // console.log('-------------------------')
      // const dateString = this.datePipe.transform(new Date(date),'dd/MM/yyyy')
      // const dateString2 =
      const date1 = date.getTime()
      const date2 = new Date(this.convertDate(dateRangeStartValue)).getTime()
      // console.log(date1)
      // console.log(date2)
      // console.log(date)
      return date1>date2
    })
    console.log('arrMinDateFit: '+arrMinDateFit)
    const minDate = new Date(Math.min.apply(null,arrMinDateFit))
    this.maxDate = minDate
    console.log('minDate: '+minDate)
  }
  resetMaxDate(dateRangeEnd: HTMLInputElement){
    if(!dateRangeEnd.value)
      return
    console.log('resert max date')
    this.maxDate = ''
    this.minDate = new Date()
  }
  convertDate(date:string){
    let data = date.split('/')
    return data[1]+'/'+data[0]+'/'+data[2]
  }
}

