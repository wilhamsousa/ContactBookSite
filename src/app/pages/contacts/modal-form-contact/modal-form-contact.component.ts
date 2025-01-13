import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactService } from '../../../services/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExternalService } from '../../../services/external.service';
import { LoadingService } from '../../../services/loading.service';
import { ViaCepResponse } from '../../../interfaces/viaCep';
import { LoadingSpinnerComponent } from '../../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-modal-form-contact',
  templateUrl: './modal-form-contact.component.html',
  styleUrl: './modal-form-contact.component.scss'
})
export class ModalFormContactComponent {
  formContact: FormGroup;
  loadingDialogRef: any;

  constructor(
    public dialogRef: MatDialogRef<ModalFormContactComponent>,
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private externalService: ExternalService,
    private loadingService: LoadingService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any){ 
  }

  ngOnInit(){
    this.buildForm();
    
    if (this.editMode())
      this.FillForm()
  }
  
  editMode(): boolean{
    return this.data && this.data.id;
  }
  
  FillForm() {
    this.formContact.patchValue(
      {
        id: this.data.id,
        name: this.data.name,
        email: this.data.email,
        cpf: this.data.cpf,
        phoneNumber: this.data.phoneNumber,
        cep: this.data.cep,
        address: this.data.address,
        complement: this.data.complement,
        city: this.data.city,
        uf: this.data.uf,
        geographicalPosition: this.data.geographicalPosition
      }
    )
  }
  
  buildForm(){
    this.formContact = this.formBuilder.group({
      id: [''],
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

  saveContact(){
    const contactDTO = this.formContact.getRawValue();

    if (this.editMode()){
      this.editContact(contactDTO);
      return;
    }

    this.addContact(contactDTO);
  }

  addContact(contactDTO: any){
    this.loadingDialogRef = this.loadingService.open();
    this.contactService.addContact(contactDTO).subscribe({
      next: (data) => {
        this.snackBar.open("Contato adicionado com sucesso.", 'Fechar', { duration: 5000, });
        this.closeModal();
      },
      complete: () => {
        this.loadingService.close(this.loadingDialogRef);
      },
      error: (err: any) => {
        this.loadingService.close(this.loadingDialogRef);
      }
    });
  }

  editContact(contactDTO: any){
    this.loadingDialogRef = this.loadingService.open();
    this.contactService.updateContact(contactDTO).subscribe({
      next: (data) => {
        this.snackBar.open("Contato atualizado com sucesso.", 'Fechar', { duration: 5000, });
        this.closeModal();
      },
      complete: () => {
        this.loadingService.close(this.loadingDialogRef);
      },
      error: (err: any) => {
        this.loadingService.close(this.loadingDialogRef);
      }
    });
  }
  
  onBlurCep(event: any){
    const cep = event.target.value;
    this.updateAddressFromViaCep(cep);
  }

  onInputChangeCep(event: any): void { 
    this.formContact.patchValue(
      {
        address: "",
        city: "",
        uf: ""
      });
  }

  updateAddressFromViaCep(cep: string){
    if (!cep) 
      return;

    if (!this.formContact.get("cep")?.valid || false)
      return;

    if (this.formContact.get('address')?.value ||
        this.formContact.get('city')?.value ||
        this.formContact.get('uf')?.value)
      return;

    this.loadingDialogRef = this.loadingService.open();
    this.externalService.getCep(cep).subscribe({
      next: (data) => {
        if (!this.formContact.get('address')?.value) {
          this.formContact.patchValue(
            {
              address: data.logradouro,
            });
        }

        if (!this.formContact.get('city')?.value || 
            !this.formContact.get('uf')?.value) {
          this.formContact.patchValue(
            {
              city: data.localidade,
              uf: data.uf
            });
        }
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
