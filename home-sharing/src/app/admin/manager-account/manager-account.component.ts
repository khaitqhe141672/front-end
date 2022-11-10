import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {AccountHost, IResponseAccount} from "../../shared/model/account-host.model";
import {ManagerAccountServices} from "./manager-account.services";
import {Observable, Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-manager-account',
  templateUrl: './manager-account.component.html',
  styleUrls: ['./manager-account.component.css']
})
export class ManagerAccountComponent implements OnInit,AfterViewInit {

  isHidden = true

  changelistAccountHost:Subject<AccountHost[]> = new Subject<AccountHost[]>()
  listAccountHost:AccountHost[] = []
  totalPaginator:number
  displayedColumns: string[] = ['id', 'userName','fullName',  'status','date','action'];
  dataSource: MatTableDataSource<AccountHost>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  getListAccountObs:Observable<AccountHost>

  constructor(private managerAccountServices:ManagerAccountServices) {
  }
  loadHostAccountObs:Observable<IResponseAccount>
  ngOnInit(): void {

    this.loadHostAccountObs = this.managerAccountServices.getListHostAccount(1)
    this.loadHostAccountObs.subscribe(responseIAccount=>{
      let accountHostResponse = responseIAccount.data
      this.listAccountHost = accountHostResponse.HostList
      this.totalPaginator = accountHostResponse.SizePage
      console.log(this.changelistAccountHost)
      this.dataSource = new MatTableDataSource(this.listAccountHost);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    this.onLoadingData()
  }

  onLoadingData(){

  }

  addListAccountHost(listAcc:AccountHost[]){
    this.listAccountHost = listAcc
    this.changelistAccountHost.next(listAcc.slice())
  }


  ngAfterViewInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onChangeData(data,$event) {
    this.isHidden = !this.isHidden
    console.log(data)
    console.log('status: '+JSON.stringify($event.value))
    this.loadHostAccountObs.subscribe()
  }

  showMore(data) {
    // this.loadHostAccountObs.subscribe()
    console.log(JSON.stringify(data))
  }
}
