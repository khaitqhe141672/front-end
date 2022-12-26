import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CreateVoucherService} from "./create-voucher.service";
import Swal from "sweetalert2";

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
      voucherNameCtrl:['',Validators.compose([Validators.required])],
      pctCtrl:['',Validators.required],
      descriptionCtrl:['',Validators.compose([Validators.required,
      Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])],
      dueDayCtrl:['',Validators.required]
    })
  }

  onCreateVoucher() {
    let voucherName = this.formCreateVoucher.controls.voucherNameCtrl.value.toString().trim()

    let pct = this.formCreateVoucher.controls.pctCtrl.value.toString().trim()

    let description = this.formCreateVoucher.controls.descriptionCtrl.value.toString().replace(/  +/g, ' ').trim();
    let dueDay = this.formCreateVoucher.controls.dueDayCtrl.value.toString().trim()
    console.log('voucher name: '+voucherName)
    console.log('voucher pct: '+pct)
    console.log('voucher description: '+description)
    console.log('voucher dueDay: '+dueDay)
    if(!voucherName||!pct||!description||!dueDay){
      Swal.fire({
        icon:'error',
        title:'Hãy điền đầy đủ thông tin mã khuyến mại'
      })
      return
    }
    if(pct>100||pct<1){
      Swal.fire({
        icon:'error',
        title:'Phần trăm giảm giá không hợp lệ!'
      })
      return
    }


    this.createVoucherService.createVoucher(voucherName,description,pct,dueDay).subscribe(
      response =>console.log(response.message),
      (response)=>{
        console.log(response)
        Swal.fire({
          icon:'error',
          title:'Tạo mã khuyến mại thất bại!',
          text:'Vui lòng thử lại trong giây lát'
        })
      },()=>{
        Swal.fire({
          icon:'success',
          title:'Tạo mã khuyến mại thành công'
        })
      }
    )
  }
}
