import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthResponseData, AuthService} from '../auth.service';
import { LoginService } from './login.service';

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
    // if(this.isLogin){
      authObservable = this.authService.login(useName,password)
    // }
    authObservable.subscribe({
      next:responseData=>{
        // console.log(responseData)
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
