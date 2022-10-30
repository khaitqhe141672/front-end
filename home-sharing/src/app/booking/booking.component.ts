import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  voucherValue:string = null
  name:string = "Đinh Văn Đức"
  phoneNumber:string = "0999999999"
  email:string = "dinhduc2550@gmail.com"
  priceHS:number = 1000000
  servicePrice:number = 0
  totalBill:number = 0
  pctDiscount:number = 0.12
  totalDiscount:number
  totalBillAfterDiscount:number
  servicePost:{icon:string;name:string;price:number}[] = [
    {icon:"icon 1",name:"Bể bơi",price:400000},
    {icon:"icon 2",name:"Bar",price:400000},
    {icon:"icon 3",name:"Hất cùn",price:400000},
    {icon:"icon 5",name:"Đấm chủ",price:400000},
  ]
  constructor() { }

  ngOnInit(): void {
    this.servicePrice = this.servicePost.reduce((sum,a)=>sum+a["price"],0)
    this.totalBill = this.servicePrice + this.priceHS
    this.totalDiscount = this.totalBill*this.pctDiscount
    this.totalBillAfterDiscount = this.totalBill - this.totalDiscount
  }

  openCalendar() {

  }

  changeGuestNumber() {

  }
}
