import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserInfo} from "../../../profile/profile.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProfileService} from "../../../profile/profile.service";
import {AccountHost} from "../../../shared/model/account-host.model";
import {AccountDetailServices} from "./account-detail.services";

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {

  /**
   * status
   * 0: not be activated
   * 1: activated
   * 2: ban
   * */


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
  constructor(@Inject(MAT_DIALOG_DATA) public data: AccountHost,private fb:FormBuilder,
              private accountDetailService:AccountDetailServices) {
    this.formDetail = this.fb.group({
      statusCtrl:[this.data.status],
      radioVerifyCtrl:['']
    })
  }

  ngOnInit(): void {


    console.log('account detail: '+JSON.stringify(this.data))
  }

  onSubmit() {
    let status = this.formDetail.controls.statusCtrl.value
    console.log('user ID: '+this.data.userID)
    console.log('status: '+this.formDetail.controls.statusCtrl.value)
    console.log('radioVerifyCtrl: '+this.formDetail.controls.radioVerifyCtrl.value)
    this.accountDetailService.updateStatus(this.data.userID,status).subscribe(response=>{
      console.log(response)
    })
  }
}
