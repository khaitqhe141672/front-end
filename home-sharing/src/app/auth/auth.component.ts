import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {AuthResponseData, AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
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
    // if(this.isLogin){
      authObservable = this.authService.login(useName,password)
    // }
    authObservable.subscribe({
      next:responseData=>{
        console.log(responseData)
        this.router.navigate(['/home'])
      },
      error:errorMessageResponse=>{
        this.error = errorMessageResponse
      },
      complete:()=>{
        console.log('complete')
      }
    })
  }
}
