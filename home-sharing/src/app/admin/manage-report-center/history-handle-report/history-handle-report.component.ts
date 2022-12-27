import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ManageReportPostService} from "../manage-report-post/manage-report-post.service";
import {MatTableDataSource} from "@angular/material/table";
import {ListHistoryReportPost} from "./history-handle-report-post.model";

@Component({
  selector: 'app-history-handle-report',
  templateUrl: './history-handle-report.component.html',
  styleUrls: ['./history-handle-report.component.css']
})
export class HistoryHandleReportComponent implements OnInit {
  displayedColumns: string[] = ['historyHandleReportPostID','statusPost','totalReportPost' ];
  dataSource:MatTableDataSource<ListHistoryReportPost>
  constructor(@Inject(MAT_DIALOG_DATA) public data:number,private manageReportPostService:ManageReportPostService) { }
  pageIndex = 1
  listHistoryHandlePost:ListHistoryReportPost[]=[]
  totalPaginator = 0;
  ngOnInit(): void {
    this.manageReportPostService.getHistoryReport(this.data,this.pageIndex).subscribe(response=>{
      console.log(response)
      let historyData = response.data
      this.totalPaginator = historyData.size
      this.listHistoryHandlePost = historyData.listHistoryReportPost
      this.dataSource = new MatTableDataSource<ListHistoryReportPost>(this.listHistoryHandlePost)
    })
  }
  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handlePageEvent($event) {

  }

  showMore(row) {

  }
}
