import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ReportPostDetail} from "../manage-report-post.model";

@Component({
  selector: 'app-report-post-detail-dialog',
  templateUrl: './report-post-detail-dialog.component.html',
  styleUrls: ['./report-post-detail-dialog.component.css']
})
export class ReportPostDetailDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data:ReportPostDetail) { }

  ngOnInit(): void {

  }



}
