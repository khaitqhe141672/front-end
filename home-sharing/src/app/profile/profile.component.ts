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
  role = ''
  constructor() {
  }
  ngOnInit(): void {
    console.log('role 123: '+localStorage.getItem('role'))
    this.role = localStorage.getItem('role')
  }
}
