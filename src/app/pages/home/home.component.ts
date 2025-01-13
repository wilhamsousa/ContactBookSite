import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../../services/loading.service';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../interfaces/contact';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  loadingDialogRef: any;
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
  contactResponse: Contact[];

  constructor(private route: Router,
    private userService: UserService,
    private contactService: ContactService,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService){
  }

  ngOnInit(){
    this.userName = sessionStorage.getItem("userName");

    if (this.userName == ""){
      this.route.navigate(["login"]);
    }

    this.loadTotalUsers();
    this.getAllContacts()
  }

  loadTotalUsers() {
    this.totalUsuarios = 1;
    this.usuariosAdicionadosMes = 1;
  }

  getAllContacts(){
    this.loadingDialogRef = this.loadingService.open();
    this.contactService.getAllContacts().subscribe({
      next: (data) => {
        console.log("start")
        console.log(this.contactResponse)
        this.totalContatos = data.length ?? 0;
        this.contatosAdicionadosMes = this.totalContatos; 
      },
      complete: () => {
        console.log("complete")
        this.loadingService.close(this.loadingDialogRef);
      },
      error: (err: any) => {
        console.log("erro")
        this.loadingService.close(this.loadingDialogRef);
      }
    });
  }

  deleteUser(){
    this.loadingDialogRef = this.loadingService.open();
    this.userService.deleteUser().subscribe({
      next: (data) => {
        this.snackBar.open("Conta de usuário excluída com sucesso.", 'Fechar', { duration: 5000, });
        sessionStorage.setItem("token", "");
        this.route.navigate(["login"]);
      },
      complete: () => {
        this.loadingService.close(this.loadingDialogRef);
      },
      error: (err: any) => {
        this.loadingService.close(this.loadingDialogRef);
      }
    });
  }
}
