import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import Swal from "sweetalert2";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  isSubmiting = false
  constructor(private route:ActivatedRoute,private authService:AuthService,private router:Router) { }
  private otp:string = ''
  canResetPassword = true
  formForgotPassword:FormGroup
  email:string = ''
  PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  ngOnInit(): void {
   this.route.queryParams.subscribe( (params:Params)  => {
     this.otp =  params['otp'];
     this.email = params['email']
     this.authService.confirmForgotPassword(this.otp).subscribe(response=>{

     },()=>{
       this.canResetPassword = false
       Swal.fire({
         icon: 'success',
         title: 'Mã OTP hết hiệu lực hoặc không hợp lệ'
       })
     })
    })
    this.initForm()
  }

  initForm(){
    this.formForgotPassword = new FormGroup({
        'password': new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(this.PASSWORD_PATTERN),
          ]),
        ),
        'confirmPassword': new FormControl(null,
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            // Validators.pattern(this.PASSWORD_PATTERN),
          ]),
        )
      },
      {
        validators: [
          this.authService.MatchPassword('password', 'confirmPassword'),
        ]
      }
    )
  }

  onSubmit() {
    const email = this.email
    const password = this.formForgotPassword.controls.password.value
    console.log('email: '+email+'/'+'password: '+password)
    if(email===''||password==='') {
      Swal.fire({
        icon: 'error',
        title: 'Vui lòng điền mật khẩu',
      })
      return
    }
    this.isSubmiting = true
    this.authService.resetPassword(email,password).subscribe(response=>{
      console.log('response: '+response)
      this.isSubmiting = false
      Swal.fire({
        icon: 'success',
        title: 'Lấy lại mật khẩu thành công',
      }).then(()=>{
        this.router.navigate(['../auth/login'])
      })
    },()=>{
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Lấy lại mật khẩu thất bại! Vui lòng thử lại',
      })
    })
  }
}
