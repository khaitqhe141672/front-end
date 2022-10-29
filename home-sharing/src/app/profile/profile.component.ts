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

  // constructor(private _formBuilder: FormBuilder,private profileService:ProfileService) {}
  // infoFormGroup: FormGroup
  // historyFormGroup: FormGroup
  // secureFormGroup: FormGroup
  // userInfoResponse:UserInfoResponse
  // userInfo:UserInfo
  constructor() {
  }
  ngOnInit(): void {
    // this.initForm()
    // this.getUserInfo()
  }
  // initForm(){
  //   this.infoFormGroup = this._formBuilder.group(
  //     {
  //       userName:[''],
  //       secondName:[''],
  //       gender:[''],
  //       phoneNumber:[''],
  //       email:[''],
  //       province:[''],
  //       district:[''],
  //       address:['']
  //     }
  //   )
  //   this.historyFormGroup = this._formBuilder.group({
  //     secondCtrl:['']
  //   })
  // }
  // getUserInfo(){
  //   this.profileService.getUserInfo().subscribe(responseUserInfo=>{
  //     this.userInfoResponse = responseUserInfo
  //     this.userInfo = this.userInfoResponse.object
  //     this.bindData(this.userInfo)
  //     console.log(this.userInfo)
  //   })
  // }
  // bindData(userInfo:UserInfo){
  //   this.infoFormGroup.controls['userName'].patchValue(this.userInfo.username)
  //   this.infoFormGroup.controls['secondName'].patchValue(this.userInfo.fullName)
  //   this.infoFormGroup.controls['phoneNumber'].patchValue(this.userInfo.mobile)
  //   this.infoFormGroup.controls['email'].patchValue(this.userInfo.email)
  //   this.infoFormGroup.controls['address'].patchValue(this.userInfo.address)
  //
  // }
}
