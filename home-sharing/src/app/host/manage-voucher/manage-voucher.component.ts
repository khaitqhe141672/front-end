import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateVoucherComponent} from "../create-voucher/create-voucher.component";
import {MatTableDataSource} from "@angular/material/table";
import {CustomerDetail} from "../../shared/model/account-customer.model";
import {ManageVoucherServices} from "./manage-voucher.services";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {VoucherDetail} from "../../shared/model/voucher-host.model";
import {map, switchMap} from "rxjs/operators";
import {HandleStatusVoucherComponent} from "./handle-status-voucher/handle-status-voucher.component";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-manage-voucher',
  templateUrl: './manage-voucher.component.html',
  styleUrls: ['./manage-voucher.component.css']
})
export class ManageVoucherComponent implements OnInit {

  selected = '1';
  createVoucherPickerDialogRef: MatDialogRef<CreateVoucherComponent>
  handleStatusVoucherDialogRef:MatDialogRef<HandleStatusVoucherComponent>
  constructor(private dialog: MatDialog,
              private manageVoucherService: ManageVoucherServices) {
  }

  ngOnInit(): void {
    this.onLoadDataVoucher()
  }

  displayedColumns: string[] = ['id', 'name', 'percent', 'description', 'date', 'status'];
  dataSource: MatTableDataSource<VoucherDetail>

  totalPaginator: number
  pageIndex: number = 1

  loadListVoucherObs: Observable<VoucherDetail[]>
  subLoadVoucher: Subscription
  refreshListVoucher = new BehaviorSubject<boolean>(true)

  onLoadDataVoucher() {
    this.loadListVoucherObs = this.refreshListVoucher.pipe(
      switchMap(_ => this.manageVoucherService.getAllVoucherByHost(this.pageIndex).pipe(map(data => {
        this.totalPaginator = data.sizePage
        console.log(JSON.stringify(data))
        return data.listVoucher
      }))))
    if (this.subLoadVoucher) this.subLoadVoucher.unsubscribe()
    this.subLoadVoucher = this.loadListVoucherObs.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  onOpenCreateVoucher() {
    this.createVoucherPickerDialogRef = this.dialog.open(CreateVoucherComponent, {
      hasBackdrop: true
    })
    this.dialog.afterAllClosed.subscribe(response=>{
      console.log('onOpenCreateVoucher'+response)
      this.refreshListVoucher.next(true)
    })
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(status: number,voucherID:number) {
    let isChange = false
    this.handleStatusVoucherDialogRef= this.dialog.open(HandleStatusVoucherComponent,{hasBackdrop:true})
    this.handleStatusVoucherDialogRef.afterClosed().subscribe(response =>{
      console.log(response)
      isChange = response as boolean
      if(response as boolean){
        this.manageVoucherService.changeStatusVoucher(status,voucherID).subscribe(
          response =>console.log('openDialog: '+response),
          ()=>{},
          ()=>{
            this.refreshListVoucher.next(true)
          }
        )
      }
    })
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = ++e.pageIndex
    this.onLoadDataVoucher()
  }

}

