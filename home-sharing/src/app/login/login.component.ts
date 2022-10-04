import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }
  formLoginGroup:FormGroup
  ngOnInit(): void {
      this.formLoginGroup = new FormGroup({
        'userName': new FormControl(null,[Validators.required]),
        'passWord':new FormControl(null,[Validators.required])
      })
  }

}
