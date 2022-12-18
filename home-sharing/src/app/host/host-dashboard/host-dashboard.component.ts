import {Component, OnInit} from '@angular/core';
import {HostDashBoardData} from "./host-dashboar.model";
import {HostDashboardService} from "./host-dashboard.service";
import Swal from "sweetalert2";
import {PostChart} from "../../admin/admin-dashboard/admin-dashboard.model";
import {Color, LegendPosition, ScaleType} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-host-dashboard',
  templateUrl: './host-dashboard.component.html',
  styleUrls: ['./host-dashboard.component.css']
})
export class HostDashboardComponent implements OnInit {
  hostDashBoardData: HostDashBoardData = {
    totalPost: 0,
    post: [],
    totalPriceByPost: [],
    totalBooking: [],
    totalPostByMonth: [],
    totalPostPayment: [],
  }
  single: any[] = [{
    "name": "Germany",
    "value": 8940000
  },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    }];

  //init chart
  view: any[] = [700, 400];
  dataChartPost: PostChart [] = [{
    "name": "name",
    "value": 0
  }]
  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Quantile,
    domain: ['#367E18', '#CC3636']
  };
  legendTitle: string = 'Chú thích';
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Tên Homestay';
  showYAxisLabel = true;
  yAxisLabel = 'Lượt khách đón';
  totalPriceByPost: { name: string, value: number }[] = [{name: '', value: 0}]

  //init data api

  constructor(private hostDashBoardService: HostDashboardService) {
    Object.assign(this, {})
  }

  ngOnInit(): void {
    this.hostDashBoardService.getHostDataDashBoard().subscribe(response => {
      this.hostDashBoardData = response.data
      this.totalPriceByPost = this.hostDashBoardData.totalBooking.map(data => {
        return {name: data.title + '', value: data.totalBooking}
      })
      console.log(this.totalPriceByPost)
    }, () => {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi tải dữ liệu thống kế',
        text: 'Vui lòng làm mới trang'
      })
    })
  }

}
