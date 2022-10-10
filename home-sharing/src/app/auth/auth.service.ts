import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {User} from "./user.model";
import {Injectable} from "@angular/core";
export interface AuthResponseData{
  message:string,
  data:{
    customerID:number,
    userID:number,
    user:{
      username:string,
      email:string,
      role:string,
      status:numbersrc/app/auth/auth.service.ts
    },
    token:string,
  }
}

@Injectable({providedIn:'root'})
export class AuthService{
  
}
