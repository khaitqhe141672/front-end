import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthResponseData, AuthService} from '../auth.service';
import { LoginService } from './login.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isForgotPassword = false

  isLogin = true
  error:string = null
  constructor(private authService:AuthService,private router:Router) { }
  formLoginGroup:FormGroup
  formForgotPasswordGroup:FormGroup
  ngOnInit(): void {
    this.formLoginGroup = new FormGroup({
      'userName': new FormControl(null,[Validators.required]),
      'passWord':new FormControl(null,[Validators.required]),
    })
    this.formForgotPasswordGroup = new FormGroup({
      'email':new FormControl(null,[Validators.required,Validators.email])
    })
  }

  onSubmit() {
    if(!this.formLoginGroup.valid){
      return
    }
    const useName = this.formLoginGroup.get('userName').value;
    const password = this.formLoginGroup.get('passWord').value;
    console.log(useName + ' ' + password)

    let authObservable:Observable<AuthResponseData>
    authObservable = this.authService.login(useName,password)
    console.log('au tkn: '+JSON.parse(localStorage.getItem('token')))
    authObservable.subscribe({
      next:responseData=>{
        console.log(responseData)
        console.log("auth interceptor token2: "+responseData.data.token)
        console.log('role: '+responseData.data.user.role)
        let role = responseData.data.user.role
        if(role == 'ROLE_HOST'){
          this.router.navigate(['../host/manage-current/confirm-booking'])
        }else if(role == 'ROLE_ADMIN'){
          this.router.navigate(['../admin/manager-account/manager-account-host'])
        }else{
          this.router.navigate(['/home'])
        }
        if(responseData.data.user.status==0){
          role == 'ROLE_PENDING'
        }

      },
      error:errorMessageResponse=>{
        this.error = errorMessageResponse
        Swal.fire({
          icon: 'error',
          title: 'Tài khoản hoặc mật khẩu không đúng',
        })
      },
      complete:()=>{
        // console.log('complete')
      }
    })
  }
  onSubmitForgotPassword(){
    const email = this.formForgotPasswordGroup.get('email').value;
    console.log(email)
    this.authService.forgotPassWord(email).subscribe(response=>{
      console.log(response)
      Swal.fire({
        icon: 'success',
        title: 'Vui lòng kiểm tra email để lấy lại mật khẩu',
      })
    },()=>{
      Swal.fire({
        icon: 'error',
        title: 'Lỗi gửi xác minh qua email.',
        text: 'Vui lòng thử lại',
      })
    },()=>{
      Swal.fire({
        icon: 'success',
        title: 'Vui lòng kiểm tra email để lấy lại mật khẩu',
      })
    })
  }
}
