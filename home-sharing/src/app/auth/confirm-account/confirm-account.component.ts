import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {API_CONFIRM_ACCOUNT} from "../../constant/api.constant";
import {Observable} from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.css']
})
export class ConfirmAccountComponent implements OnInit {
  isConfirmSuccess = 0
  constructor(private route:ActivatedRoute,private http:HttpClient,private router:Router) { }
  responseData:any
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      let otp = params['otp']
      if(otp){
        this.confirmAccount(otp).subscribe(res=>{
          console.log(res.data.response)
          //400:false
          //200:success
          if (res.data.response==400){
            this.isConfirmSuccess = 2
          }else if(res.data.response==200){
            this.isConfirmSuccess = 1
          }
        },()=>{
          this.isConfirmSuccess = 2
        })
      }
    })
  }

  confirmAccount(otp:string):Observable<any>{
    return this.http.get(API_CONFIRM_ACCOUNT+otp)
  }

  goToHome() {
    this.router.navigate(['../home'])
  }
}
