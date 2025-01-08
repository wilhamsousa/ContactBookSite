import { Component, ViewChild } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../interfaces/contact';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormContactComponent } from './modal-form-contact/modal-form-contact.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  contactResponse: Contact[];
  errorMessage: string;
  
  displayedColumns: string[] = ['name', 'email', 'cpf', 'phoneNumber', 'cep', 'address', 'city', 'uf', 'action'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private contactService: ContactService,
    public dialog: MatDialog){
    this.definirDataSource();
  }

  getAllContacts(){
    this.contactService.getAllContacts().subscribe(
      data => {
        this.contactResponse = data;
        this.definirDataSource();
        this.definirPaginacao();
        this.definirFiltro();
        console.log(this.contactResponse)
      },
      ex => {
        this.errorMessage = ex.error.detail;
      }
    );
  }

  definirFiltro() {
    this.dataSource.filterPredicate = (data: Contact, filter: string) => {
      console.log(filter);
      return data.cpf.includes(filter) || data.name.toLowerCase().includes(filter.toLocaleLowerCase());
     };
  }
  
  definirDataSource() {
    this.dataSource = new MatTableDataSource(this.contactResponse);
  }

  ngOnInit(){    
    this.getAllContacts();
    
  }

  ngAfterViewInit(){
    this.definirPaginacao();
  }

  definirPaginacao(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = "Itens por página";
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModalAddContact(){
    this.dialog.open(ModalFormContactComponent,
      {
        width: "700px",
        height: "700px"
      }).afterClosed().subscribe(() => this.getAllContacts() 
    );
  }
}
