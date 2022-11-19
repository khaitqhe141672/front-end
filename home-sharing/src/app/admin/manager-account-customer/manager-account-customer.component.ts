import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CustomerDetail} from "../../shared/model/account-customer.model";
import {ManagerAccountCustomerServices} from "./manager-account-customer.services";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {AccountDetailComponent} from "../manager-account/account-detail/account-detail.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DetailAccountCustomerComponent} from "./detail-account-customer/detail-account-customer.component";

@Component({
  selector: 'app-manager-account-customer',
  templateUrl: './manager-account-customer.component.html',
  styleUrls: ['./manager-account-customer.component.css']
})
export class ManagerAccountCustomerComponent implements OnInit {
  detailCusDialog: MatDialogRef<DetailAccountCustomerComponent>
  totalPaginator: number
  pageIndex: number = 1
  displayedColumns: string[] = ['id', 'userName', 'fullName', 'status', 'date', 'action'];
  dataSource: MatTableDataSource<CustomerDetail>

  constructor(private managerAccountCustomerService: ManagerAccountCustomerServices,
              private dialog: MatDialog) {
  }

  loadCustomerAccountObs: Observable<CustomerDetail[]>
  subLoadCustomer: Subscription
  refreshListCustomerAccount = new BehaviorSubject<boolean>(true)

  ngOnInit(): void {
    this.onLoadingData()
  }

  onLoadingData() {
    this.loadCustomerAccountObs = this.refreshListCustomerAccount.pipe(
      switchMap(_ => this.managerAccountCustomerService.getListCustomerAccount(this.pageIndex).pipe(map(data => {
        this.totalPaginator = data.SizePage
        console.log(JSON.stringify(data))
        return data.CustomerList
      }))))
    if (this.subLoadCustomer) this.subLoadCustomer.unsubscribe()
    this.subLoadCustomer = this.loadCustomerAccountObs.subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  showMore(data) {
    let cusDetail: CustomerDetail = data
    this.detailCusDialog = this.dialog.open(DetailAccountCustomerComponent, {
      data: cusDetail,
      hasBackdrop: true
    })
    this.detailCusDialog.afterClosed().subscribe(res => {
      this.refreshListCustomerAccount.next(true)
    })
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
