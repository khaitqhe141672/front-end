import {Component, OnInit, ViewChild} from '@angular/core';
import {ManagePostResponse, PostTableDetail} from "./manage-post.model";
import {ManagePostService} from "./manage-post.service";
import {BehaviorSubject, Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-manage-post',
  templateUrl: './manage-post.component.html',
  styleUrls: ['./manage-post.component.css']
})
export class ManagePostComponent implements OnInit {
  displayedColumns: string[] = ['postID', 'title','datePayment','statusPost','statusPostPayment' ];
  loadPostObs:Observable<PostTableDetail[]>
  refreshListPost =  new BehaviorSubject<boolean>(true)
  totalPaginator:number
  pageIndex = 1
  dataSource:MatTableDataSource<PostTableDetail>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private managePostService:ManagePostService) {
  }

  ngOnInit(): void {
    this.onLoadingData()
  }

  onLoadingData(){
    this.loadPostObs = this.refreshListPost.pipe(switchMap(_=>this.managePostService.getAllPost(this.pageIndex).pipe(map(data=>{
      let responsePost = data as ManagePostResponse
      this.totalPaginator = responsePost.data.SizePage
      return responsePost.data["List-Post"]
    }))))
    this.loadPostObs.subscribe(data=>{
      this.dataSource = new MatTableDataSource<PostTableDetail>(data)
    })
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showMore(row) {

  }
}

