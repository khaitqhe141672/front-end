import {Component, OnInit, ViewChild} from '@angular/core';
import {ManageReportRateService} from "./manage-report-rate.service";
import {MatTableDataSource} from "@angular/material/table";
import {ReportRate} from "./manage-report-rate.model";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {map, switchMap} from "rxjs/operators";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {HandleStatusDialogComponent} from "../manage-report-post/handle-status-dialog/handle-status-dialog.component";

@Component({
  selector: 'app-manage-report-rate',
  templateUrl: './manage-report-rate.component.html',
  styleUrls: ['./manage-report-rate.component.css']
})
export class ManageReportRateComponent implements OnInit {

  displayedColumns: string[] = ['reportID', 'username', 'nameReportType','rateDescription', 'rpRateDescription', 'status'];
  dataSource: MatTableDataSource<ReportRate>
  pageIndex = 1;
  totalPageIndex = 1;
  loadReportRateObs: Observable<ReportRate[]>
  subLoadReportRate: Subscription
  refreshReportRate = new BehaviorSubject<boolean>(true)
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  handleStatusDialogRef: MatDialogRef<HandleStatusDialogComponent>

  constructor(private manageReportRateService: ManageReportRateService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.onLoadingReportRate()
  }

  onLoadingReportRate() {
    this.loadReportRateObs = this.refreshReportRate.pipe(
      switchMap(_ => this.manageReportRateService.getListReportRate(this.pageIndex)
        .pipe(map(response => {
          let responseReportRate = response.data
          this.totalPageIndex = responseReportRate.SizePage
          return responseReportRate.ReportRate
        })))
    )
    if (this.subLoadReportRate) this.subLoadReportRate.unsubscribe()
    this.loadReportRateObs.subscribe(data => {
      this.dataSource = new MatTableDataSource<ReportRate>(data)
    })
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handlePageEvent($event: PageEvent) {
    this.pageIndex = $event.pageIndex
    this.onLoadingReportRate()
  }

  openDialog(reportRateId: number, status: number) {
    this.handleStatusDialogRef = this.dialog.open(HandleStatusDialogComponent, {hasBackdrop: true})
    this.handleStatusDialogRef.afterClosed().subscribe(response => {
      if (response as boolean) {
        this.manageReportRateService.updateStatusReportRate(reportRateId, status).subscribe(
          response => {
            console.log('update report rate status: ' + response)
            this.refreshReportRate.next(true)
          })
      }
    })
  }
}
