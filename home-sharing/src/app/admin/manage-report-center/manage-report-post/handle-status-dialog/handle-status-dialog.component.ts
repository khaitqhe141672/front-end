import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-handle-status-dialog',
  templateUrl: './handle-status-dialog.component.html',
  styleUrls: ['./handle-status-dialog.component.css']
})
export class HandleStatusDialogComponent implements OnInit {

  constructor(private handleStatusDialog:MatDialogRef<HandleStatusDialogComponent>) { }

  ngOnInit(): void {
  }

  confirmChangeStatus(isConfirm:boolean){
    this.handleStatusDialog.close(isConfirm)
  }

}
