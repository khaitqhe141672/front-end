import {Component, OnInit, ViewChild} from '@angular/core';
import {PostService} from "../post.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Post, ReponsePost} from "../post.model";
import {DataStorageService} from "../../shared/data-storage.service";
import {PostDetailService} from "./post-detail.service";
import {Rate, RateResponse} from "../../shared/model/rate.model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DatePickerComponent} from "../../date-picker/date-picker.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  @ViewChild('date1') startDateCalendar: HTMLInputElement
  @ViewChild('date2') endDateCalendar: HTMLInputElement

  datePickerDialogRef: MatDialogRef<DatePickerComponent>
  datePicked: { startDate: Date, endDate: Date }
  id: number;
  postDetail: Post;
  postDetailResponse: ReponsePost;
  rateResponse: RateResponse
  rates: Rate[] = []
  formBooking: FormGroup
  totalPriceInDays: number
  totalPriceInDaysAfterTax: number
  startDate: Date = null
  endDate: Date = null
  daysBetween: number

  startDateConverted: Date
  endDateConverted: Date


  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute,
              private dataStorage: DataStorageService, private postDetailService: PostDetailService,
              private dialog: MatDialog, private fb: FormBuilder,
              private datePipe:DatePipe) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.postDetail = this.postDetailService.postDetail
    })
    this.getRate()
    this.formBooking = this.fb.group({
      startDateCtrl: [''],
      endDateCtrl: [''],
      guestNumber: ['']
    })
  }

  getRate() {
    this.postDetailService.getRatesByPostID(this.id).subscribe(
      responseRate => {
        this.rateResponse = responseRate
        this.rates = responseRate.object
        console.log(this.rates[0])
      },
      error => console.log(error)
    )
  }

  openDatePickerDialog() {
    this.datePickerDialogRef = this.dialog.open(DatePickerComponent)
    this.datePickerDialogRef.afterClosed().subscribe(res => {
      this.datePicked = res as { startDate: Date, endDate: Date }
      console.log("Date before format: "+this.datePicked.startDate+" - "+this.datePicked.endDate)
      console.log("Date after that: "+this.datePicked.startDate.toLocaleDateString().slice(0, 10)+"-"+this.datePicked.endDate.toLocaleDateString().slice(0, 10))
      let formatStartDate = this.datePipe.transform(this.datePicked.startDate,'yyyy-MM-dd')
      let formatEndDate = this.datePipe.transform(this.datePicked.endDate,'yyyy-MM-dd')
      console.log('format start date: '+formatStartDate)
      this.formBooking.controls.startDateCtrl.patchValue(formatStartDate)
      this.formBooking.controls.endDateCtrl.patchValue(formatEndDate)
      let differenceInTime = this.datePicked.endDate.getTime() - this.datePicked.startDate.getTime();
      this.daysBetween = Math.ceil(differenceInTime / (1000 * 3600 * 24))+1;
      this.totalPriceInDays = this.postDetail.price * this.daysBetween
      this.totalPriceInDaysAfterTax = Math.floor(this.totalPriceInDays * 1.1)
      console.log('Day between: ' + this.daysBetween)
    })
  }

  datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }


  addStartDate(date: Date) {
    this.startDate = date
  }

  addEndDate(date: Date) {
    this.endDate = date
  }

  onBooking() {
    this.router.navigate(['/booking', this.id], {
        queryParams: {
          startDate: this.datePicked.startDate.toISOString().slice(0, 10),
          endDate: this.datePicked.endDate.toISOString().slice(0, 10),
          guestNumber:this.formBooking.controls.guestNumber.value
        }
      }
    )
  }
}

// @Component({
//   selector:'date-picker-dialog',
//   templateUrl:'date-picker-dialog.component.html'
// })
