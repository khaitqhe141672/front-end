import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CustomerDetail} from "../../../shared/model/account-customer.model";

@Component({
  selector: 'app-coming-booking',
  templateUrl: './coming-booking.component.html',
  styleUrls: ['./coming-booking.component.css']
})
export class ComingBookingComponent implements OnInit {

  displayedColumns: string[] = ['id', 'titleHomestay','date','detail','status'];
  dataSource: MatTableDataSource<CustomerDetail>

  constructor() { }

  ngOnInit(): void {
  }

}
