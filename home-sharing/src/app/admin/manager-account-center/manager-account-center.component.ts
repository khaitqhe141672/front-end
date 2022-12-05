import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-account-center',
  templateUrl: './manager-account-center.component.html',
  styleUrls: ['./manager-account-center.component.css']
})
export class ManagerAccountCenterComponent implements OnInit {
  typeAccount = 'Chủ nhà'
  constructor() { }

  ngOnInit(): void {
  }

  changeTypeAccount(type: number) {
    if(type==1) this.typeAccount = 'Chủ nhà'
    else if(type == 2) this.typeAccount = 'Người dùng'
  }
}
