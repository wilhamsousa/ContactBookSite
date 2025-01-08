import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-form-contact',
  templateUrl: './modal-form-contact.component.html',
  styleUrl: './modal-form-contact.component.scss'
})
export class ModalFormContactComponent {
  formContact: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalFormContactComponent>,
    private formBuilder: FormBuilder){ 
  }

  ngOnInit(){
    this.buildForm();
  }

  buildForm(){
    this.formContact = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      cpf: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      phoneNumber: [null, [Validators.required, Validators.minLength(3)]],
      cep: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      address: [null, [Validators.required, Validators.minLength(10)]],
      complement: [''],
      city: [null, [Validators.required, Validators.minLength(3)]],
      uf: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      geographicalPosition: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  closeModal(){
    this.dialogRef.close();
  }
}
