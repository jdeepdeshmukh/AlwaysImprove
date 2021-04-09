import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupserviceService } from '../../service/signupservice.service';
import { Router } from '@angular/router';
import { conlen, conNum, checkpass } from '../../../helper/validation.helper'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userReg : FormGroup;

  submitCheck = false;

  // x = false;

  // demo(){
  //   this.x = true;
  // }

  constructor(private _fb : FormBuilder, private _signupServ : SignupserviceService, private _router : Router) {
    this.userReg = this._fb.group({
      name : ["", Validators.required],
      username : ["", [Validators.required, Validators.email]],
      password : ["", Validators.required],
      confirm_password : ["", Validators.required],
      city : ["", Validators.required],
      address : ["", Validators.required],
      gender : ["", Validators.required],
      contact : ["", Validators.required]
    },
    {
      validator : [conNum(), conlen(), checkpass()]
    }
    )
   }

   save(){
     this.submitCheck = true;
     if(this.userReg.invalid){
     return;
   }

  //  console.log(this.userReg.value)

   this._signupServ.user(this.userReg.value).subscribe((result)=>{
     this._router.navigate(["/login"]);
     console.log(result)
   })
   }

  ngOnInit() {
  }

}
