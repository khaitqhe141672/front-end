import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CustomerDetail} from "../../../shared/model/account-customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DetailAccountCustomerService} from "./detail-account-customer.service";
import {UserInfo} from "../../../profile/profile.model";

@Component({
  selector: 'app-detail-account-customer',
  templateUrl: './detail-account-customer.component.html',
  styleUrls: ['./detail-account-customer.component.css']
})
export class DetailAccountCustomerComponent implements OnInit {
  status:string[] = ['Đã kích hoạt','Bị cấm','Chưa kích hoạt']
  formDetail:FormGroup
  userInfo:UserInfo = {
    userID:1,
    username:'dinhduc2550',
    email:'dinhduc2550@gmail.com',
    role:'ROLE_HOST',
    userDetailID:1,
    urlImage:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKr5wT7rfkjkGvNeqgXjBmarC5ZNoZs-H2uMpML8O7Q4F9W-IlUQibBT6IPqyvX45NOgw&usqp=CAU',
    fullName:'Tên',
    dob:'01-01-2022',
    mobile:'0987192312',
    address:'Hà Nội',
    status:1,
    verifier:1
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data:CustomerDetail,private fb:FormBuilder,
              private detailAccountCusService:DetailAccountCustomerService) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.formDetail = this.fb.group({
      statusCtrl:[this.data.status],
      radioVerifyCtrl:['']
    })
  }
  onSubmit() {

  }

}
