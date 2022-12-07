import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProfileService} from "./profile.service";
import {UserInfo, UserInfoResponse} from "./profile.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  role = 'ROLE_CUSTOMER'
  isDisplay = false

  constructor() {
  }

  ngOnInit(): void {
    console.log('role 123: '+localStorage.getItem('role'))
    this.role = localStorage.getItem('role')
    if(this.role=='"ROLE_CUSTOMER"') this.isDisplay = true
  }

  isCustomer():boolean{
    return this.role==='ROLE_CUSTOMER'
  }
}
