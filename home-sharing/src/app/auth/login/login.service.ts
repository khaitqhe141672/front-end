import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { AuthResponseData } from "../auth.service";
import { User } from "../user.model";

@Injectable({providedIn:'root'})
export class LoginService{
    constructor(private http:HttpClient, private router:Router) {
    }
    user = new BehaviorSubject<User>(null)
    login(username:string,password:string){
      const urlLogin = 'http://localhost:8080/api/auth/signin'
      return this.http.post<AuthResponseData>(urlLogin,{username:username,password:password})
        .pipe(catchError(this.handleError),tap(responseData=>{
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
    private handleAuthentication(
      message:string,customerID:number,userID:number,username:string,email:string,role:string,status:number,
      token:string
    ){
      const user = new User(userID,username,role,token)
      this.user.next(user)
      localStorage.setItem('userData',JSON.stringify(user))
    }
    private handleError(errorResponse:HttpErrorResponse){
      let errorMessage = 'An unknown error occurred!'
      if(!errorResponse.error||!errorResponse.error.status){
        return throwError(()=>new Error(errorMessage))
      }
      // console.log(errorResponse)
      // console.log(errorResponse.error.status)
      switch (errorResponse.error.status){
        case 'EXPECTATION_FAILED':
          errorMessage = 'Do thằng backend lười code nên ko biết lỗi gì'
          break;
      }
      console.log(errorMessage)
      return throwError(() => new Error(errorMessage))
    }
}
