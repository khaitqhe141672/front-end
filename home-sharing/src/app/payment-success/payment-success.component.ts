import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PaymentSuccessService} from "./payment-success.service";

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
data = []
  status = 0
  constructor(private router:Router,private route:ActivatedRoute,private paymentSuccessService:PaymentSuccessService) { }
  value=[]
  responseCodeStatus = undefined
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.responseCodeStatus =  params['vnp_ResponseCode'] as string
      console.log('response Code: '+ this.responseCodeStatus)
      if( this.responseCodeStatus=='00'){
        console.log(params['vnp_TxnRef'])
        this.data = (params['vnp_TxnRef'] as string).split('-');
        this.paymentSuccessService.pushPaymentSuccess(this.data[0],this.data[1]).subscribe(reponse=>{
          console.log(reponse)
          this.status = reponse.object
          console.log('status input: '+this.status)
        })
        console.log(this.data)

      }
    },()=>{console.log('error')}
    ,()=>{
      console.log('complete')
      }
    );
  }

  goToManagePost() {
    this.router.navigate(['../host/host-post-list'])
  }
}
