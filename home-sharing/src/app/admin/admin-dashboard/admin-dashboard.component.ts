import {Component, OnInit} from '@angular/core';
import {AdminDashBoardData, PaymentDtoList, PostChart} from "./admin-dashboard.model";
import {AdminDashboardService} from "./admin-dashboard.service";
import Swal from "sweetalert2";
import {Color, LegendPosition, ScaleType} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  totalPostPayment = 0
  adminDashBoardData:AdminDashBoardData={
    totalAccount: 0,
    totalCustomerDeActive: 0,
    post: [],
    totalCustomer: 0,
    totalHost: 0,
    totalHostDeActive: 0,
    totalPostPayment: 0,
    paymentDtoList: [],
    totalPost:0
  }
  constructor(private adminDashBoardService:AdminDashboardService) {
    Object.assign(this, { });

  }

  single: any[]=[ {
    "name": "name",
    "value": 0
  }];

  view: any[] = [700, 400];

  dataChartPost:PostChart []= [ {
    "name": "name",
    "value": 0
  }]

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below ;

  colorScheme:Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Quantile,
    domain: ['#367E18', '#CC3636']
  };
  legendTitle: string = 'Chú thích';

  ngOnInit(): void {
    this.adminDashBoardService.getDataDashBoard().subscribe(response=>{
      this.adminDashBoardData = response.data
      this.dataChartPost = this.adminDashBoardData.post
      this.totalPostPayment = this.adminDashBoardData.paymentDtoList.reduce((sum,i)=>{
        if(i.packagePaymentID==1) return sum+i.totalPost*300000
        else if(i.packagePaymentID==2) return sum+i.totalPost*550000
        else return sum+i.totalPost*800000
      },0)
      console.log('data chart: '+this.dataChartPost)
    },()=>{
      Swal.fire({
        icon:'error',
        title:'Lỗi tải dữ liệu',
        text:'Vui lòng thử lại'
      })
    })
  }

}
