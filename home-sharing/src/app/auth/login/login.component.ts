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

  isLogin = true
  error:string = null
  constructor(private authService:AuthService,private router:Router) { }
  formLoginGroup:FormGroup
  ngOnInit(): void {
    this.formLoginGroup = new FormGroup({
      'userName': new FormControl(null,[Validators.required]),
      'passWord':new FormControl(null,[Validators.required])
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
        if(responseData.data.user.role==='ROLE_HOST'){
          this.router.navigate(['/hosts/manage-current/confirm-booking'])
        }else if(responseData.data.user.role==='ROLE_ADMIN'){
          this.router.navigate(['/admin/manager-account/manager-account-host'])
        }else{
          this.router.navigate(['/home'])
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

}
