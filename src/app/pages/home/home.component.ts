import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  mode: ProgressSpinnerMode = 'determinate';
  maxUsuarios = 10;
  maxContatos = 100;
  usuariosAdicionadosMes = 0;
  contatosAdicionadosMes = 0;
  totalUsuarios = 0;
  totalUsuariosPercent = this.totalUsuarios / this.maxUsuarios * 100;
  totalContatos = 0;
  totalContatosPercent = this.totalContatos / this.maxContatos * 100;
  userName: string | null;

  constructor(private route: Router,
    private userService: UserService,
    private snackBar: MatSnackBar){
  }

  ngOnInit(){
    this.userName = sessionStorage.getItem("userName");

    if (this.userName == "")
      this.route.navigate(["login"]);
  }

  deleteUser(){
    this.userService.deleteUser().subscribe({
      next: (data) => {
        this.snackBar.open("Conta de usuário excluída com sucesso.", 'Fechar', { duration: 5000, });
        sessionStorage.setItem("token", "");
        this.route.navigate(["login"]);
      },
      complete: () => {},
      error: (err: any) => {}
    });
  }
}
