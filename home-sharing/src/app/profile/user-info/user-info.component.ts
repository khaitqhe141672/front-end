import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../profile.service";
import {UserInfo, UserInfoResponse} from "../profile.model";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,private profileService:ProfileService) {}
  infoFormGroup: FormGroup
  historyFormGroup: FormGroup
  secureFormGroup: FormGroup
  userInfoResponse:UserInfoResponse
  userInfo:UserInfo

  ngOnInit(): void {
    this.initForm()
    this.getUserInfo()
  }
  initForm(){
    this.infoFormGroup = this._formBuilder.group(
      {
        userName:['',Validators.required],
        fullName:['',[Validators.required,Validators.minLength(6)]],
        phoneNumber:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
        email:['',Validators.required],
        address:['',[Validators.required,Validators.minLength(10)]]
      }
    )
    this.historyFormGroup = this._formBuilder.group({
      secondCtrl:['']
    })
  }
  getUserInfo(){
    this.profileService.getUserInfo().subscribe(responseUserInfo=>{
      this.userInfoResponse = responseUserInfo
      this.userInfo = this.userInfoResponse.object
      this.bindData(this.userInfo)
      console.log(this.userInfo)
    })
  }
  bindData(userInfo:UserInfo){
    this.infoFormGroup.controls['userName'].patchValue(this.userInfo.username)
    this.infoFormGroup.controls['fullName'].patchValue(this.userInfo.fullName)
    this.infoFormGroup.controls['phoneNumber'].patchValue(this.userInfo.mobile)
    this.infoFormGroup.controls['email'].patchValue(this.userInfo.email)
    this.infoFormGroup.controls['address'].patchValue(this.userInfo.address)

  }

  onSaveProfile() {

  }
}
