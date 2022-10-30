import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {API_CHANGE_PASSWORD} from "../../constant/api.constant";
import {Injectable} from "@angular/core";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({providedIn:'root'})
export class PasswordService{
  constructor(private http: HttpClient) {

  }
  changePassword(currentPass,newPass){
    const passwordData ={
      currentPassword:currentPass,
      newPassword:newPass
    }
    return this.http.put<any>(API_CHANGE_PASSWORD,passwordData).
    pipe(catchError(this.handleError),tap(responseData=>{
      this.handleChangePassword(responseData.status,responseData.message)
      console.log('response change password: '+JSON.stringify(responseData))
    }))

  }
  private handleChangePassword(status:string,message:string){
    console.log('handlePassword: '+message)
  }
  private handleError(errorResponse:HttpErrorResponse){
    let errorMessage = 'An unknown error occurred!'
    // errorMessage = errorResponse.error.message
      return throwError(() => new Error(errorMessage))
  }

}
