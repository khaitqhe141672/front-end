import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef} from "@angular/material/dialog";
import {RateService} from "./rate.service";
import {ViewRateCustomerDto} from "../history-booking/history_booking.model";
import Swal from "sweetalert2";


@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css'],
})
export class RateComponent implements OnInit {
  currentRate= 0
  comment:string=''
  pointRate
  isDisableInput = false
  constructor(@Inject(MAT_DIALOG_DATA) public data: {id:number,statusRate:number,rateDetail:ViewRateCustomerDto},private fb: FormBuilder,private rateService:RateService){
    this.formRate = this.fb.group({
      rating: ['', Validators.required],
      commentCtrl:['',Validators.required]
    })
    console.log('booking detail id: '+data.id)
  }
  public formRate: FormGroup;
  ngOnInit(): void {
    if(this.data.statusRate==1){
      this.initData()
      this.isDisableInput = true
    }
  }
   stars: boolean[] = Array(5).fill(false);

   rate(rating: number) {
    console.log('rating', rating);
    this.stars = this.stars.map((_, i) => rating > i);
    console.log('stars', this.stars);
    // this.currentRate = this.stars
  }

  initData(){
     let rateDetail:ViewRateCustomerDto = this.data.rateDetail
    this.pointRate = this.data.rateDetail.point
     this.formRate.controls.rating.patchValue(rateDetail.point)
    this.formRate.controls.commentCtrl.patchValue(rateDetail.comment)
  }

  showData() {
    this.currentRate = this.formRate.get('rating').value
  }

  onSubmitRate() {
    this.comment = this.formRate.get('commentCtrl').value.toString().trim().replace(/  +/g, ' ')
    console.log('show rate: '+this.formRate.get('rating').value)
    console.log('show rate: '+ this.comment)
    this.rateService.pushRate(this.data.id,this.comment,this.currentRate).subscribe({
      next:_=>{},
      error:_=>{
        Swal.fire({
          icon:'error',
          title:'Đánh giá homestay thất bại',
          text:'Vui lòng thử lại sau'
        })
      },
      complete:()=>{
        Swal.fire({
          icon:'success',
          title:'Đánh giá homestay thành công'
        })
      }
    })
  }


}
