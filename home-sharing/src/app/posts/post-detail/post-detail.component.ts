import {Component, OnInit, ViewChild} from '@angular/core';
import {PostService} from "../post.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DataStorageService} from "../../shared/data-storage.service";
import {PostDetailService} from "./post-detail.service";
import {Rate, RateResponse} from "../../shared/model/rate.model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DatePickerComponent} from "../../date-picker/date-picker.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {PostDetail} from "./post-detail.model";
import {ShowMoreDialogComponent} from "../../shared/dialog/show-more-dialog/show-more-dialog.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  @ViewChild('date1') startDateCalendar: HTMLInputElement
  @ViewChild('date2') endDateCalendar: HTMLInputElement
  role = ''
  isShowRate =  false
  isShowBooking = false
  pageIndex = 1
  sizePageRate = 1
  datePickerDialogRef: MatDialogRef<DatePickerComponent>
  showMoreDialogRef:MatDialogRef<ShowMoreDialogComponent>

  datePicked: { startDate: Date, endDate: Date }
  id: number;
  hostId: number = 6
  postDetail: PostDetail;
  rateResponse: RateResponse
  rates: Rate[] = []
  formBooking: FormGroup
  totalPriceInDays: number
  totalPriceInDaysAfterTax: number
  startDate: Date = null
  endDate: Date = null
  daysBetween: number
  standardPrice: number = 0
  formatStartDate
  formatEndDate

  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute,
              private dataStorage: DataStorageService, private postDetailService: PostDetailService,
              private dialog: MatDialog, private fb: FormBuilder,
              private datePipe: DatePipe,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.postDetail = this.postDetailService.postDetail
      console.log('date range: '+this.postDetail)
      if(this.postDetail.avgRate)
      this.postDetail.avgRate = +this.postDetail.avgRate.toFixed(1)
    })
    this.getRate()
    this.formBooking = this.fb.group({
      startDateCtrl: [''],
      endDateCtrl: [''],
      guestNumber: ['']
    })
    this.standardPrice = this.postDetail.price
    this.role = JSON.parse(localStorage.getItem('role'))
    console.log('role: '+this.role)
    if(this.role=='ROLE_CUSTOMER'||this.role=='ROLE_PENDING') this.isShowRate = true
    if(this.role==null) this.isShowRate = true
    if(this.role=='ROLE_CUSTOMER') this.isShowBooking = true
    if(this.role=='ROLE_PENDING') this.isShowBooking =true
  }

  getRate() {
    this.postDetailService.getRatesByPostID(this.id,this.pageIndex).subscribe(
      responseRate => {
        this.rateResponse = responseRate
        this.rates = responseRate.data.listRate
        this.sizePageRate = responseRate.data.sizePage
        console.log(this.rates)
      },
      error => console.log(error)
    )
  }

  openDatePickerDialog() {
    this.datePickerDialogRef = this.dialog.open(DatePickerComponent, {
      data:this.postDetail.bookingDate,
      hasBackdrop: true})
    this.datePickerDialogRef.afterClosed().subscribe(res => {
      if(res){
        this.datePicked = res as { startDate: Date, endDate: Date }
        // console.log("Date before format: " + this.datePicked.startDate + " - " + this.datePicked.endDate)
        // console.log("Date after that: " + this.datePicked.startDate.toLocaleDateString().slice(0, 10) + "-" + this.datePicked.endDate.toLocaleDateString().slice(0, 10))
        this.formatStartDate = this.datePipe.transform(this.datePicked.startDate, 'dd/MM/yyyy')
        this.formatEndDate = this.datePipe.transform(this.datePicked.endDate, 'dd/MM/yyyy')
        console.log('format start date: ' + this.formatStartDate)
        console.log('format end date: ' + this.formatEndDate)
        this.formBooking.controls.startDateCtrl.patchValue(this.formatStartDate)
        this.formBooking.controls.endDateCtrl.patchValue(this.formatEndDate)
        let differenceInTime = this.datePicked.endDate.getTime() - this.datePicked.startDate.getTime();
        this.daysBetween = Math.ceil(differenceInTime / (1000 * 3600 * 24)) + 1;
        this.totalPriceInDays = this.postDetail.price * this.daysBetween
        this.totalPriceInDaysAfterTax = Math.floor(this.totalPriceInDays * 1.1)
        console.log('Day between: ' + this.daysBetween)
      }
    })
  }

  onBooking() {
    console.log('formatStartDate: '+this.formatStartDate)
    console.log('formatEndDate: '+this.formatEndDate)
    if(this.formatStartDate&&this.formatEndDate){
      const numberGuest = this.formBooking.controls.guestNumber.value
      if(numberGuest>this.postDetail.guestNumber){
        Swal.fire({
          icon:'error',
          title:'Homestay này tiếp đón tối đa '+this.postDetail.guestNumber +' khách'
        })
      }else{
        this.router.navigate(['/booking', this.id], {
            queryParams: {
              startDate: this.formatStartDate,
              endDate: this.formatEndDate,
              guestNumber: numberGuest,
              rootGuestNumber:this.postDetail.guestNumber,
              standardPrice: this.standardPrice,
              listBookedDate:this.postDetail.bookingDate,
              daysBetween:this.daysBetween
            }
          }
        )
      }
    }else {
      Swal.fire({
        icon:'error',
        title:'Vui lòng điền đủ thông tin'
      })
    }

  }


  onLikeRate(rateID: number) {
    this.postDetailService.likeRate(rateID,this.postDetail.postID, 1).subscribe(
      response => console.log(response),
      ()=>{
        Swal.fire({
          icon:'error',
          title:'Bạn chưa từng thuê Homestay này!'
        })
      },
      ()=>{
        this.getRate()
      }
    )
  }

  onDisLikeRate(rateID: number) {
    this.postDetailService.likeRate(rateID,this.postDetail.postID, 2).subscribe(
      response => console.log(response),
      ()=>{
        Swal.fire({
          icon:'error',
          title:'Bạn chưa từng thuê Homestay này!'
        })
      },
      ()=>{
        this.getRate()
      }
    )
  }

  showMore(type: number) {
    //1: ảnh
    //2: tiện ích
    //3: Mô tả
    if(type===1){
      this.showMoreDialogRef = this.dialog.open(ShowMoreDialogComponent,{
        data:{
          type:1,
          listData:this.postDetail.imageDtoList.map(utility=>utility.imageUrl)
        },
        hasBackdrop:true,
        width:'800px',
      })
    }
    else if(type===2){
      this.showMoreDialogRef = this.dialog.open(ShowMoreDialogComponent,{
        data:{
          type:2,
          listData:this.postDetail.postUtilityDtoList.map(utility=>utility.nameUtility)
        },
        hasBackdrop:true,
        width:'300px'
      })
    }else
    if(type===3){
      this.showMoreDialogRef = this.dialog.open(ShowMoreDialogComponent,{
        data:{
          type:3,
          listData:this.postDetail.description
        },
        hasBackdrop:true,
        width:'600px'
      })
    }

  }

  goToLink(number: string){
    let url = 'https://zalo.me/'+number
    window.open(url, "_blank");
  }

  scrollToElement(element) {
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  handlePageEvent(e) {
    this.pageIndex = ++e.pageIndex
    this.getRate()

  }
}

