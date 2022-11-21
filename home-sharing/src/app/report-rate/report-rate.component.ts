import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-report-rate',
  templateUrl: './report-rate.component.html',
  styleUrls: ['./report-rate.component.css']
})
export class ReportRateComponent implements OnInit {
  formReport:FormGroup
  name: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {rateID,username},private fb:FormBuilder) { }

  ngOnInit(): void {
    console.log(this.data)
    this.name = this.data.username
    this.formReport =this.fb.group({
      reportDetailCtrl:['']
    })
  }

  onSubmit() {

  }
}
