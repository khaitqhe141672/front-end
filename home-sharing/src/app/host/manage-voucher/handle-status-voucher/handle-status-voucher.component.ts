import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-handle-status-voucher',
  templateUrl: './handle-status-voucher.component.html',
  styleUrls: ['./handle-status-voucher.component.css']
})
export class HandleStatusVoucherComponent implements OnInit {

  constructor(private handleStatusVoucher:MatDialogRef<HandleStatusVoucherComponent>) { }

  ngOnInit(): void {
  }

  confirmChangeStatus(isConfirmed: boolean) {
    this.handleStatusVoucher.close(isConfirmed)
  }
}
