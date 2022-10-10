import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {FormGroup} from "@angular/forms";
export interface RegisterResponse{
  message:string,
  data:{
    user:{
      username:string,
      email:string,
      fullName:string,
      address:string,
      role:string,
      status:number
    }
  }
}
export interface CheckUserNameResponse{
  message:string,
  data:{
    user:string
  }
}
@Injectable({providedIn:'root'})
export class RegisterService{
  constructor(private http:HttpClient,private router:Router) {
  }
  apiRegister ='http://localhost:8080/api/auth/signup'
  apiCheckMail = 'http://localhost:8080/api/auth/exist-email?'
  register(username:string,password:string,mobile:string,address:string,email:string,
           role:string,dob:string,fullName:string){
      return this.http.post<RegisterResponse>(this.apiRegister,{
        username:username,
        password:password,
        email:email,
        role:role,
        fullName:fullName,
        address:address,
        mobile:mobile,
        dob:dob,
      })
        .pipe(catchError(this.handleError),
          tap(responseData=>{
            const message = responseData.message;
            const username = responseData.data.user;
            const fullname = responseData.data.user.fullName;
            const role = responseData.data.user.role;
            const status = responseData.data.user.status
            console.log(JSON.stringify(responseData))
            console.log(message)
          })
          )
  }
  checkEmailExist(email:string): Observable<boolean>{
    let message = 'An error occurred'
     this.http.post<CheckUserNameResponse>(this.apiCheckMail+'email='+email,{

    }).pipe(catchError(this.handleErrorEmail),tap(responseData=>{
       message = responseData.message
      const data = responseData.data.user

    }))
    // if (message === 'EMAIL_NOT_EXIST') return true
    // else return false
    return of(message==='EMAIL_NOT_EXIST').pipe()
  }
  private handleErrorEmail(errorResponse:HttpErrorResponse){
    let errorMessage = 'An unknown error occurred!'
    if(!errorResponse.error||!errorResponse.error.message){
      return throwError(()=>new Error(errorMessage))
    }
    switch (errorResponse.error.message){
      case 'EMAIL_NOT_EXIST':
        errorMessage = 'Email này đã được đăng ký'
        break;
    }
    return throwError(()=>new Error(errorMessage))
  }
  private handleError(errorResponse:HttpErrorResponse){
    let errorMessage = 'An unknown error occurred!'
    if(!errorResponse.error||!errorResponse.error.status){
      return throwError(()=>new Error(errorMessage))
    }
    switch (errorResponse.error.status){
      case 'CONFLICT':
        errorMessage = 'Tên tài khoản đã tồn tại'
        break;
    }
    console.log(errorMessage)
    return throwError(()=>new Error(errorMessage))
  }
  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }
  checkDob(dob:string){
    return (formGroup: FormGroup) => {
      const dobControl = formGroup.controls[dob];
      const currenDateTine = new Date().getTime()
      console.log(dobControl.value)
      const convertDob = new Date(dobControl.value).getTime()
      if (!dobControl) {
        return null;
      }

      if (dobControl.errors) {
        return null;
      }

      if (convertDob > currenDateTine) {
        dobControl.setErrors({ errorDate: true });
        console.log('error')
      } else {
        dobControl.setErrors(null);
      }
    }
  }
}
