import {Component, Inject, OnInit} from '@angular/core';
import {ComplaintReportServices} from "../complaint-report.services";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PostDetail} from "../../../shared/model/post-list-host.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create-complaint-report',
  templateUrl: './create-complaint-report.component.html',
  styleUrls: ['./create-complaint-report.component.css']
})
export class CreateComplaintReportComponent implements OnInit {
  formAppeal: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {postID:number,historyHandleReportPostID:number},private fb:FormBuilder,private complainService:ComplaintReportServices) { }

  ngOnInit(): void {
    this.formAppeal = this.fb.group({
      description:['',Validators.required]
    })
  }

  onCreateComplain(){
    let des = this.formAppeal.controls.description.value.toString().replace(/  +/g, ' ').trim();
    if(!des) return
    console.log('post id: '+this.data.postID)
    console.log('history id: '+this.data.historyHandleReportPostID)

    this.complainService.createComplain(this.data.postID,des,this.data.historyHandleReportPostID).subscribe(response=>{
      console.log(response)
    },()=>{
      console.log('error')

      Swal.fire({
        icon: 'error',
        title: 'Khiếu nại thất bại. Vui lòng thử lại sau',
      })
      },()=>{
      Swal.fire({
        icon: 'success',
        title: 'Khiếu nại thành công',
      })
      console.log('complete')
      }
    )
  }

}
