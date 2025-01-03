import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userName: string;

  constructor(private route: Router){
    console.log("constructor");
    
  }

  login(){
    console.log(this.userName);
    sessionStorage.setItem("userName", this.userName);
    this.route.navigate(["home"]);
  }
}
