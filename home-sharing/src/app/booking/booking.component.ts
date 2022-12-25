import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DatePickerComponent} from "../date-picker/date-picker.component";
import {BookingService} from "./booking.service";
import {BookingBody} from "../shared/model/booking.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VoucherComponent} from "../voucher/voucher.component";
import {ProfileService} from "../profile/profile.service";
import {UserInfo, UserInfoResponse} from "../profile/profile.model";
import {PostDetail, ResponsePostDetail, ServiceDetailDtoList} from "../posts/post-detail/post-detail.model";
import {PostDetailService} from "../posts/post-detail/post-detail.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  voucherValue: string = null
  isBooking = false
  name: string = "Đinh Văn Đức"
  phoneNumber: string = "0999999999"
  email: string = "dinhduc2550@gmail.com"
  servicePrice: number = 0
  totalBill: number = 0
  pctDiscount: number = 0
  totalDiscount: number = 0
  totalBillAfterDiscount: number = 0
  priceHS: number = 0
  daysBetween:number = 1
  tax = 0.9
  postID: number
  startDateBooking: string
  endDateBooking: string
  standardPrice: number = 0
  guestNumber: number = 0
  rootGuestNumber: number = 0
  datePicked: { startDate: Date, endDate: Date }
  listBookedDate: string[] = []
  saveService: number[]
  formGroupBooking: FormGroup
  @ViewChild('fullName') fullNameRef: ElementRef;
  @ViewChild('phoneNumber') phoneNumberRef: ElementRef;
  @ViewChild('email') emailRef: ElementRef;

  servicePost: { id: number; icon: string; name: string; price: number }[] = [
    {id: 1, icon: "icon 1", name: "Bể bơi", price: 400000},
    {id: 2, icon: "icon 2", name: "Bar", price: 400000},
    {id: 3, icon: "icon 3", name: "Hất cùn", price: 400000},
    {id: 4, icon: "icon 5", name: "Đấm chủ", price: 400000},
  ]
  selectedServicePost: ServiceDetailDtoList[] = []
  datePickerDialogRef: MatDialogRef<DatePickerComponent>
  voucherPickerDialogRef: MatDialogRef<VoucherComponent>
  postVoucherID = null
  tempVoucherID = null
  userInfo: UserInfo
  userInfoResponse: UserInfoResponse

  listService: ServiceDetailDtoList[]
  formCheckVoucher: FormGroup;

  isConfirm = false

  constructor(private postDetailService: PostDetailService, private profileService: ProfileService, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe, private dialog: MatDialog, private bookingService: BookingService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.servicePrice = 0
    this.totalDiscount = 0
    this.totalBillAfterDiscount = 0
    this.route.params.subscribe(params => {
      this.postID = params['id']
    })
    this.route.queryParams.subscribe(params => {
      this.rootGuestNumber = params['rootGuestNumber']
      this.startDateBooking = params['startDate']
      this.endDateBooking = params['endDate']
      this.guestNumber = params['guestNumber']
      this.standardPrice = params['standardPrice']
      this.listBookedDate = params['listBookedDate']
      // console.log('list Booked date: '+this.listBookedDate)
      this.priceHS = this.standardPrice * this.guestNumber
      this.daysBetween = params['daysBetween']?params['daysBetween']:0
      console.log('guestNumber: ' + this.guestNumber)
      console.log('priceHS: ' + this.priceHS)

    })
    console.log(JSON.stringify(this.listService))
    this.totalBill = 0
    this.refreshPrice()
    console.log('id: ' + this.postID)
    console.log('start Date: ' + this.startDateBooking)
    console.log('end date: ' + this.endDateBooking)
    console.log('Guest number: ' + this.guestNumber)
    this.initForm()
    this.initFormCheckVoucher()
  }

  initForm() {
    this.formGroupBooking = this.fb.group({
      fullNameCtrl: ['', [Validators.required, Validators.pattern("^\\D*\\s*$"),
      Validators.minLength(6)]],
      phoneNumberCtrl: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      emailCtrl: ['', [Validators.required, Validators.email]],
      confirmCtrl: [''],
      noteCtrl: ['']
    })
    this.getUserInfo()
    this.getPostService()
  }

  getUserInfo() {
    this.profileService.getUserInfo().subscribe(responseInfo => {
      this.userInfoResponse = responseInfo
      this.userInfo = this.userInfoResponse.object
      this.formGroupBooking.controls.fullNameCtrl.patchValue(this.userInfo.fullName)
      this.formGroupBooking.controls.phoneNumberCtrl.patchValue(this.userInfo.mobile)
      this.formGroupBooking.controls.emailCtrl.patchValue(this.userInfo.email)
    })
  }

  initFormCheckVoucher() {
    this.formCheckVoucher = this.fb.group({
      codeVoucherCtrl: ['']
    })
  }

  getPostService() {
    this.postDetailService.getPostDetail(this.postID).subscribe(response => {
      let responsePostDetail = response as ResponsePostDetail
      let postDetail = responsePostDetail.object as PostDetail
      this.listService = postDetail.serviceDtoList
    })
  }

  onSelectedService(selected) {
    this.servicePrice = 0
    if (!selected) {
      console.log('this is empty')
      this.servicePrice = 0
      this.refreshPrice()
      return
    }
    this.selectedServicePost = selected.map(o => {
      this.servicePrice += (o.value.price * this.guestNumber)
      return o.value
    });
    this.refreshPrice()
  }

  refreshPrice() {
    this.priceHS = this.standardPrice * this.daysBetween
    if (this.selectedServicePost.length > 0) {
      this.servicePrice = this.guestNumber * this.selectedServicePost.reduce((sum, current) => sum + current.price, 0)
    }else{
      this.servicePrice=0
    }
    this.totalBill = Math.floor(+this.servicePrice + +this.priceHS)
    this.totalDiscount = Math.floor(+this.totalBill * +this.pctDiscount)
    this.totalBillAfterDiscount = Math.floor(+this.totalBill - +this.totalDiscount)
  }

  onRemoveVoucher() {
    this.pctDiscount = 0
    this.servicePrice = 0
    this.formCheckVoucher.controls.codeVoucherCtrl.patchValue('')
    this.refreshPrice()
  }

  displayData() {
    console.log('priceHS: ' + this.priceHS)
    console.log('totalBill: ' + this.totalBill)
    console.log('total discout: ' + this.totalDiscount)
    console.log('totalBillAfterDiscount: ' + this.totalBillAfterDiscount)
    console.log('total Bill: ' + this.totalBill)
  }

  increaseGuestNumber() {
    if (this.rootGuestNumber <= this.guestNumber) {
      Swal.fire({
        icon: 'error',
        title: 'Vượt quá số khách có thể chứa'
      })
      return
    }
    this.guestNumber++
    this.refreshPrice()
  }

  decreaseGuestNumber() {
    if (this.guestNumber == 1) {
      return
    }
    this.guestNumber--
    this.refreshPrice()
  }


  openDatePickerDialog() {
    this.datePickerDialogRef = this.dialog.open(DatePickerComponent, {data: this.listBookedDate, hasBackdrop: true})
    this.datePickerDialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.datePicked = res as { startDate: Date, endDate: Date }
        this.startDateBooking = this.datePipe.transform(this.datePicked.startDate, 'dd/MM/yyyy')
        this.endDateBooking = this.datePipe.transform(this.datePicked.endDate, 'dd/MM/yyyy')
        let differenceInTime = this.datePicked.endDate.getTime() - this.datePicked.startDate.getTime();
        this.daysBetween = Math.ceil(differenceInTime / (1000 * 3600 * 24)) + 1;
        console.log('daysBetween: '+this.daysBetween)
        this.refreshPrice()
      }
    })
  }

  onCreateBooking() {
    console.log(this.isConfirm)
    let fullName = this.formGroupBooking.controls.fullNameCtrl.value.replace(/  +/g, ' ').trim();
    let newDate = new Date(this.startDateBooking)
    console.log('Date booking: ' + this.startDateBooking)
    console.log(this.bookingService.convertDate(this.startDateBooking))
    let startDateBookingBody = this.datePipe.transform(this.bookingService.convertDate(this.startDateBooking), 'yyyy-MM-dd')
    let endDateBookingBody = this.datePipe.transform(this.bookingService.convertDate(this.endDateBooking), 'yyyy-MM-dd')
    console.log(startDateBookingBody.toString())
    console.log(endDateBookingBody.toString())

    let bookingBody: BookingBody = new BookingBody()
    bookingBody.startDate = startDateBookingBody
    bookingBody.endDate = endDateBookingBody
    bookingBody.note = this.formGroupBooking.controls.noteCtrl.value
    bookingBody.totalMoney = this.totalBillAfterDiscount*this.tax
    bookingBody.totalPerson = this.guestNumber
    bookingBody.postServices = this.selectedServicePost.map(service => service.postServiceID)
    bookingBody.postVoucherID = this.postVoucherID
    bookingBody.totalPriceRoom = this.priceHS
    bookingBody.totalPriceService = this.servicePrice
    bookingBody.discount = this.totalDiscount
    bookingBody.fullName = fullName
    console.log('post voucher id: ' + bookingBody.postVoucherID)
    // return
    if (fullName.length <= 6) {
      Swal.fire({
        icon: 'error',
        title: 'Họ và Tên không hợp lệ'
      })
    }
    bookingBody.email = this.formGroupBooking.controls.emailCtrl.value.trim()
    bookingBody.mobile = this.formGroupBooking.controls.phoneNumberCtrl.value.trim()
    // console.log('postID:  '+this.postID)
    // console.log('startDate:  '+startDateBookingBody)
    // console.log('endDate: '+bookingBody.endDate)
    // console.log('note: '+bookingBody.note)
    // console.log('total money: '+bookingBody.totalMoney)
    // console.log('total person: '+bookingBody.totalPerson)
    // console.log('post service: '+bookingBody.postServices)
    // console.log('post service2: '+JSON.stringify(this.selectedServicePost))
    //
    // console.log('post voucher id: '+bookingBody.postVoucherID)
    // console.log('total price room: '+bookingBody.totalPriceRoom)
    // console.log('total price service: '+bookingBody.totalPriceService)
    // console.log('discount: '+bookingBody.discount)
    console.log('length name: ' + bookingBody.fullName.length)

    console.log('full name: ' + bookingBody.fullName)

    // console.log('emailL '+bookingBody.email)
    // console.log('mobile: '+bookingBody.mobile)
    this.isBooking = true
    let bookingObservable = this.bookingService.bookingRequest(bookingBody, this.postID)
    bookingObservable.subscribe({
      next: responseData => {
        console.log('responseData: ' + responseData)
        this.isBooking = false
      },
      error: errorMess => {
        console.log('errorMess: ' + errorMess)
      },
      complete: () => {
        Swal.fire({
          icon: 'success',
          title: 'Đặt phòng thành công',
          text: 'Vui lòng đợi chủ nhà xét duyệt',
        }).then(
          () => {
            this.router.navigate(['/profile/history-booking'])
          })
        this.isBooking = false
        console.log('complete')
      }
    })
  }

  onOpenVoucherDialog() {
    this.voucherPickerDialogRef = this.dialog.open(VoucherComponent, {
      hasBackdrop: true,
      data: this.postID
    })
    this.voucherPickerDialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.formCheckVoucher.controls.codeVoucherCtrl.patchValue(response.data.codeVoucher)
        this.postVoucherID = response.data.voucherID
      }
    })
  }

  checkVoucherExist() {
    let codeVoucher = this.formCheckVoucher.controls.codeVoucherCtrl.value
    if (codeVoucher == '') {
      Swal.fire({
        icon:'error',
        title:'Vui lòng nhập mã giảm giá'
      })
      return
    }
    // console.log(this.formCheckVoucher.controls.codeVoucherCtrl.value)
    this.bookingService.checkVoucherExist(this.postID, codeVoucher).subscribe(response => {
      console.log('response: ' + JSON.stringify(response))
      if (response.status != 21) {
        this.totalBillAfterDiscount = Math.round(this.totalBill - (this.totalBill * response.object) / 100)
        this.pctDiscount = +response.object / 100
        this.totalDiscount = this.totalBill * response.object / 100
        // console.log('totalBill: '+this.totalBill)
        // console.log('totalBillAfterDiscount: '+this.totalBillAfterDiscount)
        // console.log('response voucher: '+response.object)
        this.displayData()
      } else {
        this.postVoucherID = null
      }
    })

  }

  changeValue($event) {
    this.isConfirm = $event.checked
    console.log($event)
  }

}
