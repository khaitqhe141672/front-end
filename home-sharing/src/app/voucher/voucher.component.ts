import {Component, Inject, OnInit} from '@angular/core';
import {VoucherService} from "./voucher.service";
import {VoucherPost, VoucherPostResponse} from "../shared/model/voucher.model";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Clipboard} from "@angular/cdk/clipboard";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: number,private voucherService:VoucherService,
              private clipboard: Clipboard,private _snackBar: MatSnackBar) { }
  listVoucher:VoucherPost[]=[]
  voucherIResponse
  ngOnInit(): void {
    this.voucherService.getVouchers(this.data).subscribe(response=>{
        let voucherIResponse =   response as VoucherPostResponse
        this.listVoucher = voucherIResponse.object
      console.log(this.listVoucher)
    })
    console.log(JSON.stringify(this.listVoucher))
    console.log(JSON.stringify(this.voucherIResponse))
    console.log(this.data)
  }

  onChooseVoucher() {

  }

  onCopyVoucherName(nameVoucher: string) {
    this.clipboard.copy(nameVoucher)
    this._snackBar.open('Đã sao chép mã giảm giá','',{
      duration:1000
    })
  }
}
