import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  mode: ProgressSpinnerMode = 'determinate';
  maxUsuarios = 10;
  maxContatos = 100;
  usuariosAdicionadosMes = 1;
  contatosAdicionadosMes = 80;
  totalUsuarios = 5;
  totalUsuariosPercent = this.totalUsuarios / this.maxUsuarios * 100;
  totalContatos = 80;
  totalContatosPercent = this.totalContatos / this.maxContatos * 100;
  userName: string | null;

  constructor(private route: Router){

  }

  ngOnInit(){
    this.userName = sessionStorage.getItem("userName");

    if (this.userName == "")
      this.route.navigate(["login"]);
  }
}
