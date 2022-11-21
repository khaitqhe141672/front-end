import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ReportPostDetail} from "../manage-report-post.model";
import {ReportPostDetailDialogService} from "./report-post-detail-dialog.service";
import {DetailReportPost} from "./report-post-detail.model";

@Component({
  selector: 'app-report-post-detail-dialog',
  templateUrl: './report-post-detail-dialog.component.html',
  styleUrls: ['./report-post-detail-dialog.component.css']
})
export class ReportPostDetailDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data:number,private reportDetailDialogService:ReportPostDetailDialogService) { }
  pageIndex = 1
  listReportDetail:DetailReportPost[] =[]
  ngOnInit(): void {
      this.loadListReportPost()
  }

  loadListReportPost(){
      this.reportDetailDialogService.getListReport(this.pageIndex,this.data).subscribe(
        response =>{
          let responseData  = response.data
          this.listReportDetail = responseData.detailReportPost.slice()
      })
  }

}
