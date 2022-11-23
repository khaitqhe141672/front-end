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
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      console.log(params['vnp_TxnRef'])
      this.data = (params['vnp_TxnRef'] as string).split('-');
        this.paymentSuccessService.pushPaymentSuccess(this.data[0],this.data[1]).subscribe(reponse=>{
          console.log(reponse)
          this.status = reponse.status
        })
      console.log(this.data)
    },()=>{console.log('error')}
    ,()=>{
      console.log('complete')

      }
    );
  }

  goToManagePost() {
    this.router.navigate(['../hosts/host-post-list'])
  }
}
