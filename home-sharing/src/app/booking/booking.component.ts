import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import format from "@popperjs/core/lib/utils/format";
import {MatListOption} from "@angular/material/list";
import {Observable} from "rxjs";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DatePickerComponent} from "../date-picker/date-picker.component";
import {BookingService} from "./booking.service";
import {BookingBody} from "../shared/model/booking.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {VoucherComponent} from "../voucher/voucher.component";

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
  servicePrice:number = 0
  totalBill:number = 0
  pctDiscount:number = 0
  totalDiscount:number=0
  totalBillAfterDiscount:number=0
  priceHS:number = 0
  postID:number
  startDateBooking:string
  endDateBooking:string
  standardPrice:number=0
  guestNumber:number=0
  datePicked: { startDate: Date, endDate: Date }

  formGroupBooking:FormGroup
  @ViewChild('fullName') fullNameRef:ElementRef;
  @ViewChild('phoneNumber') phoneNumberRef:ElementRef;
  @ViewChild('email')  emailRef:ElementRef;

  servicePost:{id:number;icon:string;name:string;price:number}[] = [
    {id:1,icon:"icon 1",name:"Bể bơi",price:400000},
    {id:2,icon:"icon 2",name:"Bar",price:400000},
    {id:3,icon:"icon 3",name:"Hất cùn",price:400000},
    {id:4,icon:"icon 5",name:"Đấm chủ",price:400000},
  ]
  selectedServicePost:{id:number,icon:string;name:string;price:number}[]=[]
  datePickerDialogRef: MatDialogRef<DatePickerComponent>
  voucherPickerDialogRef:MatDialogRef<VoucherComponent>

  postVoucherID = null

  constructor(private router:Router,private route:ActivatedRoute,private datePipe:DatePipe,  private dialog: MatDialog,private bookingService:BookingService,private fb:FormBuilder) { }
  ngOnInit(): void {
    this.servicePrice = 0
    this.totalDiscount = 0
    this.totalBillAfterDiscount = 0
    this.route.params.subscribe(params=>
    {
      this.postID = params['id']
    })
   this.route.queryParams.subscribe(params=>{

     this.startDateBooking = this.datePipe.transform(params['startDate'],format('dd-MM-yyyy'))
     this.endDateBooking =this.datePipe.transform(params['endDate'],format('dd-MM-yyyy'))
     this.guestNumber = params['guestNumber']
     this.standardPrice = params['standardPrice']
   })
    this.priceHS = this.standardPrice
    this.totalBill = 0
    this.refreshPrice()
    console.log('id: '+this.postID)
    console.log('start Date: '+this.startDateBooking)
    console.log('end date: '+this.endDateBooking)
    console.log('Guest number: '+this.guestNumber)
    this.initForm()
  }

  initForm(){
    this.formGroupBooking = this.fb.group({
      fullNameCtrl:[''],
      phoneNumberCtrl:[''],
      emailCtrl:['']
    })
  }

  onSelectedService(selected) {
    this.servicePrice = 0
    if(!selected[0])  {
      console.log('this is empty')
      this.servicePrice=0
      this.refreshPrice()
      return
    }
    this.selectedServicePost = selected.map(o => {
      this.servicePrice+=(o.value.price*this.guestNumber)
      this.refreshPrice()
      return o.value
    });

  }
  refreshPrice(){
    this.priceHS = this.standardPrice
    this.totalBill = Math.floor(+this.servicePrice + +this.priceHS)
    this.totalDiscount = Math.floor(+this.totalBill * +this.pctDiscount)
    this.totalBillAfterDiscount =Math.floor( +this.totalBill - +this.totalDiscount)
    // this.displayData()
  }

  increaseGuestNumber() {
    this.guestNumber++
    this.refreshPrice()
  }

  decreaseGuestNumber() {
    this.guestNumber--
    this.refreshPrice()
  }

  displayData(){
    console.log('priceHS: '+this.priceHS)
    console.log('servicePrice: '+this.servicePrice+'type of service price: '+typeof this.servicePrice)
    console.log('total Bill: '+this.totalBill)
  }

  openDatePickerDialog() {
    this.datePickerDialogRef = this.dialog.open(DatePickerComponent,{hasBackdrop:true})
    this.datePickerDialogRef.afterClosed().subscribe(res => {
      this.datePicked = res as { startDate: Date, endDate: Date }
      this.startDateBooking = this.datePipe.transform(this.datePicked.startDate,'dd-MM-yyyy')
      this.endDateBooking = this.datePipe.transform(this.datePicked.endDate,'dd-MM-yyyy')

    })
  }

  onCreateBooking() {
    let newDate = new Date(this.startDateBooking)
    console.log('Date booking: '+this.startDateBooking)
    console.log(this.bookingService.convertDate(this.startDateBooking))
    let startDateBookingBody = this.datePipe.transform(this.bookingService.convertDate(this.startDateBooking),'yyyy-MM-dd')
    let endDateBookingBody =  this.datePipe.transform(this.bookingService.convertDate(this.endDateBooking),'yyyy-MM-dd')
    console.log(startDateBookingBody.toString())
    console.log(endDateBookingBody.toString())

    let bookingBody:BookingBody = new BookingBody()
    bookingBody.startDate = startDateBookingBody
    bookingBody.endDate = endDateBookingBody
    bookingBody.note = 'note'
    bookingBody.totalMoney = this.totalBillAfterDiscount
    bookingBody.totalPerson = this.guestNumber
    bookingBody.postServices = this.servicePost.map(service=>service.id)
    bookingBody.postVoucherID = this.postVoucherID
    bookingBody.totalPriceRoom = this.priceHS
    bookingBody.totalPriceService = this.servicePrice
    bookingBody.discount = this.totalDiscount
    bookingBody.fullName = this.formGroupBooking.controls.fullNameCtrl.value
    bookingBody.email = this.formGroupBooking.controls.emailCtrl.value
    bookingBody.mobile = this.formGroupBooking.controls.phoneNumberCtrl.value

    console.log('startDate:  '+startDateBookingBody)
    console.log('endDate: '+bookingBody.endDate)
    console.log('note: '+bookingBody.note)
    console.log('total money: '+bookingBody.totalMoney)
    console.log('total person: '+bookingBody.totalPerson)
    console.log('post service: '+JSON.stringify(bookingBody.postServices))
    console.log('post voucher id: '+bookingBody.postVoucherID)
    console.log('total price room: '+bookingBody.totalPriceRoom)
    console.log('total price service: '+bookingBody.totalPriceService)
    console.log('discount: '+bookingBody.discount)
    console.log('full name: '+bookingBody.fullName)
    console.log('emailL '+bookingBody.email)
    console.log('mobile: '+bookingBody.mobile)
    let bookingObservable =   this.bookingService.bookingRequest(bookingBody,this.postID)
    bookingObservable.subscribe({
      next:responseData =>{
        console.log(responseData)
      },
      error:errorMess =>{
        console.log(errorMess)
      },
      complete:()=>{
        console.log('complete')
      }
    })
  }

  onOpenVoucherDialog() {
    this.voucherPickerDialogRef = this.dialog.open(VoucherComponent,{
      hasBackdrop:true
    })
  }
}
