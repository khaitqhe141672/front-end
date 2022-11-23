import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(private confirmDialog:MatDialogRef<ConfirmDialogComponent>) { }

  ngOnInit(): void {
  }
  confirmChangeStatus(isConfirmed: boolean) {
    this.confirmDialog.close(isConfirmed)
  }
}
