import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReportHsService} from "./report-hs.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-report-hs',
  templateUrl: './report-hs.component.html',
  styleUrls: ['./report-hs.component.css']
})
export class ReportHsComponent implements OnInit {
  formReportHS:FormGroup
  selectedReportChips:{id:number,name:string}
  chipReportContent:{id:number,name:string}[]
  =[
    {id:1,name:'Homestay không giống với bài đăng'},
    {id:2,name:'Chủ nhà không văn minh, gây nguy hiểm'},
    {id:3,name:'Đòi chi phí chênh lệch'},
    {id:4,name:'Homestay đã xuống cấp gây nguy hiểm'},
    {id:5,name:'Khác'}
  ]

  constructor(@Inject(MAT_DIALOG_DATA) public data: {postID:number},private fb:FormBuilder,private reportHsService:ReportHsService) {
    this.formReportHS = this.fb.group({
      descriptionCtrl:['',Validators.required],
    })
  }

  ngOnInit(): void {
  }

  isSelected(chip): boolean {
    return this.selectedReportChips === chip;
  }

  onReport() {
    console.log('submited')
    console.log('id report: '+this.data.postID)
    let description = this.formReportHS.controls.descriptionCtrl.value
    console.log('description: '+description)

    this.reportHsService.pushReportHS(this.data.postID,this.selectedReportChips.id,description).subscribe({
      next:responseData=>{
        console.log(responseData)
      },
      error:errorMessageResponse=>{
        console.log(errorMessageResponse)
      },
      complete:()=>{
        console.log('complete')
      }
    })
  }

}
