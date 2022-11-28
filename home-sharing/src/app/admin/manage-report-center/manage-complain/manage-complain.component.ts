import { Component, OnInit } from '@angular/core';
import {ManageComplainService} from "./manage-complain.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {ListComplainResponse, ListComplaint} from "./complain.model";
import {map, switchMap} from "rxjs/operators";
import {MatTableDataSource} from "@angular/material/table";
import {HostPostListServices} from "../../../host/host-post-list/host-post-list-services";
import Swal from "sweetalert2";

@Component({
  selector: 'app-manage-complain',
  templateUrl: './manage-complain.component.html',
  styleUrls: ['./manage-complain.component.css']
})
export class ManageComplainComponent implements OnInit {
  displayedColumns: string[] = ['postID', 'title','username','descriptionComplaint','statusPost','statusComplaint'];
  dataSource:MatTableDataSource<ListComplaint>
  loadComplainObs:Observable<ListComplaint[]>
  subLoadComplain:Subscription
  refreshComplain = new BehaviorSubject<boolean>(true)

  pageIndex = 1
  totalPage = 1
  constructor(private manageComplainService:ManageComplainService,
              private hostPostListService:HostPostListServices) { }

  ngOnInit(): void {
    this.onLoadComplain()
  }

  onLoadComplain(){
    this.loadComplainObs = this.refreshComplain.pipe(switchMap(_=>
      this.manageComplainService.getListComplain(this.pageIndex).pipe(map(response=>{
        let complainData = response.data
        this.totalPage = complainData.sizePage
        return complainData.listComplaint
      }))
    ))
    if(this.subLoadComplain) this.subLoadComplain.unsubscribe()
    this.loadComplainObs.subscribe(data=>{
      this.dataSource = new MatTableDataSource<ListComplaint>(data)
    })
  }

  updateStatusPost(postID: number,status:number) {
    this.hostPostListService.updateStatusPost(postID,status).subscribe(response=>{
        console.log(response)
      },()=>{
        Swal.fire({
          icon: 'error',
          title: 'Cập nhập trạng thái bài đăng thành công',
        })
      },()=>{
        Swal.fire({
          icon: 'success',
          title: 'Cập nhập trạng thái bài đăng thành công',
        })
      }

    )
  }
}
