import { Component, OnInit } from '@angular/core';
import {RateDetailService} from "./rate-detail.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {ListDetailRate} from "./rate-detail.model";

@Component({
  selector: 'app-rate-detail',
  templateUrl: './rate-detail.component.html',
  styleUrls: ['./rate-detail.component.css']
})
export class RateDetailComponent implements OnInit {
  totalPage = 1
  pageIndex = 1
  constructor(private rateDetailService:RateDetailService) { }

  loadListRateDetail:Observable<ListDetailRate>
  subLoadListDetail:Subscription
  refreshListRateDetail=new BehaviorSubject<boolean>(true)

  ngOnInit(): void {
  }

  onLoadListRateDetail(){

  }


}
