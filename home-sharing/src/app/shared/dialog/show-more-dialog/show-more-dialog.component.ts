import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-show-more-dialog',
  templateUrl: './show-more-dialog.component.html',
  styleUrls: ['./show-more-dialog.component.css']
})
export class ShowMoreDialogComponent implements OnInit {
  listData:string[] = []
  type = 0
  description = ''
  constructor(@Inject(MAT_DIALOG_DATA) private data:any) { }

  ngOnInit(): void {
    this.type = this.data.type
    if(this.data.type==2||this.data.type==1){
      this.listData = this.data.listData
      console.log(this.listData)
    }
    else if(this.data.type==3){
      this.description = this.data.listData
    }
  }

}
