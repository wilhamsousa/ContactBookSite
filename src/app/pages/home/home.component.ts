import { Component } from '@angular/core';
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
  userName = "Wilham";
}
