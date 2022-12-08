import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ListPostRate} from "./manage-rate.model";
import {ManageRateService} from "./manage-rate.service";
import {map, switchMap} from "rxjs/operators";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-manage-rate',
  templateUrl: './manage-rate.component.html',
  styleUrls: ['./manage-rate.component.css']
})
export class ManageRateComponent implements OnInit {

  totalPage = 1
  pageIndex = 1

  loadListRateObs:Observable<ListPostRate[]>
  refreshListRate = new BehaviorSubject<boolean>(true)

  constructor(private manageRateService:ManageRateService) { }

  ngOnInit(): void {
    this.onLoadListRateManager()
  }

  onLoadListRateManager(){
    this.loadListRateObs = this.refreshListRate.pipe(
      switchMap(_=> this.manageRateService.getListRateManager(this.pageIndex).pipe(
        map(data=>{
          this.totalPage = data.data.sizePage
          return data.data.listPostRate
        })))
    )
  }
  handlePageEvent(e: PageEvent) {
    console.log('page index: '+e.pageIndex)
    this.pageIndex = ++e.pageIndex
    this.onLoadListRateManager()
  }

}
