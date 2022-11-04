import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],

})
export class DatePickerComponent implements OnInit {

  @Output() selectedStartDate = new EventEmitter<Date>()
  @Output() selectedEndDate = new EventEmitter<Date>()

  constructor(private fb:FormBuilder,
              public datePickerDialogRef:MatDialogRef<DatePickerComponent>,
              public dialog: MatDialog) { }
  formDatePicker:FormGroup
  ngOnInit(): void {
    this.formDatePicker = this.fb.group(
      {
        startDate:[''],
        endDate:['']
      }
    )
  }
  datePicked: {startDate:Date,endDate:Date}
  addStartDate(date:Date){
    this.selectedStartDate.emit(date)
  }
  addEndDate(date:Date){
    this.selectedEndDate.emit(date)
  }

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

