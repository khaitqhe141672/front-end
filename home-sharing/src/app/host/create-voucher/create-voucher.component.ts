import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CreateVoucherService} from "./create-voucher.service";

@Component({
  selector: 'app-create-voucher',
  templateUrl: './create-voucher.component.html',
  styleUrls: ['./create-voucher.component.css']
})
export class CreateVoucherComponent implements OnInit {
  formCreateVoucher: FormGroup;

  constructor(private fb:FormBuilder,private createVoucherService:CreateVoucherService) { }

  ngOnInit(): void {
    this.formCreateVoucher =this.fb.group({
      voucherNameCtrl:[''],
      pctCtrl:[''],
      descriptionCtrl:[''],
      dueDayCtrl:['']
    })
  }

  onCreateVoucher() {
    let voucherName = this.formCreateVoucher.controls.voucherNameCtrl.value
    let pct = this.formCreateVoucher.controls.pctCtrl.value
    let description = this.formCreateVoucher.controls.descriptionCtrl.value
    let dueDay = this.formCreateVoucher.controls.dueDayCtrl.value

    this.createVoucherService.createVoucher(voucherName,description,pct,dueDay).subscribe(
      response =>console.log(response.message)
    )
  }
}
