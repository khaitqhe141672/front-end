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

}
