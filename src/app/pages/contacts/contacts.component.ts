import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  dataSource: any;

  constructor(private contactService: ContactService){

  }


  

  ngOnInit(){    
    this.contactService.getAllContacts().subscribe(data =>
        {
            console.log("getAllContacts ", data)
        }
    );
    // this.contactService.getAllContacts().subscribe(
    //   {
    //     next: (response: any) => {
    //       console.log("getAllContacts ", response)
    //     },
    //     error: (err) => {
    //       console.error(err);
    //     }
    //   }
    // );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
