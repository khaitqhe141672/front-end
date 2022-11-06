import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Observable, of, throwError} from "rxjs";
import {User} from "./user.model";
import {Injectable, OnDestroy} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {CheckUserNameResponse, RegisterResponse} from "./register/register.service";
import * as API_CONSTANT from "../constant/api.constant"

export interface AuthResponseData {
  message: string,
  data: {
    customerID: number,
    userID: number,
    user: {
      username: string,
      email: string,
      role: string,
      status: number
    },
    token: string,
  }
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null)
  role: string

  constructor(private router: Router, private http: HttpClient) {
  }

  login(username: string, password: string) {
    const urlLogin = 'http://localhost:8080/api/auth/signin'
    return this.http.post<AuthResponseData>(urlLogin, {username: username, password: password})
      .pipe(catchError(this.handleError), tap(responseData => {
          this.handleAuthentication(
            responseData.message,
            responseData.data.customerID,
            responseData.data.userID,
            responseData.data.user.username,
            responseData.data.user.email,
            responseData.data.user.role,
            responseData.data.user.status,
            responseData.data.token,
          )
        }
      ))
  }

  autoLogin() {
    console.log("auto login")
    const userData: User = JSON.parse(localStorage.getItem('userData'))
    this.role = JSON.parse(localStorage.getItem('role'))
    // console.log("userName: "+userData.username+"/nRole: "+this.role)
    if (!userData) {
      return;
    }
    console.log(userData.username + ' ' + userData.role)
    const loadUser = new User(userData.id, userData.username, userData.role, userData.token)
    if (loadUser.token) {
      this.user.next(loadUser)
    }
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem('token'))
  }

  private handleAuthentication(
    message: string, customerID: number, userID: number, username: string, email: string, role: string, status: number,
    token: string
  ) {
    const user = new User(userID, username, role, token)
    console.log("user info: " + user)
    this.user.next(user)
    localStorage.setItem('role', JSON.stringify(user.role))
    localStorage.setItem('userData', JSON.stringify(user))
    localStorage.setItem('token', JSON.stringify(user.token))
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!'
    if (!errorResponse.error || !errorResponse.error.status) {
      return throwError(() => new Error(errorMessage))
    }
    // console.log(errorResponse)
    // console.log(errorResponse.error.status)
    switch (errorResponse.error.status) {
      case 'EXPECTATION_FAILED':
        errorMessage = 'Do thằng backend lười code nên ko biết lỗi gì'
        break;
      case 'EMAIL_NOT_EXIST':
        errorMessage = 'Email này đã được đăng ký'
        break;
      case 'CONFLICT':
        errorMessage = 'Tên tài khoản đã tồn tại'
        break;
    }
    console.log(errorMessage)
    return throwError(() => new Error(errorMessage))
  }

  // apiRegister ='http://localhost:8080/api/auth/signup'
  // apiCheckMail = 'http://localhost:8080/api/auth/exist-email?'
  register(username: string, password: string, mobile: string, address: string, email: string,
           role: string, dob: string, fullName: string) {
    return this.http.post<RegisterResponse>(API_CONSTANT.API_REGISTER, {
      username: username,
      password: password,
      email: email,
      role: role,
      fullName: fullName,
      address: address,
      mobile: mobile,
      dob: dob,
    })
      .pipe(catchError(this.handleError),
        tap(responseData => {
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

  checkEmailExist(email: string): Observable<boolean> {
    let message = 'An error occurred'
    this.http.post<CheckUserNameResponse>(API_CONSTANT.API_EXIST_MAIL + 'email=' + email, {}).pipe(catchError(this.handleError), tap(responseData => {
      message = responseData.message
      const data = responseData.data.user

    }))
    // if (message === 'EMAIL_NOT_EXIST') return true
    // else return false
    return of(message === 'EMAIL_NOT_EXIST').pipe()
  }

  getRole() {
    return this.role
  }

  // private handleErrorEmail(errorResponse:HttpErrorResponse){
  //   let errorMessage = 'An unknown error occurred!'
  //   if(!errorResponse.error||!errorResponse.error.message){
  //     return throwError(()=>new Error(errorMessage))
  //   }
  //   switch (errorResponse.error.message){
  //
  //   }
  //   return throwError(()=>new Error(errorMessage))
  // }
  // private handleErrorRegister(errorResponse:HttpErrorResponse){
  //   let errorMessage = 'An unknown error occurred!'
  //   if(!errorResponse.error||!errorResponse.error.status){
  //     return throwError(()=>new Error(errorMessage))
  //   }
  //   switch (errorResponse.error.status){
  //     case 'CONFLICT':
  //       errorMessage = 'Tên tài khoản đã tồn tại'
  //       break;
  //   }
  //   console.log(errorMessage)
  //   return throwError(()=>new Error(errorMessage))
  // }
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
        confirmPasswordControl.setErrors({passwordMismatch: true});
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  checkDob(dob: string) {
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
        dobControl.setErrors({errorDate: true});
        console.log('error')
      } else {
        dobControl.setErrors(null);
      }
    }
  }
  logout() {
    localStorage.removeItem('userData')
    localStorage.removeItem('role')
    localStorage.removeItem('token')
    // this.router.navigate(['auth/login'])
    this.user.next(null);
    this.router.navigate(['auth/login'])

  }




}
