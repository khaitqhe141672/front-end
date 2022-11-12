import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CustomerDetail} from "../../../shared/model/account-customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DetailAccountCustomerService} from "./detail-account-customer.service";
import {UserInfo} from "../../../profile/profile.model";
import {AccountDetailServices} from "../../manager-account/account-detail/account-detail.services";

@Component({
  selector: 'app-detail-account-customer',
  templateUrl: './detail-account-customer.component.html',
  styleUrls: ['./detail-account-customer.component.css']
})
export class DetailAccountCustomerComponent implements OnInit {
  status:string[] = ['Đã kích hoạt','Bị cấm','Chưa kích hoạt']
  formDetail:FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) public data:CustomerDetail,private fb:FormBuilder,
              private detailAccountCusService:DetailAccountCustomerService,private detailAccount:AccountDetailServices) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.formDetail = this.fb.group({
      statusCtrl:[this.data.status],

    })
  }
  onSubmit() {
    let status = this.formDetail.controls.statusCtrl.value
    this.detailAccount.updateStatus(this.data.userID,status).subscribe(response=>{
      console.log(response)
    })
  }

}
