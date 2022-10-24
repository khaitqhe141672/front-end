import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder) {}
  infoFormGroup: FormGroup
  historyFormGroup: FormGroup
  secureFormGroup: FormGroup
  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
    this.infoFormGroup = this._formBuilder.group(
      {
        firstName:[''],
        secondName:[''],
        gender:[''],
        phoneNumber:[''],
        email:[''],
        province:[''],
        district:[''],
        address:['']
      }
    )
    this.historyFormGroup = this._formBuilder.group({
      secondCtrl:['']
    })
  }
}
