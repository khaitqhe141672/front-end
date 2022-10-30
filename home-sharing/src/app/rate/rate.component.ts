import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {

  constructor(private fb: FormBuilder){
    this.formRate = this.fb.group({
      rating: ['', Validators.required],
    })
  }
  public formRate: FormGroup;
  ngOnInit(): void {
  }
   stars: boolean[] = Array(5).fill(false);

   rate(rating: number) {
     debugger
    console.log('rating', rating);
    this.stars = this.stars.map((_, i) => rating > i);
    console.log('stars', this.stars);
  }
  currentRate= 0

  showData() {
    console.log('show rate: '+this.formRate.get('rating').value)
  }
}
