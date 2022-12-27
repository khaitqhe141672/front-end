import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../profile.service";
import {UserInfo, UserInfoResponse} from "../profile.model";
import Swal from "sweetalert2";

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
  selectedFiles?:FileList
  fileImg:File=null
  previewImg:string = null
  urlRootImg = ''
  ngOnInit(): void {
    this.initForm()
    this.getUserInfo()
  }
  isLoading = false
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
      this.urlRootImg = this.userInfo.urlImage
      this.bindData(this.userInfo)
      console.log(this.userInfo)

    },()=>{

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
    const name = this.infoFormGroup.controls.fullName.value.toString().replace(/  +/g, ' ').trim();
    const phoneNumber = this.infoFormGroup.controls.phoneNumber.value.toString()
    const address = this.infoFormGroup.controls.address.value.toString()
    console.log('name: '+name)
    console.log('phoneNumber: '+phoneNumber)
    console.log('address: '+address)

    if(name.trim()==''){
      Swal.fire({
        icon:'error',
        title:'Tên không hợp lệ'
      })
      return
    }
    // a          a              a                 a                  a         a              a
    if(name.trim().length<6){
      console.log('name trim: '+name.trim())
      console.log(name.trim().length)
      Swal.fire({
        icon:'error',
        title:'Tên cần ít nhất 6 ký tự'
      })
      return;
    }
    this.profileService.updateProfile(name.trim(),phoneNumber.trim(),address.trim()).subscribe(response=>{
      console.log(response)
      Swal.fire({
        icon: 'success',
        title: 'Cập nhập thông tin thành công',
      })
    },(response)=>{
      console.log(response)
      Swal.fire({
        icon: 'error',
        title: 'Cập nhập thông tin thất bại!',
        text:'Vui lòng thử lại trong giây lát'
      })
    },()=>{
      this.getUserInfo()
    })
  }

  selectFiles(event:any) {
    this.selectedFiles = event.target.files
    this.fileImg = this.selectedFiles.item(0)
    console.log(this.fileImg)
    const  reader = new FileReader()
    reader.onload = (e:any)=>{
      console.log(e.target.result)
      this.previewImg = e.target.result
    }
    reader.readAsDataURL(this.fileImg)
  }

  onChangeAvatar() {
    if(this.fileImg==null){
      Swal.fire({
        icon: 'question',
        title: 'Không có cập nhật nào cho ảnh đại diện',
      })
      return
    }
    this.isLoading = true
    let formImg = new FormData()

      formImg.append('file',this.fileImg)
      this.profileService.updateAvatar(formImg).subscribe(response=>{
        this.isLoading = false
        Swal.fire({
          icon: 'success',
          title: 'Cập nhập ảnh đại diện thành công',
        })

      },()=>{
        this.isLoading = false
        Swal.fire({
          icon: 'error',
          title: 'Cập nhật ảnh đại diện thất bại',
          text:'Vui lòng thử lại trong giây lát'
        })
      },()=>{this.isLoading=false})

  }
}
