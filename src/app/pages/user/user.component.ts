import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  formUser: FormGroup;

  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar){
  }

  ngOnInit(){
    this.buildForm();
  }

  buildForm(){
    this.formUser = this.formBuilder.group({
      userName: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      password: ['', [ Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$') ]]
    });
  }

  closeForm(){
    this.route.navigate(["login"]);
  }

  saveUser(){
    const userDTO = this.formUser.getRawValue();
    this.addUser(userDTO);
  }

  addUser(user: User){
    this.userService.addUser(user).subscribe({
      next: (data) => {
        this.snackBar.open("Usuário adicionado com sucesso.", 'Fechar', { duration: 5000, });
        this.route.navigate(["login"]);
      },
      complete: () => {},
      error: (err: any) => {}
    });
  }
}
