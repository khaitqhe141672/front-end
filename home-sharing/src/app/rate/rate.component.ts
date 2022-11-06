import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef} from "@angular/material/dialog";
import {RateService} from "./rate.service";


@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css'],
})
export class RateComponent implements OnInit {
  currentRate= 0
  comment:string=''
  constructor(@Inject(MAT_DIALOG_DATA) public data: {id:number},private fb: FormBuilder,private rateService:RateService){
    this.formRate = this.fb.group({
      rating: ['', Validators.required],
      commentCtrl:['',Validators.required]
    })
    console.log('booking detail id: '+data.id)
  }
  public formRate: FormGroup;
  ngOnInit(): void {
  }
   stars: boolean[] = Array(5).fill(false);

   rate(rating: number) {
    console.log('rating', rating);
    this.stars = this.stars.map((_, i) => rating > i);
    console.log('stars', this.stars);
    // this.currentRate = this.stars
  }

  showData() {
    this.currentRate = this.formRate.get('rating').value

  }

  onSubmitRate() {
    this.comment = this.formRate.get('commentCtrl').value
    console.log('show rate: '+this.formRate.get('rating').value)
    console.log('show rate: '+ this.comment)
    this.rateService.pushRate(this.data.id,this.comment,this.currentRate).subscribe({
      next:responseData=>{
        console.log(responseData)
      },
      error:errorMessageResponse=>{
        console.log(errorMessageResponse)
      },
      complete:()=>{
        console.log('complete')
      }
    })
  }


}
