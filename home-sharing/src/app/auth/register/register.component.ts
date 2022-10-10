import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  PASSWORD_PATTERN = /^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/;
  formRegisterGroup: FormGroup

  constructor() {
  }

  ngOnInit(): void {
    this.formRegisterGroup = new FormGroup({

      'userName': new FormControl(null,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=[a-zA-Z0-9._]$)(?!.*[_.]{2})[^_.].*[^_.]$/),
        ]),),
      'passWord': new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.PASSWORD_PATTERN),
        ]),
      ),
      'confirmPassword': new FormControl(null,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.PASSWORD_PATTERN),
        ]),),
      'phoneNumber': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required]),
      'role': new FormControl(null, [Validators.required]),
    })
  }

  onSubmit() {
  }
}
