import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ComplaintReportComponent} from "../complaint-report/complaint-report.component";

@Component({
  selector: 'app-host-post-list',
  templateUrl: './host-post-list.component.html',
  styleUrls: ['./host-post-list.component.css']
})
export class HostPostListComponent implements OnInit {

  complaintReportPickerDialogRef: MatDialogRef<ComplaintReportComponent>

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  onOpenComplaintReport() {
    this.complaintReportPickerDialogRef = this.dialog.open(ComplaintReportComponent, {
      hasBackdrop: true
    })
  }

}
