import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor() { }
  formLoginGroup:FormGroup
  ngOnInit(): void {
      this.formLoginGroup = new FormGroup({
        'userName': new FormControl(null,[Validators.required]),
        'passWord':new FormControl(null,[Validators.required])
      })
  }

  onSubmit() {
    const useName = this.formLoginGroup.get('userName').value;
    const password = this.formLoginGroup.get('passWord').value;
    console.log(useName + ' ' + password)
  }
}
