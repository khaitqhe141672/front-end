import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateVoucherComponent} from "../create-voucher/create-voucher.component";

@Component({
  selector: 'app-manage-voucher',
  templateUrl: './manage-voucher.component.html',
  styleUrls: ['./manage-voucher.component.css']
})
export class ManageVoucherComponent implements OnInit {

  selected = '1';
  createVoucherPickerDialogRef: MatDialogRef<CreateVoucherComponent>

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'date', 'status'];
  dataSource = ELEMENT_DATA;

  onOpenCreateVoucher() {
    this.createVoucherPickerDialogRef = this.dialog.open(CreateVoucherComponent, {
      hasBackdrop: true
    })
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  date: number;
  status: number
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Khuyến mãi mùa hè',
    weight: 30,
    symbol: 'Giảm 30% cho tổng hoá đơn trên 500k',
    date: 30,
    status: 1
  },
  {
    position: 2,
    name: 'Khuyến mãi mùa hè',
    weight: 30,
    symbol: 'Giảm 30% cho tổng hoá đơn trên 500k',
    date: 30,
    status: 1
  },
  {
    position: 3,
    name: 'Khuyến mãi mùa hè',
    weight: 30,
    symbol: 'Giảm 30% cho tổng hoá đơn trên 500k',
    date: 30,
    status: 1
  },
  {
    position: 4,
    name: 'Khuyến mãi mùa hè',
    weight: 30,
    symbol: 'Giảm 30% cho tổng hoá đơn trên 500k',
    date: 30,
    status: 1
  },
  {
    position: 5,
    name: 'Khuyến mãi mùa hè',
    weight: 30,
    symbol: 'Giảm 30% cho tổng hoá đơn trên 500k',
    date: 30,
    status: 1
  },
  {
    position: 6,
    name: 'Khuyến mãi mùa hè',
    weight: 30,
    symbol: 'Giảm 30% cho tổng hoá đơn trên 500k',
    date: 30,
    status: 1
  },
  {
    position: 7,
    name: 'Khuyến mãi mùa hè',
    weight: 30,
    symbol: 'Giảm 30% cho tổng hoá đơn trên 500k',
    date: 30,
    status: 1
  },
  {
    position: 8,
    name: 'Khuyến mãi mùa hè',
    weight: 30,
    symbol: 'Giảm 30% cho tổng hoá đơn trên 500k',
    date: 30,
    status: 1
  },
  {
    position: 9,
    name: 'Khuyến mãi mùa hè',
    weight: 30,
    symbol: 'Giảm 30% cho tổng hoá đơn trên 500k',
    date: 30,
    status: 1
  },
  {
    position: 10,
    name: 'Khuyến mãi mùa hè',
    weight: 30,
    symbol: 'Giảm 30% cho tổng hoá đơn trên 500k',
    date: 30,
    status: 1
  },
];
