import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReportHsService} from "./report-hs.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {ReportPostCustomer} from "../history-booking/history_booking.model";

@Component({
  selector: 'app-report-hs',
  templateUrl: './report-hs.component.html',
  styleUrls: ['./report-hs.component.css']
})
export class ReportHsComponent implements OnInit {
  formReportHS: FormGroup
  selectedReportChips: { id: number, name: string }
  chipReportContent: { id: number, name: string }[]
    = [
    // {id:1,name:'Homestay không giống với bài đăng'},
    // {id:2,name:'Chủ nhà không văn minh, gây nguy hiểm'},
    // {id:3,name:'Đòi chi phí chênh lệch'},
    // {id:4,name:'Homestay đã xuống cấp gây nguy hiểm'},
    // {id:5,name:'Khác'}
  ]
  isDisableInput = false
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    id: number, type: number, bookingID: number, statusReportPost: number,
    reportPostCustomer: ReportPostCustomer[]
  }, private fb: FormBuilder, private reportHsService: ReportHsService) {
    this.formReportHS = this.fb.group({
      descriptionCtrl: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    if (this.data.statusReportPost == 1) {
      this.initData()
      this.isDisableInput = true
    } else {
      this.reportHsService.getReportType(this.data.type).subscribe(response => {
        let listReportTyp = response.object
        this.chipReportContent = listReportTyp.map(data => {
          return {id: data.id, name: data.name}
        })
      })
    }
  }

  initData() {
    let reportPostCustomer = this.data.reportPostCustomer
    // this.chipReportContent = [{id: reportPostCustomer.reportTypeID, name: reportPostCustomer.nameReportType}]
    this.chipReportContent = reportPostCustomer.map(data => {
      return {id: data.reportTypeID, name: data.nameReportType}
    })
    this.formReportHS.controls.descriptionCtrl.patchValue(reportPostCustomer[0].description?reportPostCustomer[0].description:'')
  }

  isSelected(chip): boolean {
    if (this.isDisableInput) return true
    else{
    return this.selectedReportChips === chip;
    }
  }

  onReport() {
    console.log('submited')
    console.log('id report: ' + this.data.id)
    let description = this.formReportHS.controls.descriptionCtrl.value.toString().trim().replace(/  +/g, ' ')
    console.log('description: ' + description)

    this.reportHsService.pushReportHS(this.data.id, this.data.bookingID, this.selectedReportChips.id, description, this.data.type).subscribe({
      next: responseData => {
        console.log(responseData)
      },
      error: errorMessageResponse => {
        console.log(errorMessageResponse)
        Swal.fire({
          icon: 'error',
          title: 'Báo cáo đánh giá thất bại',
        })

      },
      complete: () => {
        console.log('complete')
        Swal.fire({
          icon: 'success',
          title: 'Báo cáo đánh giá thành công',
        })
      }
    })
  }

}
