import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {AccountHost, IResponseAccount} from "../../shared/model/account-host.model";
import {ManagerAccountHostServices} from "./manager-account-host.services";
import {BehaviorSubject, Observable, Subject, Subscription} from "rxjs";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AccountDetailComponent} from "./account-detail/account-detail.component";
import {auto} from "@popperjs/core";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-manager-account',
  templateUrl: './manager-account-host.component.html',
  styleUrls: ['./manager-account-host.component.css']
})
export class ManagerAccountHostComponent implements OnInit,AfterViewInit {
  totalPaginator:number = 1
  pageIndex:number = 1
  displayedColumns: string[] = ['id', 'userName','fullName',  'status','date','action'];
  dataSource: MatTableDataSource<AccountHost>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  hostDetail:AccountHost
  detailDialog:MatDialogRef<AccountDetailComponent>

  loadHostAccountObs:Observable<AccountHost[]>
  subLoadHost:Subscription
  refreshListHostAccountBehaviorSub=new BehaviorSubject<boolean>(true)
  constructor(private managerAccountServices:ManagerAccountHostServices, private dialog:MatDialog) {
  }

  ngOnInit(): void {

    this.onLoadingData()
  }

  onLoadingData(){
    this.loadHostAccountObs = this.refreshListHostAccountBehaviorSub.pipe(switchMap(_=>this.managerAccountServices.getListHostAccount(this.pageIndex).pipe(map(data=>{
      this.totalPaginator = data.SizePage
      return data.HostList
    }))))
    if(this.subLoadHost) this.subLoadHost.unsubscribe()
    this.subLoadHost =  this.loadHostAccountObs.subscribe(data=>{
      this.dataSource = new MatTableDataSource(data)
    })

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

  showMore(data) {
    this.hostDetail = data
    this.detailDialog = this.dialog.open(AccountDetailComponent,{
      data:this.hostDetail,
      hasBackdrop:true})
    console.log(JSON.stringify( this.hostDetail))
    this.detailDialog.afterClosed().subscribe(res=>{
      this.refreshListHostAccountBehaviorSub.next(true)
    })
  }
}
