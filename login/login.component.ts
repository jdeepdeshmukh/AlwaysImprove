import { Component, OnInit } from '@angular/core';
// import { LoginService } from '../../service/login.service';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  user = {
    username : "",
    password : ""
  }

  msg;

 


  constructor(private _loginServ : LoginService, private _router : Router) { }

  login(){
    this._loginServ.do_login(this.user).subscribe((result)=>{
      // console.log(result)
      // console.log(this.user)

      if(result)
      {
        console.log(result)
        localStorage.setItem("token", result);
        this._router.navigate(["/dashboard"]);
      }
    }, (err)=>{
      console.log(err.error.type)
      if(err.error.type == 1)
      {
        this.msg = "This username or password not correct"
      }if(err.error.type == 2)
      {
        this.msg = "This password is incorrect"
      }
    })
  }

  ngOnInit() {
  }

}
