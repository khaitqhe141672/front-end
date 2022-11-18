import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CustomerDetail} from "../../../shared/model/account-customer.model";

@Component({
  selector: 'app-list-confirm-booking',
  templateUrl: './list-confirm-booking.component.html',
  styleUrls: ['./list-confirm-booking.component.css']
})
export class ListConfirmBookingComponent implements OnInit {

  displayedColumns: string[] = ['id', 'username','titleHomestay','detail','confirm'];
  dataSource: MatTableDataSource<CustomerDetail>

  constructor() { }

  ngOnInit(): void {
  }

}
