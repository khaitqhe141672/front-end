import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProfileService} from "./profile.service";
import {UserInfo, UserInfoResponse} from "./profile.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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
        firstName:[''],
        secondName:[''],
        gender:[''],
        phoneNumber:[''],
        email:[''],
        province:[''],
        district:[''],
        address:['']
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
      console.log(this.userInfo)
    })

  }
}
