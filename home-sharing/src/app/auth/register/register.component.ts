import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {RegisterResponse, RegisterService} from "./register.service";
import {Router} from "@angular/router";
import {Observable, Subject, timer} from "rxjs";
import {filter, map, startWith, switchMap, take, tap} from "rxjs/operators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  formRegister: FormGroup
  roleOptions = ['Người thuê','Chủ hộ']
  constructor(private registerService:RegisterService,private router:Router) {
  }
  get registerForm() {return this.formRegister.controls}
  ngOnInit(): void {

    this.formRegister = new FormGroup({

      'userName': new FormControl(null,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/),
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
          // Validators.pattern(this.PASSWORD_PATTERN),
        ]),
        ),
      'phoneNumber': new FormControl(null, [Validators.required,Validators.pattern(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)]),
      'address': new FormControl(null, [Validators.required]),
      'email': new FormControl(null,
        Validators.compose([Validators.required,
          // Validators.apply(this.validateUserNameFromApi(this.registerService))
        ])
      ),
      'role': new FormControl(null, [Validators.required]),
      'dob':new FormControl(null,[Validators.required]),
      'fullName':new FormControl(null,[Validators.required,])
    },
      {
        validators:[
          this.registerService.MatchPassword('passWord','confirmPassword'),
          this.registerService.checkDob('dob'),
        ]
      }
    )
    this.formRegister.controls['email'].setValidators(this.validateUserNameFromApi(this.registerService))

  }
   validateUserNameFromApi = (api:RegisterService)=>{
    return (control:AbstractControl):Observable<ValidationErrors|null>=>{
      return timer(300).pipe(
        switchMap(()=>
          api.checkEmailExist(control.value).pipe(
            map((isValid)=>{
              if (isValid) {
                return null;
              }
              return {
                emailDuplicated: true,
              };
            })
          )
        )
      )
    }
  }

  onSubmit() {
    if(this.formRegister.invalid) return
    const mobile = this.formRegister.get('phoneNumber').value
    const username = this.formRegister.get('userName').value
    const password = this.formRegister.get('passWord').value
    const address = this.formRegister.get('address').value
    const email = this.formRegister.get('email').value
    const role = this.formRegister.get('role').value
    const dob = this.formRegister.get('dob').value
    const fullName = this.formRegister.get('fullName').value
    // console.log(username+' '+password+' '+address+' '+email+' '+role+' '+dob)
   let registerObservable:Observable<RegisterResponse> =  this.registerService.register( username,password,mobile,address,email,role,dob,fullName)
    registerObservable.subscribe({
      next:responseData=>{
        console.log(responseData)
      },
      error:errorMessageResponse=>{
      },complete:()=>{
        console.log('Request complete')
      }
    })

  }

}
