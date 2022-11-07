import {Component, Inject, OnInit} from '@angular/core';
import {VoucherService} from "./voucher.service";
import {VoucherPost, VoucherPostResponse} from "../shared/model/voucher.model";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: number,private voucherService:VoucherService) { }
  listVoucher:VoucherPost[]=[]
  voucherIResponse
  ngOnInit(): void {
    this.voucherService.getVouchers(this.data).subscribe(response=>{
        let voucherIResponse =   response as VoucherPostResponse
        this.listVoucher = voucherIResponse.object
    })
    console.log(JSON.stringify(this.listVoucher))
    console.log(JSON.stringify(this.voucherIResponse))
    console.log(this.data)
  }

  onChooseVoucher() {

  }
}
