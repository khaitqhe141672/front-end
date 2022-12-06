import { Component, OnInit } from '@angular/core';
import {HostDashBoardData} from "./host-dashboar.model";
import {HostDashboardService} from "./host-dashboard.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-host-dashboard',
  templateUrl: './host-dashboard.component.html',
  styleUrls: ['./host-dashboard.component.css']
})
export class HostDashboardComponent implements OnInit {
  hostDashBoardData:HostDashBoardData = {totalPostActive:0,totalPost:0,totalPostDeActive:0,totalBooking:[],totalPostPayment:[]}
  constructor(private hostDashBoardService:HostDashboardService) { }

  ngOnInit(): void {
    this.hostDashBoardService.getHostDataDashBoard().subscribe(response=>{
      this.hostDashBoardData = response.data
    },()=>{
      Swal.fire({
        icon:'error',
        title:'Lỗi tải dữ liệu thống kế',
        text:'Vui lòng làm mới trang'
      })
    })
  }

}
