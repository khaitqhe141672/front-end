import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {ErrorStateMatcher} from "@angular/material/core";
import {PasswordService} from "./password.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  error:string = null
  messageResponse:string = null
  PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  formChangePassword: FormGroup
  matcher = new MyErrorStateMatcher()

  constructor(private fb: FormBuilder, private authService: AuthService,private passWordService:PasswordService,private _snackBar:MatSnackBar) {
  }

  ngOnInit(): void {
    this.formChangePassword = this.fb.group({
        currentPassword: ['', Validators.pattern(this.PASSWORD_PATTERN)],
        newPassword: ['', Validators.pattern(this.PASSWORD_PATTERN)],
        confirmNewPassword: ['', Validators.pattern(this.PASSWORD_PATTERN) ]
      },
      {
        validators: this.authService.MatchPassword("newPassword", "confirmNewPassword")
      }
    )

  }

  onSubmit() {
    console.log('submitted')
    // let currentPass = this.formChangePassword.get('currentPassword').value
    let currentPass = this.formChangePassword.controls.currentPassword.value
    let newPass = this.formChangePassword.controls.newPassword.value

    console.log(currentPass+'/'+newPass)
    let changePasswordObservable:Observable<any>
    changePasswordObservable = this.passWordService.changePassword(currentPass,newPass)
    changePasswordObservable.subscribe({
      next:responseData =>{
        this.messageResponse=null
        console.log('submit response data: '+responseData.message)
        if(responseData.message==='mat khau current khong khop'){
          this.messageResponse = 'Sai nhật khẩu hiện tại'
          alert(this.messageResponse)
        }else{
          alert("Đổi mật khẩu thành công")
        }
        this.formChangePassword.reset()
      }
      ,error:errorMessageResponse=>{
        // this.openSnackBar(errorMessageResponse)
        this.error = errorMessageResponse
      },
      complete:()=>{
        // this.openSnackBar('Đổi mật khẩu...')
        console.log('complete')
      }
    })
  }
  openSnackBar(message:string){
    this._snackBar.open(message)
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
