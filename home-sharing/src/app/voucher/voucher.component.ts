import { Component, OnInit } from '@angular/core';
import {VoucherService} from "./voucher.service";

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {

  constructor(private voucherService:VoucherService) { }

  ngOnInit(): void {
    this.voucherService.getVouchers().subscribe(reponse=>{

    })
  }

  onChooseVoucher() {

  }
}
