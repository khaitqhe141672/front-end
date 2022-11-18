import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CustomerDetail} from "../../../shared/model/account-customer.model";

@Component({
  selector: 'app-current-booking',
  templateUrl: './current-booking.component.html',
  styleUrls: ['./current-booking.component.css']
})
export class CurrentBookingComponent implements OnInit {

  displayedColumns: string[] = ['id', 'titleHomestay','date','detail','confirm'];
  dataSource: MatTableDataSource<CustomerDetail>

  constructor() { }

  ngOnInit(): void {
  }

}
