import { Component, OnInit } from '@angular/core';
import {AdminDashBoardData} from "./admin-dashboard.model";
import {AdminDashboardService} from "./admin-dashboard.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  adminDashBoardData:AdminDashBoardData
  constructor(private adminDashBoardService:AdminDashboardService) { }

  ngOnInit(): void {
    this.adminDashBoardService.getDataDashBoard().subscribe(response=>{
      this.adminDashBoardData = response.data
    },()=>{
      Swal.fire({
        icon:'error',
        title:'Lỗi tải dữ liệu',
        text:'Vui lòng thử lại'
      })
    })
  }

}
