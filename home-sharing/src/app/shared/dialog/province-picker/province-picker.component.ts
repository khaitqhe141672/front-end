import {Component, Inject, OnInit} from '@angular/core';
import {SearchService} from "../../../search/search.service";
import {Province} from "../../model/district.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-province-picker',
  templateUrl: './province-picker.component.html',
  styleUrls: ['./province-picker.component.css']
})
export class ProvincePickerComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:Province[],private provincePickerDialog:MatDialogRef<ProvincePickerComponent>) { }
  listProvince:Province[] = []
  ngOnInit(): void {
   this.listProvince = this.data.slice()
  }

  onSelectedProvince(provinceID:number,provinceName:string){
    this.provincePickerDialog.close({provinceID:provinceID,provinceName:provinceName})
  }

}
