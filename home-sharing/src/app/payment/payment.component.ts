import { Component, OnInit } from '@angular/core';
import {PaymentService} from "./payment.service";
import {ActivatedRoute} from "@angular/router";

export interface PaymentResponse {
  message: string
  data: PaymentData
}

export interface PaymentData {
  urlPayment: string
  status: string
}


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  postID:number
  constructor(private paymentService:PaymentService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.postID = +params.get('id')
      console.log('id post: '+this.postID)

    })
  }

  onPayment(paymentPacketID: number) {
    let urlPayment = ''
    this.paymentService.doPayment(this.postID,paymentPacketID).subscribe(response=>{
        let paymentData = response.data
      urlPayment = paymentData.urlPayment
    },()=>{console.log('some error')},
      ()=>{
        window.location.href=urlPayment
      }
    )
  }
}
